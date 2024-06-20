import Message from "@/components/message"
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import {auth,db} from '../utils/firebase'
import {toast} from 'react-toastify'
import { userAgent } from "next/server"
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore"
export default function Details(){

    const router=useRouter()
    const routeData=router.query
    const [message,setMessage]=useState('')
    const [allMessage,setAllMesage]=useState([])

    //Submit comment
    const submitMessage=async()=>{
        //check if the user is logged
        if(!auth.currentUser) return router.push('/auth/login')

        if(!message){
            toast.error('Dont leave an empty message!',{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500,
            });
           return;

        }

        const docRef=doc(db,'posts',routeData.id)
        await updateDoc(docRef,{
            comments:arrayUnion({
                message,
                avator:auth.currentUser.photoURL,
                username:auth.currentUser.displayName,
                time:Timestamp.now()
            }),

        });
        setMessage("");

    }

    //Get all comments
    const getComments=async()=>{
        const docRef=doc(db,'posts',routeData.id)
        const unsubscribe=onSnapshot(docRef,(snapshot)=>{
            setAllMesage(snapshot.data().comments)
        });
        return unsubscribe;
        // const docRef=doc(db,'posts',routeData.id)
        // const unsubscribe=onSnapshot(docRef,(snapshot){
        //     const docSnap=await getDoc(docRef)
        //     setAllMesage(docSnap.data().comments)
        // })
   

    }

    useEffect(()=>{
        if(!router.isReady) return;
        console.log("run this function")

     getComments()
    },[router.isReady])

    return (
        <div>

          <Message {...routeData}></Message>
          <div className="my-4">
            <div className="flex">

                <input onChange={(e)=>setMessage(e.target.value)} type="text" value={message} placeholder="Send a message" className="bg-gray-800 w-full p-2 text-white text-sm"/>

                <button onClick={submitMessage} className="bg-cyan-500 text-white py-2 px-4 text-sm">Send</button>


            </div>

            <div className="py-6">
                <h2 className="font-bold">Comments</h2>
                {
                    allMessage?.map((message)=>(
                        <div className="bg-white p-4 my-4 border-2" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounded-full" src={message.avator} alt=""/>
                                <h2>{message.username}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))
                }
           
            </div>
          </div>
        </div>
    )
}