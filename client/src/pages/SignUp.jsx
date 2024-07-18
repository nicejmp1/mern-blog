import { useState } from "react";
import { FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        passwordC: '',
        username: '',
        email: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
        userId: { message: '', icon: null },
        password: { message: '', icon: null },
        passwordC: { message: '', icon: null },
        username: { message: '', icon: null },
        email: { message: '', icon: null }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData, [id]: value.trim()
        });

        // 실시간 유효성 검사
        validateField(id, value.trim());
    };

    const validateField = (field, value) => {
        let message = '';
        let icon = null;
        if (field === 'userId') {
            if (!value) {
                message = '아이디를 입력해주세요!';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else {
                message = '사용 가능한 아이디 입니다.';
                icon = <FaRegCheckCircle className="mr-2 text-green-600" />;
            }
        }
        if (field === 'password') {
            if (!value) {
                message = '비밀번호를 입력해주세요!';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else if (value.length < 4 || value.length > 12) {
                message = '비밀번호는 4자에서 12자 사이여야 합니다.';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else {
                message = '대소문자, 영어, 숫자 포함 4~12자 내외로 작성바랍니다.';
                icon = <FaRegCheckCircle className="mr-2 text-green-600" />;
            }
        }
        if (field === 'passwordC') {
            if (value !== formData.password) {
                message = '비밀번호가 맞지 않습니다.';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else {
                message = '비밀번호가 일치합니다.';
                icon = <FaRegCheckCircle className="mr-2 text-green-600" />;
            }
        }
        if (field === 'username') {
            const koreanPattern = /^[가-힣]+$/;
            if (!value) {
                message = '이름을 입력해주세요!';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else if (!koreanPattern.test(value)) {
                message = '이름은 한글로만 입력해주세요.';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else {
                message = '사용 가능한 이름입니다.';
                icon = <FaRegCheckCircle className="mr-2 text-green-600" />;
            }
        }
        if (field === 'email') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                message = '올바른 이메일 주소를 입력해주세요.';
                icon = <FaTimesCircle className="mr-2 text-red-600" />;
            } else {
                message = '사용 가능한 이메일입니다.';
                icon = <FaRegCheckCircle className="mr-2 text-green-600" />;
            }
        }
        setValidationMessages(prevState => ({ ...prevState, [field]: { message, icon } }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.userId || !formData.username || !formData.email || !formData.password || !formData.passwordC) {
            return setErrorMessage("모든 영역을 채워주세요!");
        }

        if (formData.password !== formData.passwordC) {
            return setErrorMessage("비밀번호가 일치하지 않습니다.");
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            return setErrorMessage("올바른 이메일 주소를 입력해주세요.");
        }

        if (formData.password.length < 4 || formData.password.length > 12) {
            return setErrorMessage("비밀번호는 4자에서 12자 사이여야 합니다.");
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            setLoading(false);

            if (!res.ok) {
                return setErrorMessage(data.message || "회원가입에 실패했습니다.");
            }

            navigate("/signin");

        } catch (error) {
            setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            setLoading(false);
        }
    };

    return (
        <section className="max-w-4xl m-auto">
            <div>
                <div className="sign__title">
                    <h1 className="pb-2 uppercase font-bold text-4xl pt-10">회원가입</h1>
                </div>
                <div className="pt-4 mt-6 mb-10">
                    <span className="block text-sm text-center mb-4">SNS로 가입하기</span>
                    <OAuth />
                </div>
                <div className="mt-20 border-t-2 p-4 border-zinc-700">

                    <form action="" className="pt-10 pb-10" onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="blind">회원가입 영역</legend>
                            <div className="flex w-full">
                                <label htmlFor="userId" className="w-3/12 h-12 flex items-center">아이디 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input
                                        type="text"
                                        placeholder="아이디를 입력해주세요!"
                                        id="userId"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                        onChange={handleChange}
                                    />
                                    <span className="msg">{validationMessages.userId.icon}{validationMessages.userId.message}</span>
                                </div>
                            </div>
                            {/* //ID */}

                            <div className="flex w-full mt-6">
                                <label htmlFor="password" className="w-3/12 h-12 flex items-center">비밀번호 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요!"
                                        id="password"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                        onChange={handleChange}
                                    />
                                    <span className="msg">{validationMessages.password.icon}{validationMessages.password.message}</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6">
                                <label htmlFor="passwordC" className="w-3/12 h-12 flex items-center">비밀번호 확인 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input
                                        type="password"
                                        placeholder="비밀번호를 한번 더 입력해주세요!"
                                        id="passwordC"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                        onChange={handleChange}
                                    />
                                    <span className="msg">{validationMessages.passwordC.icon}{validationMessages.passwordC.message}</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6">
                                <label htmlFor="username" className="w-3/12 h-12 flex items-center">이름 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input
                                        type="text"
                                        placeholder="이름을 입력해주세요!"
                                        id="username"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                        onChange={handleChange}
                                    />
                                    <span className="msg">{validationMessages.username.icon}{validationMessages.username.message}</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6 mb-14">
                                <label htmlFor="email" className="w-3/12 h-12 flex items-center">이메일 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input
                                        type="email"
                                        placeholder="이메일을 입력해주세요!"
                                        id="email"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                        onChange={handleChange}
                                    />
                                    <span className="msg">{validationMessages.email.icon}{validationMessages.email.message}</span>
                                </div>
                            </div>
                        </fieldset>

                        <div className="border-t-2 border-zinc-700 pt-4 flex border-b pb-10">
                            <span>이용약관동의 <em className="text-red-600">*</em></span>
                            <div className="flex items-center">
                                <ul className="pl-32">
                                    <li>
                                        <button type="button" className="flex text-left">
                                            <FaRegCheckCircle className="mr-2 text-3xl text-zinc-400" />
                                            <span className="text-2xl font-bold">전체 동의합니다. <br />
                                                <strong className="text-zinc-400 font-normal text-base">선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</strong>
                                            </span>
                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button type="button" className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>이용약관 동의 <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button type="button" className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>개인정보 수집 및 이용 동의 <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button type="button" className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>본인은 만 14세 이상입니다. <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center justify-center mt-20 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-52 h-12 m-auto rounded-sm">
                            <button type="submit" className="text-lg text-white" disabled={loading}>
                                {loading ? (
                                    <span className="p-2">Loading...</span>
                                ) : (
                                    "가입하기"
                                )}
                            </button>
                        </div>

                        {errorMessage && (
                            <div className="mt-5 p-2 text-red-500 bg-red-200 text-center">
                                {errorMessage}
                            </div>
                        )}



                        <div className="text-center mt-12">
                            <span className="text-lg">계정이 있으신가요? <Link className="text-blue-400 underline underline-offset-2" to={"/signin"}>로그인</Link> 하러가기</span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
