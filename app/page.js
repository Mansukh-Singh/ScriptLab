"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useJupyter } from "@/components/animationText/useJupyter"
import { useNotebook } from "@/components/animationText/useNotebook"
import { useJava } from "@/components/animationText/useJava"
import Login from "@/components/login/login";
import "./app.css";

export default function Home() {
  const jupyter = useJupyter('Jupyter')
  const notebook = useNotebook('Notebook')
  const java = useJava('Java')

  return (
    <>
      <div className='banner flex justify-center text-center items-center rounded-2xl pt-7 pb-9 mt-5 w-[70vw] h-[35vh] m-auto'>
        <div className="flex flex-col items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20"><img className="js-img shadow-lg shadow-black rounded-lg" src="/js_logo.png" alt="" /></div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <span className='w-36 h-11 text inline-block font-bold text-4xl'>Jupyter</span>
                <span className='w-40 text inline-block font-bold text-4xl'>Notebook</span>
              </div>
              <div className="flex gap-2 items-baseline">
                <span className='w-20 text inline-block font-bold text-4xl'>Java</span>
                <span className='w-30 text inline-block text-yellow-300 font-bold text-4xl'>Script</span>
              </div>
            </div>
          </div>
          <p className="description text-yellow-100 w-[70vw] pb-5 p-1 px-4 text text-sm font-mono bg-gray-900 font-bold">
            Used by developers worldwide, JavaScript Notebook empowers you to write, run, and experiment with JavaScript code in an interactive notebook interface, combining real-time execution with a user-friendly environment for seamless coding experiences.
          </p>
        </div>
      </div>
    </>
  )
}
