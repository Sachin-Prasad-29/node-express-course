const asyncWrapper = (fn) => {    // here we are taking that function (get,create etc ) using it in try catch and if there is any error we will pass the error from here only not from controller
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = asyncWrapper;
