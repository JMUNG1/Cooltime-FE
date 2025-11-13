import Moogchi from '@/assets/MoogChi2.svg?react'
import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='fixed z-10 max-w-[440px] w-full min-h-screen bg-white flex flex-col items-center'>
      <Moogchi className='fixed top-[215px]' />
      <p className='mt-[283px] Title-02-2_1 text-black-400 mb-17'>AI 레포트를 생성 중입니다...</p>
      <BeatLoader size={20} speedMultiplier={0.8} color='#1455FE' />
    </div>
  )
}

export default Loading
