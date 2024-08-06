import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                console.log(data)

                if (!res.ok) {
                    setPost(true);
                    setLoading(false);
                    return;
                }

                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    return (
        <main className="max-w-2xl mx-auto h-screen  mt-10">
            <div className="mt-10">
                <h1 className="text-center text-4xl mb-10">{post && post.title}</h1>
                <div className="time text-right pb-4">
                    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="p-4">
                    <img src={post && post.image} alt=""
                        className="w-full h-full bg-cover rounded-2xl"
                    />
                </div>

                <div dangerouslySetInnerHTML={{ __html: post && post.content }}
                    className="mt-2 h-96 border p-4 m-4 rounded-2xl"
                ></div>
            </div>

        </main>
    )
}
