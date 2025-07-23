import mongoose from "mongoose";

const mongoConnection = () => {
    const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/ft-db"
    return mongoose.connect(mongoUrl)
}

export default mongoConnection