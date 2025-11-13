import { useState, useEffect } from 'react'
import Return from '@/assets/Return.svg'

const ProgressBar = ({ step, totalSteps, onBack }) => {
  const [mounted, setMounted] = useState(false)
  const segments = Array.from({ length: totalSteps })
  useEffect(() => {
    // 첫 프레임(0%)로 그린 뒤, 다음 프레임에 채우기 시작
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className='flex relative justify-center w-full pt-[50px] bg-white'>
      {step === 0 ? (
        ''
      ) : (
        <img
          className='absolute left-[24.2px] top-[45.3px] h-[13.4px] hover:cursor-pointer'
          src={Return}
          alt='Return'
          onClick={onBack}
        />
      )}
      <div className='flex grid-cols-7 items-center max-w-[440px] justify-between gap-1'>
        {segments.map((_, i) => (
          <div
            key={i}
            className='h-[0.59vh] rounded-[12.8vw] bg-grey-300 overflow-hidden'
            style={{ width: '8vw', maxWidth: '40px', height: '3px' }}
          >
            <div
              className={`h-full rounded-[12.8vw] bg-main-400 transition-all duration-500`}
              style={{ width: mounted && i <= step ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
