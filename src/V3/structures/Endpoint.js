import axios from 'axios';

/**
 * Endpoint structure.
 *
 * @prop {number} _version API version
 * @prop {Object} _apiOptions API options
 * @prop {Object} _wrapperOptions Wrapper options
 * @prop {Object} _paths API Endpoint paths
 * @prop {string} _baseUrl API base URL
 */
export default class Endpoint {
    /**
     * Creates an instance of Endpoint.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     * @param {Object} paths API Endpoint paths
     */
    constructor(version, apiOptions, wrapperOptions, paths) {
        this._version = version;

        this._apiOptions = apiOptions;
        this._wrapperOptions = wrapperOptions;

        this._paths = paths;
        this._baseUrl = `https://api.themoviedb.org/`;
    }

    /**
     * Creates API endpoint path.
     *
     * @param {string} path Path template
     * @param {Object} [part] Path parts
     * @param {number} [part.id] TMDb ID
     * @param {string} [part.externalId] External ID
     * @returns {string}
     */
    _createPath(path, part = {}) {
        return (this._paths.base + path)
            .replace('{id}', this.id || part.id)
            .replace('{externalId}', this.externalId || part.externalId);
    }

    /**
     * Sends request to API.
     *
     * @param {string} method Request Method
     * @param {string} path Request endpoint path
     * @param {Object} [params] Request params
     * @param {Object} [body] Request body
     * @param {Object} [headers] Request headers
     * @returns {Promise<Object>}
     */
    async _request(method, path, params = {}, body = {}, headers = {}) {
        if (!method) return Promise.reject(Error('Method required.'));
        if (!path) return Promise.reject(Error('Path required.'));

        try {
            const { data: response } = await axios({
                method,
                url: this._baseUrl + this._version + path,
                params: { ...this._apiOptions, ...params },
                body: { ...body },
                headers: { 'Content-Type': 'application/json;charset=utf-8', ...headers },
            });

            return response;
        } catch (error) {
            if (error.response) return Promise.reject(error.response);
            if (error.request)
                return Promise.reject(Error('Request was made but no response was received.'));

            return Promise.reject(Error('Unknown error when sending request.'));
        }
    }

    /**
     * Mutates the response if there's multiple results.
     *
     * @param {string} method Request Method
     * @param {string} path Request endpoint path
     * @param {Object} [params] Request params
     * @param {Object} [body] Request body
     * @param {Object} [headers] Request headers
     * @returns {Promise<Object>}
     */
    async _requestResults(method, path, params = {}, body = {}, headers = {}) {
        // Is there a more elegant way to do this?

        if (!this._wrapperOptions.results_per_page)
            return this._request(method, path, params, body, headers);

        const apiResultsPerPage = 20;
        const wrapperResultsPerPage = this._wrapperOptions.results_per_page || apiResultsPerPage;

        const offsetCount = apiResultsPerPage / wrapperResultsPerPage;

        const apiPageLimit = 1000;
        const wrapperPageLimit = apiPageLimit * offsetCount;

        const inputPage = params.page || 1;
        const requestPage = Math.ceil(inputPage / offsetCount);

        if (inputPage < 1 || inputPage > wrapperPageLimit)
            return Promise.reject(Error(`Page must be less than or equal to ${wrapperPageLimit}`));

        let response;
        const requestParams = { ...params, page: requestPage };

        try {
            response = await this._request(method, path, requestParams, body, headers);
        } catch (error) {
            return Promise.reject(error);
        }

        const offsetNumber = (inputPage - 1) % offsetCount;
        const offsetPosition = offsetNumber * wrapperResultsPerPage;

        if (response.results.length === 0 || offsetPosition > response.results.length)
            return Promise.reject(Error('No results.'));

        for (let i = 0; i < response.results.length; i += 1)
            response.results[i].index = (requestPage - 1) * apiResultsPerPage + i + 1;

        const wrapperTotalPages = Math.ceil(response.total_results / wrapperResultsPerPage);
        const wrapperResults = response.results.splice(offsetPosition, wrapperResultsPerPage);

        return {
            page: inputPage,
            total_pages: wrapperTotalPages,
            total_results: response.total_results,
            results: wrapperResults,
        };
    }
}
