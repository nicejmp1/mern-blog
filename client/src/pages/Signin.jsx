import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData, [id]: value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId || !formData.password) {
            dispatch(signInFailure("모든 영역을 채워주세요!"))
        }

        try {
            dispatch(signInStart());

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                // return setErrorMessage(data.message || "로그인에 실패했습니다.");
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            // setErrorMessage("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            // setLoading(false);
            dispatch(signInFailure(error.message))
        }
    };

    return (
        <section id="login" className="bg-gray-50 min-h-screen flex justify-center items-center">
            <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-4xl font-bold uppercase pb-2 pt-10 text-center">Login</div>
                <p className="text-gray-600 text-center">로그인을 하시면 다양한 서비스를 누리실 수 있습니다.</p>
                <form className="mt-10" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* 아이디 입력 필드 */}
                        <div className="relative">
                            <input
                                type="text"
                                id="userId"
                                placeholder=" "
                                value={formData.userId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 peer"
                            />
                            <label htmlFor="userId" className="absolute left-4 top-0 text-gray-500 text-xs transition-all duration-200 ease-in-out peer-focus:top-[-12px] peer-placeholder-shown:top-1/3">아이디</label>
                        </div>
                        {/* 비밀번호 입력 필드 */}
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder=" "
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 peer"
                            />
                            <label htmlFor="password" className="absolute left-4 top-0 text-gray-500 text-xs transition-all duration-200 ease-in-out peer-focus:top-[-12px] peer-placeholder-shown:top-1/3">패스워드</label>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button className="flex items-center text-slate-400 hover:text-slate-500">
                            <FaRegCheckCircle className="text-lg" /><span className="pl-1 text-sm">아이디 저장</span>
                        </button>
                        <div className="text-sm">
                            <Link to={'/'} className="pr-2 hover:text-blue-500">아이디 찾기</Link>
                            <Link to={'/'} className="pl-2 hover:text-blue-500">비밀번호 찾기</Link>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 mt-6 border-2 border-gray-300 rounded-md text-xl font-medium hover:bg-blue-500 hover:text-white transition-colors">
                        {loading ? "로딩 중..." : "로그인"}
                    </button>
                    {errorMessage && (
                        <div className="mt-5 p-2 text-red-500 bg-red-200 text-center">
                            {errorMessage}
                        </div>
                    )}
                    <div className="text-center mt-4">
                        <span className="text-sm">아직 회원이 아니신가요?? </span>
                        <Link to={'/signup'} className="underline hover:text-blue-500">회원가입</Link>
                    </div>
                </form>
                <div className="pt-4 border-t-2 mt-6 mb-10">
                    <span className="block text-sm text-center mb-4">간편 로그인</span>
                    <OAuth />
                </div>
            </div>
        </section>
    )
}
