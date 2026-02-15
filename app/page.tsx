'use client'

import Link from "next/link"
import { useState } from "react"

import Slider from '@/components/Slider'

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative">
        <Slider />
        <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_80px_0_300px_rgba(255,255,255,1),inset_-80px_0_300px_rgba(255,255,255,1)]" />

        <div className="pointer-events-none absolute inset-0 z-20 h-screen w-full flex flex-col items-center justify-between">
          <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6">
            <h1 className="">charlie</h1>
            <h1 className="hover:text-shadow-none pointer-events-auto" onClick={ () => setAboutOpen(!aboutOpen)}>about</h1>
          </div>
          <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6">
            <h1 className="hover:text-shadow-none pointer-events-auto" onClick={() => setSettingsOpen(!settingsOpen)}>settings</h1>
            <Link href="https://www.instagram.com/charliennnicholson/" className="hover:text-shadow-none pointer-events-auto">@charliennnicholson</Link>
          </div>
        </div>
      </div>
      <div className="inset-0 absolute z-30">
        {aboutOpen && (
          <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="max-w-2xl text-center">
              <h2 className="text-3xl mb-4">About Me</h2>
              <p className="text-lg">I'm charlie, a designer and developer based in the UK. I have a passion for creating unique digital experiences that blend creativity and technology. With a background in both design and development, I enjoy working on projects that challenge the boundaries of what's possible on the web.</p>
            </div>
          </div>
        )}
        {settingsOpen && (
          <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="max-w-2xl text-center">
              <h2 className="text-3     xl mb-4">Settings</h2>
              <p className="text-lg">Settings content goes here. You can customize your experience by adjusting various options and preferences. Stay tuned for more features and updates!</p>
            </div>
          </div>
        )}  
      </div>
    </>
  )
}