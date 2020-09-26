/**
 * Response error.
 *
 * @prop {Object} data Error data
 * @extends {Error}
 */
export default class ResponseError extends Error {
    /**
     * Creates an instance of ResponseError.
     *
     * @param {string} message Error message
     * @param {Object} data Error data
     */
    constructor(message, data) {
        super(message);

        this.data = data;
    }
}
