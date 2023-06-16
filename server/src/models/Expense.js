import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    eamount: { type: Number, required: true},
    edescription: { type: String, required: true},
    userOwner:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
});

export const ExpenseModel = mongoose.model("expenses", ExpenseSchema);