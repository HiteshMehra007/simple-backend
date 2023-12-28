import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            index: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },
        avatar: {
            type: String, //cloudinary
            required: true,
        },
        coverImage: {
            type: String, // cloudinary
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: ['true', "Password is required"],
        },
        refreshToken: {
            type: String,
        }
    }, 
    {
        timestamps: true
    }
);

// Mongoose Middleware
// mongoose middleware are only used with async finction and don't use arrow function cuz they don't have this(model/document) refernece
userSchema.pre("save", async function () {
    // check if password is modified or not
    if(!this.isModified("password")) return next();

    // Otherwise Hash the password
    this.password = bcrypt.hash(this.password, 10);
    next();
})

// pasword check method
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        }
    )
}
// generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema);