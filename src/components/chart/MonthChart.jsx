import { useState, useEffect } from 'react'
import PieChart from '../report/PieChart'
import Left from '@/assets/Left.svg?react'
import Right from '@/assets/Right.svg?react'
import GreyRight from '@/assets/GreyRight.svg?react'
import { getMonthData } from '@/apis/report/postponeRatio'
import { useWeekNavigation } from '@/hooks/useWeekNavigation'

const MonthChart = () => {
  const { currentMonth, currentYear, handlePrevMonth, handleNextMonth, isNextDisabled } =
    useWeekNavigation()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthData(currentYear, currentMonth)
        setData(data.data)
        console.log(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [currentYear, currentMonth])

  const up_down = {
    DOWN: '하락',
    UP: '상승',
    NO_DATA: '상승',
  }

  return data ? (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col items-center text-center w-[350px]'>
        <div className='flex'>
          <button className='mr-2 cursor-pointer' onClick={handlePrevMonth}>
            <Left />
          </button>
          <p className='Title-01-1_1 text-black-400'>{currentMonth}월 미룸 비율</p>
          <button className='ml-2 cursor-pointer' onClick={handleNextMonth}>
            {isNextDisabled ? <GreyRight /> : <Right />}
          </button>
        </div>
        <p className='body-02-1_2 text-gray-900 mt-4'>
          저번 달보다 미룸 비율이 {data.change.changePercent}% {up_down[data.change.changeStatus]}
          했어요.
        </p>
      </div>
      <div className='flex flex-col items-center mt-17 w-[274px] h-[274px]'>
        <PieChart value={data.ratio.postponedPercent} width={20} shadow={true} />
        <div className='absolute flex flex-col items-center mt-25'>
          <p className='Title-01-1_1 text-black-400'>{data.ratio.postponedPercent}%</p>
          <p className='Title-03-3_3 text-gray-400 mt-1'>총 미룸 비율</p>
        </div>
      </div>
      <div className='flex w-[343px] h-[106px] bg-white shadow-xs rounded-2xl mt-12 items-center justify-center'>
        <div className='flex flex-col items-center mr-16'>
          <p className='body-02-1_2 text-black-400 mb-1'>했어요</p>
          <p className='Title-01-1_1 text-black-400'>{data.ratio.doneCount}</p>
        </div>
        <div className='w-px h-[46px] bg-gray-400'></div>
        <div className='flex flex-col items-center ml-16'>
          <p className='body-02-1_2 text-black-400 mb-1'>미뤘어요</p>
          <p className='Title-01-1_1 text-black-400'>{data.ratio.postponedCount}</p>
        </div>
        <div className='flex flex-col items-center'></div>
      </div>
    </div>
  ) : (
    <p className='body-02-1_2 text-gray-600 mt-10'>정보를 불러오는 중...</p>
  )
}

export default MonthChart
