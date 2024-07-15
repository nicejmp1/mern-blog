import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("MongoDB connect success")
}).catch((err) => {
    console.log(err);
})

const app = express();

app.listen(3000, () => {
    console.log("Port 3000 and Server Action")
})