import { useState, useEffect } from 'react'
import BgImg1 from '@/assets/BgImg1.svg?react'
import BgImg2 from '@/assets/BgImg2.svg?react'
import BgImg3 from '@/assets/BgImg3.svg?react'
import Button from '@/components/shared/Button'
import { useNavigate } from 'react-router-dom'

const StartPage = () => {
  const [position1, setPosition1] = useState(0)
  const [position2, setPosition2] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setPosition1(-10)
    setPosition2(17)
    const interval = setInterval(() => {
      setPosition1((prev) => (prev === 0 ? -10 : 0))
      setPosition2((prev) => (prev === 0 ? 17 : 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='flex flex-col min-h-screen justify-start items-center w-full max-w-[440px] mx-auto bg-linear-to-b from-main-300 via-white to-white'>
      <div className='flex flex-col justify-baseline items-start text-left w-full h-full ml-10 mt-[76px]'>
        <div className='mb-8'>
          <h1 className='Title-01-1_1 mb-[-5px]'>미루는 나도,</h1>
          <span className='Title-01-1_1 text-[#2862FF]'>꾸준히 기록하는 나</span>
          <span className='Title-01-1_1 '>로 </span>
        </div>
        <div className='mb-15'>
          <h3 className='body-01-1_2 text-grey-900'>오늘의 미룸도 괜찮아요.</h3>
          <h3 className='body-01-1_2 text-grey-900'>내일의 나를 위한 쿨타임이니까요.</h3>
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
      <div className='fixed bottom-10 flex flex-col justify-center items-center text-center'>
        <Button label='처음 시작해요' onClick={() => navigate('/signup')} />
        <button
          className='mt-[13px] body-01-1_2 text-gray-400 cursor-pointer'
          onClick={() => navigate('/login')}
        >
          이미 계정이 있습니다
        </button>
      </div>
    </div>
  )
}

export default StartPage
