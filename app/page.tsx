'use client'

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

import { useIsMobile } from "@/hooks/useIsMobile"
import TiledGallery, { GalleryImage } from "@/components/TiledGallery"

interface Project {
  id: number | string;
  type?: 'menu' | 'project';
  image?: string;
  images?: GalleryImage[];
  name?: string;
  about?: string;
  link?: string;
}

const PROJECTS: Project[] = [
  { id: 'menu', type: 'menu' },
  {
    id: 5, image: '/projects/stratosoar/1.png', name: 'STRATOSOAR', about: 'This is my main and largest project, taking place over the course of 3 and a half years. StratoSoar is a low-cost, lightweight UAV designed for deployment from weather balloons. It flies autonomously to GPS coordinates, providing an affordable alternative to conventional UAVs for educators, researchers, and hobbyists.', link: 'https://github.com/crnicholson/StratoSoar-MK3',
    images: [
      { src: '/projects/stratosoar/2.png', width: 1051, height: 887 },
      { src: '/projects/stratosoar/3.png', width: 771, height: 1028 },
      { src: '/projects/stratosoar/4.png', width: 4032, height: 3024 },
    ],
  },
  {
    id: 1, image: '/projects/bioplastic/1.avif', name: 'SEAWEED BIOPLASTIC', about: 'During Summer 2023, I created custom bioplastics from seaweed and made a detailed journal of all my experiments.', link: 'https://nicholsonlabs.gitbook.io/labs/bioplastic',
    images: [
      { src: '/projects/bioplastic/2.PNG', width: 771, height: 1028 },
      { src: '/projects/bioplastic/3.PNG', width: 771, height: 1028 },
      { src: '/projects/bioplastic/4.PNG', width: 771, height: 1028 },
    ],
  },
  { id: 19, image: '/projects/mr-spiky.png', name: 'MR. SPIKY', about: 'Mr. Spiky is an "Intuition Compiler" that utilizes a Spiking Neural Network (SNN) trained on senior-approved Python code to identify structurally unusual and overly complex lines of code. It processes code sequentially, line-by-line, allowing the network to accumulate context and flag lines that a human reviewer would typically object to, such as deep nesting or tangled variable states.', link: 'https://mr-spiky.crnicholson.com' },
  // { id: 6, image: '/projects/hamClub.png', title: '' },
  {
    id: 4, image: '/projects/carbon/1.JPEG', name: 'DIY CARBON CAPTURE', about: 'I developed one of the first at-home implementations of carbon capture technology using readily available materials, then made a complete guide to make your own.', link: 'https://nicholsonlabs.gitbook.io/labs/carbon-capture',
    images: [
      { src: '/projects/carbon/2.PNG', width: 720, height: 504 },
      { src: '/projects/carbon/3.jpeg', width: 4032, height: 3024 },
    ],
  },
  { id: 16, image: '/projects/capitol-api.png', name: 'CAPITOL API', about: 'The first ever free, open source, and self-hostable API for accessing trades by Congress members.', link: 'https://capitol.crnicholson.com' },
  { id: 9, image: '/projects/hackfinger.gif', name: 'NERVE CONTROLLED FINGER', about: 'I developed a custom circuit for processing nerve signals along with a custom finger to display the signals.' },
  { id: 3, image: '/projects/beantown.jpeg', name: 'CV RESISTOR DETECTOR', about: 'This won first place at the 2023 Beantown Bash Hackathon. It uses OpenCV to categorize the colors of the bands on a resistor to determine the value of it.', link: 'https://github.com/mpkendall/resistorfinder' },
  { id: 13, image: '/projects/softrobotics.png', name: 'SOFT ROBOTICS', about: `I designed a series of novel silicone-based soft robotic grippers to allow for delicate and precise manipulation of objects.` },
  { id: 2, image: '/projects/apex.png', name: 'APEX', about: 'I was a lead organizer for Apex, a 3-month-long hackathon culminating in a launch of 15 student projects into near space on a high-altitude weather balloon. We managed to raise over $15,000 and cultivated many novel hardware projects.', link: 'https://apex.hackclub.com' },
  { id: 7, image: '/projects/outfits.png', name: 'OUTFIT GENERATOR', about: 'I often find it annoying to create an outfit before school, so I made a tool that lets me view my wardrobe and randomize outfits.', link: 'https://outfits.crnicholson.com' },
  { id: 15, image: '/projects/bitstream.png', name: 'BITSTREAM', about: 'I created a program that gives free FPGAs and hardware to teens so they can learn advanced digital design and programming skills.', link: 'https://bitstream.hackclub.com' },
  { id: 10, image: '/projects/v3.png', name: 'V3 WEBSITE', about: `I'm passionate that the web is becoming an increasingly mundane and boring world where we have to learn about people through text on a screen. As an auxillary personal website, I developed a website that allows people to experience who I really am.`, link: 'https://v3.crnicholson.com' },
  { id: 12, image: '/projects/woodworks.jpeg', name: 'WOODWORKING BUSINESS', about: 'For three years, I developed my own woodworking business, selling handmade and carved crafts. I profited over $2000 and opened an Etsy store before closing it to focus on other projects.', link: 'https://cochituatewoodworks.wixsite.com/website-2' },
  { id: 14, image: '/projects/foldingglider.png', name: 'FOLDING GLIDER', about: `I designed a glider laser cut from one flat peice of cardboard to fold into a flying wing shape with correct airfoil geometry. I also designed a parametric design software that calculated all the parameters for the laser cutter based on the weight and cardboard density.` },
  { id: 8, image: '/projects/fonts.png', name: 'FONTS', about: 'Finding display fonts is hard, so I made a collection for mainly my personal use.', link: 'https://fonts.crnicholson.com' },
  // { id: 15, image: '/projects/soldering.png', name: 'SOLDERING STATION', about: `I designed an 8-foot long fully-custom soldering and electronics workbench right next to my bed!` },
  // { id: 11, image: '/projects/littleLora.png', title: '' },
];

export default function Home() {
  const isMobile = useIsMobile();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [socialsOpen, setSocialsOpen] = useState(false);
  // const [settingsOpen, setSettingsOpen] = useState(false);

  if (isMobile) {
    return (
      <div
        className="absolute min-h-screen bg-gray-50 flex items-center justify-between p-10 w-screen"
      // style={{ textShadow: "1px 0 #f3ff00, 0px -1px #f3ff00, -1px 0 #f3ff00, 0 1px #f3ff00" }}
      >
        {/* <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
          <div
            className="absolute inset-0 w-full h-full bg-[url('/face.svg')] bg-no-repeat bg-top opacity-10"
          />
        </div>
        <p className="mb-10 font-walter uppercase text-lg">charlie nicholson</p> */}

        <div className="z-10">
          <Image
            src="/third-me.png"
            alt="me"
            width={200}
            height={200}
            className="mb-6"
          />
          <p className="mb-6 text-gray-600 text-sm">(Note: to see my projects and more about me, please access this website on a larger screen.)</p>
          <p className="mb-4">Hi, I'm Charlie. I am a 16-year-old from the Boston area.</p>
          <p className="mb-4">I've worn many hats over the years, but currently I'm GitHub's youngest intern and a software engineer at a NYC-based stealth startup. In the background, I'm working on my own startup focusing on robotics and AI. If you want to learn more about my past experiences, navigate to <Link className="underline" href="/cv">this</Link> page.</p>
          <p className="mb-4">I like to work at the intersection of software and hardware, and especially designing the systems to combine the two. I also dabble in different areas of design (web, graphic, fashion), although I'm not very good at it :).</p>
          <p className="mb-4">If I'm not creating something, you can probably find me listening to <Link className="underline" href="https://open.spotify.com/user/31ybjmvbe7siydivevnk37vditjq?si=a79d39522b4747f3">music</Link>, biking, or enjoying nature.</p>
          <p className="mb-4">Find me online here: <Link className="underline" href="https://github.com/crnicholson">GitHub</Link>, <Link className="underline" href="https://www.linkedin.com/in/crnicholson/">LinkedIn</Link>, <Link className="underline" href="https://x.com/nnnicholson">Twitter</Link>, and <Link className="underline" href="https://www.instagram.com/charliennnicholson/">Instagram</Link>.</p>
          <p className="mb-6">PS: <Link className="underline" href="mailto:charlienicholsonr@gmail.com">my email</Link> is very open and I'd love to talk to you!</p>
          {/* <p className="">PS: I worked at <Link className="underline" href="https://hackclub.com/">Hack Club</Link> last Summer. I am looking for internship opportunities this Summer, 2026! Please reach out to me if you have any leads. If you are interested, you can also <Link className="underline" href="mailto:charlienicholsonr@gmail.com?subject=I%20would%20like%20a%20resume">request a resume</Link> from me.</p> */}

          {/* <div className="font-walter uppercase text-3xl flex flex-col gap-3">
            <h1 className="mb-4">table of contents</h1>
            <a onClick={() => setAboutOpen(!aboutOpen)}>1. about</a>
            <h1>2. projects</h1>
            <a href="/cv">3. experiences + skills</a>
          </div> */}
        </div>
      </div>
    );
  }

  const handleProjectMouseEnter = (project: Project, e: React.MouseEvent) => {
    if (project.about || project.link) {
      setHoveredProject(project);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleProjectMouseMove = (e: React.MouseEvent) => {
    if (hoveredProject) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleProjectMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute inset-0 w-full h-full bg-[url('/face.svg')] bg-no-repeat bg-center bg-contain opacity-5" />
        </div>

        <div className="sticky top-0 z-20 flex flex-row items-center justify-between w-full px-8 py-6 text-sm"
          style={{ textShadow: "1px 0 #ffffff, 0px -1px #fff, -1px 0 #fff, 0 1px #fff" }}
        >
          <h1>charlie</h1>
          <div
            className="flex items-center justify-center gap-2"
          >
            <p className="cursor-pointer" onClick={() => setAboutOpen(!aboutOpen)}>about</p>
            <span>|</span>
            <Link href="/cv">experiences + skills</Link>
            <span>|</span>
            <Link href="/photobook">photobook</Link>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-16 2xl:gap-30 p-8 lg:p-16 2xl:p-30">
          {PROJECTS.map((project) => (
            project.type === 'menu' ? (
              <div key={project.id} className="w-full h-full bg-white p-6 font-walter text-base lg:text-xl">
                <h1 className="text-xl lg:text-2xl mb-4">TABLE OF CONTENTS</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between items-center w-full h-fit">
                    <a href="/photobook">1. MORE PROJECTS + VISUAL JOURNEY THROUGH MY MAKING</a>
                    <h1>→</h1>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full h-fit">
                    <a className="cursor-pointer" onClick={() => setAboutOpen(!aboutOpen)}>2. ABOUT</a>
                    <h1>→</h1>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full h-fit">
                    <a href="/cv">3. EXPERIENCES + SKILLS</a>
                    <h1>→</h1>
                  </div>
                  {/* <div className="flex flex-row justify-between items-center w-full h-fit">
                    <a className="cursor-pointer" onClick={() => setSocialsOpen(!socialsOpen)}>4. SOCIALS</a>
                    <h1>→</h1>
                  </div> */}
                </div>
              </div>
            ) : (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden w-fit"
                onMouseEnter={(e) => handleProjectMouseEnter(project, e)}
                onMouseMove={handleProjectMouseMove}
                onMouseLeave={handleProjectMouseLeave}
              >
                <div className="flex flex-row justify-between items-center w-full font-walter text-shadow-none mb-1">
                  <h1 className="text-xs">{project.name}</h1>
                  <h1 className="text-xs">→</h1>
                </div>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.name || 'Project'}
                    width={600}
                    height={400}
                    className="w-auto h-100 object-cover"
                  />
                )}
              </a>
            )
          ))}
        </div>

        {/* <div className="sticky bottom-0 z-20 flex flex-row items-center justify-between w-full px-8 py-6 text-sm">
          <h1 className="hover:text-shadow-none cursor-pointer" onClick={() => setSettingsOpen(!settingsOpen)}>settings</h1>
          <div>
          </div>
          <Link href="https://www.instagram.com/charliennnicholson/" className="hover:text-shadow-none">@charliennnicholson</Link>
        </div> */}
      </div>

      {hoveredProject && (hoveredProject.about || hoveredProject.link) && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
          }}
        >
          <div className="bg-white border border-black shadow-lg p-4 max-w-md text-shadow-none">
            <h2 className="font-walter text-xs mb-2">{hoveredProject.name}</h2>
            {hoveredProject.images && hoveredProject.images.length > 0 && (
              <div className="mb-2">
                <TiledGallery images={hoveredProject.images} />
              </div>
            )}
            {hoveredProject.about && (
              <p className="text-xs leading-relaxed">{hoveredProject.about}</p>
            )}
            {hoveredProject.link && (
              <p className="text-xs mt-2 opacity-60">(click anywhere to view project)</p>
            )}
          </div>
        </div>
      )}

      {aboutOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center p-8 bg-black/30"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="max-w-2xl bg-gray-50 text-shadow-none p-6 border"
            onClick={(event) => event.stopPropagation()}
          >
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
            <p className="mb-4">Hi, I'm Charlie. I am a 16-year-old from the Boston area.</p>
            <p className="mb-4">I've worn many hats over the years, but currently I'm GitHub's youngest intern and a software engineer at a NYC-based stealth startup. In the background, I'm working on my own startup focusing on robotics and AI. If you want to learn more about my past experiences, navigate to <Link className="underline" href="/cv">this</Link> page.</p>
            <p className="mb-4">I like to work at the intersection of software and hardware, and especially designing the systems to combine the two. I also dabble in different areas of design (web, graphic, fashion), although I'm not very good at it :).</p>
            <p className="mb-4">If I'm not creating something, you can probably find me listening to <Link className="underline" href="https://open.spotify.com/user/31ybjmvbe7siydivevnk37vditjq?si=a79d39522b4747f3">music</Link>, biking, or enjoying nature.</p>
            <p className="mb-4">Find me online here: <Link className="underline" href="https://github.com/crnicholson">GitHub</Link>, <Link className="underline" href="https://www.linkedin.com/in/crnicholson/">LinkedIn</Link>, <Link className="underline" href="https://x.com/nnnicholson">Twitter</Link>, and <Link className="underline" href="https://www.instagram.com/charliennnicholson/">Instagram</Link>.</p>
            <p className="mb-6">PS: <Link className="underline" href="mailto:charlienicholsonr@gmail.com">my email</Link> is very open and I'd love to talk to you!</p>
            {/* <p className="mb-4">PS: I worked at <Link className="underline" href="https://hackclub.com/">Hack Club</Link> last Summer. I am looking for internship opportunities this Summer, 2026! Please reach out to me if you have any leads. If you are interested, you can also <Link className="underline" href="mailto:charlienicholsonr@gmail.com?subject=I%20would%20like%20a%20resume">request a resume</Link> from me.</p> */}

            <div className="flex flex-row items-center w-full h-fit gap-10">
              <Image
                src="/third-me.png"
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