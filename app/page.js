"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useJupyter } from "@/components/animationText/useJupyter"
import { useNotebook } from "@/components/animationText/useNotebook"
import { useJava } from "@/components/animationText/useJava"
import Login from "@/components/login/login";
import "./app.css";

export default function Home() {
  const jupyter = useJupyter('Jupyter')
  const notebook = useNotebook('Notebook')
  const java = useJava('Java')
  const textBanner = useRef()
  const imgBanner = useRef()
  const descritpion = useRef()
  const childDescritpion = useRef()

  useEffect(() => {
    if (textBanner.current) {
      textBanner.current.style.transition = "all 2s ease"
      textBanner.current.classList.remove('opacity-0')
      textBanner.current.classList.add('opacity-1')
      textBanner.current.classList.remove('scale-50')
    }

    if (imgBanner.current) {
      imgBanner.current.style.transition = "all 2s ease"
      imgBanner.current.classList.remove('opacity-0')
      imgBanner.current.classList.add('opacity-1')
      imgBanner.current.classList.add('rotate-[360deg]')
      imgBanner.current.classList.remove('scale-50')
    }

    if (descritpion.current) {
      descritpion.current.style.transition = 'all 2s ease'
      descritpion.current.classList.remove('opacity-0')
      descritpion.current.classList.add('opacity-1')
      descritpion.current.classList.remove('scale-50')
    }

    if (childDescritpion.current) {
      childDescritpion.current.style.transition = "all 4s ease"
      childDescritpion.current.style.transitionDelay = "2s"
      childDescritpion.current.classList.remove('opacity-0')
      childDescritpion.current.classList.add('opacity-1')
    }
  }, [])


  return (
    <>
      <div className='relative z-[5] banner flex justify-center text-center items-center rounded-2xl pt-7 pb-9 mt-5 w-[70vw] h-[35vh] m-auto'>
        <div className="flex flex-col items-center w-[70vw] justify-between gap-6">
          <div className="flex items-center gap-4">
            <div ref={imgBanner} className="w-20 h-20 transform scale-50 opacity-0"><img className="js-img shadow-lg shadow-black rounded-lg" src="/js_logo.png" alt="" /></div>
            <div ref={textBanner} className="flex w-80 flex-col text-4xl transform scale-50 opacity-0">
              <div className="flex gap-1">
                <span className='w-36 h-11 text inline-block font-bold'>Jupyter</span>
                <span className='w-40 h-11 text inline-block font-bold'>Notebook</span>
              </div>
              <div className="flex gap-1 items-baseline">
                <span className='w-20 m-1 text inline-block font-bold'>Java</span>
                <span className='w-30 text inline-block text-yellow-300 font-bold'>Script<span className="text-white text-2xl ml-[2px]">.ijsnb</span></span>
              </div>
            </div>
          </div>
          <div ref={descritpion} className="flex transform scale-50 opacity-0 justify-center items-center relative description text-yellow-100 w-[70vw] pb-5 p-1 px-4 text text-sm font-mono font-bold">
            Used by developers worldwide, JavaScript Notebook empowers you to write, run, and experiment with JavaScript code in an interactive notebook interface, combining real-time execution with a user-friendly environment for seamless coding experiences.
            <div ref={childDescritpion} className="flex justify-center items-start absolute top-6 z-[3] rounded-md border-[1px] transform opacity-0 border-yellow-300 w-[90vw] h-[70vh]">
              <div className="absolute top-[-2px] z-[4] w-[70vw] h-[2px] bg-gray-900"></div>
              <div className="flex justify-between items-center absolute top-20 w-[85vw] h-[50vh]">
                <div className="w-[50vw] relative h-[50vh]">
                  <Image className="absolute z-[4] top-0 left-0 shadow-md transition-all hover:-top-2 shadow-black rounded-md" src="/dashboard.png" width={500} height={500} alt="play_icon" />
                  <Image className="absolute z-[5] bottom-0 right-0 shadow-md transition-all hover:bottom-2 shadow-black rounded-md" src="/cellsImage.png" width={500} height={500} alt="play_icon" />
                </div>
                <div className="flex justify-center items-center w-[40vw] h-[50vh]">
                  <span className="para text_style text-white p-7 ml-7 font-normal">
                    <span className="text-2xl font-bold">Script <span className="text-yellow-300">LAB</span></span>
                    <span className="paraSpan2 text-lg font-semibold">A JavaScript-Based Interactive Notebook</span>
                    <span className="text-sm inline-block">Script Lab lets users write, execute, and organize JavaScript code in a notebook format with real-time execution and syntax highlighting. It offers an intuitive interface, perfect for developers, educators, and learners.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start relative z-[2] bottom-52 w-[100vw] m-auto h-[40vh]">
        <Image className="opacity-10" src="/cellimage.png" width={900} height={900} alt="play_icon" />
      </div>
    </>
  )
}
