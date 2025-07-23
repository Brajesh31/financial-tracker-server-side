import mongoose from "mongoose"
import { deleteTransaction, deleteTransactionsByUserId, getTransactionsByUserId, insertTransaction } from "../models/transactions/transactionModel.js"

export const createTransaction = async (req, res) => {
    try {
        let transactionObject = req.body;

        // Adding user id to transactionObject
        transactionObject.userId = req.user._id

        // Creating new transaction
        let newTransaction = await insertTransaction(transactionObject)

        return res.status(201).json({
            status: true,
            message: "Transaction created",
            transaction: newTransaction
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const getTransactions = async (req, res) => {
    try {
        let userId = req.user._id
        let transactions = await getTransactionsByUserId(userId)

        return res.status(200).json({
            status: true,
            message: "Fetching transactions successful!",
            transactions
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Failed to fetch transactions"
        })
    }
}

// Delete single transaction
export const removeTransaction = async (req, res) => {
    try {
        console.log(req.params)
        let transactionId = req.params.id
        let userId = req.user._id

        const deletedTransaction = await deleteTransaction(transactionId, userId)

        if (deletedTransaction) {
            return res.status(200).json({
                status: true,
                message: "Transaction deleted successfully!"
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "Transaction not found or already deleted."
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: "Server error while deleting transaction."
        })
    }
}

// Delete multiple transactions
export const removeMultipleTransactions = async (req, res) => {
    try {
        let { ids } = req.body
        console.log(req.body)
        console.log(req.user)

        let userId = req.user._id
        let finalResult = await deleteTransactionsByUserId(ids, userId)

        return res.status(200).json({
            status: true,
            message: "Transactions deleted successfully!",
            finalResult
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: "Server error while deleting multiple transactions."
        })
    }
}