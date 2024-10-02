"use client"
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import runProgram from './runProgram'
import './project.css'

const page = ({ params }) => {

  const projectRef = useRef();
  const actionIcons = useState(false)
  const projectNameDropDown = useRef();
  const [drop, setdrop] = useState(false)
  const [cells, setcells] = useState([])
  const [cellsName, setcellsName] = useState({ collectionName: decodeURIComponent(params.slug), projectName: decodeURIComponent(params.project) })
  const [collectionName, setcollectionName] = useState({ collectionName: decodeURIComponent(params.slug) })
  const [userProjectList, setuserProjectList] = useState([])
  const [textArea, settextArea] = useState([])
  const runButton = useRef()
  const inputRefs = useRef([])
  const outerRefs = useRef([])
  const parentRefs = useRef([])
  const gridRefs = useRef([])
  const [selectIndex, setSelectIndex] = useState(null)

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
        const projectNames = documents.map((e) => e.projectname);
        setuserProjectList(projectNames);
      } catch (error) {
        console.error("Error fetching project list:", error);
      }
    }
    main();
  }, [collectionName])

  useEffect(() => {
    async function main() {
      try {
        let response = await fetch("/api/userProjectcells", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cellsName),
        });
        let result = await response.json();
        const cellsList = await result.documents[0].cells
        const cellsLists = await cellsList.map(e => e)
        setcells(cellsLists)
      }
      catch (error) {
        console.error("Error fetching cells list:", error);
      }
    }
    main();
  }, [cellsName])

  useEffect(() => {
    settextArea(cells.map(cell => cell))
  }, [cells])


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

  const childClick = (e) => {
    window.location.href = `/dashboard/${decodeURIComponent(params.slug)}/project/${e.target.dataset.project}`
  }

  const runOver = () => {
    if (runButton.current) {
      runButton.current.classList.remove("bg-gray-900")
      runButton.current.classList.add("bg-slate-800")
    }
  }

  const runLeave = () => {
    if (runButton.current) {
      runButton.current.classList.remove("bg-slate-800")
      runButton.current.classList.add("bg-gray-900")
    }
  }

  useEffect(() => {
    if (selectIndex !== null) {
      textArea.map((element, indices) => {
        if (indices == selectIndex) {
          outerRefs.current[indices].style.transition = "all 0.4s ease"
          gridRefs.current[indices].children[0].style.transition = "all 0.4s ease"
          parentRefs.current[indices].children[0].style.transition = "all 0.4s ease"
          parentRefs.current[indices].children[0].style.display = "flex"
          outerRefs.current[indices].style.border = "1px rgb(253 224 71/ 1) solid"
          gridRefs.current[indices].children[0].style.backgroundColor = "rgb(253 224 71/ 1)"
        }
        else {
          parentRefs.current[indices].children[0].style.display = "none"
          outerRefs.current[indices].style.border = "none"
          gridRefs.current[indices].children[0].style.backgroundColor = "rgb(30 41 59/1)"
        }
      })
    }
  }, [selectIndex])


  const handleAddCell = () => {
    if (selectIndex === null) {
      settextArea((textArea) => {
        const addedCell = [...textArea]
        addedCell.push('')
        return addedCell
      })
      const textAreaLength = textArea.length
      setSelectIndex(textAreaLength)
    }
    else {
      settextArea((textArea) => {
        const addedCell = [...textArea]
        addedCell.splice(selectIndex + 1, 0, '')
        return addedCell
      })
      setSelectIndex(selectIndex + 1)
    }
  }

  return (
    <>
      <div className="main flex justify-center absolute w-screen">
        <div className="child_main flex-col w-[20vw] justify-end">
          <div onClick={projectDivClick} className="flex justify-start hover:bg-gray-900 gap-2 pl-5 cursor-pointer items-center h-10 w-[20vw] font-mono font-semibold text-md">
            <span ref={projectRef} className="right_arrow_image flex justify-center items-center transition-transform font-mono font-semibold transform"><Image src="/right_arrow.png" width={16} height={16} alt="arrow_icon" /></span>
            <span className="project_text flex justify-center items-center">PROJECTS</span>
          </div>
          <div ref={projectNameDropDown} className="project_name_drop_down flex-col justify-end items-start overflow-hidden hover:overflow-y-scroll hover:overflow-x-hidden absolute top-11 left-[3vw] w-[17vw] max-h-0">
            {userProjectList.map((document, index) => {
              return <>
                <div onClick={childClick} key={index} data-project={document} className="project_text_child flex justify-start items-center hover:bg-gray-900 pl-4 w-[17vw] h-9 cursor-pointer">{document.toUpperCase()}</div>
              </>
            })}
          </div>
        </div>
        <div className="child_main1 flex-col justify-end items-center w-[80vw] overflow-x-hidden overflow-y-auto">
          <div className="flex justify-start items-center gap-2 w-[80vw] h-11">
            <div onClick={handleAddCell} className="flex justify-center gap-2 items-center ml-4 h-6 w-20 hover:bg-slate-800 rounded-md cursor-pointer">
              <span className="plus_sign text-lg pb-1 font-semibold">+</span>
              <span className="text font-semibold">Code</span>
            </div>
            <div className="flex justify-center gap-2 items-center h-6 w-28 hover:bg-slate-800 rounded-md cursor-pointer">
              <span className="plus_sign text-lg pb-1 font-semibold">+</span>
              <span className="text font-semibold">Markdown</span>
            </div>
            <div onMouseOver={runOver} onMouseLeave={runLeave} className="flex relative justify-start gap-2 items-center h-6 w-24 hover:bg-slate-800 rounded-md cursor-pointer">
              <div className="flex justify-center items-center h-6 w-8 absolute">
                <Image className="absolute left-1" src="/play_pic.png" width={16} height={16} alt="play_icon" />
                <span ref={runButton} className="flex justify-start items-center pl-0 bg-gray-900 absolute z-[2] left-2"><Image src="/play_pic.png" width={16} height={16} alt="play_icon" /></span>
              </div>
              <span className="inline-block absolute left-8 text font-semibold">Run All</span>
            </div>
          </div>
          {textArea.map((e, index) => {
            return <>
              <div onClick={(e) => {
                setSelectIndex(index)
                textArea.map((element, indices) => {
                  if (indices == index) {
                    outerRefs.current[indices].style.transition = "all 0.4s ease"
                    gridRefs.current[indices].children[0].style.transition = "all 0.4s ease"
                    parentRefs.current[indices].children[0].style.transition = "all 0.4s ease"
                    parentRefs.current[indices].children[0].style.display = "flex"
                    outerRefs.current[indices].style.border = "1px rgb(253 224 71/ 1) solid"
                    gridRefs.current[indices].children[0].style.backgroundColor = "rgb(253 224 71/ 1)"
                  }
                  else {
                    parentRefs.current[indices].children[0].style.display = "none"
                    outerRefs.current[indices].style.border = "none"
                    gridRefs.current[indices].children[0].style.backgroundColor = "rgb(30 41 59/1)"
                  }
                })
              }} ref={(el) => (parentRefs.current[index] = el)} key={index} style={{ height: "64px" }} className="cells flex justify-center items-center relative z-[2] w-[78vw] h-16 m-auto mb-8 mt-7 ml-1 bg-slate-900">
                <div style={{ display: "none" }} className="flex justify-center gap-3 items-center rounded-md absolute z-[3] top-[-3vh] right-10 w-[10vw] h-[5vh] bg-yellow-800 shadow-sm shadow-black">
                  <Image className="p-[2.5px] rounded-md hover:bg-yellow-950 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" />
                  <Image className="p-[2.5px] rounded-md hover:bg-yellow-950 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" />
                  <Image className="p-[3px] rounded-md hover:bg-yellow-950 cursor-pointer" src="/trash_can.png" width={22} height={22} alt="play_icon" />
                </div>
                <div ref={(el) => (gridRefs.current[index] = el)} style={{ height: "64px" }} className="grid grid-cols-[0.3vw_3.2vw] grid-rows-[32px_32px] absolute left-0 w-[3.5vw] h-16 ">
                  <div className="rounded-md col-start-1 col-end-2 row-start-1 row-span-3 bg-slate-800"></div>
                  <div className="flex justify-center items-center col-start-2 col-end-3 row-start-1 row-end-2"><Image onClick={() => {
                    runProgram(textArea[index])
                  }} className="p-[2.5px] rounded-md hover:bg-gray-700 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" /></div>
                  <div className="gridChild col-start-2 col-end-3 row-start-2 row-end-4 font-light mb-1">{`[ ]`}</div>
                </div>
                <div ref={(el) => (outerRefs.current[index] = el)} style={{ height: "64px" }} className="flex justify-center items-center absolute top-0 right-0 w-[74.5vw] h-16 bg-slate-800">
                  <textarea value={[...textArea][index]} onChange={(e) => {
                    settextArea((textArea) => {
                      const updatedTextArea = [...textArea]
                      updatedTextArea[index] = e.target.value
                      return updatedTextArea
                    })
                  }} onInput={(e) => {
                    if (inputRefs.current[index] || outerRefs.current[index]) {
                      inputRefs.current[index].style.height = "20px";
                      inputRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight - 1}px`;
                      outerRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                      parentRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                      gridRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                    }
                  }} key={index} ref={(el) => (inputRefs.current[index] = el)} style={{ height: "20px" }} spellCheck="false" className="textarea text border-[0.2px] justify-start items-center focus:outline-none h-[20px] resize-none inline-block ml-5 bg-slate-800 w-[71vw] overflow-hidden"></textarea>
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  )
}
``
export default page