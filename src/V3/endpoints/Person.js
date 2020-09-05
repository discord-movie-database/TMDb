import Endpoint from '../structures/Endpoint';

import paths from '../paths/person';

/**
 * Person endpoints.
 * @see https://developers.themoviedb.org/3/people
 *
 * @prop {number} id TMDb ID
 * @extends {Endpoint}
 */
export class Person extends Endpoint {
    /**
     * Creates an instance of Person.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     * @param {number} id TMDb ID
     */
    constructor(version, apiOptions, wrapperOptions, id) {
        super(version, apiOptions, wrapperOptions, paths);

        this.id = id;
    }

    /**
     * Gets the primary information about a person.
     * @see https://developers.themoviedb.org/3/people/get-person-details
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.append_to_response] Request multiple endpoints at the same time (comma separated)
     * @returns {Promise<Object>}
     */
    async getDetails(options) {
        return this._request('GET', this._createPath(this._paths.details), options);
    }

    /**
     * Gets the changes for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-changes
     *
     * Last 24 hours returned by default. Query up to 14 days.
     *
     * @param {Object} [options] Request options
     * @param {string} [options.start_date] Filter results by start date
     * @param {string} [options.end_date] Filter results by end date
     * @param {number} [options.page] Query results by page number
     * @returns {Promise<Object>}
     */
    async getChanges(options) {
        return this._request('GET', this._createPath(this._paths.changes), options);
    }

    /**
     * Gets the movie credits for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-movie-credits
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getMovieCredits(options) {
        return this._request('GET', this._createPath(this._paths.movieCredits), options);
    }

    /**
     * Gets the TV show credits for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-tv-credits
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<{PersonEndpoint}>}
     */
    async getTVCredits(options) {
        return this._request('GET', this._createPath(this._paths.tvCredits), options);
    }

    /**
     * Gets the movie and TV credits together for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-combined-credits
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getCombinedCredits(options) {
        return this._request('GET', this._createPath(this._paths.combinedCredits), options);
    }

    /**
     * Gets the external IDs for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-external-ids
     *
     * Supported media databases: IMDb ID, Freebase MID, Freebase ID, TVRange ID
     * Supported social IDs: Facebook, Instagram, Twitter.
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getExternalIds(options) {
        return this._request('GET', this._createPath(this._paths.externalIds), options);
    }

    /**
     * Gets the images for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-images
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.include_image_language] Fallbacks for language option (comma separated)
     * @returns {Promise<Object>}
     */
    async getImages(options) {
        return this._request('GET', this._createPath(this._paths.images), options);
    }

    /**
     * Gets the images that this person has been tagged in.
     * @see https://developers.themoviedb.org/3/people/get-tagged-images
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Query results by page number
     * @returns {Promise<Object>}
     */
    async getTaggedImages(options) {
        return this._requestResults('GET', this._createPath(this._paths.taggedImages), options);
    }

    /**
     * Gets a list of translations that have been created for a person.
     * @see https://developers.themoviedb.org/3/people/get-person-translations
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getTranslations(options) {
        return this._request('GET', this._createPath(this._paths.translations), options);
    }
}

/**
 * Person endpoints.
 * @see https://developers.themoviedb.org/3/people
 *
 * @extends {Endpoint}
 */
export class PersonMore extends Endpoint {
    /**
     * Creates an instance of PersonMore.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, paths);
    }

    /**
     * Gets the most newly created person.
     * @see https://developers.themoviedb.org/3/people/get-latest-person
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getLatest(options) {
        return this._request('GET', this._createPath(this._paths.latest), options);
    }

    /**
     * Gets a list of the current popular people on TMDb. This list updates daily.
     * @see https://developers.themoviedb.org/3/people/get-popular-people
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Query results by page number
     * @returns {Promise<Object>}
     */
    async getPopular(options) {
        return this._requestResults('GET', this._createPath(this._paths.popular), options);
    }
}
