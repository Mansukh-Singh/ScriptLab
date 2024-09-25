import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <div className='w-96 h-96 bg-black text-white'>
                    Signed in as {session.user.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='w-96 h-96 bg-red-700 text-white'>
                Not signed in <br />
                <button onClick={() => signIn("github")}>Sign in</button>
            </div>
        </>
    )
}

export default Login