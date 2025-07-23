import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
)