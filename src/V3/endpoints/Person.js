export const basePath = '/person';

export const endpoints = {
    media: {
        details: {
            type: 1,
            path: '/{id}',
        },

        changes: {
            type: 0,
            path: '/{id}/changes',
        },

        movie_credits: {
            type: 0,
            path: '/{id}/movie_credits',
        },

        tv_credits: {
            type: 0,
            path: '/{id}/tv_credits',
        },

        combined_credits: {
            type: 0,
            path: '/{id}/combined_credits',
        },

        external_ids: {
            type: 0,
            path: '/{id}/external_ids',
        },

        images: {
            type: 0,
            path: '/{id}/images',
        },

        tagged_images: {
            type: 2,
            path: '/{id}/tagged_images',
        },

        translations: {
            type: 0,
            path: '/{id}/translations',
        },
    },

    more: {
        latest: {
            type: 0,
            path: '/latest',
        },

        popular: {
            type: 2,
            path: '/popular',
        },
    },
};
