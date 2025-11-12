import React from 'react'
import Button from '@/components/shared/Button'
import MoogChi from '@/assets/MoogChi.svg?react'
import Stress from '@/assets/WelcomeStress.svg?react'
import Motivation from '@/assets/WelcomeMotivation.svg?react'
import Perfect from '@/assets/WelcomePerfect.svg?react'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col min-h-screen w-full max-w-[440px] items-center bg-linear-to-b from-main-200 to-white'>
        <h1 className='Title-01-1_1 text-black-400 mt-[15vh]'>쿨타임에 오신 걸 환영합니다!</h1>
        <h3 className='body-01-1_2 text-gray-400 mt-[26px]'>쿨타임과 함께 미룸 습관을 기록하고</h3>
        <h3 className='body-01-1_2 text-gray-400 mt-[-3px]'>
          자신을 더 이해하는 경험을 쌓아보세요.
        </h3>
        <h3 className='body-01-1_2 text-main-400 mt-[26px]'>시작하기 전 간단한 테스트를 통해</h3>
        <h3 className='body-01-1_2 text-main-400 mt-[-3px]'>미룸 성향을 파악해드릴게요.</h3>

        <div className='relative mt-8'>
          <div className='absolute mt-8'>
            <MoogChi />
          </div>
          <div className='flex mt-20 animate-float'>
            <div className='animate-bounce delay-0'>
              <Perfect />
            </div>
            <div className='animate-bounce delay-05'>
              <Motivation />
            </div>
            <div className='animate-bounce delay-0'>
              <Stress />
            </div>
          </div>
        </div>
        <div className='fixed bottom-10'>
          <Button label='준비됐어요!' onClick={() => navigate('/test')} />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
