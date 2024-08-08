import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import commentRoutes from "./routes/comment.route.js"
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("MongoDB 연결이 되었습니다.")
}).catch((err) => {
    console.log(err);
})

const __dirname = path.resolve();


app.listen(3000, () => {
    console.log("포트 3000에서 서버가 작동되고 있습니다.")
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//에러
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "서버 에러 발생! 관리자에게 문의하세요!";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
