const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    // The user's email address; must be a valid string and is required for registration and authentication.
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose); //adds username, hash and salt fields

module.exports = mongoose.model("User", userSchema);