import mongoose from "mongoose";
import { transactionSchema } from "./transactionSchema.js";

export const Transaction = mongoose.model("Transaction", transactionSchema)

// Get transactions
export const getTransactionsByUserId = (userId) => {
    return Transaction.find({ userId: userId })
}

// Create transactions
export const insertTransaction = (transactionObj) => {
    return Transaction.insertOne(transactionObj)
}

// Delete transaction
export const deleteTransaction = (id, userId) => {
    return Transaction.findOneAndDelete({ _id: id, userId: userId })
}

// Delete multiple transactions
// ['1','2','3']
export const deleteTransactionsByUserId = (idsToDelete, userId) => {
    return Transaction.deleteMany({
        _id: { $in: idsToDelete },
        userId: userId
    })
}