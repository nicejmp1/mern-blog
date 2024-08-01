import { Link } from "react-router-dom"
import { MdOutlineMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaSun } from "react-icons/fa"
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice"
import { useState } from "react";

export default function Header() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <header id="header" className="flex justify-between max-w-screen-2xl mx-auto items-center py-4 px-4 border-b font-ibm font-medium">
            <h1>
                <Link to={"/"}>
                    My Blog
                </Link>
            </h1>
            <nav>
                <ul className="flex gap-10">
                    <li>
                        <Link to={"/"}>홈</Link>
                    </li>
                    <li>
                        <Link to={"/"}>메뉴1</Link>
                    </li>
                    <li>
                        <Link to={"/"}>메뉴2</Link>
                    </li>
                    <li>
                        <Link to={"/"}>메뉴3</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center justify-center">
                <div id="util" className="flex gap-2 pr-5 items-center relative">
                    <button className="text-xl cursor-pointer"><MdOutlineMenu /></button>

                    <button
                        className="text-xl cursor-pointer"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === "light" ? <FaSun /> : <MdOutlineDarkMode />}
                    </button>

                    <button className="text-xl cursor-pointer"><IoSearch /></button>
                </div>
                {currentUser ? (
                    <>
                        <img
                            className="w-10 rounded-full h-10 cursor-pointer"
                            src={currentUser.profilePicture}
                            onClick={toggleDropdown}
                        />
                        {isDropdownVisible && (
                            <div className="absolute flex flex-col p-4 border top-20 w-60">
                                <span>{currentUser.username}</span>
                                <span>{currentUser.email}</span>
                                <Link to={'/dashboard?tab=profile'}>profile</Link>
                                <button className="text-left">Logout</button>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to={"/signin"}>Login</Link>
                )}
            </div>
        </header>
    )
}
