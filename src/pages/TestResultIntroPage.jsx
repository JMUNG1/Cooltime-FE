import Button from '@/components/shared/Button'
import { useState, useEffect } from 'react'
import BgImg1 from '@/assets/BgImg1.svg?react'
import BgImg2 from '@/assets/BgImg2.svg?react'
import BgImg3 from '@/assets/BgImg3.svg?react'
import { useNavigate } from 'react-router-dom'

const TestResultIntroPage = () => {
  const [position1, setPosition1] = useState(0)
  const [position2, setPosition2] = useState(0)

  useEffect(() => {
    setPosition1(-10)
    setPosition2(17)
    const interval = setInterval(() => {
      setPosition1((prev) => (prev === 0 ? -10 : 0))
      setPosition2((prev) => (prev === 0 ? 17 : 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()

  return (
    <div className='flex flex-col min-h-screen justify-start items-center w-full max-w-[440px] mx-auto bg-[linear-gradient(180deg,#FFF_0%,var(--color-main-300)_100%)]'>
      <div className='flex flex-col justify-baseline items-start text-left w-full h-full ml-10 mt-[76px]'>
        <div className='mb-4'>
          <h1 className='font-[SemiBold] text-[26px] text-black-400'>
            미룸 패턴 분석이 <br /> 완료되었어요!
          </h1>
        </div>
        <div className=''>
          <h3 className='font-[Medium] text-[14px] text-black-400'>
            하단의 버튼을 눌러 내 유형을 확인해보세요
          </h3>
        </div>
      </div>
      <div className='fixed top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[440px]'>
        <div className='relative w-full h-full transition-transform duration-700 ease-in-out'>
          <BgImg1
            style={{ transform: `translateY(${position1}px)` }}
            className='absolute top-1/2 left-34/100 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-2000 ease-in-out'
          />
          <BgImg2
            style={{ transform: `translateY(${position2}px)` }}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-2000 ease-in-out'
          />
          <BgImg3
            style={{ transform: `translateY(${position1}px)` }}
            className='absolute top-1/2 left-5/8 transform -translate-x-1/2 -translate-y-1/2 z-11 transition-transform duration-2000 ease-in-out'
          />
        </div>
      </div>
      <div className='absolute bottom-5 justify-center z-10'>
        <Button label='결과 보기' onClick={() => navigate('/result')} />
      </div>
    </div>
  )
}

export default TestResultIntroPage
