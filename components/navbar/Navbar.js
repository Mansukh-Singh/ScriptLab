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
            usericonDiv.current.style.height = "35vh";
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

    const dashboardClick = () => {
        window.location.href = `/dashboard/${decodeURIComponent(trueUser.username)}`
    }

    if (session) {
        return (
            <div className='div_condition relative top-0 flex justify-between items-center h-16 bg-slate-700 w-screen '>
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
                {logoutDiv && <div onMouseOver={usericonOver} onMouseLeave={usericonLeave} className="absolute flex justify-center items-end z-20 top-11 right-3 w-[20vw] h-[40vh] transition-all">
                    <div ref={usericonDiv} className='flex-col overflow-hidden justify-center items-center bg-slate-950 shadow-md shadow-black rounded-lg w-[0vw] h-[0vh]'>
                        <div className="flex justify-center items-center w-[20vw] h-[15vh] text-lg font-mono font-semibold text-black border-b-[1px] border-gray-800 overflow-hidden">
                            <div className="flex justify-start items-center gap-1 w-[18vw] h-[12vh] overflow-hidden">
                                <div className='flex justify-center items-center h-14 w-14'>
                                    <span className="text_style flex justify-center items-center text-white w-11 h-11 bg-slate-700 rounded-full text-sm">{trueUser.username[0].toUpperCase()}</span>
                                </div>
                                <div className='flex justify-center items-center w-44 h-11 overflow-hidden min-w-0 text-ellipsis whitespace-nowrap'>
                                    <span className='text_style username inline-block justify-between pl-1 overflow-hidden min-w-0 text-ellipsis text-white whitespace-nowrap items-center text-sm w-44'>{trueUser.username}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-start items-center border-b-[1px] border-gray-800 w-[20vw] h-[9vh]'>
                            <span onClick={dashboardClick} className="text_style text-sm ml-5 text-yellow-300 cursor-pointer">Dashboard</span>
                        </div>
                        <span className="flex justify-center items-center w-[20vw] h-[10vh]"><span onClick={logOut} className='text-md font-bold text-slate-300 cursor-pointer hover:text-slate-500'>Logout</span></span>
                    </div>
                </div>}
                <div className='div_condition relative top-0 flex justify-between items-center h-14 w-screen'>
                    <div className='flex justify-start items-center gap-2'>
                        <span className='text_style relative inline-block ml-5 p-1 text-yellow-300 font-extrabold rounded-lg text-2xl font-mono'>&lt;/&gt;</span>
                        <div className="flex justify-center items-center gap-[4px]">
                            <span className='text_style script text-xl font-bold'>Script</span>
                            <span className='text_style lab text-2xl text-yellow-300 font-bold'>LAB</span>
                        </div>
                    </div>
                    <span onMouseOver={usericonOver} onMouseLeave={usericonLeave} className="flex justify-center items-center mx-5 w-16 h-16"><span className='text_style user_icon text-sm login relative w-[38px] h-[38px] flex justify-center items-center font-bold text-yellow-300 border-[1.4px] border-white'>{trueUser.username[0].toUpperCase()}</span></span>
                </div>
            </>
        )
    }

    else {
        return (
            <div className='div_condition relative top-0 flex justify-between items-center h-16 w-screen'>
                <div className='flex justify-start items-center gap-2'>
                    <Link href='/'><span className='font text relative inline-block ml-5 p-1 text-yellow-300 font-extrabold rounded-lg text-2xl font-mono'>&lt;/&gt;</span></Link>
                    <div className="flex justify-center items-center gap-[4px]">
                        <span className='script text-xl text font-bold'>Script</span>
                        <span className='lab text text-2xl text-yellow-300 font-bold'>LAB</span>
                    </div>
                </div>
                <Link href='/login'><span className='login text relative inline-block p-2 px-3 mx-8 rounded-md text-lg font-bold hover:text-yellow-300'>Login</span></Link>
            </div>
        )
    }
}

export default Navbar