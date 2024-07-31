import DashSidebar from "../components/DashSidebar.jsx"
import DashProfile from "../components/DashProfile.jsx"


export default function Dashboard() {

    return (
        <div className="container">
            <div className="min-h-screen border-r w-60">
                <DashSidebar />
            </div>
            <div className="mx-auto">
                <DashProfile />
            </div>

        </div>
    )
}
