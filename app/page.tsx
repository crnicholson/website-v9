import Image from "next/image";

export default function Home() {
  const projects = [
    {
      url: "stratoSoarMK3.png",
      name: "StratoSoar MK3",
      date: "2024",
      link: "https://github.com/crnicholson/StratoSoar-MK3",
      description:
        "StratoSoar is an autonomous glider designed for high-altitude research. Released from a weather balloon, it navigates itself to preset GPS coordinates, offering a cost-effective way for educators, hobbyists, and researchers to conduct aerial experiments.",
    },
    {
      url: "carbon.jpeg",
      name: "Carbon Capture",
      date: "2023",
      link: "https://github.com/crnicholson/Carbon-Capture",
      description:
        "This is a DIY carbon capture machine that removes CO2 from the atmosphere, along with a complete guide on how to make your own and a paper behind it.",
    },
    {
      url: "hamClub.png",
      name: "Ham Club",
      date: "2022",
      link: "https://ham.hackclub.com/",
      description:
        "This was a project with Hack Club that gave youth ham radios if they got licensed. I was the co-founder and I led web design along with the curriculum, planning and organization.",
    },
    {
      url: "apex.png",
      name: "Apex",
      date: "2025",
      link: "https://github.com/hackclub/apex",
      description:
        "Apex is a multi-month, near-space hackathon, where teenagers around the world collaborate to design and build projects for a high-altitude balloon. I am the lead organizer and helped with publicity, planning, organization, and finances.",
    },
    {
      url: "bioplastic.avif",
      name: "Bioplastic",
      date: "2023",
      link: "https://nicholsonlabs.gitbook.io/labs/bioplastic",
      description:
        "I made my own seaweed-based bioplastic from scratch. While it may have not been a huge success, I did make a strong, translucent plastic film which will be sused in future projects.",
    },
    {
      url: "stratoSoarMK2.png",
      name: "StratoSoar MK2",
      date: "2024",
      link: "https://www.github.com/crnicholson/StratoSoar-MK2",
      description:
        "StratoSoar is a high-altitude Unmanned Autonomous Vehicle (UAV), capable of flying to selected coordinates. I successfully launched from 5,000 feet in the summer of 2024, and the latest work has been completed on MK3.",
    },
    {
      url: "littleLoRa.png",
      name: "LitteLoRa",
      date: "2024",
      link: "https://github.com/crnicholson/LittleLoRa",
      description:
        "LittleLoRa is GPS tracker intended to track gliders or high altitude balloons from long distances using minimal power. LittleLoRa is the companion project of StratoSoar and is very much a WIP.",
    },
    {
      url: "stratoSoarMK1.jpeg",
      name: "StratoSoar MK1",
      date: "2022",
      link: "https://github.com/crnicholson/StratoSoar-MK1",
      description:
        "This was my first attempt of making a high-altitude UAV. It was a great learning experience and I learned a lot about the process of making a UAV, although it was not successful.",
    },
    {
      url: "beantown.jpeg",
      name: "OpenCV Resistor Finder",
      date: "2023",
      link: "https://github.com/maxsrobotics/resistorfinder",
      description:
        "This was an OpenCV resistor value finder that used algorithims to find the value of the resistor being held up to the webcam. Won first place at the Beantown Bash Hackathon!",
    },
  ];

  return (
    <>
      <div className="p-10 min-h-screen flex justify-center items-center w-full">
        <div className="w-fit h-fit grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.name}
              className="w-full h-fit flex justify-center items-center z-10"
            >
              <Image
                src={"/projects/" + project.url}
                alt={project.name}
                width={80}
                height={80}
                className=""
              />
              {/* <h1 className="text-xl font-bold">{project.name}</h1>
            <p className="text-sm text-gray-500">{project.date}</p>
            <p className="mt-2 text-gray-700">{project.description}</p> */}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <Image
          src={"/charlie.gif"}
          alt={""}
          width={2000}
          height={2000}
          className="z-0"
        />
      </div>
    </>
  )
}