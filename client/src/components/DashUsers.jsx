import { useEffect, useState } from "react"
import { FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux"

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setuserIdToDelete] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                console.log(data)

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUsers();
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 3) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE",
            })
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
                setShowModal(false);
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <table className="w-full">
                        <caption className="mb-5 text-3xl mt-7">Blog Users</caption>
                        <thead>
                            <tr>
                                <th className="p-2 border bg-slate-300">data Created</th>

                                <th className="p-2 border bg-slate-300">User image</th>
                                <th className="p-2 border bg-slate-300">User Id</th>
                                <th className="p-2 border bg-slate-300">username</th>
                                <th className="p-2 border bg-slate-300">useremail</th>
                                <th className="p-2 border bg-slate-300">Admin</th>
                                <th className="p-2 border bg-slate-300">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition-all">
                                    <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 border">
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className="object-cover w-10 h-10 m-auto rounded-full bg-black" />
                                    </td>
                                    <td className="p-2 border text-center">
                                        {user.userId}
                                    </td>
                                    <td className="p-2 border text-center">
                                        {user.username}
                                    </td>
                                    <td className="p-2 border text-center">{user.email}</td>
                                    <td className="p-2 border ">
                                        {user.isAdmin ? (
                                            <FaCheck className="text-green-500 mx-auto" />
                                        ) : (
                                            <FaTimes className="text-red-500 mx-auto" />
                                        )}
                                    </td>
                                    <td className="p-2 border uppercase hover:underline underline-offset-4 text-red-500 text-center">
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setuserIdToDelete(user._id);
                                            }}>
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showMore && (
                        <button onClick={handleShowMore} className="w-full text-sm text-teal-800 border hover:bg-gray-100 mt-5 p-3 transition-all">더보기</button>

                    )}
                </>
            ) : (
                <p>아직 회원이 없습니다.!</p>
            )}

            {showModal && (
                <div className="w-full h-full bg-black bg-opacity-35 absolute top-0 left-0">
                    <div className="w-1/3 h-1/3 bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <h3 className="">게시글을 삭제 하시겠습니까?</h3>
                        <button className="bg-red-500 px-4 text-white" onClick={handleDeleteUser}>네</button>
                        <button className="bg-blue-500 px-4 text-white" onClick={() => setShowModal(false)}>아니요</button>
                    </div>
                </div>
            )}
        </div>
    )
}
