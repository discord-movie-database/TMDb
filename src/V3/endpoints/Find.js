import Endpoint from '../structures/Endpoint';

import paths from '../paths/find';

/**
 * Find endpoints.
 * @see https://developers.themoviedb.org/3/find
 *
 * @extends {Endpoint}
 */
export default class Find extends Endpoint {
    /**
     * Creates an instance of Find.
     *
     * @param {number} version API version
     * @param {Object} apiOptions API options
     * @param {Object} wrapperOptions Wrapper options
     */
    constructor(version, apiOptions, wrapperOptions) {
        super(version, apiOptions, wrapperOptions, paths);

        this._customId = /^t(\d+)$/;
        this._externalSources = {
            movie_results: { imdb_id: /^tt\d+$/ },
            tv_results: { imdb_id: /^tt\d+$/ },
            person_results: { imdb_id: /^nm\d+$/ },
        };
    }

    /**
     * Gets the external source from an external ID.
     *
     * @param {string} externalId External ID
     * @param {string} type Media type
     * @returns {string}
     */
    _getExternalSource(externalId, type) {
        const sources = this._externalSources[type];
        const sourceNames = Object.keys(sources);

        for (let i = 0; i < sourceNames.length; i += 1) {
            const sourceName = sourceNames[i];
            const sourceValue = this._externalSources[type][sourceName];

            if (sourceValue.test(externalId)) return sourceName;
        }
    }

    /**
     * Gets the TMDb ID from an external ID.
     *
     * @param {string} externalId External ID
     * @param {string} type Media type
     * @returns {Promise<number>}
     */
    async _getIdFromExternalSource(externalId, type) {
        if (this._wrapperOptions.custom_id) {
            const isCustom = externalId.match(this._customId);

            if (isCustom) return isCustom[1];
        }

        const sourceName = this._getExternalSource(externalId, type);

        try {
            const response = await this.findByExternalId(externalId, {
                external_source: sourceName,
            });

            const results = response[type];
            if (results.length === 0) return Promise.reject(Error('No results.'));

            return results[0].id;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * Gets TMDb ID from external ID for all media types.
     * @see https://developers.themoviedb.org/3/find/find-by-id
     *
     * @param {Object} [options] Request options
     * @param {string} [options.language] ISO 639-1 value to get translated data
     * @param {string} [options.external_source] External source
     * @returns {Promise<Object>}
     */
    async findByExternalId(externalId, options) {
        const path = this._createPath(this._paths.byExternalId, { externalId });

        return this._request('GET', path, options);
    }
}
