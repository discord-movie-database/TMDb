import axios from 'axios';

import ResponseError from './ResponseError';

/**
 * Resource structure.
 *
 * @prop {string} _baseUrl API base URL
 * @prop {number} _version API version
 * @prop {Object} _apiOptions API request options
 * @prop {Object} _wrapperOptions Wrapper options
 * @prop {string} _basePath Resource base path
 * @prop {Object} _endpoints Resource endpoints
 * @prop {Object} _pathParams Path parameters
 * @prop {number} _apiResultsPerPage API results per page
 * @prop {number} _apiPageLimit API page limit
 */
export default class Resource {
    /**
     * Creates an instance of Resource.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API request options
     * @param {Object} wrapperOptions Wrapper options
     * @param {string} basePath Resource base path
     * @param {Object} endpoints Resource endpoints
     * @param {Object} [pathParams] Path parameters
     * @param {number} [pathParams.id] TMDb ID
     * @param {string} [pathParams.externalId] External ID
     */
    constructor(version, apiOptions, wrapperOptions, basePath, endpoints, pathParams = {}) {
        this._baseUrl = `https://api.themoviedb.org/`;
        this._version = version;

        this._apiOptions = apiOptions;
        this._wrapperOptions = wrapperOptions;

        this._basePath = basePath;
        this._endpoints = endpoints;

        this._pathParams = pathParams;

        this._apiResultsPerPage = 20;
        this._apiPageLimit = 500;
    }

    /**
     * Formats the parameters in a path.
     *
     * @param {string} path Endpoint path
     * @returns {string}
     */
    _createPath(path, params = {}) {
        return (this._basePath + path)
            .replace('{id}', params.id || this._pathParams.id)
            .replace('{externalId}', params.externalId || this._pathParams.externalId);
    }

    /**
     * Sends a request to the TMDb API.
     *
     * @param {string} path Endpoint path
     * @param {axios} options Axios request options
     * @returns {Promise<Object>}
     */
    async _request(method, path, options = {}, content = {}) {
        if (!path) return Promise.reject(new ResponseError('Path required.'));

        try {
            const { data: response } = await axios({
                method,
                content,

                url: this._baseUrl + this._version + path,
                params: { ...this._apiOptions, ...options },
                headers: { 'Content-Type': 'application/json;charset=utf-8', ...options.headers },
            });

            return response;
        } catch (error) {
            if (error.response)
                return Promise.reject(new ResponseError('API error.', error.response.data));

            if (error.request)
                return Promise.reject(new ResponseError('Request made but no response received.'));

            return Promise.reject(new ResponseError('Unknown error when sending request.'));
        }
    }

    /**
     * Mutates API request options.
     *
     * @param {Object} options API request options
     * @returns {Object}
     */
    _mutateResultsOptions(options) {
        const offsetCount = this._apiResultsPerPage / this._wrapperOptions.results_per_page;

        const inputPage = options.page || 1;
        const requestPage = Math.ceil(inputPage / offsetCount);

        return { ...options, page: requestPage };
    }

    /**
     * Mutates results response data.
     *
     * @param {Object} data Response data
     * @param {Object} options API request options
     * @returns {Object}
     */
    _mutateResultsResponse(data, options) {
        const offsetCount = this._apiResultsPerPage / this._wrapperOptions.results_per_page;

        const inputPage = options.page || 1;
        const requestPage = Math.ceil(inputPage / offsetCount);

        const offsetNumber = (inputPage - 1) % offsetCount;
        const offsetPosition = offsetNumber * this._wrapperOptions.results_per_page;

        if (inputPage < 1 || inputPage > this._wrapperOptions.results_per_page)
            return Promise.reject(new ResponseError('Invalid page number.'));

        for (let i = 0; i < data.results.length; i += 1)
            data.results[i].index = (requestPage - 1) * this._apiResultsPerPage + i + 1;

        return {
            ...data,

            page: inputPage,
            total_pages: Math.ceil(data.total_results / this._wrapperOptions.results_per_page),
            total_results: data.total_results,

            results: data.results.splice(offsetPosition, this._wrapperOptions.results_per_page),
        };
    }

    /**
     * Mutates list response data.
     *
     * @param {Array<Object>} list List
     * @param {Object} options API request options
     * @returns {Object}
     */
    _mutateListResponse(list, options = {}) {
        const inputPage = options.page || 1;
        const offsetCount = this._apiResultsPerPage / this._wrapperOptions.results_per_page;

        const pages = [];

        for (let i = 0; i < list.length; i += offsetCount) pages.push(list.slice(i, 5));

        if (inputPage > pages.length)
            return Promise.reject(new ResponseError('Invalid page number.'));

        return {
            page: inputPage,
            total_pages: pages.length,
            total_results: list.length,

            results: pages[inputPage],
        };
    }

    /**
     * Gets an endpoint with results and mutates the response.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @returns {Promise<Object>}
     */
    async _getEndpointWithResults(endpointName, options = {}, params) {
        const endpoint = this._endpoints[endpointName];

        try {
            const path = this._createPath(endpoint.path, params);
            const requestOptions = this._mutateResultsOptions(options);

            const data = await this._request('GET', path, requestOptions);

            return this._mutateResultsResponse(data, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets an endpoint and mutates a list of results.
     *
     * @param {string} endpointName Endpoint name
     * @param {string} options API request options
     * @param {Object} params API endpoint params
     * @returns {Promise<Object>}
     */
    async _getEndpointWithList(endpointName, options, params) {
        const endpoint = this._endpoints[endpointName];

        try {
            const path = this._createPath(endpoint.path, params);
            const data = await this._request('GET', path, options);

            return endpoint.mutate(this._mutateListResponse.bind(this), data, options);
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }

    /**
     * Gets an endpoint and mutate appended endpoints.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @returns {Promise<Object>}
     */
    async _getEndpointWithAppends(endpointName, options, params) {
        const endpoint = this._endpoints[endpointName];

        if (!options.append_to_response)
            return this._request('GET', this._createPath(endpoint.path, params), options);

        const endpointNames = options.append_to_response.split(',');

        try {
            const path = this._createPath(endpoint.path, params);
            const requestOptions = options.page ? this._mutateResultsOptions(options) : options;

            const data = await this._request('GET', path, requestOptions);

            for (let i = 0; i < endpointNames.length; i += 1) {
                const _endpointName = endpointNames[i];
                const _endpoint = this._endpoints[_endpointName];

                if (_endpoint && _endpoint.type === 2)
                    data[_endpointName] = this._mutateResultsResponse(data[_endpointName], options);

                if (_endpoint && _endpoint.type === 3) {
                    const mutate = this._mutateListResponse.bind(this);

                    data[_endpointName] = _endpoint.mutate(mutate, data[_endpointName], options);
                }
            }

            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Sends a request to an endpoint.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @returns {Promise<Object>}
     */
    getEndpoint(endpointName, options, params) {
        const endpoint = this._endpoints[endpointName];

        if (!endpoint) return Promise.reject(new ResponseError('Invalid endpoint name.'));

        switch (endpoint.type) {
            case 1:
                return this._getEndpointWithAppends(endpointName, options, params);

            case 2:
                return this._getEndpointWithResults(endpointName, options, params);

            case 3:
                return this._getEndpointWithList(endpointName, options, params);

            default:
                return this._request('GET', this._createPath(endpoint.path, params), options);
        }
    }

    /**
     * Updates an endpoint using a method.
     *
     * @param {string} method Method
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @param {Object} content API request content
     * @returns {Promise<Object>}
     */
    updateEndpoint(method, endpointName, options, content) {
        const endpoint = this._endpoints[endpointName];

        if (!method) return Promise.reject(Error('Method required.'));
        if (!endpoint) return Promise.reject(Error('Invalid endpoint name.'));

        return this._request(method, this._createPath(endpoint.path), options, content);
    }
}
