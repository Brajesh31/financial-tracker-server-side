import jwt from "jsonwebtoken"
import { getUser } from "../models/users/userModel.js"

export const auth = async (req, res, next) => {
    try {
        let accessToken = req.headers.authorization

        let decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        console.log("DECODED VALUE: ", decoded)

        let user = await getUser({ email: decoded.email })

        if (user) {
            req.user = user
            next()
        } else {
            return res.status(401).json({
                status: false,
                message: "Unauthorized!"
            })
        }
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized!"
        })
    }
}