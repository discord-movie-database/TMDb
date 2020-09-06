import Find from './endpoints/Find';
import Search from './endpoints/Search';

import { Movie, MovieMore } from './endpoints/Movie';
import { TV, TVMore } from './endpoints/TV';
import { Person, PersonMore } from './endpoints/Person';

/**
 * TMDb API version 3.
 *
 * @prop {number} version API version
 * @prop {Object} apiOptions API options
 * @prop {Object} wrapperOptions Wrapper options
 */
export default class V3 {
    /**
     * Creates an instance of V3.
     *
     * @param {Object} apiOptions API options
     * @param {string} apiOptions.api_key API key
     * @param {string} [apiOptions.session_id] Session ID
     * @param {string} [apiOptions.guest_session_id] Guest session ID
     * @param {string} [apiOptions.include_image_language] Image language
     * @param {string} [apiOptions.language] API language
     * @param {string} [apiOptions.region] API region
     * @param {Object} [wrapperOptions] Wrapper options
     * @param {number} [wrapperOptions.results_per_page] Results per page
     */
    constructor(apiOptions, wrapperOptions) {
        this.version = 3;

        this.apiOptions = {
            api_key: null,
            session_id: null,
            guest_session_id: null,
            include_image_language: null,
            language: null,
            region: null,

            ...apiOptions,
        };

        this.wrapperOptions = {
            results_per_page: null,

            ...wrapperOptions,
        };

        if (!apiOptions.api_key) throw Error('API key required.');

        this.find = new Find(this.version, this.apiOptions, this.wrapperOptions);
        this.search = new Search(this.version, this.apiOptions, this.wrapperOptions);

        this.movie = new MovieMore(this.version, this.apiOptions, this.wrapperOptions);
        this.tv = new TVMore(this.version, this.apiOptions, this.wrapperOptions);
        this.person = new PersonMore(this.version, this.apiOptions, this.wrapperOptions);
    }

    /**
     * Gets the TMDb ID using a method.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @param {string} type Media type
     * @returns {Promise<number>}
     */
    async _getIdFromMethod(method, type) {
        if (method.id) return method.id;

        try {
            if (method.externalId) {
                return await this.find._getIdFromExternalSource(method.externalId, type);
            }
        } catch (error) {
            if (!method.query) return error;
        }

        if (method.query) {
            return this.search._getIdFromQuery(method.query, type);
        }

        return Promise.reject(Error('Method required.'));
    }

    /**
     * Gets the endpoints for a movie using it's TMDb ID.
     *
     * @param {number} id TMDb ID
     * @returns {Movie}
     */
    getMovie(id) {
        return new Movie(this.version, this.apiOptions, this.wrapperOptions, id);
    }

    /**
     * Gets the endpoints for a movie using a method.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {Promise<Movie>}
     */
    async getMovieFromMethod(method) {
        try {
            const id = await this._getIdFromMethod(method, 'movie_results');

            return this.getMovie(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets the endpoints for a TV show using it's TMDb ID.
     *
     * @param {number} id TMDb ID
     * @returns {TV}
     */
    getTVShow(id) {
        return new TV(this.version, this.apiOptions, this.wrapperOptions, id);
    }

    /**
     * Gets the endpoints for a TV show using a method.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {Promise<TV>}
     */
    async getTVShowFromMethod(method) {
        try {
            const id = await this._getIdFromMethod(method, 'tv_results');

            return this.getTVShow(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets the endpoints for a person using it's TMDb ID.
     *
     * @param {number} id TMDb ID
     * @returns {Person}
     */
    getPerson(id) {
        return new Person(this.version, this.apiOptions, this.wrapperOptions, id);
    }

    /**
     * Gets the endpoints for a person.
     *
     * @param {Object} method Method
     * @param {number} [method.id] TMDb ID
     * @param {string} [method.externalId] External ID
     * @param {string} [method.query] Query
     * @returns {Promise<Person>}
     */
    async getPersonFromMethod(method) {
        try {
            const id = await this._getIdFromMethod(method, 'person_results');

            return this.getPerson(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
