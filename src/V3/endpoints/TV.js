export const basePath = '/tv';

export const endpoints = {
    media: {
        details: {
            type: 1,
            path: '/{id}',
        },

        alternative_titles: {
            type: 0,
            path: '/{id}/alternative_titles',
        },

        changes: {
            type: 0,
            path: '/{id}/changes',
        },

        content_ratings: {
            type: 0,
            path: '/{id}/content_ratings',
        },

        credits: {
            type: 0,
            path: '/{id}/credits',
        },

        episode_groups: {
            type: 0,
            path: '/{id}/episode_groups',
        },

        external_ids: {
            type: 0,
            path: '/{id}/external_ids',
        },

        images: {
            type: 0,
            path: '/{id}/images',
        },

        keywords: {
            type: 0,
            path: '/{id}keywords',
        },

        recommendations: {
            type: 2,
            path: '/{id}/recomendations',
        },

        reviews: {
            type: 2,
            path: '/{id}/reviews',
        },

        screened_theartically: {
            type: 0,
            path: '/{id}/screened_theartically',
        },

        similar: {
            type: 2,
            path: '/{id}/similar',
        },

        translations: {
            type: 0,
            path: '/{id}/translations',
        },

        videos: {
            type: 0,
            path: '/{id}/videos',
        },

        rating: {
            type: 0,
            path: '/{id}/rating',
        },

        account_states: {
            type: 0,
            path: '/{id}/account_states',
        },
    },

    more: {
        latest: {
            type: 0,
            path: '/latest',
        },

        airing_today: {
            type: 2,
            path: '/airing_today',
        },

        on_the_air: {
            type: 2,
            path: '/on_the_air',
        },

        popular: {
            type: 2,
            path: '/popular',
        },

        top_rated: {
            type: 2,
            path: '/top_rated',
        },
    },
};
