import Resource from '../structures/Resource';
import ResponseError from '../structures/ResponseError';

import { basePath, endpoints } from '../endpoints/search';

/**
 * Endpoints for the Search resource.
 * @see https://developers.themoviedb.org/3/search
 *
 * @extends {Resource}
 */
export default class Search extends Resource {
    /**
     * Creates an instance of Search.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, basePath, endpoints);

        this._resources = {
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
    _getResourceFromType(type) {
        const resourceNames = Object.keys(this._resources);

        for (let i = 0; i < resourceNames.length; i += 1) {
            const resourceName = resourceNames[i];

            if (resourceName === type) return this._resources[resourceName].bind(this);
        }
    }

    /**
     * Gets the TMDb ID from a query.
     *
     * @param {string} query Query
     * @param {string} type Media type
     * @param {Object} options API options
     * @returns {Promise<number>}
     */
    async _getIdFromQuery(query, type, options) {
        const resource = this._getResourceFromType(type);

        try {
            const response = await resource({ ...options, query });
            if (response.total_results === 0)
                return Promise.reject(new ResponseError('No results.'));

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
        return this.getEndpoint('multi', options);
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
        return this.getEndpoint('movie', options);
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
        return this.getEndpoint('person', options);
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
        return this.getEndpoint('tv', options);
    }
}
