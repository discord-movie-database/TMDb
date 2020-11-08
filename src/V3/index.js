import ResponseError from './structures/ResponseError';

import Find from './resources/Find';
import Search from './resources/Search';

import { Movie, MovieMore } from './resources/Movie';
import { TV, TVMore } from './resources/TV';
import { Person, PersonMore } from './resources/Person';

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
     * @param {string} [apiOptions.language] Language
     * @param {string} [apiOptions.region] Region
     * @param {Object} [wrapperOptions] Wrapper options
     * @param {number} [wrapperOptions.results_per_page] Results per page
     * @param {boolean} [wrapperOptions.always_use_results] Return simple lists as results structure
     * @param {boolean} [wrapperOptions.custom_id] Use "t" as TMDb ID prefix for external ID method?
     * @param {Find} find Find resource
     * @param {Search} search Search resource
     * @param {Movie} movie Movie resource
     * @param {TV} tv TV resource
     * @param {Person} person Person resource
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
            results_per_page: 20,
            always_use_results: false,
            custom_id: false,

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
     * @param {string} type Media type
     * @param {Object} options API options
     * @returns {Promise<number>}
     */
    async _getIdFromMethod(method, type, options) {
        if (method.id) return method.id;

        try {
            if (method.externalId) {
                return await this.find._getIdFromExternalSource(method.externalId, type);
            }
        } catch (error) {
            if (!method.query) return error;
        }

        if (method.query) {
            return this.search._getIdFromQuery(method.query, type, options);
        }

        return Promise.reject(new ResponseError('Method required.'));
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
     * @param {Object} [options] API options
     * @returns {Promise<Movie>}
     */
    async getMovieFromMethod(method, options) {
        try {
            const id = await this._getIdFromMethod(method, 'movie_results', options);

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
     * @param {Object} [options] API options
     * @returns {Promise<TV>}
     */
    async getTVShowFromMethod(method, options) {
        try {
            const id = await this._getIdFromMethod(method, 'tv_results', options);

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
     * @param {Object} [options] API options
     * @returns {Promise<Person>}
     */
    async getPersonFromMethod(method, options) {
        try {
            const id = await this._getIdFromMethod(method, 'person_results', options);

            return this.getPerson(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
