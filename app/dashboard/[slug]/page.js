"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import userCreate from './userCreate'
import { useRouter } from 'next/navigation'
import './dashboard.css'

const Page = ({ params }) => {

    const router = useRouter()

    const wait = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
    }

    const [projectDiv, setprojectDiv] = useState(false)
    const [projectList, setprojectList] = useState(false)
    const [createProjectAlert, setcreateProjectAlert] = useState(false)
    const [projectInput, setprojectInput] = useState("")
    const [projectNames, setprojectNames] = useState([])
    const [collectionName, setcollectionName] = useState({ collectionName: decodeURIComponent(params.slug) })
    const [projectNameList, setprojectNameList] = useState([])
    const projectdivRef = useRef()
    const projectdivchildRef = useRef()
    const projectdivinputRef = useRef()
    const projectdivspanRef = useRef()
    const projectdivbuttonRef = useRef()
    const projectAlert = useRef()
    const projectListRef = useRef()
    const projectNameRef = useRef([])

    useEffect(() => {
        async function main() {
            try {
                let response = await fetch("/api/userProjectserver", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(collectionName),
                });
                let result = await response.json();
                let documents = result.documents;
                setprojectNameList((projectNameList) => {
                    const projectNames = documents.map((e) => e.projectname);
                    return projectNames
                })

            } catch (error) {
                console.error("Error fetching project list:", error);
            }
        }
        main();
    }, [collectionName])


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
        let response = await userCreate(decodeURIComponent(params.slug), projectInput);
        if (!response) {
            setcreateProjectAlert(true);
            setTimeout(() => {
                if (projectAlert.current) {
                    projectAlert.current.style.transition = "all 0.1s ease-in";
                    projectAlert.current.style.top = "0px";
                }
            }, 1);
        } else {
            window.location.href = `/dashboard/${decodeURIComponent(params.slug)}/project/${projectInput}`;
        }
    };


    return (
        <>
            {createProjectAlert && <div ref={projectAlert} style={{ position: "absolute", top: "-56px" }} className='params flex justify-between items-center m-auto bg-yellow-300 text-black font-mono font-semibold absolute z-[2] w-[100vw] h-14'>
                <span className="ml-[40vw]">Project name already exists</span>
                <Image onClick={() => {
                    setcreateProjectAlert(!createProjectAlert)
                }} className="cursor-pointer mr-5" src="/cross_icon.png" width={20} height={20} alt="play_icon" />
            </div>}
            {projectDiv && <div className='flex justify-center items-center absolute top-0 left-0 z-[1] w-[100vw] min-h-screen'>
                <div ref={projectdivRef} className='projectDiv absolute flex justify-center items-center w-0 h-0'>
                    <button onClick={() => { setprojectDiv(false) }} className='projectdivcancelButton flex justify-center items-center absolute right-8 top-6 w-10 h-10 text-white font-mono font-bold rounded-full text-xl'>X</button>
                    <div ref={projectdivchildRef} className='projectDivChild flex-col justify-center items-center w-0 h-0 rounded-lg'>
                        <input ref={projectdivinputRef} value={projectInput} onChange={(e) => setprojectInput(e.target.value)} type="text" className='params projectDivInput focus:outline-none font-mono text-sm font-semibold text-white w-0 h-0 pl-2 rounded-md shadow-md shadow-black' />
                        <span ref={projectdivspanRef} className='params projectDivSpan flex justify-center items-center w-80 h-9 font-mono font-semibold text-white text-sm'>create a project name</span>
                        <button ref={projectdivbuttonRef} onClick={createProjectClick} className='params w-32 h-8 text-sm text-white rounded-md hover:bg-slate-700 shadow-md shadow-black mt-3 bg-slate-900 font-mono font-semibold'>create project</button>
                    </div>
                </div>
            </div>}
            <div className='flex justify-start items-center gap-4 w-[100vw] h-[20vh]'>
                <div className="flex justify-center items-center ml-6 h-16 w-16 rounded-full border-[2px] border-white text-yellow-300 text-2xl font-mono font-bold">
                    <span className="icon inline-block">{decodeURIComponent(params.slug)[0].toUpperCase()}</span>
                </div>
                <div className="flex flex-col items-start w-72 h-10 justify-center">
                    <span className="flex justify-start items-center w-72 span_params text-2xl font-bold text-white">Welcome ,</span>
                    <span className="flex justify-start font-semibold span_params text-lg text-yellow-300">{decodeURIComponent(params.slug)}</span>
                </div>
            </div>
            <div className="projectButtonDiv w-[100vw] h-[25vh] bg-gray-800">
                <button onClick={projectButton} className="flex justify-start items-center text-yellow-300 font-semibold hover:border-yellow-300 hover:text-white w-48 h-8 mb-1 border-[1.5px] border-white rounded-md transition-all">
                    <span className="params flex justify-center items-center w-10 h-6 text-2xl pb-1 ml-2">+</span>
                    <span className="params flex justify-center items-center h-6 text-sm">Create New Project</span>
                </button>
                <div className='flex justify-center items-center w-[70vw] h-14'>
                    <span className="flex justify-center items-center text-center params text-sm font-medium">Click the button above to create a new project. Enter a unique project name to get started and manage your project tasks and details efficiently</span>
                </div>
            </div>
            <div className='projectButtonDiv relative w-[100vw] h-[25vh]'>
                <div onMouseOver={() => {
                    setprojectList(true)
                }} onMouseLeave={() => { setprojectList(false) }} className="flex justify-center items-center cursor-pointer text-yellow-300 font-semibold hover:border-yellow-300 hover:text-white w-52 h-8 mb-1 border-[1.5px] border-white rounded-md transition-all">
                    <span className="params flex justify-center items-center h-6 text-sm">Go to the existing project</span>
                    {projectList && <div ref={projectListRef} onMouseOver={() => { setprojectList(true) }} onMouseLeave={() => { setprojectList(false) }} className={`flex justify-center items-end absolute top-[4vw] w-[30vw] h-[30vh] shadow-md shadow-black transition-all duration-500 ease-in-out transform ${projectList ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="projectListScroll projectListChildDiv w-[30vw] h-[27vh] border-[1.5px] rounded-md border-yellow-300 overflow-x-hidden overflow-y-auto">
                            {projectNameList.map((name, index) => {
                                return <>
                                    <div key={index} ref={(el) => (projectNameRef.current[index] = el)} onClick={() => {
                                        window.location.href = `/dashboard/${decodeURIComponent(params.slug)}/project/${name}`
                                    }} onMouseOver={() => {
                                        if (projectNameRef.current[index]) {
                                            projectNameRef.current[index].innerHTML += '.ijsnb'
                                        }
                                    }} onMouseLeave={() => {
                                        if (projectNameRef.current[index]) {
                                            projectNameRef.current[index].innerHTML = projectNameRef.current[index].innerHTML.split(".")[0]
                                        }
                                    }} className='params projectlistNestChildDiv text-sm font-light p-2 pl-5 w-[30vw] border-b-[1px] border-yellow-300 h-10'>{name}</div>
                                </>
                            })}
                        </div>
                    </div>}
                </div>
                <div className='flex justify-center items-center w-[70vw] h-14'>
                    <span className="flex justify-center items-center text-center params text-sm font-medium">Hover over this section to reveal a list of your existing projects. Simply select a project from the list to be instantly redirected to its dashboard, enabling quick and easy access to manage your work.</span>
                </div>
            </div>
        </>
    )
}

export default Page