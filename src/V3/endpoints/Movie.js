export const basePath = '/movie';

export const endpoints = {
    media: {
        details: {
            type: 1,
            path: '/{id}',
        },

        alternative_titles: {
            type: 0, // 3
            path: '/{id}/alternative_titles',
        },

        changes: {
            type: 0, // 3
            path: '/{id}/changes',
        },

        credits: {
            type: 3,
            path: '/{id}/credits',

            mutate: (mutate, data, options) => ({
                ...data,

                cast: mutate(data.cast, options),
                crew: mutate(data.crew, options),
            }),
        },

        external_ids: {
            type: 0,
            path: '/{id}/external_ids',
        },

        images: {
            type: 0, // 3
            path: '/{id}/images',
        },

        keywords: {
            type: 0, // 3
            path: '/{id}keywords',
        },

        release_dates: {
            type: 0, // 3
            path: '/{id}/release_dates',
        },

        videos: {
            type: 0, // 3
            path: '/{id}/videos',
        },

        translations: {
            type: 0, // 3
            path: '/{id}/translations',
        },

        recommendations: {
            type: 2,
            path: '/{id}/recomendations',
        },

        similar: {
            type: 2,
            path: '/{id}/similar',
        },

        reviews: {
            type: 2,
            path: '/{id}/reviews',
        },

        lists: {
            type: 2,
            path: '/{id}/lists',
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

        now_playing: {
            type: 2,
            path: '/now_playing',
        },

        popular: {
            type: 2,
            path: '/popular',
        },

        top_rated: {
            type: 2,
            path: '/top_rated',
        },

        upcoming: {
            type: 2,
            path: '/upcoming',
        },
    },
};
