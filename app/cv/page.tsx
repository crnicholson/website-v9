'use client'

import Link from "next/link"
import { useIsMobile } from "@/hooks/useIsMobile"
import MobileNav from "@/components/MobileNav"

import Badge from "@/components/Badge";

export default function CV() {
    const isMobile = useIsMobile();

    const experiencesData = [
        { year: '2025', text: 'Summer intern for Hack Club focusing on semiconductor manufacturing.' },
        { year: '2024-2025', text: 'Lead organizer for Apex, a 3-month-long hackathon culminating in a near space experience.', link: 'https://apex.hackclub.com' },
        { year: '2024-', text: 'Director for the Hack Club Amateur Radio Club.' },
        { year: '2024-', text: 'Youth Ambassador and Collegiate Outreach the Sci-Tech Amateur Radio Society.' },
        { year: '2024-', text: 'Volunteer Leadership Staff at New England Sci-Tech.' },
        { year: '2023-', text: 'Member of The Youth Subcommittee of The Northeast HamXposition.' },
        { year: '2022-', text: 'Volunteer IT Director, circuit board designer, and consultant for New England Sci-Tech.' },
    ];

    const skills = [
        {
            category: 'Programming/Software',
            items: ['C, C++, Rust, Python', 'Embedded systems', 'React, Next.js, TypeScript, Tailwind, HTML', 'Git, GitHub, version control']
        },
        {
            category: 'Electronics',
            items: ['KiCAD, printed circuit board design (PCB)', 'Circuits, electronics, circuit prototyping', 'Arduino, Raspberry Pi, ESP32/ESP8266', 'RF design, power design, 4-layer-board design', 'AVR, ARM', 'Test equipment (oscilloscopes, spectrum analyzers, signal generators), soldering']
        },
        {
            category: 'Engineering/Fabrication',
            items: ['3D printing, CNCs, laser cutter, handtools', 'Fusion 360, OnShape, Simscale']
        },
        {
            category: 'Other',
            items: ['Aviation, aerodynamics', 'Photoshop, Figma, graphic design', 'Business management', 'Public speaking']
        }
    ];

    const awards = [
        { year: '2025', text: 'Popular Design Winner of PCBWay 7th Project Design Contest out of over 350+ submissions.' },
        { year: '2024', text: 'GitHub Universe - personally invited by Kyle Daigle, COO of GitHub, to come.' },
        { year: '2024', text: '4th out of 2000+ in the Hack Club Arcade Showcase.' },
        { year: '2024', text: 'Recipient of the Bagel Fund grant for my research in StratoSoar.', link: 'https://github.com/crnicholson/StratoSoar-MK3' },
        { year: '2024', text: 'Presenter and author of a talk in the Northeast HamXposistion' },
        { year: '2023', text: 'First place winner of the 2023 Beantown Bash Hackathon.' },
        { year: '2023', text: 'First place winner of the 2023 Wayland Science Fair.' },
        { year: '2023', text: 'Presenter and author of two talks at the Northeast HamXposition.' },
        { year: '2022', text: 'Ham Radio Extra Class Licensee.' },
    ];

    // Mobile version
    if (isMobile) {
        return (
            <div className="min-h-screen bg-gray-50">
                <MobileNav onAboutClick={() => { }} />
                <div className="pt-16 pb-8 px-4">
                    <Link href="/" className="text-gray-700 underline mb-6 text-xs block">← back</Link>

                    {/* Experiences */}
                    <div className="mb-8">
                        <h1 className="font-walter text-sm mb-4">experiences</h1>
                        <div className="flex flex-col gap-3">
                            {experiencesData.map((exp, idx) => (
                                <div key={idx} className="flex gap-2 flex-col text-xs">
                                    <Badge>{exp.year}</Badge>
                                    <p className="text-gray-700 text-xs">{exp.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                        <h1 className="font-walter text-sm mb-4">skills</h1>
                        <div className="flex flex-col gap-4">
                            {skills.map((skillGroup, idx) => (
                                <div key={idx}>
                                    <p className="text-xs font-medium mb-2">{skillGroup.category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((item, itemIdx) => (
                                            <Badge key={itemIdx}>{item}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Awards */}
                    <div className="mb-8">
                        <h1 className="font-walter text-sm mb-4">awards & achievements</h1>
                        <div className="flex flex-col gap-3">
                            {awards.map((award, idx) => (
                                <div key={idx} className="flex gap-2 flex-col text-xs">
                                    <Badge>{award.year}</Badge>
                                    <p className="text-gray-700 text-xs">{award.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t text-center text-xs text-gray-600">
                        <p>© 2026 Charlie Nicholson</p>
                        <Link href="mailto:charlienicholsonr@gmail.com" className="underline">
                            charlienicholsonr@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version
    return (
        <div className="bg-gray-50 w-full min-h-screen flex items-center justify-center pt-20 px-20">
            <div className="w-2/3">
                <Link href="/" className="text-gray-700 underline mb-10 text-sm block">← Back to Home</Link>

                <h1 className="text-2xl mb-5">Experiences</h1>
                <div className="flex flex-col gap-2 mb-8">
                    {experiencesData.map((exp, idx) => (
                        <span key={idx} className="flex flex-row gap-2 items-center">
                            <Badge>{exp.year}</Badge>
                            {exp.link ? (
                                <span><Link href={exp.link} className="underline">{exp.text}</Link></span>
                            ) : (
                                <span>{exp.text}</span>
                            )}
                        </span>
                    ))}
                </div>

                <h1 className="text-2xl mb-4">Skills</h1>
                {skills.map((skillGroup, idx) => (
                    <div key={idx} className="flex flex-col gap-2 mb-5">
                        <p>{skillGroup.category}</p>
                        {skillGroup.items.map((item, itemIdx) => (
                            <span key={itemIdx}>• <Badge>{item}</Badge></span>
                        ))}
                    </div>
                ))}

                <h1 className="text-2xl mb-5">Awards & Achievements</h1>
                <div className="flex flex-col gap-2">
                    {awards.map((award, idx) => (
                        <span key={idx} className="flex flex-row gap-2 items-center">
                            <Badge>{award.year}</Badge>
                            {award.link ? (
                                <span><Link href={award.link} className="underline">{award.text}</Link></span>
                            ) : (
                                <span>{award.text}</span>
                            )}
                        </span>
                    ))}
                </div>

                <p className="w-full text-center text-gray-700 mt-20 pb-10 text-sm">© 2026 Charlie Nicholson. <Link className="underline" href="mailto:charlienicholsonr@gmail.com">charlienicholsonr@gmail.com</Link>.</p>
            </div>
        </div>
    )
}