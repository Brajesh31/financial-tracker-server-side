import mongoose from "mongoose";
import userSchema from "./userSchema.js";

const User = mongoose.model("User", userSchema)

// Get list of users
export const getUsers = () => {
    return User.find()
}

export const getUserById = (id) => {
    return User.findById(id)
}

// Get user by filter
export const getUser = (filter) => {
    // filter: {email: "email"}
    // filter: {username: "name"}
    return User.findOne(filter)
}

export const createUser = (userObj) => {
    return User.insertOne(userObj)
}

// Update user
export const updateUser = (id, updateObj) => {
    return User.findByIdAndUpdate(id, updateObj)
}

//Delete user
export const deleteUser = (id) => {
    return User.findByIdAndDelete(id)
}

