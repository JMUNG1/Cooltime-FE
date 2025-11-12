import Moogchi from '@/assets/MoogChi2.svg?react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='fixed z-10 max-w-[440px] w-full min-h-screen bg-white flex flex-col items-center'>
      <Moogchi className='fixed top-[215px]' />
      <p className='mt-[283px] Title-02-2_1 text-black-400 mb-15'>AI 레포트를 생성 중입니다...</p>
      <ClipLoader
        size={70}
        speedMultiplier={0.7}
        color='#1455FE'
        cssOverride={{ borderWidth: '4px' }}
      />
    </div>
  )
}

export default Loading
