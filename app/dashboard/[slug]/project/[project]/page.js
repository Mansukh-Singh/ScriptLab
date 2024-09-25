"use client"
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import './project.css'

const page = ({ params, slug }) => {

  const projectRef = useRef();
  const projectNameDropDown = useRef();
  const [drop, setdrop] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [collectionName, setcollectionName] = useState({ collectionName: decodeURIComponent(params.slug) })
  const [userProjectList, setuserProjectList] = useState([])

  useEffect(() => {
    (async function main() {
      let response = await fetch("/api/userProjectserver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectionName),
      })
      let result = await response.json()
      let documents = await result.documents
      console.log(documents)
      documents.map(async (e) => {
        console.log(e.projectname)
        await setuserProjectList([...userProjectList,e.projectname])
        console.log(userProjectList)
      })
    })()
  }, [])


  const projectDivClick = () => {
    setdrop(!drop)
    if (projectRef.current || projectNameDropDown.current) {
      if (drop) {
        projectRef.current.classList.add("rotate-90")
        projectNameDropDown.current.style.transition = 'all 0.5s ease'
        projectNameDropDown.current.style.maxHeight = '70vh'

      }
      else {
        projectRef.current.classList.remove("rotate-90")
        projectNameDropDown.current.style.transition = 'all 0.5s ease'
        projectNameDropDown.current.style.maxHeight = '0vh'
      }
    }

  }

  return (
    <>
      <div className="main flex justify-center absolute w-screen">
        <div className="child_main flex-col w-[20vw] justify-end">
          <div onClick={projectDivClick} className="flex justify-start hover:bg-gray-900 gap-2 pl-5 cursor-pointer items-center h-10 w-[20vw] font-mono font-semibold text-md">
            <span ref={projectRef} className="right_arrow_image flex justify-center items-center transition-transform font-mono font-semibold transform"><Image src="/right_arrow.png" width={20} height={20} alt="arrow_icon" /></span>
            <span className="project_text flex justify-center items-center">PROJECTS</span>
          </div>
          <div ref={projectNameDropDown} className="project_name_drop_down flex-col justify-end items-start overflow-hidden hover:overflow-y-scroll hover:overflow-x-hidden absolute top-11 left-[3vw] w-[17vw] max-h-0">
            {/* <div className="project_text flex justify-start items-center hover:bg-gray-900 pl-4 w-[17vw] h-9 cursor-pointer">MANSUKH SINGH</div> */}
            {userProjectList.map((document) => {
              return <>
                <div key={document} className="project_text flex justify-start items-center hover:bg-gray-900 pl-4 w-[17vw] h-9 cursor-pointer">{document.toUpperCase()}</div>
              </>
            })}
          </div>
        </div>
        <div className="child_main1 w-[80vw]"></div>
      </div>
    </>
  )
}

export default page