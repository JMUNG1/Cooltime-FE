import { useUserStore } from '@/store/store'
import Label from '@/components/shared/Label'
import { useNavigate } from 'react-router-dom'
import { typeLabel, text1, text2 } from '@/data/typeData'
import { typeImage } from '@/data/typeImage'

const TypeResultPage = () => {
  const nickname = useUserStore((n) => n.nickname)
  const { userType } = useUserStore((s) => s)
  const navigate = useNavigate()

  const TypeLabel = typeLabel[userType]
  const Image = typeImage[userType] ?? null
  const label =
    userType === '완벽주의형' ? '리노 Lino' : userType === '동기저하형' ? '모라 Mora' : '세나 Sena'

  const Text1 = text1[userType]
  const Text2 = text2[userType]

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div
        className='w-full max-w-[440px] min-h-screen grow flex flex-col items-center gap-6
      blue:bg-[linear-gradient(180deg,var(--color-blue-400)_9.3%,var(--color-blue-100)_66.75%)]
      mint:bg-[linear-gradient(180deg,var(--color-mint-400)_9.3%,var(--color-mint-200)_66.75%)]
      peach:bg-[linear-gradient(180deg,var(--color-peach-400)_9.3%,var(--color-peach-200)_66.75%)]
      '
      >
        <div>
          <p className='mt-20 text-[18px] blue:text-[#5A5D73] mint:text-[#4E655E] peach:text-peach-700'>
            {nickname}님의 미룸 성향은
          </p>
          <p className='text-black-400 text-[32px] leading-tight font-[SemiBold] text-center whitespace-pre-line'>
            {TypeLabel}
          </p>
        </div>
        {Image}
        <div className='bg-white rounded-t-4xl shadow-s px-10 py-8 w-full grow flex flex-col gap-[5vh]'>
          <div className='flex w-full justify-center'>
            <Label label={label} />
          </div>
          <div className='text-black-400 text-[14px] font-[Medium] whitespace-pre-wrap leading-loose'>
            {Text1}
          </div>
          <div className='text-grey-400 text-[14px] break-keep'>
            <span className='text-red text-[12px]'>쿨타임에서 이렇게 해보세요!</span>
            <br />
            {Text2}
          </div>
          <div className='w-full flex items-center mt-[4vh] left-0'>
            <button
              onClick={() => navigate('/home')}
              className='block mx-auto rounded-full w-[343px] h-[53px] text-[18px] font-[SemiBold] text-white cursor-pointer blue:bg-blue-500 mint:bg-mint-500 peach:bg-peach-500'
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypeResultPage
