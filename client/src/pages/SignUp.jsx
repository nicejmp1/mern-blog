import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

export default function SignUp() {
    return (
        <section className="max-w-4xl m-auto">
            <div>
                <div className="sign__title">
                    <h1 className="pb-2s uppercase font-bold text-4xl pt-10 ">회원가입</h1>
                </div>
                <div className="mt-20 border-t-2 p-4  border-zinc-700">
                    <form action="" className="pt-10 pb-10">
                        <fieldset>
                            <legend className="blind">회원가입 영역</legend>
                            <div className="flex w-full">
                                <label htmlFor="youId" className="w-3/12 h-12 flex items-center">아이디 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input type="text"
                                        placeholder="아이디를 입력해주세요!"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2
                                        "
                                    />
                                    <span className="msg"><FaRegArrowAltCircleRight className="mr-2" />사용 가능한 아이디 입니다.</span>
                                </div>
                            </div>
                            {/* //ID */}

                            <div className="flex w-full mt-6">
                                <label htmlFor="youId" className="w-3/12 h-12 flex items-center">비밀번호 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input type="password"
                                        placeholder="비밀번호를 입력해주세요!"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                    />
                                    <span className="msg"><FaRegArrowAltCircleRight className="mr-2"/>대소문자,영어,숫자 포함 4~12자 내외로 작성바랍니다.</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6">
                                <label htmlFor="youId" className="w-3/12 h-12 flex items-center">비밀번호확인 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input type="password"
                                        placeholder="비밀번호를 한번 더 입력해주세요!"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                    />
                                    <span className="msg"><FaRegArrowAltCircleRight className="mr-2" />비밀번호가 맞지 않습니다.</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6">
                                <label htmlFor="youId" className="w-3/12 h-12 flex items-center">이름 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input type="text"
                                        placeholder="이름을 입력해주세요!"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                    />
                                    <span className="msg"><FaRegArrowAltCircleRight className="mr-2"/>이름이 맞지 않습니다.</span>
                                </div>
                            </div>

                            <div className="flex w-full mt-6 mb-14">
                                <label htmlFor="youId" className="w-3/12 h-12 flex items-center">이메일 <em className="text-red-600">*</em></label>
                                <div className="w-9/12">
                                    <input type="email"
                                        placeholder="이메일을 입력해주세요!"
                                        className="input_outline w-full border-2 h-12 pl-2 outline-none rounded-md mb-2"
                                    />
                                    <span className="msg"><FaRegArrowAltCircleRight className="mr-2"/>이메일이 일치하지 않습니다.</span>
                                </div>
                            </div>
                         
                        </fieldset>

                        <div className="border-t-2 border-zinc-700 pt-4 flex border-b pb-10">
                            <span>이용약관동의 <em className="text-red-600">*</em></span>
                            <div className="flex items-center">
                                <ul className="pl-32">
                                    <li>
                                        <button className="flex text-left ">
                                            <FaRegCheckCircle className="mr-2 text-3xl text-zinc-400" />
                                            <span className="text-2xl font-bold ">전체 동의합니다. <br />
                                                <strong className="text-zinc-400 font-normal text-base">선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</strong>
                                            </span>

                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>이용약관 동의 <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>개인정보 수집 및 이용 동의 <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                    <li className="pt-4">
                                        <button className="flex items-center">
                                            <FaRegCheckCircle className="mr-2 text-2xl text-zinc-400" />
                                            <span>본인은 만 14세 이상입니다.  <em className="not-italic text-zinc-400">(필수)</em></span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-20 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-52 h-12 m-auto rounded-sm">
                            <button className="text-lg text-white">가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
