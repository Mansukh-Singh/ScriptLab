"use client"
import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import runProgram from './runProgram'
import './project.css'
import { sendError } from 'next/dist/server/api-utils'
import connectToUserProjectDatabase from '@/app/api/server/lib/userProjectMongodb'

const Page = ({ params }) => {

  const [rotateOutput, setrotateOutput] = useState(false)
  const [rotateImage, setrotateImage] = useState([])
  const [runCount, setRunCount] = useState([])
  const [outputText, setoutputText] = useState([])
  const [upperparent, setupperparent] = useState([])
  const [savecolor, setsavecolor] = useState(true)
  const saveBox = useRef()
  const projectRef = useRef();
  const actionIcons = useState(false)
  const projectNameDropDown = useRef();
  const [drop, setdrop] = useState(false)
  const [cells, setcells] = useState([])
  const [cellsName, setcellsName] = useState({ collectionName: decodeURIComponent(params.slug), projectName: decodeURIComponent(params.project) })
  const [collectionName, setcollectionName] = useState({ collectionName: decodeURIComponent(params.slug) })
  const [userProjectList, setuserProjectList] = useState([])
  const [textArea, settextArea] = useState([])
  const [cellsheight, setcellsheight] = useState([])
  const [outputheight, setoutputheight] = useState([])
  const runButton = useRef()
  const inputRefs = useRef([])
  const outerRefs = useRef([])
  const parentRefs = useRef([])
  const gridRefs = useRef([])
  const countRefs = useRef([])
  const parentoutputRefs = useRef([])
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
    settextArea((textArea) => {
      const updatedTextArea = cells.map(cell => cell.replace(/\\n/g, '\n'))
      return updatedTextArea
    })
    setupperparent((upperparent) => {
      const updatedupperparent = new Array(textArea.length).fill('');
      return updatedupperparent
    })
    setoutputText((outputText) => {
      const updatedoutputText = new Array(textArea.length).fill('');
      return updatedoutputText
    })
    setoutputheight((outputheight) => {
      const updatedoutputheight = new Array(textArea.length).fill(-1);
      return updatedoutputheight
    })
    setRunCount((runCount) => {
      const array = new Array(cells.length).fill(0);
      return array
    })
    setrotateImage((rotateImage) => {
      const array = new Array(cells.length).fill(false)
      return array
    })
    setcellsheight((cellsheight) => {
      let updatedcellsheight = [...cellsheight]
      textArea.forEach((e, i) => {
        let nestedcellsheight = {}
        nestedcellsheight['input'] = 20 + (e.split('\n').length - 1) * 21
        nestedcellsheight['parent'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['grid'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['outer'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['upperparent'] = 64 + (e.split('\n').length - 1) * 21
        updatedcellsheight.push(nestedcellsheight)
      })
      return updatedcellsheight
    })
  }, [cells])

  const projectDivClick = () => {
    setdrop(!drop)
  }

  useEffect(() => {
    console.log('Upperparent:', upperparent)
  }, [upperparent])


  const saveCells = async () => {
    let response = await fetch("/api/userProjectcells", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textArea: textArea, collectionName: decodeURIComponent(params.slug), projectname: decodeURIComponent(params.project) }),
    });
    let result = await response.json();
    setsavecolor(true)
  }

  useEffect(() => {
    if (projectRef.current || projectNameDropDown.current) {
      if (drop) {
        projectRef.current.classList.add("rotate-0")
        projectNameDropDown.current.style.transition = 'all 0.5s ease'
        projectNameDropDown.current.style.maxHeight = '70vh'

      }
      else {
        projectRef.current.classList.remove("rotate-0")
        projectNameDropDown.current.style.transition = 'all 0.5s ease'
        projectNameDropDown.current.style.maxHeight = '0vh'
      }
    }
  }, [drop])

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
          parentoutputRefs.current[indices].children[0].children[0].style.backgroundColor = "rgb(253 224 71/ 1)"
        }
        else {
          parentRefs.current[indices].children[0].style.display = "none"
          outerRefs.current[indices].style.border = "none"
          gridRefs.current[indices].children[0].style.backgroundColor = "rgb(30 41 59/1)"
          parentoutputRefs.current[indices].children[0].children[0].style.backgroundColor = "rgb(30 41 59/1)"
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
      setupperparent((upperparent) => {
        const updatedupperparent = [...upperparent]
        updatedupperparent.push('')
        return updatedupperparent
      })
      setoutputText((outputText) => {
        const updatedoutputText = [...outputText]
        updatedoutputText.push('')
        return updatedoutputText
      })
      setoutputheight((outputheight) => {
        const updatedoutputheight = [...outputheight]
        updatedoutputheight.push(-1)
        return updatedoutputheight
      })
      setRunCount((runCount) => {
        const updatedRunCount = [...runCount]
        updatedRunCount.push(0)
        return updatedRunCount
      })
      setrotateImage((rotateImage) => {
        const updatedRotatedImage = [...rotateImage]
        updatedRotatedImage.push(false)
        return updatedRotatedImage
      })
      const textAreaLength = textArea.length
      setSelectIndex(textAreaLength)
      setcellsheight((cellsheight) => {
        const updatedcellsheight = [...cellsheight]
        const nestedcellsheight = {}
        nestedcellsheight['input'] = 20
        nestedcellsheight['parent'] = 64
        nestedcellsheight['grid'] = 64
        nestedcellsheight['outer'] = 64
        nestedcellsheight['upperparent'] = 64
        updatedcellsheight.push(nestedcellsheight)
        return updatedcellsheight
      })
    }
    else {
      if (parentoutputRefs.current[selectIndex + 1]) {
        parentoutputRefs.current[selectIndex + 1].style.transition = "none"
        parentoutputRefs.current[selectIndex + 1].children[0].style.transition = "none"
        parentoutputRefs.current[selectIndex + 1].children[1].style.transition = "none"
        parentoutputRefs.current[selectIndex + 1].children[1].children[0].style.transition = "none"
      }
      settextArea((textArea) => {
        const addedCell = [...textArea]
        addedCell.splice(selectIndex + 1, 0, '')
        return addedCell
      })
      setupperparent((upperparent) => {
        const updatedupperparent = [...upperparent]
        updatedupperparent.splice(selectIndex + 1, 0, '')
        return updatedupperparent
      })
      setoutputText((outputText) => {
        const updatedoutputText = [...outputText]
        updatedoutputText.splice(selectIndex + 1, 0, '')
        return updatedoutputText
      })
      setoutputheight((outputheight) => {
        const updatedoutputheight = [...outputheight]
        updatedoutputheight.splice(selectIndex + 1, 0, -1)
        return updatedoutputheight
      })
      setRunCount((runCount) => {
        const updatedRunCount = [...runCount]
        updatedRunCount.splice(selectIndex + 1, 0, 0)
        return updatedRunCount
      })
      setrotateImage((rotateImage) => {
        const updatedRotatedImage = [...rotateImage]
        updatedRotatedImage.splice(selectIndex + 1, 0, false)
        return updatedRotatedImage
      })
      setSelectIndex(selectIndex + 1)
    }
  }

  useEffect(() => {
    setcellsheight((cellsheight) => {
      let updatedcellsheight = []
      textArea.forEach((e, i) => {
        let nestedcellsheight = {}
        nestedcellsheight['input'] = 20 + (e.split('\n').length - 1) * 21
        nestedcellsheight['parent'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['grid'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['outer'] = 64 + (e.split('\n').length - 1) * 21
        nestedcellsheight['upperparent'] = 64 + (e.split('\n').length - 1) * 21
        updatedcellsheight.push(nestedcellsheight)
      })
      return updatedcellsheight
    })
  }, [textArea])

  const deleteIndex = () => {
    if (parentoutputRefs.current[selectIndex]) {
      parentoutputRefs.current[selectIndex].children[1].children[0].innerHTML = ''
      parentoutputRefs.current.splice(selectIndex, 1)
    }
    outputText.map((e, i) => {
      if (parentoutputRefs.current[i]) {
        parentoutputRefs.current[i].style.transition = "none"
        parentoutputRefs.current[i].children[0].style.transition = "none"
        parentoutputRefs.current[i].children[1].style.transition = "none"
        parentoutputRefs.current[i].children[1].children[0].style.transition = "none"
      }
    })
    settextArea((textArea) => {
      let updatedTextArea = [...textArea]
      updatedTextArea.splice(selectIndex, 1)
      return updatedTextArea
    })
    setupperparent((upperparent) => {
      const updatedupperparent = [...upperparent]
      updatedupperparent.splice(selectIndex, 1)
      return updatedupperparent
    })
    setoutputText((outputText) => {
      const updatedoutputText = [...outputText]
      updatedoutputText.splice(selectIndex, 1)
      return updatedoutputText
    })
    setoutputheight((outputheight) => {
      const updatedoutputheight = [...outputheight]
      updatedoutputheight.splice(selectIndex, 1)
      return updatedoutputheight
    })
    setRunCount((runCount) => {
      const updatedRunCount = [...runCount]
      updatedRunCount.splice(selectIndex, 1)
      return updatedRunCount
    })
    setrotateImage((rotateImage) => {
      const updatedRotatedImage = [...rotateImage]
      updatedRotatedImage.splice(selectIndex, 1)
      return updatedRotatedImage
    })
  }
  useEffect(() => {
    setsavecolor(false)
    if (saveBox.current) {
      saveBox.current.style.transition = "all 0.5s ease"
      saveBox.current.classList.add("bg-red-500")
      saveBox.current.classList.remove("bg-green-500")
    }
  }, [textArea])

  return (
    <>
      <div className="main flex justify-center absolute w-screen">
        <div className="child_main flex-col w-[20vw] justify-end">
          <div onClick={projectDivClick} className="flex justify-start hover:bg-gray-900 gap-2 pl-5 cursor-pointer items-center h-10 w-[20vw] font-mono font-semibold text-md">
            <span ref={projectRef} className="right_arrow_image flex justify-center items-center transition-transform -rotate-90 font-mono font-semibold transform"><Image src="/chevron.png" width={10} height={10} alt="arrow_icon" /></span>
            <span className="project_text flex justify-center items-center">PROJECTS</span>
          </div>
          <div ref={projectNameDropDown} className="project_name_drop_down flex-col justify-end items-start overflow-hidden hover:overflow-y-scroll hover:overflow-x-hidden absolute top-11 left-[3vw] w-[17vw] max-h-0">
            {userProjectList.map((document, index) => {
              return <>
                <div onClick={childClick} key={index} data-project={document} className="transition-all project_text_child flex justify-start items-center hover:bg-gray-950 pl-4 w-[17vw] h-9 cursor-pointer">{`${document}.ijsnb`}</div>
              </>
            })}
          </div>
        </div>
        <div className="child_main1 flex-col justify-end items-center w-[80vw] overflow-x-hidden overflow-y-auto">
          <div className="flex relative justify-start items-center gap-2 w-[80vw] h-11">
            <div onClick={handleAddCell} className="flex transition-all justify-center gap-2 items-center ml-4 h-6 w-20 hover:bg-slate-800 rounded-md cursor-pointer">
              <span className="plus_sign text-lg pb-1 font-semibold">+</span>
              <span className="text font-semibold">Code</span>
            </div>
            <div className="flex transition-all justify-center gap-2 items-center h-6 w-28 hover:bg-slate-800 rounded-md cursor-pointer">
              <span className="plus_sign text-lg pb-1 font-semibold">+</span>
              <span className="text font-semibold">Markdown</span>
            </div>
            <div onMouseOver={runOver} onMouseLeave={runLeave} className="flex transition-all relative justify-start gap-2 items-center h-6 w-24 hover:bg-slate-800 rounded-md cursor-pointer">
              <div className="flex justify-center items-center h-6 w-8 absolute">
                <Image className="absolute left-1" src="/play_pic.png" width={16} height={16} alt="play_icon" />
                <span ref={runButton} className="flex justify-start items-center pl-0 absolute z-[2] left-2"><Image src="/play_pic.png" width={16} height={16} alt="play_icon" /></span>
              </div>
              <span className="inline-block absolute left-8 text font-semibold">Run All</span>
            </div>
            <div className='text_proname absolute flex justify-center pb-[4px] items-center w-[10vw] font-bold h-11 left-80 pr-6 text-yellow-300'>{decodeURIComponent(params.project)}</div>
            <div ref={saveBox} style={{ transition: "all 0.5s ease" }} className={`absolute w-[8px] h-[8px] right-32 ${savecolor ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
            <div onClick={saveCells} className='w-20 h-6 absolute right-10 hover:bg-slate-800 rounded-md cursor-pointer'>
              <div className="flex justify-center items-center h-6 w-8 absolute">
                <span ref={runButton} className="flex justify-start items-center pl-0 bg-gray-900 absolute z-[2] left-2"><Image src="/save.png" width={16} height={16} alt="play_icon" /></span>
              </div>
              <span className="inline-block absolute top-[1px] left-8 text font-semibold">Save</span>
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
              }} ref={(el) => (parentRefs.current[index] = el)} key={index} style={{ height: `${cellsheight[index] ? cellsheight[index].parent : 64}px` }} className={`cells flex justify-center items-center relative z-[2] w-[78vw] m-auto mb-1 mt-7 ml-1 bg-slate-900`}>
                <div style={{ display: "none" }} className="settingCells flex justify-center gap-3 items-center rounded-md absolute z-[11] top-[-3vh] right-10 w-[10vw] h-[5vh] shadow-sm shadow-black">
                  <Image className="p-[2.5px] rounded-md hover:bg-gray-800 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" />
                  <Image className="p-[2.5px] rounded-md hover:bg-gray-800 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" />
                  <Image onClick={deleteIndex} className="p-[3px] rounded-md hover:bg-gray-800 cursor-pointer" src="/trash_can.png" width={22} height={22} alt="play_icon" />
                </div>
                <div ref={(el) => (gridRefs.current[index] = el)} style={{ height: `${cellsheight[index] ? cellsheight[index].grid : 64}px` }} className={`grid grid-cols-[0.3vw_3.2vw] grid-rows-[32px_32px] absolute left-0 w-[3.5vw]`}>
                  <div className="rounded-md col-start-1 col-end-2 row-start-1 row-span-3 bg-slate-800"></div>
                  <div className="flex justify-center items-center col-start-2 col-end-3 row-start-1 transition-all row-end-2"><Image onClick={async () => {
                    if (parentoutputRefs.current[index]) {
                      parentoutputRefs.current[index].style.transition = "all 0.5s ease"
                      parentoutputRefs.current[index].children[0].style.transition = "all 0.5s ease"
                      parentoutputRefs.current[index].children[1].style.transition = "all 0.5s ease"
                      parentoutputRefs.current[index].children[1].children[0].style.transition = "all 0.5s ease"
                    }
                    if (inputRefs.current[index].value.trim() === "") {
                      setRunCount((runCount) => {
                        const updatedRunCount = [...runCount]
                        updatedRunCount[index] = 0
                        return updatedRunCount
                      })
                    }
                    else {
                      setRunCount((runCount) => {
                        const updatedRunCount = [...runCount]
                        updatedRunCount[index] += 1
                        return updatedRunCount
                      })
                    }
                    let text = textArea[index]
                    const startTime = Date.now()
                    setrotateOutput(!rotateOutput)
                    if (parentRefs.current[index] && runCount[index] != 0) {
                      setrotateImage((rotateImage) => {
                        const updatedRotatedImage = [...rotateImage]
                        updatedRotatedImage[index] = true
                        return updatedRotatedImage
                      })
                    }
                    let rP = await runProgram(text)
                    setoutputText((outputText) => {
                      const updatedoutputText = [...outputText]
                      updatedoutputText[index] = rP
                      return updatedoutputText
                    })
                    setrotateOutput(!rotateOutput)
                    if (parentRefs.current[index] && runCount[index] != 0) {
                      setrotateImage((rotateImage) => {
                        const updatedRotatedImage = [...rotateImage]
                        updatedRotatedImage[index] = false
                        return updatedRotatedImage
                      })
                    }
                    let nCounts = (rP.split('\n').length) - 2
                    setoutputheight((outputheight) => {
                      const updatedoutputheight = [...outputheight]
                      updatedoutputheight[index] = nCounts
                      return updatedoutputheight
                    })
                    const endTime = Date.now()
                    const totalTime = ((endTime - startTime) / 1000).toFixed(1)
                    if (inputRefs.current[index].value.trim() != "") {
                      setupperparent((upperparent) => {
                        const updatedupperparent = [...upperparent]
                        updatedupperparent[index] = totalTime.toString() + 's'
                        return updatedupperparent
                      })
                    }
                    if (parentoutputRefs.current[index] || parentRefs.current[index]) {
                      if (rP.length != 0) {
                        const contentHeight = nCounts * 20
                      }
                      else {
                        parentoutputRefs.current[index].children[1].children[0].style.transition = "all 0.5s ease"
                        parentoutputRefs.current[index].style.height = '0px'
                        parentRefs.current[index].children[2].children[0].children[1].innerHTML = ''
                      }
                    }
                  }} className="p-[2.5px] rounded-md hover:bg-gray-700 cursor-pointer" src="/play_pic.png" width={22} height={22} alt="play_icon" /></div>
                  <div ref={(el) => (countRefs.current[index] = el)} className="gridChild text-sm col-start-2 col-end-3 row-start-2 row-end-4 font-light mb-1">{(runCount[index] == 0) ? `[ ]` : `[${runCount[index]}]`}</div>
                </div>
                <div ref={(el) => (outerRefs.current[index] = el)} style={{ height: `${cellsheight[index] ? cellsheight[index].outer : 64}px` }} className={`flex justify-center items-center absolute z-[9] top-0 right-0 w-[74.5vw]  bg-slate-800`}>
                  <div style={{ height: `${cellsheight[index] ? cellsheight[index].upperparent : 64}px` }} className="absolute z-[7] flex justify-start items-end w-[74.5vw] h-16">
                    <div className="flex justify-center items-center w-4 h-4 ml-3 mb-[3px] text-[11px]">{runCount[index] ? (rotateImage[index] ? <span className="rotateImage" ><Image src="/rotate-right-solid.svg" width={13} height={13} /></span> : <Image src="/check-solid.svg" width={13} height={13} />) : ''}</div>
                    <div className="flex justify-center items-center text-green-300 font-light w-6 h-4 ml-3 mb-[3px] text-[11px]">{upperparent[index] ? upperparent[index] : ''}</div>
                  </div>
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
                      outerRefs.current[index].children[0].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                      parentRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                      gridRefs.current[index].style.height = `${inputRefs.current[index].scrollHeight + 43}px`;
                    }
                  }} key={index} ref={(el) => (inputRefs.current[index] = el)} style={{ height: `${cellsheight[index] ? cellsheight[index].input : 20}px` }} spellCheck="false" className={`absolute z-[10] h-[${20}px] textarea text border-[0.2px] justify-start items-center focus:outline-none resize-none inline-block ml-5 bg-slate-800 w-[71vw] overflow-hidden`}></textarea>
                </div>
              </div>
              <div ref={(el) => (parentoutputRefs.current[index] = el)} style={{ transition: `${runCount[index] ? "all 0.5s ease" : "none"}`, height: `${outputheight[index] > -1 ? 40 + (outputheight[index] * 20) : 0}px` }} className={`flex justify-center items-center w-[78vw] h-[${outputheight[index] + 1 ? 40 + (outputheight[index] * 20) : 0}px] ml-1 mb-2 overflow-hidden`}>
                <div style={{ transition: `${runCount[index] ? "all 0.5s ease" : "none"}`, height: `${outputheight[index] > -1 ? 40 + (outputheight[index] * 20) : 0}px` }} className={`flex justify-start items-center w-[3.5vw] h-[${outputheight[index] ? 40 + (outputheight[index] * 20) : 0}px]`}>
                  <div style={{ transition: `${runCount[index] ? "all 0.5s ease" : "none"}` }} className='w-[0.3vw] min-h-full bg-slate-800 rounded-md'></div>
                </div>
                <div style={{ transition: `${runCount[index] ? "all 0.5s ease" : "none"}`, height: `${outputheight[index] > -1 ? 40 + (outputheight[index] * 20) : 0}px` }} className={`flex justify-center items-center w-[74.5vw] h-[${outputheight[index] ? 40 + (outputheight[index] * 20) : 0}px]`}>
                  <span style={{ transition: `${runCount[index] ? "all 0.5s ease" : "none"}`, height: `${outputheight[index] > -1 ? 20 + (outputheight[index] * 20) : 0}px` }} className={`outputBox text flex justify-start items-start w-[72vw] p-0 h-[${outputheight[index] ? 20 + (outputheight[index] * 20) : 0}px] overflow-x-auto overflow-y-auto`} dangerouslySetInnerHTML={{ __html: outputText[index] ? outputText[index].replace(/\n/g, '<br>') : '' }}></span>
                </div>
              </div>
            </>
          })}
        </div>
      </div>
    </>
  )
}

export default Page