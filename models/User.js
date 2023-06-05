const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a name"],
        },
        email: {
            type: String,
            match: [/.+\@.+\..+/, "This email format is invalid"],
            unique: true,
            required: [true, "Please enter a email"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
        },

        age: Number,
        degree: { type: ObjectId, ref: "Degree" },
        gender: String,
        linkedIn: String,
        role: { type: String, default: "user" },
        confirmed: { type: Boolean, default: false },
        tokens: [],
        userType: { type: ObjectId, ref: "UserType" },
        chat: [{ type: ObjectId, ref: "Chat" }],
        // postIds: [{ type: ObjectId, ref: "Post" }],
        // likes: [{ type: ObjectId, ref: 'Post' }],
        // wishList: [{ type: ObjectId, ref: 'Post' }],
        suscriptions: [{ type: ObjectId, ref: 'Event' }],
        followers: [{ type: ObjectId, ref: 'User' }],
        following: [{ type: ObjectId, ref: 'User' }],
        img: String,

    },
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    delete user.role;
    delete user.email;
    delete user.confirmed;
    return user;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;