require('dotenv').config()
const mongoose = require('mongoose');

const db = async () => {
    try {
        // await mongoose.createConnection(process.env.MONGO_URI).asPromise();
        // console.log(res)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
};

module.exports = db;