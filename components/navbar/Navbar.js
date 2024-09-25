"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import checkUser from './checkUser'
import "./Navbar.css"

const Navbar = () => {
    const [render, setrender] = useState(false)
    const [trueUser, settrueUser] = useState({})
    const [logoutDiv, setLogoutdiv] = useState(false)
    const usericonDiv = useRef(null)
    const router = useRouter()
    const { data: session, status } = useSession()

    if (session) {
        console.log(session)
    }


    useEffect(() => {
        const fetchData = async () => {
            let result = await checkUser()
            settrueUser(result)
        }
        fetchData()
    }, []);

    const handleClick = () => {
        signOut({ callbackUrl: '/' })
    }

    const usericonOver = () => {
        setLogoutdiv(true)
        if (usericonDiv.current) {
            usericonDiv.current.style.transition = "all 0.1s ease";
            usericonDiv.current.style.width = "20vw";
            usericonDiv.current.style.height = "25vh";
        }
    }

    const usericonLeave = () => {
        if (usericonDiv.current) {
            usericonDiv.current.style.transition = "all 0.1s ease";
            usericonDiv.current.style.width = "0vw";
            usericonDiv.current.style.height = "0vh";
        }
        setLogoutdiv(false)
    }

    const logOut = async () => {
        let response = await fetch("/api/server", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Username: trueUser.username })
        })
        let result = await response.json()
        signOut({ callbackUrl: '/' })
    }

    if (session) {
        return (
            <div className='relative top-0 flex justify-between items-center h-16 bg-slate-700 w-screen '>
                <div className='flex justify-start items-center gap-2'>
                    <Link href='/'><span className='relative inline-block ml-5 p-1 text-yellow-300 font-extrabold rounded-lg text-3xl font-mono hover:shadow-md hover:shadow-black hover:bottom-[2px]'>&lt;/&gt;</span></Link>
                    <div className="flex justify-center items-center gap-[4px]">
                        <span className='script text-xl font-mono font-bold'>Script</span>
                        <span className='lab text-2xl text-yellow-300 font-bold'>LAB</span>
                    </div>
                </div>
                <div className='border border-black justify-center items-center'>{session.user.email}</div>
                <span onClick={handleClick} className='w-11 h-11 login relative flex justify-center items-center text-2xl text-black p-2 px-3 mx-8 rounded-[50%] font-sans font-bold shadow-md shadow-black bg-yellow-400'>{session.user.email[0].toUpperCase()}</span>
            </div>
        )
    }

    if (trueUser.message) {
        return (
            <>
                {logoutDiv && <div onMouseOver={usericonOver} onMouseLeave={usericonLeave} className="absolute flex justify-center items-end z-20 top-16 right-3 w-[20vw] h-[30vh] transition-all">
                    <div ref={usericonDiv} className='flex-col overflow-hidden justify-center items-center bg-slate-300 shadow-md shadow-black rounded-lg w-[0vw] h-[0vh]'>
                        <div className="flex justify-center items-center w-[20vw] h-[15vh] text-lg font-mono font-semibold text-black border-b-[1px] border-gray-800 overflow-hidden">
                            <div className="flex justify-start items-center gap-1 w-[18vw] h-[12vh] overflow-hidden">
                                <div className='flex justify-center items-center h-14 w-14'>
                                    <span className="flex justify-center items-center text-white w-11 h-11 bg-slate-600 rounded-full shadow-md shadow-black">{trueUser.username[0].toUpperCase()}</span>
                                </div>
                                <div className='flex justify-center items-center w-44 h-11 overflow-hidden min-w-0 text-ellipsis whitespace-nowrap'>
                                    <span className='inline-block  justify-between pl-1 overflow-hidden min-w-0 text-ellipsis whitespace-nowrap items-center text-sm w-44'>{trueUser.username}</span>
                                </div>
                            </div>
                        </div>
                        <span onClick={logOut} className="flex justify-center items-center text-md font-bold text-black cursor-pointer hover:text-gray-700 w-[20vw] h-[10vh]">Logout</span>
                    </div>
                </div>}
                <div className='relative top-0 flex justify-between items-center h-16 bg-slate-700 w-screen '>
                    <div className='flex justify-start items-center gap-2'>
                        <span className='relative inline-block ml-5 p-1 text-yellow-300 font-extrabold rounded-lg text-3xl font-mono'>&lt;/&gt;</span>
                        <div className="flex justify-center items-center gap-[4px]">
                            <span className='script text-xl font-mono font-bold'>Script</span>
                            <span className='lab text-2xl text-yellow-300 font-bold'>LAB</span>
                        </div>
                    </div>
                    <span onMouseOver={usericonOver} onMouseLeave={usericonLeave} className="flex justify-center items-center mx-5 w-16 h-16"><span className='login border-gray-800 relative w-[40px] h-[40px] flex justify-center items-center text-lg font-mono font-bold hover:shadow-md hover:shadow-black bg-yellow-400 hover:text-black'>{trueUser.username[0].toUpperCase()}</span></span>
                </div>
            </>
        )
    }

    else {
        return (
            <div className='relative top-0 flex justify-between items-center h-16 bg-slate-700 w-screen '>
                <div className='flex justify-start items-center gap-2'>
                    <Link href='/'><span className='relative inline-block ml-5 p-1 text-yellow-300 font-extrabold rounded-lg text-3xl font-mono hover:shadow-md hover:shadow-black hover:bottom-[2px]'>&lt;/&gt;</span></Link>
                    <div className="flex justify-center items-center gap-[4px]">
                        <span className='script text-xl font-mono font-bold'>Script</span>
                        <span className='lab text-2xl text-yellow-300 font-bold'>LAB</span>
                    </div>
                </div>
                <Link href='/login'><span className='login relative inline-block p-2 bg-slate-700 px-3 mx-8 rounded-md text-lg font-mono font-bold hover:bottom-[2px] hover:shadow-md hover:shadow-black hover:bg-yellow-400 hover:text-black'>Login</span></Link>
            </div>
        )
    }
}

export default Navbar