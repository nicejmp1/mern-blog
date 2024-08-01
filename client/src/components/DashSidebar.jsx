import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineProfile } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import { useSelector } from "react-redux"

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState("");

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        // console.log(tabFromUrl);

        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div>
            <ul className="flex flex-col gap-3 p-3">
                <li className={`profile ${tab === "profile" ? "text-red-500" : ""}`}>
                    <Link to="/dashboard?tab=profile" className="flex items-center gap-1">
                        <AiOutlineProfile className="text-xl" />
                        <span className="pl-1">Profile</span>
                    </Link>
                </li>
                {currentUser.isAdmin && (
                    <li className="">
                        <Link to={'/dashboard?tab=users'} className="flex items-center gap-1">
                            <FaUserCircle className="text-xl" />
                            <span className="pl-1">users</span>
                        </Link>
                    </li>
                )}

                {currentUser.isAdmin && (
                    <li className="">
                        <Link to={'/dashboard?tab=posts'} className="flex items-center gap-1">
                            <FaClipboardList className="text-xl" />
                            <span className="pl-1">posts</span>
                        </Link>
                    </li>
                )}


                <li className="">
                    <Link to={'/dashboard?tab=comments'} className="flex items-center gap-1">
                        <IoChatboxEllipses className="text-xl " />
                        <span className="pl-1">comments</span>
                    </Link>
                </li>
                <li className="">
                    <Link to={'/'} className="flex items-center gap-1">
                        <IoIosLogOut className="text-xl" />
                        <span className="pl-1">signout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}