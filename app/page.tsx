'use client'

import Link from "next/link"
import { useState } from "react"

import Slider from '@/components/Slider'

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative bg-gray-50">
        <Slider />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_60px_0_200px_rgba(255,255,255,1),inset_-60px_0_200px_rgba(255,255,255,1)]" />

      <div className="absolute inset-0 z-20 h-screen w-full flex flex-col items-center justify-between pointer-events-none">
        <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
          <h1 className="">charlie</h1>
          <h1 className="hover:text-shadow-none" onClick={() => setAboutOpen(!aboutOpen)}>about</h1>
        </div>
        <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
          <h1 className="hover:text-shadow-none" onClick={() => setSettingsOpen(!settingsOpen)}>settings</h1>
          <Link href="https://www.instagram.com/charliennnicholson/" className="hover:text-shadow-none ">@charliennnicholson</Link>
        </div>
      </div>

      {aboutOpen && (
        <div className="inset-0 absolute z-30 h-screen flex items-center justify-center p-8 bg-black/30">
          <div className="max-w-2xl bg-gray-50 text-shadow-none p-6 border border-[#f3ff00]">
            <div className="flex flex-row justify-between items-center w-full h-fit mb-4">
              <h1 className="text-3xl">about</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => setAboutOpen(!aboutOpen)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-lg">hi, i'm charlie. i like to create through many different mediums.</p>
          </div>
        </div>
      )}
      {/* {settingsOpen && (
        <div className="absolute inset-0 z-40 bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl mb-4">Settings</h2>
            <p className="text-lg">Settings content goes here. You can customize your experience by adjusting various options and preferences. Stay tuned for more features and updates!</p>
          </div>
        </div>
      )} */}
    </>
  )
}