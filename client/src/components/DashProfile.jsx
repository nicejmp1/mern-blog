import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);

    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({});

    // console.log(imageFileUploadProgress, imageFileUploadError);

    const filePickerRef = useRef();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    // console.log(imageFile, imageFileUrl)

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {

        // 파이어베이스 설정
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        // console.log("uploading Image...");
        setImageFileUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            }, (error) => {
                setImageFileUploadError("이미지는 1메가를 초과할 수 없습니다.");
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.id]: e.target.value }));
    };

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);


        if (Object.keys(formData).length === 0) {
            setUpdateUserError("변경된 부분이 없습니다.");
            return;
        }

        if (imageFileUploading) {
            setUpdateUserError("이미지 업로드 중 입니다.");
            return;
        }

        try {
            dispatch(updateStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            dispatch(updateSuccess(data));
            setUpdateUserSuccess("프로필 업데이트가 성공했습니다.")
        } catch (error) {
            console.log(error);
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message)
        }
    };

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
                alert("계정이 성공적으로 삭제되었습니다.");
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST",
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
                alert("로그아웃 되었습니다.");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="max-w-lg flex flex-col">
                <h1 className="w-full p-10 text-6xl text-center uppercase font-ibm">Profile</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset className="flex flex-col">
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                        <div
                            className="flex justify-center items-center flex-col "
                            onClick={() => filePickerRef.current.click()}
                        >
                            <CircularProgressbarWithChildren className="w-36 h-36" value={imageFileUploadProgress}>
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                                <img
                                    className="w-32 h-32 rounded-full cursor-pointer"
                                    src={imageFileUrl || currentUser.profilePicture}
                                    alt="user"
                                />
                            </CircularProgressbarWithChildren>
                        </div>
                        <input
                            type="text"
                            id="username"
                            placeholder="이름"
                            className="p-5 px-10 mt-5 border rounded-full text-slate-600 w-full"
                            defaultValue={currentUser.username}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="email"
                            placeholder="이메일"
                            className="p-5 px-10 mt-5 border rounded-full text-slate-600 w-full"
                            defaultValue={currentUser.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            className="p-5 px-10 mt-5 border rounded-full text-slate-600 w-full"
                            defaultValue="********"
                            onChange={handleChange}
                        />

                        {imageFileUploadError && (
                            <div className="bg-red-200 p-5 px-10 mt-5 rounded-full text-center text-red-700">
                                {imageFileUploadError}
                            </div>
                        )}

                        {updateUserSuccess && (
                            <div className="bg-red-200 p-5 px-10 mt-5 rounded-full text-center text-red-700">
                                {updateUserSuccess}
                            </div>
                        )}

                        {updateUserError && (
                            <div className="bg-red-200 p-5 px-10 mt-5 rounded-full text-center text-red-700">
                                {updateUserError}
                            </div>
                        )}

                        <button type="submit" className="p-5 px-10 mt-5 text-white rounded-full bg-amber-500 w-full">
                            수정하기
                        </button>

                        {currentUser.isAdmin && (
                            <Link to={"/create-post"}>
                                <button
                                    type="button"
                                    className="p-5 px-10 mt-5 text-white rounded-full bg-red-500 w-full"
                                >
                                    글쓰기
                                </button>
                            </Link>
                        )}

                        <div className="mt-4 text-red-500 flex justify-between">
                            <span className="cursor-pointer hover:underline underline-offset-4 hover:text-orange-400" onClick={() => setShowModal(true)}>계정삭제</span>
                            <span className="cursor-pointer hover:underline underline-offset-4 hover:text-orange-400" onClick={handleSignout}>로그아웃</span>
                        </div>
                    </fieldset>
                </form>
            </div>

            {showModal && (
                <div className="modal-wrap">
                    <div className="modal ">
                        <h3>계정을 정말 삭제하시겠습니까?</h3>
                        <button onClick={handleDeleteUser}>예</button>
                        <button onClick={() => setShowModal(false)}>아니요.</button>
                    </div>
                </div>
            )}

        </>



    );
}