import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createUser, getUser } from "../models/users/userModel.js"

export const registerUser = async (req, res) => {
    try {
        // Register user logic
        // {username, email, password}
        let userObject = req.body // username, email and password

        // Encrypt the password
        let salt = bcrypt.genSaltSync(10)
        userObject.password = bcrypt.hashSync(userObject.password, parseInt(process.env.SALT))

        let newUser = await createUser(userObject)

        return res.status(201).json({
            status: true,
            message: "User created successfully!"
        })
    } catch (err) {
        console.log(err.message)
        if (err.message.includes("E11000")) {
            return res.status(400).json({
                status: false,
                message: "Email already exits!"
            })
        } else {
            return res.status(500).json({
                status: false,
                message: "SERVER ERROR"
            })
        }
    }
}

export const loginUser = async (req, res) => {
    try {
        // Fetching from payload
        // let email = req.body.email
        // let password = req.body.password

        let { email, password } = req.body

        // Fetching user from database
        let user = await getUser({ email: email })

        if (user) {
            // Compare password with user.password            
            let passwordMatch = bcrypt.compareSync(password, user.password)
            if (passwordMatch) {
                user.password = ""

                let payload = {
                    email: user.email
                }
                let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRESIN
                })

                return res.status(200).json({
                    status: true,
                    message: "Login Successful!",
                    user,
                    accessToken
                })
            } else {
                res.status(401).json({
                    status: false,
                    message: "User not authenticated!"
                })
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "User not found!"
            })
        }

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            status: false,
            message: "SERVER ERROR"
        })
    }
}
