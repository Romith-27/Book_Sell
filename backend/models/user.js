const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,

        },
        lastName: {
            type: String,
            required: true,
            trim: true,

        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/,
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Admin", "User"],
            default: "User",
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        token: {
            type: String,
        },
        reservedBooks: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'ReservedBook'
            }
        ]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);
