import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    place: { type: String, required: true},
    phoneno: { type: Number, required: true},
    age: { type:Number, required: true},
    education: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},


    // savedRecipies: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipies"}],
});

export const UserModel = mongoose.model("users", UserSchema);