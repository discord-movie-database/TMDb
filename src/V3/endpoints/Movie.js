import Endpoint from '../structures/Endpoint';

import paths from '../paths/movie';

/**
 * Movie endpoints.
 * @see https://developers.themoviedb.org/3/movies
 *
 * @prop {number} id TMDb ID
 * @extends {Endpoint}
 */
export class Movie extends Endpoint {
    /**
     * Creates an instance of Movie.
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
     * Gets the primary information about a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-details
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.append_to_response] Request multiple endpoints at the same time (comma separated)
     * @returns {Promise<Object>}
     */
    getDetails(options) {
        return this._request('GET', this._createPath(this._paths.details), options);
    }

    /**
     * Gets all of the alternative titles for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-alternative-titles
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getAlternativeTitles(options) {
        return this._request('GET', this._createPath(this._paths.alternativeTitles), options);
    }

    /**
     * Gets the changes for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-changes
     *
     * Last 24 hours returned by default. Query up to 14 days.
     *
     * @param {Object} [options] Request options
     * @param {string} [options.start_date] Filter results by start date
     * @param {string} [options.end_date] Filter results by end date
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getChanges(options) {
        return this._request('GET', this._createPath(this._paths.changes), options);
    }

    /**
     * Gets the credits (cast and crew) for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-credits
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getCredits(options) {
        return this._request('GET', this._createPath(this._paths.credits), options);
    }

    /**
     * Gets the external IDs for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-external-ids
     *
     * Supported media databases: IMDb ID.
     * Supported social IDs: Facebook, Instagram, Twitter.
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getExternalIds(options) {
        return this._request('GET', this._createPath(this._paths.externalIds), options);
    }

    /**
     * Gets the images that belong to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-images
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.include_image_language] Fallbacks for language option (comma separated)
     * @returns {Promise<Object>}
     */
    getImages(options) {
        return this._request('GET', this._createPath(this._paths.images), options);
    }

    /**
     * Gets the keywords that have been added to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-keywords
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getKeywords(options) {
        return this._request('GET', this._createPath(this._paths.keywords), options);
    }

    /**
     * Gets the release date along with the certification for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-release-dates
     *
     * Supported types: Premiere, Theatrical (limited), Theatrical, Digital, Physical, TV.
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getReleaseDates(options) {
        return this._request('GET', this._createPath(this._paths.releaseDates), options);
    }

    /**
     * Gets the videos that have been added to a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-videos
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    getVideos(options) {
        return this._request('GET', this._createPath(this._paths.videos), options);
    }

    /**
     * Gets a list of translations that have been created for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-translations
     *
     * @param {Object} [options] Request options
     * @returns {Promise<Object>}
     */
    getTranslations(options) {
        return this._request('GET', this._createPath(this._paths.translations), options);
    }

    /**
     * Gets a list of recommended movies for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-recommendations
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getRecommendations(options) {
        return this._requestResults('GET', this._createPath(this._paths.recommendations), options);
    }

    /**
     * Gets a list of similar movies.
     * @see https://developers.themoviedb.org/3/movies/get-similar-movies
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getSimilar(options) {
        return this._requestResults('GET', this._createPath(this._paths.similar), options);
    }

    /**
     * Gets the user reviews for a movie.
     * @see https://developers.themoviedb.org/3/movies/get-movie-reviews
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getReviews(options) {
        return this._requestResults('GET', this._createPath(this._paths.reviews), options);
    }

    /**
     * Gets a list of lists that this movie belongs to.
     * @see https://developers.themoviedb.org/3/movies/get-movie-lists
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getLists(options) {
        return this._requestResults('GET', this._createPath(this._paths.lists), options);
    }

    /**
     * Gets movie related account states for a session.
     * @see https://developers.themoviedb.org/3/movies/get-movie-account-states
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @returns {Promise<Object>}
     */
    getAccountStates(options) {
        return this._request('GET', this._createPath(this._paths.accountStates), options);
    }

    /**
     * Rates a movie.
     * @see https://developers.themoviedb.org/3/movies/rate-movie
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @param {Object} [content] Request content
     * @param {number} [content.value] Rating value between 0.5 and 10
     * @returns {Promise<Object>}
     */
    addRating(options, content) {
        return this._request('POST', this._createPath(this._paths.rating), options, content);
    }

    /**
     * Removes a rating for a movie.
     * @see https://developers.themoviedb.org/3/movies/delete-movie-rating
     *
     * @param {Object} [options] Request options
     * @param {string} [options.guest_session_id] Guest session ID
     * @param {string} [options.session_id] Session ID
     * @returns {Promise<Object>}
     */
    removeRating(options) {
        return this._request('DELETE', this._createPath(this._paths.rating), options);
    }
}

/**
 * Movie endpoints.
 * @see https://developers.themoviedb.org/3/movies
 *
 * @extends {Endpoint}
 */
export class MovieMore extends Endpoint {
    /**
     * Creates an instance of MovieMore.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, paths);
    }

    /**
     * Gets the most newly created movie.
     * @see https://developers.themoviedb.org/3/movies/get-latest-movie
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @returns {Promise<Object>}
     */
    getLatest(options) {
        return this._request('GET', this._createPath(this._paths.latest), options);
    }

    /**
     * Gets a list of movies in theatres.
     * @see https://developers.themoviedb.org/3/movies/get-now-playing
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter results by region
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getNowPlaying(options) {
        return this._requestResults('GET', this._createPath(this._paths.nowPlaying), options);
    }

    /**
     * Gets a list of the current popular movies on TMDb.
     * @see https://developers.themoviedb.org/3/movies/get-popular-movies
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter results by region
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getPopular(options) {
        return this._requestResults('GET', this._createPath(this._paths.popular), options);
    }

    /**
     * Gets the top rated movies on TMDb.
     * @see https://developers.themoviedb.org/3/movies/get-top-rated-movies
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter results by region
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getTopRated(options) {
        return this._requestResults('GET', this._createPath(this._paths.topRated), options);
    }

    /**
     * Gets a list of upcoming movies in theatres
     * @see https://developers.themoviedb.org/3/movies/get-upcoming
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.region] ISO 3166-1 value to filter results by region
     * @param {number} [options.page] Filter results by page
     * @returns {Promise<Object>}
     */
    getUpcoming(options) {
        return this._requestResults('GET', this._createPath(this._paths.upcoming), options);
    }
}
