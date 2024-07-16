import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


export default function SignIn() {
    return (
        <section id="login" className="sign">
                <div className="sign__info">
                    <div className="sign__title">
                        <h1 className="pb-2s uppercase font-bold text-4xl   pt-10">Login</h1>
                        <p>로그인을 하시면 다양한 서비스를 누리실 수 있습니다.</p>
                    </div>
                    <form>
                        <fieldset>
                            <legend className='blind'>로그인 영역</legend>
                            <div className="flex flex-col justify-center items-center   pt-12">
                                <label htmlFor="youId" className="blind"></label>
                                <input type="text"
                                    placeholder="아이디"
                                    className="input_box"
                                />
                                <input type="password"
                                        placeholder="패스워드"
                                         className="input_box mt-2"
                                />
                  
                            </div>
                            <div className="flex pt-4 justify-between items-center">
                                <button className="text-lg text-slate-400 flex   items-center justify-center"><FaRegCheckCircle />
                                    <span className="pl-1 text-sm text-black">아이디 저장</span>
                                </button>

                                <div className="flex text-sm ">
                                    <Link to={'/'} className="pr-2">아이디 찾기</   Link>
                                    <Link to={'/'} className="pl-2">비밀번호    찾기</Link>
                                </div>

                            </div>
                            <div>
                                <button className="w-full text-xl h-12 border-2 mt-10   rounded-md font-ibm">로그인</button>
                            </div>
                            <div className="flex items-center justify-center mt-4">
                            <span className="mr-4">아직 회원이 아니신가요??</   span><Link to={'/signup'}  className="underline-offset-4 underline">회원가입</  Link>
                            </div>

                            <div 
                            className="mt-6 border-t-2 pt-4 flex flex-col       items-center  mb-10">
                                    <span className="mb-4 text-sm">간편 로그인</span>

                                <div className="flex">
                                    <button 
                                        className="btn_icon bg-green-600        text-white" >
                                    <SiNaver /></button>
                                    <button 
                                    className="btn_icon bg-yellow-300 text-2xl          text-black"><RiKakaoTalkFill /></button>
                                    <button className="btn_icon bg-slate-200            text-2xl"><FcGoogle /></button>
                                    <button className="btn_icon bg-black        text-white     text-xl"><FaApple /></button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
        </section>
    )
}
