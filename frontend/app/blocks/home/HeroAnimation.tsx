'use client'
'use client'

export default function HeroAnimation() {
  return (
    <>
      <style>{`
        @keyframes wave-bobble-1 {
          0%   { transform: translateY(-5vh); }
          100% { transform: translateY(5vh); }
        }
        @keyframes wave-bobble-2 {
          0%   { transform: translateY(8vh); }
          100% { transform: translateY(-6vh); }
        }
        @keyframes wave-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes wave-scroll-right {
          0%   { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        {/* Wave track 1 — bobs up/down */}
        <div style={{position: 'absolute', inset: 0, animation: 'wave-bobble-1 34s ease-in-out infinite alternate'}}>
          <div style={{
            position: 'absolute',
            width: '500vw',
            height: '25vh',
            top: '35%',
            left: '-200vw',
            filter: 'blur(60px)',
            opacity: 0.5,
            background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0) 0vw, #666666 30vw, #ffffff 60vw, rgba(0,0,0,0) 100vw)',
            animation: 'wave-scroll-left 72s linear infinite',
          }} />
        </div>

        {/* Wave track 2 — bobs opposite
        <div style={{position: 'absolute', inset: 0, animation: 'wave-bobble-2 26s ease-in-out infinite alternate-reverse'}}>
          <div style={{
            position: 'absolute',
            width: '500vw',
            height: '25vh',
            top: '45%',
            left: '-200vw',
            filter: 'blur(60px)',
            opacity: 0.5,
            background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0) 0vw, #333333 20vw, #aaaaaa 50vw, rgba(0,0,0,0) 100vw)',
            animation: 'wave-scroll-right 52s linear infinite',
          }} />
        </div>
        */}
      </div>
    </>
  )
}
