import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPosts();
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;

        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 3) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: "DELETE",
            })
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message)
            }
            else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative">
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <table className="w-full">
                        <caption className="mb-5 text-3xl mt-7">Data</caption>
                        <thead>
                            <tr>
                                <th className="p-2 border bg-slate-300">Date Updated</th>
                                <th className="p-2 border bg-slate-300">post image</th>
                                <th className="p-2 border bg-slate-300">post title</th>
                                <th className="p-2 border bg-slate-300">category</th>
                                <th className="p-2 border bg-slate-300">delete</th>
                                <th className="p-2 border bg-slate-300">edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPosts.map((post, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition-all">
                                    <td className="p-2 border">{new Date(post.updatedAt).toLocaleDateString()}</td>
                                    <td className="p-2 border">
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-32 h-20" />
                                        </Link>
                                    </td>
                                    <td className="p-2 border">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link></td>
                                    <td className="p-2 border">{post.category}</td>
                                    <td className="p-2 border">
                                        <button className="uppercase text-red-600 hover:underline underline-offset-4 " onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }}>delete</button>
                                    </td>
                                    <td className="p-2 border uppercase hover:underline underline-offset-4 text-green-500 text-center">
                                        <Link to={`/update-post/${post._id}`}>edit</Link>
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
                <p>아직 글이 없습니다.!</p>
            )}

            {showModal && (
                <div className="w-full h-full bg-black bg-opacity-35 absolute top-0 left-0">
                    <div className="w-1/3 h-1/3 bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <h3 className="">게시글을 삭제 하시겠습니까?</h3>
                        <button className="bg-red-500 px-4 text-white" onClick={handleDeletePost}>네</button>
                        <button className="bg-blue-500 px-4 text-white" onClick={() => setShowModal(false)}>아니요</button>
                    </div>
                </div>
            )}
        </div>
    )
}
