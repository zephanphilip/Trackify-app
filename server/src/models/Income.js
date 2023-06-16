import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    iamount: { type: Number, required: true},
    idescription: { type: String, required: true},
    userOwner:{type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
});

export const IncomeModel = mongoose.model("incomes", IncomeSchema);