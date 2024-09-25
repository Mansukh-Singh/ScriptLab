"use client"
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import userCreate from './userCreate'
import { useRouter } from 'next/navigation'
import './dashboard.css'

const page = ({ params }) => {
    
    const router = useRouter()

    const wait = () => {
        return new Promise((resolve,reject) => {
            setTimeout(()=>{
                resolve()
            },2000)
        })
    }

    const [projectDiv, setprojectDiv] = useState(false)
    const [createProjectAlert,setcreateProjectAlert] = useState(false)
    const [projectInput, setprojectInput] = useState("")
    const projectdivRef = useRef()
    const projectdivchildRef = useRef()
    const projectdivinputRef = useRef()
    const projectdivspanRef = useRef()
    const projectdivbuttonRef = useRef()

    const projectButton = () => {
        setprojectDiv(true)
        setTimeout(() => {
            if (projectdivRef.current) {
                projectdivRef.current.style.transition = "all 0.2s ease";
                projectdivRef.current.style.width = "100vw";
                projectdivRef.current.style.height = "100vh";
            }
            if (projectdivchildRef.current) {
                projectdivchildRef.current.style.transition = "all 0.2s ease";
                projectdivchildRef.current.style.width = "35vw";
                projectdivchildRef.current.style.height = "30vh";
                projectdivchildRef.current.style.display = "flex";
                projectdivchildRef.current.style.flexDirection = "column";
                projectdivchildRef.current.style.justifyContent = "center";
                projectdivchildRef.current.style.alignItems = "center";
                projectdivchildRef.current.style.gap = '1';
            }
            if (projectdivinputRef.current) {
                projectdivinputRef.current.transition = "all 0.2s ease";
                projectdivinputRef.current.style.width = "320px";
                projectdivinputRef.current.style.height = "32px";
            }
            if (projectdivspanRef.current) {
                projectdivspanRef.current.transition = "all 0.2s ease";
                projectdivspanRef.current.style.width = "320px";
                projectdivspanRef.current.style.height = "36px";
            }
            if (projectdivbuttonRef.current) {
                projectdivbuttonRef.current.transition = "all 0.2s ease";
                projectdivbuttonRef.current.style.width = "128px";
                projectdivbuttonRef.current.style.height = "32px";
            }
        }, 10);
    }

    const createProjectClick = async () => {
        let response = await userCreate(decodeURIComponent(params.slug),projectInput)
        if (!response) {
            setcreateProjectAlert(true)
        }
        else {
            window.location.href = `/dashboard/${decodeURIComponent(params.slug)}/project/${projectInput}`
        }
    }

    return (
        <>  
            {createProjectAlert && <div className='flex justify-center items-center m-auto bg-yellow-300 text-black font-mono font-semibold absolute top-0 z-[2] w-56 h-16'>Project name already exists</div>}
            {projectDiv && <div className='flex justify-center items-center absolute top-0 left-0 z-[1] w-[100vw] min-h-screen'>
                <div ref={projectdivRef} className='projectDiv absolute flex justify-center items-center w-0 h-0'>
                    <button onClick={() => { setprojectDiv(false) }} className='projectdivcancelButton flex justify-center items-center absolute right-8 top-6 w-10 h-10 text-white font-mono font-bold rounded-full text-xl'>X</button>
                    <div ref={projectdivchildRef} className='projectDivChild flex-col justify-center items-center w-0 h-0 rounded-lg'>
                        <input ref={projectdivinputRef} value={projectInput} onChange={(e) => setprojectInput(e.target.value)} type="text" className='projectDivInput focus:outline-none font-mono font-semibold text-white w-0 h-0 pl-2 rounded-md shadow-md shadow-black' />
                        <span ref={projectdivspanRef} className='projectDivSpan flex justify-center items-center w-80 h-9 font-mono font-semibold text-white text-sm'>create a project name</span>
                        <button ref={projectdivbuttonRef} onClick={createProjectClick} className='w-32 h-8 text-sm text-white rounded-md hover:bg-slate-600 shadow-md shadow-black mt-3 bg-slate-900 font-mono font-semibold'>create project</button>
                    </div>
                </div>
            </div>}
            <div className='flex justify-start items-center gap-4 w-[100vw] h-[20vh] border-b-[1px] border-gray-600'>
                <div className="flex justify-center items-center ml-6 h-16 w-16 rounded-full bg-gray-500 text-white text-2xl font-mono font-bold">
                    <span className="icon inline-block">{decodeURIComponent(params.slug)[0].toUpperCase()}</span>
                </div>
                <div className="flex flex-col items-start w-72 h-10 justify-center">
                    <span className="flex justify-start items-center w-72 span_params text-2xl font-bold text-yellow-600">Welcome ,</span>
                    <span className="flex justify-start font-semibold span_params text-lg text-yellow-100">{decodeURIComponent(params.slug)}</span>
                </div>
            </div>
            <div className="flex justify-center items-start w-[100vw] h-[15vh] border-b-[1px] border-gray-600">
                <button onClick={projectButton} className="flex justify-start items-center shadow-md shadow-black hover:bg-yellow-300 w-40 h-8 mt-5 bg-yellow-200 border-none rounded-md transition-all">
                    <span className="params flex justify-center items-center w-10 h-6 text-2xl pb-1 font-semibold text-black ml-2">+</span>
                    <span className="params flex justify-center items-center h-6 text-sm font-semibold text-black">Create Project</span>
                </button>
            </div>
        </>
    )
}

export default page