import Endpoint from '../structures/Endpoint';

import paths from '../paths/search';

/**
 * Search endpoints.
 * @see https://developers.themoviedb.org/3/search
 *
 * @extends {Endpoint}
 */
export default class Search extends Endpoint {
    /**
     * Creates an instance of Search.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, paths);

        this._endpoints = {
            movie_results: this.getMovies,
            tv_results: this.getTVShows,
            person_results: this.getPeople,
        };
    }

    /**
     * Gets the endpoint from a type.
     *
     * @param {string} type Media type
     * @returns {Function}
     */
    _getEndpointFromType(type) {
        const endpointNames = Object.keys(this._endpoints);

        for (let i = 0; i < endpointNames.length; i += 1) {
            const endpointName = endpointNames[i];

            if (endpointName === type) return this._endpoints[endpointName].bind(this);
        }
    }

    /**
     * Gets the TMDb ID from a query.
     *
     * @param {string} query Query
     * @param {string} type Media type
     * @returns {Promise<number>}
     */
    async _getIdFromQuery(query, type) {
        const endpoint = this._getEndpointFromType(type);

        try {
            const response = await endpoint({ query });
            if (response.total_results === 0) return Promise.reject(Error('No results.'));

            return response.results[0].id;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets multiple results for movies, TV shows and people combined.
     * @see https://developers.themoviedb.org/3/search/multi-search
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter release dates
     * @param {string} [options.query] Query value
     * @param {number} [options.page] Query results by page number
     * @param {boolean} [options.include_adult] Include adult (pornography) content?
     * @returns {Promise<Object>}
     */
    async getCombinedResults(options) {
        return this._requestResults('GET', this._createPath(this._paths.multi), options);
    }

    /**
     * Gets multiple results for movies.
     * @see https://developers.themoviedb.org/3/search/search-movies
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter release dates
     * @param {string} [options.query] Search query
     * @param {number} [options.page] Filter results by page
     * @param {number} [options.year] Filter results by year
     * @param {number} [options.primary_release_year] Filter results by primary release year
     * @param {boolean} [options.include_adult] Include adult (pornography) content?
     * @returns {Promise<Object>}
     */
    async getMovies(options) {
        return this._requestResults('GET', this._createPath(this._paths.movies), options);
    }

    /**
     * Gets multiple results for people.
     * @see https://developers.themoviedb.org/3/search/search-people
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter release dates
     * @param {string} [options.query] Search query
     * @param {number} [options.page] Filter results by page
     * @param {boolean} [options.include_adult] Include adult (pornography) content?
     * @returns {Promise<Object>}
     */
    async getPeople(options) {
        return this._requestResults('GET', this._createPath(this._paths.people), options);
    }

    /**
     * Gets multiple results for TV shows.
     * @see https://developers.themoviedb.org/3/search/search-tv-shows
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter release dates
     * @param {string} [options.query] Search query
     * @param {number} [options.page] Filter results by page
     * @param {number} [options.firt_air_date] Filter results by first air date
     * @param {boolean} [options.include_adult] Include adult (pornography) content?
     * @returns {Promise<Object>}
     */
    async getTVShows(options) {
        return this._requestResults('GET', this._createPath(this._paths.tv), options);
    }
}
