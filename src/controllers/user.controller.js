import { asyncHandler } from "../utils/asyncHandler.js";

const userRegister = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "Chai aur Code",
    });
});

export default userRegister;
