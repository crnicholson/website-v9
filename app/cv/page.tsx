import Link from "next/link"

import Badge from "@/components/Badge";

export default function CV() {
    return (
        <div className="bg-gray-50 w-full min-h-screen flex items-center justify-center pt-20 px-20">
            <div className="w-2/3">
                <Link href="/" className="text-gray-500 underline mb-10 text-sm block">← Back to Home</Link>

                <h1 className="text-2xl mb-5">Experiences</h1>
                <div className="flex flex-col gap-2 mb-8">
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024-
                        </Badge>
                        Director for the Hack Club Amateur Radio Club.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024-
                        </Badge>
                        Co-founder and co-leader of a local Hack Club.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024-
                        </Badge>
                        Youth Ambassador, Collegiate Outreach, and Science Advisor the Sci-Tech Amateur Radio Society.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024-
                        </Badge>
                        Volunteer Leadership Staff at New England Sci-Tech.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2023-
                        </Badge>
                        Member of The Youth Subcommittee of The North East HamXposition.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2022-
                        </Badge>
                        Volunteer IT Director, circuit  board designer, and consultant for New England Sci-Tech.
                    </span>
                </div>

                <h1 className="text-2xl mb-4">Skills</h1>
                <div className="flex flex-col gap-2 mb-5">
                    <p>Programming / Software</p>
                    <span>• <Badge>
                        C, C++, Rust, Python
                    </Badge></span>
                    <span>• <Badge>
                        React, Next.js, TypeScript, Tailwind, HTML
                    </Badge></span>
                    <span>• <Badge>
                        Git, GitHub, Version control
                    </Badge></span>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                    <p>Electronics</p>
                    <span>• <Badge>
                        KiCAD, printed circuit board design (PCB)
                    </Badge></span>
                    <span>• <Badge>
                        AVR, ARM
                    </Badge></span>
                    <span>• <Badge>
                        RF design, power design, 4-layer-board design
                    </Badge></span>
                    <span>• <Badge>
                        Arduino, Raspberry Pi, ESP32/ESP8266
                    </Badge></span>
                    <span>• <Badge>
                        Test equipment (oscilloscopes, spectrum analyzers, signal generators)
                    </Badge></span>
                </div>

                <div className="flex flex-col gap-2 mb-8">
                    <p>Engineering / Fabrication</p>
                    <span>• <Badge>
                        3D printing, CNCs, laser cutter, handtools
                    </Badge></span>
                    <span>• <Badge>
                        Fusion 360, OnShape, Simscale
                    </Badge></span>
                </div>

                <h1 className="text-2xl mb-5">Awards & Achievements</h1>
                <div className="flex flex-col gap-2">
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2025
                        </Badge>
                        Popular Design Winner of PCBWay 7th Project Design Contest out of over 350+ submissions.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024
                        </Badge>
                        GitHub Universe - personally invited by Kyle Daigle, COO of GitHub, to come.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024
                        </Badge>
                        4th out of 2000+ in the Hack Club Arcade Showcase.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024
                        </Badge>
                        Recipient of the Bagel Fund grant for my research in StratoSoar.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2024
                        </Badge>
                        Presenter and author of a talk in the Northeast HamXposistion
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2023
                        </Badge>
                        First place winner of the 2023 Beantown Bash Hackathon.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2023
                        </Badge>
                        First place winner of the 2023 Wayland Science Fair.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2023
                        </Badge>
                        Presenter and author of two talks at the North East HamXposition.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2020-2023
                        </Badge>
                        Owner of a successful woodworking business.
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Badge>
                            2022
                        </Badge>
                        Ham Radio Extra Class Licensee.
                    </span>
                </div>

                <p className="w-full text-center text-gray-500 mt-20 pb-10">© 2026 Charlie Nicholson. <Link className="underline" href="mailto:charlienicholsonr@gmail.com">charlienicholsonr@gmail.com</Link>.</p>
            </div>
        </div>
    )
}