import DashSidebar from "../components/DashSidebar.jsx"
import DashProfile from "../components/DashProfile.jsx"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashPosts from "../components/DashPosts.jsx";
import DashUsers from "../components/DashUsers.jsx";
import DashComments from "../components/DashComments.jsx";

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        // console.log(tabFromUrl);
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className="container">
            <div className="min-h-screen border-r w-60">
                <DashSidebar />
            </div>
            <div className="mx-auto">
                {tab === "profile" && <DashProfile />}
                {tab === "posts" && <DashPosts />}
                {tab === "users" && <DashUsers />}
                {tab === "comments" && <DashComments />}
            </div>

        </div>
    )
}
