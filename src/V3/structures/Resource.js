import axios from 'axios';

import ResponseError from './ResponseError';

/**
 * Resource structure.
 *
 * @prop {string} _baseUrl API base URL
 * @prop {number} _version API version
 * @prop {Object} _apiOptions API options
 * @prop {Object} _wrapperOptions Wrapper options
 * @prop {string} _basePath Resource base path
 * @prop {Object} _endpoints Resource endpoints
 * @prop {Object} _params Request path params
 * @prop {Object} _api Default API values
 * @prop {number} _api.results_per_page API results per page
 * @prop {number} _api.page_limit API page limit
 */
export default class Resource {
    /**
     * Creates an instance of Resource.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     * @param {string} basePath Resource base path
     * @param {Object} endpoints Resource endpoints
     * @param {Object} [params] Request path params
     * @param {number} [params.id] TMDb ID
     * @param {string} [params.externalId] External ID
     */
    constructor(version, apiOptions, wrapperOptions, basePath, endpoints, params = {}) {
        this._baseUrl = `https://api.themoviedb.org/`;
        this._version = version;

        this._apiOptions = apiOptions;
        this._wrapperOptions = wrapperOptions;

        this._basePath = basePath;
        this._endpoints = endpoints;

        this._params = params;

        this._api = { page_limit: 500, results_per_page: 20 };
    }

    /**
     * Replaces endpoint path placeholders.
     *
     * @param {string} path Endpoint path
     * @param {Object} params Endpoint path params
     * @returns {string}
     */
    _createPath(path, params = {}) {
        return (this._basePath + path)
            .replace('{id}', params.id || this._params.id)
            .replace('{externalId}', params.externalId || this._params.externalId);
    }

    /**
     * Sends a request to the TMDb API.
     *
     * @param {string} method Request method
     * @param {string} path Endpoint path
     * @param {Object} options Request options
     * @param {Object} content Request content
     * @param {Object} headers Request headers
     * @returns {Promise<Object>}
     */
    async _request(method, path, options = {}, content = {}, headers = {}) {
        if (!method) return Promise.reject(new ResponseError('Method required.'));
        if (!path) return Promise.reject(new ResponseError('Path required.'));

        try {
            const { data: response } = await axios({
                method,
                content,
                url: this._baseUrl + this._version + path,
                params: { ...this._apiOptions, ...options },
                headers: { 'Content-Type': 'application/json;charset=utf-8', ...headers },
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
     * Mutates API options.
     *
     * @param {Object} options API options
     * @returns {Object}
     */
    _mutateOptions(options = {}) {
        const offsetCount = this._api.results_per_page / this._wrapperOptions.results_per_page;

        const inputPage = options.page || 1;
        const requestPage = Math.ceil(inputPage / offsetCount);

        return { ...options, page: requestPage };
    }

    /**
     * Mutates results data.
     *
     * @param {Object} data Response data
     * @param {Object} options API options
     * @returns {Object}
     */
    _mutateResults(data, options = {}) {
        const offsetCount = this._api.results_per_page / this._wrapperOptions.results_per_page;

        if (offsetCount === 1) return data;

        const inputPage = options.page || 1;
        const requestPage = Math.ceil(inputPage / offsetCount);

        const pageLimit = this._api.pageLimit * offsetCount;

        if (inputPage < 1 || inputPage > pageLimit) {
            return Promise.reject(new ResponseError('Page limit exceeded.'));
        }

        const offsetNumber = (inputPage - 1) % offsetCount;
        const offsetPosition = offsetNumber * this._wrapperOptions.results_per_page;

        for (let i = 0; i < data.results.length; i += 1) {
            data.results[i].index = (requestPage - 1) * this._api.results_per_page + i + 1;
        }

        const totalPages = Math.ceil(data.total_results / this._wrapperOptions.results_per_page);
        const results = data.results.splice(offsetPosition, this._wrapperOptions.results_per_page);

        if (results.length === 0) return Promise.reject(Error('No results.'));

        return {
            results,

            page: inputPage,
            total_pages: totalPages,
            total_results: data.total_results,
        };
    }

    /**
     * Mutates list data.
     *
     * @param {Array<Object>} list List results
     * @param {Object} options API options
     * @returns {Object}
     */
    _mutateList(list, options = {}) {
        if (list.length === 0) return Promise.reject(Error('No results.'));

        const inputPage = options.page || 1;
        const totalPages = Math.ceil(list.length / this._wrapperOptions.results_per_page);

        if (inputPage < 1 || inputPage > totalPages) {
            return Promise.reject(new ResponseError('Invalid page number.'));
        }

        for (let i = 0; i < list.length; i += 1) list[i].index = i + 1;

        const offsetPosition = (inputPage - 1) * this._wrapperOptions.results_per_page;
        const results = list.slice(offsetPosition, this._wrapperOptions.results_per_page);

        return {
            results,

            page: inputPage,
            total_pages: totalPages,
            total_results: list.length,
        };
    }

    /**
     * Gets an endpoint with results and mutate the data.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API options
     * @param {Object} params Request path params
     * @returns {Promise<Object>}
     */
    async _getResults(endpointName, options = {}, params = {}) {
        const endpoint = this._endpoints[endpointName];

        try {
            const path = this._createPath(endpoint.path, params);
            const mutatedOptions = this._mutateOptions(options);

            const data = await this._request('GET', path, mutatedOptions);

            return this._mutateResults(data, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets an endpoint with a list and mutate the data.
     *
     * @param {string} endpointName Endpoint name
     * @param {string} options API options
     * @param {Object} params Request path params
     * @returns {Promise<Object>}
     */
    async _getList(endpointName, options = {}, params = {}) {
        const endpoint = this._endpoints[endpointName];

        try {
            const path = this._createPath(endpoint.path, params);
            const data = await this._request('GET', path, options);

            return endpoint.mutate(this._mutateList.bind(this), data, options);
        } catch (error) {
            return Promise.reject(Error(error));
        }
    }

    /**
     * Gets an endpoint with appends and mutate the data.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @param {Object} params Request path params
     * @returns {Promise<Object>}
     */
    async _getAppends(endpointName, options = {}, params = {}) {
        const endpoint = this._endpoints[endpointName];

        if (!options.append_to_response) {
            return this._request('GET', this._createPath(endpoint.path, params), options);
        }

        const endpointNames = options.append_to_response.split(',');

        try {
            const path = this._createPath(endpoint.path, params);
            const mutatedOptions = options.page ? this._mutateOptions(options) : options;

            const data = await this._request('GET', path, mutatedOptions);

            for (let i = 0; i < endpointNames.length; i += 1) {
                const _endpointName = endpointNames[i];
                const _endpoint = this._endpoints[_endpointName];

                if (_endpoint) {
                    if (_endpoint.type === 2) {
                        data[_endpointName] = this._mutateResults(data[_endpointName], options);
                    }

                    if (_endpoint.type === 3 && this._wrapperOptions.always_use_results) {
                        const mutate = this._mutateList.bind(this);
                        const _data = data[_endpointName];

                        data[_endpointName] = _endpoint.mutate(mutate, _data, options);
                    }
                }
            }

            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Sends a request to the TMDb API.
     *
     * @param {string} endpointName Endpoint name
     * @param {Object} options API request options
     * @param {Object} params Request path params
     * @returns {Promise<Object>}
     */
    getEndpoint(endpointName, options = {}, params = {}) {
        const endpoint = this._endpoints[endpointName];

        if (!endpoint) {
            return Promise.reject(new ResponseError('Invalid endpoint name.'));
        }

        if (endpoint.type === 1) {
            return this._getAppends(endpointName, options, params);
        }

        if (endpoint.type === 2 && this._wrapperOptions.results_per_page) {
            return this._getResults(endpointName, options, params);
        }

        if (endpoint.type === 3 && this._wrapperOptions.always_use_results) {
            return this._getList(endpointName, options, params);
        }

        return this._request('GET', this._createPath(endpoint.path, params), options);
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

        const path = this._createPath(endpoint.path);

        return this._request(method, path, options, content);
    }
}
