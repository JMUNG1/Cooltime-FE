import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/store'
import Header from '@/components/shared/Header'
import Left from '@/assets/Left.svg?react'
import Right from '@/assets/Right.svg?react'
import GreyRight from '@/assets/GreyRight.svg?react'
import { useWeekNavigation } from '@/hooks/useWeekNavigation'
import AIContainer from '@/components/ai/AIContainer'
import { getAIReportData } from '@/apis/report/AIReport'
import Loading from '@/components/shared/Loading'

const AIPage = () => {
  const {
    weekNames,
    currentWeek,
    currentMonth,
    currentYear,
    handlePrevWeek,
    handleNextWeek,
    isNextDisabled,
  } = useWeekNavigation({ initialPrevWeek: true })
  const { theme } = useUserStore()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAIReportData(currentYear, currentMonth, currentWeek + 1)
        setData(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [currentYear, currentMonth, currentWeek])

  const color = {
    blue: {
      background: 'bg-linear-to-b from-blue-200 to-gray-100',
      text: 'text-blue-600',
      border: 'border-blue-400',
    },
    mint: {
      background: 'bg-linear-to-b from-mint-200 to-gray-100',
      text: 'text-mint-600',
      border: 'border-mint-400',
    },
    peach: {
      background: 'bg-linear-to-b from-peach-200 to-gray-100',
      text: 'text-peach-600',
      border: 'border-peach-400',
    },
  }
  const backgound = color[theme]?.background ?? 'bg-linear-to-b from-blue-200 to-gray-100'

  return data ? (
    <div className='flex flex-col items-center'>
      <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${backgound}`}>
        <Header label='AI 레포트' />
        <div className='flex flex-col mt-[94px] items-center text-center w-[350px]'>
          <div className='flex'>
            <button className='mr-2' onClick={handlePrevWeek}>
              <Left />
            </button>
            <p className='Title-01-1_1 text-black-400'>
              {currentMonth}월 {weekNames[currentWeek]} 미룸 레포트
            </p>
            <button className='ml-2 ' onClick={handleNextWeek}>
              {isNextDisabled ? <GreyRight /> : <Right />}
            </button>
          </div>
          <p className='body-02-1_2 text-gray-900 mt-4'>
            미룸 기록을 바탕으로 AI가 미룸 성향과 해결책을 제시해요.
          </p>
        </div>
        <div className='mt-10'>
          <AIContainer
            text={data.patternAnalysis || ''}
            color={color[theme]}
            Header={'주로 이런 패턴을 보여요.'}
          />
          <AIContainer
            text={data.solution || ''}
            color={color[theme]}
            Header={'이렇게 해보면 좋아요.'}
          />
          <AIContainer
            text={data.weeklyComparison || ''}
            color={color[theme]}
            Header={'저번 주와 비교하면 이런 패턴이 있어요.'}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default AIPage
