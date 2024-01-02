class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong!!!",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.message = message;
        this.date = null;
        this.errors = errors;
    }
}

export { ApiError };
