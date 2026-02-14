import Slider from '@/components/Slider'

export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative">
        <Slider />
        <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_80px_0_300px_rgba(255,255,255,1),inset_-80px_0_300px_rgba(255,255,255,1)]" />

        {/* <figure className="w-50 h-50 pointer-events-auto perspective-[1143px] -rotate-y-50 skew-y-20 transform">
          <div className="absolute inset-0 rounded-inherit">
            <img
              decoding="auto"
              width={200}
              height={250}
              src="/projects/apex.png"
              alt="Ticker Image"
              className="block w-full h-full rounded-inherit object-cover object-center"
            />
          </div>
        </figure>

        <div className="w-50 h-50" style={{ transform: "perspective(1143px) rotateY(-50deg) skewY(20deg)", opacity: 0.7, willChange: "transform" }}>
          <div style={{ position: "absolute", borderRadius: "inherit", inset: 0 }}>
            <img decoding="auto" width="200" height="250" src="/projects/apex.png" alt="Ticker Image" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center center", objectFit: "cover" }} />
          </div>
        </div> */}
      </div>
    </>
  )
}