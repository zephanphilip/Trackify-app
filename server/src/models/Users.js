const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    place: { type: String, required: true},
    phoneno: { type: Number, required: true},
    age: { type:Number, required: true},
    education: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    block: { type: Boolean, required: true, default: false},
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
