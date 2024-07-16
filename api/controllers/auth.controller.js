import User from "../models/user.model.js"
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

// 회원가입
export const signup = async (req, res, next) => {
    // console.log(req.body);

    const { username, email, password, userId } = req.body;

    // 기본 유효성 검사
    if (!username || !email || !password || !userId || username === "" || email === "" || password === "" || userId === ""
    ) {
        // return res.status(400).json({ message: "모든 항목을 채워주세요!" });
        next(errorHandler(400, "모든 항목을 채워주세요!"))
    }

    // 패스워드 암호화
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // 데이터 추가
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        userId
    });

    try {
        await newUser.save();
        res.json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
        res.json({ message: "회원가입이 실패했습니다." + error });
        next(error);
    }
};


// 로그인
export const signin = async (req, res, next) => {
    const { userId, password } = req.body;

    if (!userId || !password || userId === "" || password === "") {
        next(errorHandler(400, "모든 영역을 채워주세요!"));
    }

    try {
        const validUser = await User.findOne({ userId });
        if (!validUser) {
            return next(errorHandler(404, "아이디가 존재하지않습니다."))
        }

        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandler(404, "패스워드가 일치하지않습니다."));
        }

        // 토큰 발행
        const token = jwt.sign(
            {
                id: validUser._id
            },
            process.env.JWT_SECRET
        );

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)

    } catch (error) {
        next(error);
    }
};
