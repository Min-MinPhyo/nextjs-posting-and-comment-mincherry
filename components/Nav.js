import Link from "next/link";
import {auth} from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {


    const [user,loading]=useAuthState(auth)

   



    return (
        <nav className="flex justify-between items-center py-10">

            <Link href="/">
                <button className="text-lg font-medium bg-cyan-300 text-white p-2">Creative Thinking</button>
            </Link>


            <ul className="flex items-center gap-10">
                {
                    !user &&(

                <Link href={"/auth/login"} legacyBehavior>
                    <a className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
                        Join Now
                    </a>
                </Link>
                )
            }
            {
                user && (

                    <div className="flex items-center gap-6">
                        <Link href="/post">
                        <button className="font-medium bg-cyan-500 px-3 text-white rounded-lg">Post</button>
                   
                        </Link>

                        <Link href="/dashboard">
                            <img className="w-12 rounded-full cursor-pointer" src={user.photoURL}/>
                        </Link>
                    </div>


                )
            }

            </ul>



        </nav>
    )
}