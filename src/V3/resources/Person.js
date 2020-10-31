import Resource from '../structures/Resource';

import { basePath, endpoints } from '../endpoints/person';

/**
 * Endpoints for the Person resource.
 * @see https://developers.themoviedb.org/3/people
 *
 * @prop {number} id TMDb ID
 * @extends {Resource}
 */
export class Person extends Resource {
    /**
     * Creates an instance of Person.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API request options
     * @param {Object} wrapperOptions Wrapper options
     * @param {number} id TMDb ID
     */
    constructor(version, apiOptions, wrapperOptions, id) {
        super(version, apiOptions, wrapperOptions, basePath, endpoints.media, { id });
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
        return this.getEndpoint('details', options);
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
        return this.getEndpoint('changes', options);
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
        return this.getEndpoint('movie_credits', options);
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
        return this.getEndpoint('tv_credits', options);
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
        return this.getEndpoint('combined_credits', options);
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
        return this.getEndpoint('external_ids', options);
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
        return this.getEndpoint('images', options);
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
        return this.getEndpoint('tagged_images', options);
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
        return this.getEndpoint('translations', options);
    }
}

/**
 * More endpoints for the Person resource.
 * @see https://developers.themoviedb.org/3/people
 *
 * @extends {Resource}
 */
export class PersonMore extends Resource {
    /**
     * Creates an instance of PersonMore.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, basePath, endpoints.more);
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
        return this.getEndpoint('latest', options);
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
        return this.getEndpoint('popular', options);
    }
}
