import { Link } from "react-router-dom"
import { MdOutlineMenu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";

export default function Header() {
    return (
        <header id="header" className="flex justify-between max-w-7xl mx-auto items-center py-6 px-4 border-b">
            <h1>
                <Link to={"/"}>
                    logo
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
                <div id="util" className="flex gap-4 pr-5 items-center">
                    <button className="text-xl cursor-pointer"><MdOutlineMenu /></button> 
                    <button className="text-xl cursor-pointer"><MdOutlineDarkMode /></button>
                    <button className="text-xl cursor-pointer"><IoSearch /></button>
                </div>
                <Link to={"/signin"}>Login</Link>
            </div>
        </header>
    )
}
