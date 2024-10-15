"use client"
import React, { useState } from "react"
import { useRef, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { useRouter } from "next/navigation"
import './login.css'

const page = () => {

    const router = useRouter()

    const [resetEmail, setresetEmail] = useState("")
    const [resetAlert, setresetAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [hiddendiv, setHiddendiv] = useState(false)
    const [submitType, setSubmitType] = useState(null)
    const [signupInput, setSignupInput] = useState({ Username: "", Password: "", name: "signup" })
    const [loginInput, setLoginInput] = useState({ Username: "", Password: "", name: "login" })
    const [apiresult, setApiresult] = useState(null)

    const { data: session, status } = useSession()

    const [signup, setsignup] = useState(true)
    const [login, setlogin] = useState(false)
    const hidden = useRef()
    const main_signup = useRef()
    const main_login = useRef()
    const signup_button = useRef()
    const login_button = useRef()
    const github_button = useRef()
    const div_3 = useRef()
    const sI_lI = useRef()
    const alert_div = useRef(null)
    const hiddensubmitButton = useRef()
    const resetAlertRef = useRef()

    const signupClick = () => {
        setsignup(true)
        setlogin(false)
    }

    const loginClick = () => {
        setlogin(true)
        setsignup(false)
    }

    const signupbuttonUp = () => {
        signup_button.current.classList.remove('top-1')
        signup_button.current.classList.add('shadow-md', 'shadow-black')
    }

    const signupbuttonDown = () => {
        signup_button.current.classList.add('top-1')
        signup_button.current.classList.remove('shadow-md', 'shadow-black')
    }

    const loginbuttonUp = () => {
        login_button.current.classList.remove('top-1')
        login_button.current.classList.add('shadow-md', 'shadow-black')
    }

    const loginbuttonDown = () => {
        login_button.current.classList.add('top-1')
        login_button.current.classList.remove('shadow-md', 'shadow-black')
    }

    const githubbuttonUp = () => {
        github_button.current.classList.remove('top-1')
        github_button.current.classList.add('shadow-md', 'shadow-black')
    }

    const githubbuttonDown = () => {
        github_button.current.classList.add('top-1')
        github_button.current.classList.remove('shadow-md', 'shadow-black')
    }

    const hiddenbuttonUp = () => {
        hiddensubmitButton.current.classList.remove('top-1')
        hiddensubmitButton.current.classList.add('shadow-md', 'shadow-black')
    }

    const hiddenbuttonDown = () => {
        hiddensubmitButton.current.classList.add('top-1')
        hiddensubmitButton.current.classList.remove('shadow-md', 'shadow-black')
    }

    useEffect(() => {
        if (signup) {
            main_signup.current.style.transition = 'all 0.3s ease'
            main_login.current.style.transition = 'all 0.3s ease'
            main_signup.current.style.left = "30vw"
            main_login.current.style.right = "0vw"
            hidden.current.style.transition = 'all 0.3s ease-out'
            hidden.current.style.left = '0px'
            hidden.current.style.right = '112px'
        }

        if (login) {
            main_login.current.style.transition = 'all 0.3s ease'
            main_signup.current.style.transition = 'all 0.3s ease'
            main_login.current.style.right = "30vw"
            main_signup.current.style.left = "0vw"
            hidden.current.style.transition = 'all 0.3s ease-out'
            hidden.current.style.right = '0px'
            hidden.current.style.left = '112px'
        }
    }, [signup, login])

    const SignIn = async () => {
        setLoading(true)
        await signIn('github')
        if (session) {
            setLoading(false)
        }
    }

    const fP = () => {
        div_3.current.classList.add("hidden")
        sI_lI.current.classList.add("hidden")
        setHiddendiv(true)
    }

    const hiddenDiv = () => {
        div_3.current.classList.remove("hidden")
        sI_lI.current.classList.remove("hidden")
        setHiddendiv(false)
    }

    const signupData = (e) => {
        setSignupInput({ ...signupInput, [e.target.name]: e.target.value })
    }

    const loginData = (e) => {
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
    }

    function wait(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time)
        })
    }

    const submitHandlerType = async (e) => {
        setLoading(true)
        await wait(2000)
        setLoading(false)
        if (e.target.name === "signup") {
            let response = await fetch("api/server", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInput),
            })
            let result = await response.json()
            if (result.message) {
                setAlert(true)
                setApiresult(result.message)
            }
        }
        if (e.target.name === "login") {
            let response = await fetch("api/server", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInput),
            })
            let result = await response.json()
            if (result.message === "Logged In") {
                window.location.href = `/dashboard/${decodeURIComponent(result.username)}`
            }
            else {
                setAlert(true)
                setApiresult(result.message)
            }
        }
        setSignupInput({ Username: "", Password: "", name: "signup" })
        setLoginInput({ Username: "", Password: "", name: "login" })
    }

    useEffect(() => {
        if (alert) {
            if (alert_div.current) {
                alert_div.current.style.transition = "all 0.3s ease"
                alert_div.current.style.top = "0px"
            }
        }
        else {
            if (alert_div.current) {
                alert_div.current.style.transition = "all 0.3s ease"
                alert_div.current.style.top = "-64px"
            }
        }
    }, [alert])


    const handleAlert = async () => {
        setAlert(false)
        setApiresult(null)
    }

    const resetButtonClick = async () => {
        setLoading(true)
        await wait(2000)
        setLoading(false)
        setresetAlert(true)
    }

    useEffect(() => {
        if (resetAlert) {
            if (resetAlertRef.current) {
                resetAlertRef.current.style.transition = "top 0.6s ease"
                resetAlertRef.current.style.top = "0px"
            }
        }
        else {
            if (resetAlertRef.current) {
                resetAlertRef.current.style.transition = "none"
                resetAlertRef.current.style.top = "-64px"
            }
            
        }
    }, [resetAlert])


    return (
        <>
            {resetAlert && <div onClick={() => { setresetAlert(false) }} ref={resetAlertRef} style={{ top: "-64px", position: "absolute", transition: "none" }} className="flex justify-between items-center bg-yellow-600 w-[100vw] h-16 absolute z-20">
                <div className="flex justify-center items-center absolute z-[11] top-0 left-0 w-[100vw] h-16">Reset Link Already sent to your Email ID</div>
                <div className="flex justify-center items-center w-[10vw] h-16">
                    <Image className="absolute top-0 right-0 border-2 border-red-500" src="/cross_icon.png" width={20} height={20} alt="cross_icon" />
                </div>
            </div>}
            {alert && <div ref={alert_div} style={{ top: "-64px" }} className="absolute z-[10] flex shadow-lg rounded-lg gap-2 justify-between bg-yellow-700 text-white items-center w-[100vw] h-16 text-md font-mono font-semibold">
                <span className="text inline-block ml-7">{apiresult}</span>
                <button type="button" className="text mr-7" onClick={handleAlert}>X</button>
            </div>}
            {loading && <div className="loading fixed flex z-[6] top-0 left-0 justify-center items-center w-[100vw] h-[100vh]">
                <div className="child_loading w-40 h-40"></div>
            </div>}
            <div className='relative z-[0] overflow-hidden shadow-lg flex flex-col justify-items items-center loginboard w-[30vw] h-[60vh] m-auto mt-20 rounded-3xl border-[2px] border-yellow-300 shadow-black'>
                {hiddendiv && <div className="absolute flex flex-col z-[7] justify-center items-center gap-3 rounded-3xl top-0 left-0 w-[30vw] h-[60vh]">
                    <span className="fog_pass flex justify-center items-center text-3xl font-semibold shadow-md shadow-black bg-yellow-500 text-white px-3 py-1 rounded-lg">Forgot Password</span>
                    <span className="r_password flex justify-center items-center font-mono font-semibold text-sm">We'll email you a password reset link.</span>
                    <input type="text" value={resetEmail} onChange={(e) => { setresetEmail(e.target.value) }} className='email bg-none w-[25vw] p-1 font-mono text-sm pb-2 font-bold shadow-md shadow-black' placeholder="Enter your Email ID" />
                    <button ref={hiddensubmitButton} onClick={resetButtonClick} onMouseUp={hiddenbuttonUp} onMouseDown={hiddenbuttonDown} className="relative flex justify-center items-center w-[25vw] h-[4vh] border border-black bg-none font-mon font-semibold py-4 rounded-md shadow-md shadow-black">Start password reset</button>
                    <button onClick={hiddenDiv} className="flex justify-center items-center back font-mono font-semibold">&lt;- back</button>
                </div>}
                <div ref={sI_lI} className='flex mt-11 mb-11 relative z-[3] justify-between rounded-md shadow-md shadow-black w-56'>
                    <div ref={hidden} className='absolute z-[2] w-28 h-11 top-0 bg-yellow-500 rounded-md'></div>
                    <span onClick={signupClick} className='signup font flex relative z-[3] justify-center items-center rounded-md w-28 h-11 text-white font-mono font-bold text-xl cursor-default transition-all' >Signup</span>
                    <span onClick={loginClick} className='login font flex relative z-[3] justify-center items-center rounded-md w-28 h-11 text-white font-mono font-bold text-xl transition-all'>Login</span>
                </div>
                <div ref={div_3} className='flex absolute z-[1] rounded-3xl w-[90vw] h-[50vh]'>
                    <div ref={main_signup} className='flex flex-col mt-10 gap-3 justify-center items-center absolute left-[30vw] w-[30vw] h-[60vh] rounded-bl-3xl rounded-tl-3xl'>
                        <input type="text" name="Username" value={signupInput.Username} onChange={signupData} className='font email w-[25vw] p-1 font-mono font-semibold shadow-md shadow-black' placeholder="Username or Email ID" />
                        <input type="password" name="Password" value={signupInput.Password} onChange={signupData} className='font password w-[25vw] p-1 font-mono font-semibold shadow-md shadow-black' placeholder="Password" />
                        <div className='flex justify-center items-center w-[25vw] h-5'>
                            <div className="bg-yellow-200 low shadow-sm shadow-black w-[10vw] h-[1.5px]"></div>
                            <div className="font or_text flex justify-center items-center w-[5vw] h-5 text-sm">OR</div>
                            <div className="bg-yellow-200 shadow-sm shadow-black w-[10vw] h-[1.5px]"></div>
                        </div>
                        <div ref={github_button} onMouseUp={githubbuttonUp} onMouseDown={githubbuttonDown} onClick={SignIn} className='select-none relative flex cursor-default github_text font-mono text-sm gap-3 font-semibold justify-start items-center  border-[1px] border-yellow-300 w-[20vw] h-10 rounded-md shadow-md shadow-black'>
                            <div className='flex justify-center mx-2 rounded-full items-center w-14 h-4'>
                                <Image className="rounded-full w-8 h-8" src="/github.png" height={400} width={400} alt="GitHub Icon" />
                            </div>
                            <div className="flex font justify-center items-center w-[12vw] h-10">Continue with github</div>
                        </div>
                        <button type="button" name="signup" onClick={submitHandlerType} ref={signup_button} onMouseUp={signupbuttonUp} onMouseDown={signupbuttonDown} className='font relative border border-black w-20 p-1 font-mono font-semibold rounded-md mt-3 shadow-md shadow-black'>Signup</button>
                    </div>
                    <div ref={main_login} className='flex flex-col mt-10 gap-3 justify-center items-center absolute w-[30vw] h-[60vh] right-[0vw] rounded-tr-3xl rounded-br-3xl'>
                        <input type="text" name="Username" value={loginInput.Username} onChange={loginData} className='font email w-[25vw] p-1 font-mono font-bold shadow-md shadow-black' placeholder="Username or Email ID" />
                        <input type="password" name="Password" value={loginInput.Password} onChange={loginData} className='font password w-[25vw] p-1 font-mono font-bold shadow-md shadow-black' placeholder="Password" />
                        <div className="flex justify-center items-center h-9"><span onClick={fP} className='font fp font-semibold hover:cursor-pointer'>Forgot Password?</span></div>
                        <button type="button" name="login" onClick={submitHandlerType} ref={login_button} onMouseUp={loginbuttonUp} onMouseDown={loginbuttonDown} className='font relative border border-black w-20 p-1 font-mono font-semibold rounded-md mt-3 shadow-md shadow-black'>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page