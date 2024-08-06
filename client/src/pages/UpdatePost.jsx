
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json();

                console.log(data)

                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }

                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }

            };
            fetchPost();
        } catch (error) {
            console.log(error)
        }
    }, [postId]);

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError("이미지를 넣어주세요");
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                    console.log(progress)
                }, (error) => {
                    setImageUploadError("이미지는 1메가를 초과할 수 없습니다.");
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );

        } catch (error) {
            console.log(error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError("문제가 발생하였습니다. 관리자에게 문의하세요");
        }
    }


    return (
        <div className="max-w-3xl min-h-screen mx-auto border-2 p-4 mt-20">
            <h1 className="text-3xl text-center my-7">Update Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="flex justify-end mb-2 h-10">
                        <select className="border-2" onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            value={formData.category}>
                            <option value="uncateorized">카테고리를 선택하세요!</option>
                            <option value="javascript">javascript</option>
                            <option value="react.js">react.js</option>
                            <option value="next.js">next.js</option>
                        </select>
                    </div>
                    <input type="text" placeholder="타이틀을 작성하세요!" required
                        className="w-full border-2 h-12 placeholder:pl-2 mb-4"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        value={formData.title}
                    />

                </div>
                <div>
                    <div className="flex flex-col">
                        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                        <button type="button" className="h-14 w-full" onClick={handleUploadImage} disabled={imageUploadProgress}>
                            {imageUploadProgress ? (
                                <div className="w-16 h-16"> {`${imageUploadProgress || 0}%`}</div>
                            ) : (
                                "이미지 업로드"
                            )}
                        </button>
                        {imageUploadError && <div className="p-2 bg-red-300">{imageUploadError}</div>}
                        {formData.image && <img src={formData.image} alt="upload" className="object-cover w-full h-full border-2 mb-10" />}

                    </div>
                    <ReactQuill theme="snow" placeholder="내용을 적어주세요!" required
                        className="h-96"
                        onChange={(value) => setFormData({ ...formData, content: value })}
                        value={formData.content}
                    />
                    <div className="mt-14 justify-end flex">
                        <button type="submit" className=" w-40 h-10 rounded-md bg-yellow-400 text">수정하기</button>
                        {publishError && <div className="mt-5">
                            {publishError}
                        </div>}
                    </div>
                </div>
            </form>
        </div>
    )
}
