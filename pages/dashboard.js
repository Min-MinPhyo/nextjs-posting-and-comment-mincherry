import { auth, db } from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "@/components/message";
import { BsTrash2Fill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import Link from "next/link";
import { toast } from "react-toastify";
export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth)
    const [posts, setPosts] = useState([])

    console.log(user)

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push('/auth/login');

        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid))

        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }));

        return unsubscribe;





    }


    //Delete post
    const deletePost=async (id)=>{
        const docRef=doc(db,'posts',id)

        await deleteDoc(docRef)
        toast.success('Delete post successfullt',{
            position:toast.POSITION.TOP_CENTER,
            autoClose:1500
        })
    }


    useEffect(() => {
        getData()
    }, [user, loading])





    return (
        <div>
            <h1>Your Post</h1>
            <div>{
                posts.map((post) => {
                    return (
                        <Message {...post} key={post.id}>
                            <div className="flex gap-4">


                                <button onClick={()=>deletePost(post.id)} className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm">
                                    <BsTrash2Fill className="text-2xl"/>Delete
                                </button>


                                <Link href={{ pathname:"/post",query:post }}>
                                <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                                    <AiFillEdit className="text-2xl" />Edit
                                </button>
                                </Link>



                              
                            </div>
                        </Message>
                    )
                })
            }</div>
            <button className="bg-gray-800 py-2 px-4 font-medium text-white mt-5 mb-10" onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}