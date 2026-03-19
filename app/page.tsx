'use client'

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

import Slider from '@/components/Slider'
import MobileProjectCard from "@/components/MobileProjectCard"
import MobileAboutModal from "@/components/MobileAboutModal"
import { useIsMobile } from "@/hooks/useIsMobile"

interface Project {
  id: number | string;
  type?: 'menu' | 'project';
  image?: string;
  name?: string;
  about?: string;
  link?: string;
}

const PROJECTS: Project[] = [
  { id: 'menu', type: 'menu' },
  { id: 1, image: '/projects/bioplastic.avif', name: 'SEAWEED BIOPLASTIC', about: 'During summer 2023, I created custom bioplastics from seaweed and made a detailed journal of all my experiments.', link: 'https://nicholsonlabs.gitbook.io/labs/bioplastic' },
  { id: 5, image: '/projects/stratoSoarMK2.png', name: 'STRATOSOAR', about: 'This is my main and largest project, taking place over the course of 3 and a half years. StratoSoar is a low-cost, lightweight UAV designed for deployment from weather balloons. It flies autonomously to GPS coordinates, providing an affordable alternative to conventional UAVs for educators, researchers, and hobbyists.', link: 'https://github.com/crnicholson/StratoSoar-MK3' },
  // { id: 6, image: '/projects/hamClub.png', title: '' },
  { id: 4, image: '/projects/carbon.jpeg', name: 'DIY CARBON CAPTURE', about: 'I developed one of the first at-home implementations of carbon capture technology using readily available materials, then made a complete guide to make your own.', link: 'https://nicholsonlabs.gitbook.io/labs/carbon-capture' },
  { id: 7, image: '/projects/outfits.png', name: 'OUTFIT GENERATOR', about: 'I often find it annoying to create an outfit before school, so I made a tool that lets me view my wardrobe and randomize outfits.', link: 'https://outfits.crnicholson.com' },
  { id: 12, image: '/projects/woodworks.jpeg', name: 'WOODWORKING BUSINESS', about: 'For three years, I developed my own woodworking business, selling handmade and carved crafts. I profited over $2000 and opened an Etsy store before closing it to focus on other projects.', link: 'https://cochituatewoodworks.wixsite.com/website-2' },
  // { id: 8, image: '/projects/fonts.png', name: 'FONTS', about: 'Finding display fonts is hard, so I made a collection for mainly my personal use.', link: 'https://fonts.crnicholson.com' },
  // { id: 3, image: '/projects/beantown.jpeg', name: 'CV RESISTOR DETECTOR', about: 'This won first place at the 2023 Beantown Bash Hackathon. It uses OpenCV to categorize the colors of the bands on a resistor to determine the value of it.', link: 'https://github.com/mpkendall/resistorfinder' },
  { id: 2, image: '/projects/apex.png', name: 'APEX', about: 'I was a lead organizer for Apex, a 3-month-long hackathon culminating in a launch of 15 student projects into near space on a high-altitude weather balloon. We managed to raise over $15,000 and allowed novel hardware projects to be launched.', link: 'https://apex.hackclub.com' },
  { id: 9, image: '/projects/hackfinger.gif', name: 'NERVE CONTROLLED FINGER', about: 'I developed a custom circuit for processing nerve signals along with a custom finger to display the signals.' },
  { id: 10, image: '/projects/v3.png', name: 'V3 WEBSITE', about: `I'm passionate that the web is becoming an increasingly mundane and boring world where we have to learn about people through text on a screen. As an auxillary personal website, I developed a website that allows people to experience who I really am.`, link: 'https://v3.crnicholson.com' },
  { id: 13, image: '/projects/softrobotics.png', name: 'SOFT ROBOTICS', about: `I designed a series of novel silicone-based soft robotic grippers.` },
  { id: 14, image: '/projects/foldingglider.png', name: 'FOLDING GLIDER', about: `I designed a glider laser cut from one flat peice of cardboard to fold into a flying wing shape with correct airfoil geometry. I also designed a parametric design software that calculated all the parameters for the laser cutter based on the weight and cardboard density.` },
  { id: 15, image: '/projects/soldering.png', name: 'SOLDERING STATION', about: `I designed an 8-foot long fully-custom soldering and electronics workbench right next to my bed!` },
  // { id: 11, image: '/projects/littleLora.png', title: '' },
];

export default function Home() {
  const isMobile = useIsMobile();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (isMobile) {
    return (
      <div
        className="absolute min-h-screen bg-gray-50 flex justify-start items-end p-10 w-screen invert"
        style={{ textShadow: "1px 0 #f3ff00, 0px -1px #f3ff00, -1px 0 #f3ff00, 0 1px #f3ff00" }}
      >
        <MobileAboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

        {/* <div className="p-8">
          <h1 className="text-xl font-walter mb-5 mt-10">HI, I'M CHARLIE</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/cv" className="text-xs bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-800">
              Experiences
            </Link>
            <Link href="mailto:charlienicholsonr@gmail.com" className="text-xs border px-3 py-2 rounded hover:bg-gray-100">
              Email me
            </Link>
          </div>

          <div className="mb-4">
            <h2 className="font-walter text-sm mb-4">projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {PROJECTS.map((project) => (
                <MobileProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </div> */}

        <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
          <div
            className="absolute inset-0 w-full h-full bg-[url('/face.svg')] bg-no-repeat bg-bottom opacity-10"
          />
        </div>

        <div className="z-10">
          <Image
            src="/me.jpg"
            alt="me"
            width={200}
            height={200}
            className="mb-10 invert"
          />

          <div className="font-walter uppercase text-3xl flex flex-col gap-3">
            <h1 className="mb-4">table of contents</h1>
            <a onClick={() => setAboutOpen(!aboutOpen)}>1. about</a>
            <h1>2. projects</h1>
            <h1>3. experiences + skills</h1>
            <h1>4. socials</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative bg-gray-50">
        <Slider projects={PROJECTS} onAboutClick={() => setAboutOpen(!aboutOpen)} onSocialsClick={() => setSocialsOpen(!socialsOpen)} />
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