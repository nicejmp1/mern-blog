import { useEffect, useState } from "react";
import moment from "moment";
import 'moment/locale/ko';
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

moment.locale('ko');


export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);


    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdite = () => {
        setIsEditing(true)
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="pb-4">
            <div className="flex flex-col">
                <div className="flex">
                    <div className="before:w-10 h-10 bg-black rounded-full">
                        <img className="w-full h-full" src={user.profilePicture} alt={user.username} />
                    </div>

                    <div className="pl-2 flex items-center justify-center">
                        {user ? `@${user.username}` : "anonymous user"}

                        <span className="block text-xs text-blue-500 pl-2">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                </div>

                {isEditing ? (
                    <>
                        <textarea
                            className="bg-slate-200 mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div>
                            <button onClick={handleSave} className="px-4 mr-1 bg-blue-500 text-white rounded-full hover:bg-red-500">저장</button>
                            <button onClick={() => setIsEditing(false)} className="px-4 bg-red-500 text-white rounded-full">취소</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-4 flex items-center justify-end">
                            <button
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400  hover:text-blue-500 text-xl 
                            ${currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"

                                    }`}>
                                <FaThumbsUp />
                            </button>
                            <p className="pl-2  text-center">
                                {comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button onClick={handleEdite} className="px-2">수정</button>
                                    <button onClick={() => onDelete(comment._id)}>삭제</button>
                                </>
                            )}
                        </div>
                        <div className=" bg-slate-300 rounded-full p-2 mt-2" >{comment.content}</div>
                    </>
                )}
            </div>
        </div>
    );
}