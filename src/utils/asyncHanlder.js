const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error)
        );
    };
};

export { asyncHandler };

// Higher Order functions accept functions as an argument to it
// const asyncHandler = (func) => {}
// const asyncHandler = (func) => { () => {} }
// const asyncHandler = (func) => { async () => {} }

/*
Async Handler using Async-Await & try-catch block syntax
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.send(error.code || 500, {
            success: false,
            message: error.message,
        });
    }
};
*/
