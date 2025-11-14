import { useUserStore } from '@/store/store'
import { useLogStore } from '@/store/calendarStore'
import LogBackgroundImg from '@/assets/LogBackgroundImg.svg?react'

const ShowRecordModal = ({ date, onClick, onEdit, isPostponed }) => {
  const formattedDate = date
    ? date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    : '날짜 없음'

  let isToday = false
  if (date instanceof Date) {
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    isToday = startOfDay.getTime() === startOfToday.getTime()
  }
  const nickname = useUserStore((n) => n.nickname)
  const type = useLogStore((t) => t.type)

  const activities = useLogStore((a) => a.activity)
  const Activities = Array.isArray(activities) ? activities.join(', ') : ''
  const reasons = useLogStore((r) => r.reason)

  const handleUpdate = () => {
    onEdit?.(date)
  }

  // 타입 별 색상 지정(당시 사용자의 유형 기준)
  const mapTypeTheme = (t) => {
    if (t === '완벽주의형') return 'blue'
    if (t === '동기저하형') return 'mint'
    return 'peach'
  }

  const theme = mapTypeTheme(type)
  const bgColor = {
    blue: 'bg-[linear-gradient(180deg,var(--color-blue-200)_19.65%,var(--color-blue-100)_28.23%)]',
    mint: 'bg-[linear-gradient(180deg,var(--color-mint-200)_19.65%,var(--color-mint-100)_28.23%)]',
    peach:
      'bg-[linear-gradient(180deg,var(--color-peach-200)_19.65%,var(--color-peach-100)_28.23%)]',
  }
  const BgColor =
    bgColor[theme] ??
    'bg-[linear-gradient(180deg,var(--color-main-200)_19.65%,var(--color-main-100)_28.23%)]'
  const highlightColor = {
    blue: 'bg-[linear-gradient(transparent_40%,rgba(200,206,255,0.4)_20%)]',
    mint: 'bg-[linear-gradient(transparent_40%,rgba(174,225,209,0.4)_20%)]',
    peach: 'bg-[linear-gradient(transparent_40%,rgba(255,214,179,0.4)_20%)]',
  }
  const HightlightColor =
    highlightColor[theme] ?? 'bg-[linear-gradient(transparent_40%,rgba(200,206,255,0.4)_20%)]'

  const btnColor = {
    blue: 'bg-blue-400',
    mint: 'bg-mint-400',
    peach: 'bg-peach-400 ',
  }
  const BtnColor = btnColor[theme] ?? 'bg-main-400'

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-[343px] rounded-[20px] h-[530px] z-1000 fixed bottom-7 left-1/2 -translate-x-1/2 ${BgColor}`}
    >
      <div className=' w-full flex flex-col justify-center items-center'>
        <hr className='bg-grey-400 h-0.5 w-[119px] mt-4 flex ' />
        {isToday && (
          <button
            onClick={handleUpdate}
            className='flex w-full justify-end pr-[15px] text-grey-400 text-[12px] cursor-pointer'
          >
            수정
          </button>
        )}
        <div className=' text-[18px] font-thin mt-6 mb-3 text-black-400 '>
          {isToday ? '오늘 ' : '이 날의 '}
          {nickname}님의 하루는 <br />
          <div className={`${HightlightColor} font-[SemiBold] inline pr-[3px]`}>
            {isPostponed
              ? '완벽하진 않아도 괜찮은 하루였어요'
              : '미루지 않고 할 일을 해낸 하루였어요'}
          </div>
        </div>
        <div className='box-border flex flex-col items-center w-full gap-8 overflow-y-auto scrollbar-hide'>
          <div className='text-[14px] text-black-400 font-[SemiBold] mt-5'>
            {formattedDate} 미룸 일지
          </div>
          <div className='relative inline-block box-border h-[262px] overflow-y-visible'>
            <div className='bg-white w-[245px] px-8 py-4 rounded-[12px] shadow-xs'>
              {isPostponed ? (
                <>
                  <div className='text-black-400 text-[12px] mb-1'>{Activities}을/를 미뤘어요</div>
                  <div className='text-black-400 text-[18px] font-[Medium] mb-0 mt-0 whitespace-pre-wrap break-keep'>
                    {reasons.join(', ')} <span className='font-[Regular]'>미뤘어요</span>
                  </div>
                </>
              ) : (
                <>
                  <div className='text-black-400 text-[18px] text-center font-[Medium] mb-0 mt-0'>
                    오늘은 미루지 않고 <br /> 해낸 날이에요!
                  </div>
                </>
              )}
            </div>
            <div className='absolute -right-9 -top-4 pointer-events-none z-10'>
              <LogBackgroundImg />
            </div>
            <div className='pt-8'></div>
          </div>
        </div>
        <button
          onClick={onClick}
          className={`mt-2.5 px-10 py-2 rounded-full text-white flex justify-center items-center cursor-pointer ${BtnColor}`}
        >
          완료
        </button>
      </div>
    </div>
  )
}

export default ShowRecordModal
