import { useState, useEffect } from 'react'
import Left from '@/assets/Left.svg?react'
import Right from '@/assets/Right.svg?react'
import GreyRight from '@/assets/GreyRight.svg?react'
import { getYearData } from '@/apis/report/postponeRatio'
import { useWeekNavigation } from '@/hooks/useWeekNavigation'
import BarChart from './BarChart'

const YearChart = () => {
  const { currentYear, handlePrevYear, handleNextYear, isNextDisabled } = useWeekNavigation()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getYearData(currentYear)
        setData(data.data)
        console.log(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [currentYear])

  const up_down = {
    DOWN: '하락',
    UP: '상승',
    NO_DATA: '상승',
  }

  return data ? (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col items-center text-center w-[350px]'>
        <div className='flex'>
          <button className='mr-2 cursor-pointer' onClick={handlePrevYear}>
            <Left />
          </button>
          <p className='Title-01-1_1 text-black-400'>{currentYear}년 미룸 비율</p>
          <button className='ml-2 cursor-pointer' onClick={handleNextYear}>
            {isNextDisabled ? <GreyRight /> : <Right />}
          </button>
        </div>
        <p className='body-02-1_2 text-gray-900 mt-4'>
          저번 년보다 미룸 비율이 {data?.change?.changePercent}%{' '}
          {up_down[data?.change?.changeStatus]}
          했어요.
        </p>
      </div>
      <div className='mt-30'>
        <BarChart data={data?.months} />
      </div>
    </div>
  ) : (
    <p className='body-02-1_2 text-gray-600 mt-10'>정보를 불러오는 중...</p>
  )
}

export default YearChart
