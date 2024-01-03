import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true, // Costly operation to make any field easily searchable
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true, // Costly operation to make any field easily searchable
        },
        avatar: {
            type: String, // Cloudniary URL storing all our Images and Videos
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// Pre() is a middleware which we use just before User Saves data [just before anything to be precise]
userSchema.pre("save", async function (next) {
    // We should encrypt our password only when our password is entered first-time or updated again
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// isPasswordCorrect is our own custom Password Checker
userSchema.methods.isPasswordCorrect = async function (password) {
    // Bcrypt.compar() checks between our plainTextPassword & EncryptedPassword and returns true if they are true else returns false
    return await bcrypt.compare(password, this.password);
};

// jwt.sign() takes: {payload or data as object}, SECRET_KEY, {expiryObject}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        }
    );
};

// RefreshToken() generally takes less arguments in payload or data as it gets refreshed regularly
// Refresh-Tokens are generated in the exact same way as Access-Tokens
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
