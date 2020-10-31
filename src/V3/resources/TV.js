import Resource from '../structures/Resource';

import { basePath, endpoints } from '../endpoints/tv';

/**
 * Endpoints for the TV resource.
 * @see https://developers.themoviedb.org/3/tv
 *
 * @prop {number} id TMDb ID
 * @extends {Resource}
 */
export class TV extends Resource {
    /**
     * Creates an instance of TV.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     * @param {number} id TMDb ID
     */
    constructor(version, apiOptions, wrapperOptions, id) {
        super(version, apiOptions, wrapperOptions, basePath, endpoints.media, { id });
    }

    /**
     * Gets the primary information about a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-details
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
     * TODO
     *
     * Gets all of the alternative titles for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-alternative-titles
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getAlternativeTitles(options) {
        return this.getEndpoint('alternative_titles', options);
    }

    /**
     * Gets the changes for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-changes
     *
     * @param {Object} [options] Request options
     * @param {string} [options.start_date] Filter results by start date
     * @param {string} [options.end_date] Filter results by end date
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getChanges(options) {
        return this.getEndpoint('changes', options);
    }

    /**
     * Gets the list of content ratings (certifications) that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-content-ratings
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getContentRatings(options) {
        return this.getEndpoint('content_ratings', options);
    }

    /**
     * Gets the credits (cast and crew) for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-credits
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getCredits(options) {
        return this.getEndpoint('credits', options);
    }

    /**
     * Gets all of the episode groups that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-episode-groups
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getEpisodeGroups(options) {
        return this.getEndpoint('episode_groups', options);
    }

    /**
     * TODO
     *
     * Gets the external IDs for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-external-ids
     *
     * Supported media databases: IMDb ID, TVDB ID, Freebase MID, Freebase ID, TVRange ID.
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
     * TODO
     *
     * Gets the images that belong to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-images
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getImages(options) {
        return this.getEndpoint('images', options);
    }

    /**
     * Gets the keywords that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getKeywords(options) {
        return this.getEndpoint('keywords', options);
    }

    /**
     * Gets a list of recommended TV shows for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-recommendations
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getRecommendations(options) {
        return this.getEndpoint('recommendations', options);
    }

    /**
     * Gets the user reviews for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-reviews
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getReviews(options) {
        return this.getEndpoint('reviews', options);
    }

    /**
     * Gets a list of seasons or episodes that have been screened in a film festival or theatre.
     * @see https://developers.themoviedb.org/3/tv/get-screened-theatrically
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getScreenedTheatrically(options) {
        return this.getEndpoint('screen_theatrically', options);
    }

    /**
     * Gets a list of similar TV shows.
     * @see https://developers.themoviedb.org/3/tv/get-similar-tv-shows
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getSimilar(options) {
        return this.getEndpoint('similar', options);
    }

    /**
     * Gets a list of translations that have been created for a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    async getTranslations(options) {
        return this.getEndpoint('translations', options);
    }

    /**
     * Gets the videos that have been added to a TV show.
     * @see https://developers.themoviedb.org/3/tv/get-tv-videos
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getVideos(options) {
        return this.getEndpoint('videos', options);
    }

    /**
     * Gets TV related account states for a session.
     * @see https://developers.themoviedb.org/3/tv/get-tv-account-states
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @returns {Promise<Object>}
     */
    async getAccountStates(options) {
        return this.getEndpoint('account_states', options);
    }

    /**
     * Rates a TV show.
     * @see https://developers.themoviedb.org/3/tv/rate-tv-show
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @param {Object} [content] Request content
     * @param {number} [content.value] Rating value between 0.5 and 10
     * @returns {Promise<Object>}
     */
    async addRating(content, options) {
        return this.updateEndpoint('rating', options, content);
    }

    /**
     * Removes a rating for a TV show.
     * @see https://developers.themoviedb.org/3/tv/rate-tv-show
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @returns {Promise<Object>}
     */
    async removeRating(options) {
        return this.deleteEndpoint('rating', options);
    }
}

/**
 * More endpoints for the TV resource.
 * @see https://developers.themoviedb.org/3/tv
 *
 * @extends {Resource}
 */
export class TVMore extends Resource {
    /**
     * Creates an instance of TVMore.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, basePath, endpoints.more);
    }

    /**
     * Gets the most newly created TV show.
     * @see https://developers.themoviedb.org/3/movies/get-latest-tv
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    async getLatest(options) {
        return this.getEndpoint('latest', options);
    }

    /**
     * TODO
     *
     * Gets a list of TV shows that are airing today.
     * @see https://developers.themoviedb.org/3/tv/get-tv-airing-today
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getAiringToday(options) {
        return this.getEndpoint('airing_today', options);
    }

    /**
     * Gets a list of shows that are currently on the air.
     * @see https://developers.themoviedb.org/3/tv/get-tv-airing-today
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getOnTheAir(options) {
        return this.getEndpoint('on_the_air', options);
    }

    /**
     * Gets a list of the current popular TV shows on TMDb.
     * @see https://developers.themoviedb.org/3/tv/get-popular-tv-shows
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getPopular(options) {
        return this.getEndpoint('popular', options);
    }

    /**
     * Gets the top rated TV shows on TMDb.
     * @see https://developers.themoviedb.org/3/tv/get-top-rated-tv
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    async getTopRated(options) {
        return this.getEndpoint('top_rated', options);
    }
}
