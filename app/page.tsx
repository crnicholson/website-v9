'use client'

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

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

      <div className="absolute inset-0 z-20 h-screen w-full flex flex-col items-center justify-between pointer-events-none text-sm">
        <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
          <h1 className="">charlie</h1>
          <span>
            <span onClick={() => setAboutOpen(!aboutOpen)}>about</span>{" "}|{" "}<Link className="cursor-none" href="/cv">experiences + skills</Link>
          </span>
        </div>
        <div className="flex flex-row items-center justify-between h-fit w-full px-8 py-6 pointer-events-auto">
          <h1 className="hover:text-shadow-none" onClick={() => setSettingsOpen(!settingsOpen)}>settings</h1>
          <Link href="https://www.instagram.com/charliennnicholson/" className="hover:text-shadow-none ">@charliennnicholson</Link>
        </div>
      </div>

      {aboutOpen && (
        <div className="inset-0 absolute z-30 h-screen flex items-center justify-center p-8 bg-black/30">
          <div className="max-w-2xl bg-gray-50 text-shadow-none p-6 border">
            <div className="flex flex-row justify-between items-center w-full h-fit mb-4">
              <h1 className="text-sm font-walter">ABOUT</h1>
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
            <p className="mb-4">Hi, I'm Charlie. I am 15-year-old who likes to create through many different mediums.</p>
            <p className="mb-4">Typically I do software, electrical, and mechanical engineering, but I also dabble in different areas of design (web, graphic, fashion), although I'm not very good at it :).</p>
            <p className="mb-4">If I'm not creating something, you can probably find me listening to <Link className="underline" href="https://open.spotify.com/user/31ybjmvbe7siydivevnk37vditjq?si=a79d39522b4747f3">music</Link>, biking, or enjoying nature.</p>
            <p className="mb-4">Find me online here: <Link className="underline" href="mailto:charlienicholsonr@gmail.com">email</Link>, <Link className="underline" href="https://github.com/crnicholson">GitHub</Link>, <Link className="underline" href="https://www.linkedin.com/in/crnicholson/">LinkedIn</Link>, and <Link className="underline" href="https://www.instagram.com/charliennnicholson/">Instagram</Link>.</p>
            <p className="mb-4">PS: I worked at <Link className="underline" href="https://hackclub.com/">Hack Club</Link> this summer. I am looking for internship opportunities this summer, 2026! Please reach out to me if you have any leads.</p>

            <div className="flex flex-row items-center w-full h-fit gap-10">
              <Image
                src="/me.jpg"
                alt="Charlie Nicholson"
                width={200}
                height={200}
              />
              <span className="">← Yes, this is I!</span>
            </div>
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