import { useState, useEffect } from 'react'
import PieChart from '../report/PieChart'
import { getTotalData } from '@/apis/report/postponeRatio'

const TotalChart = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalData()
        setData(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col items-start text-start w-[350px]'>
        <p className='Title-01-1_1 text-black-400'>나의 미룸 비율을</p>
        <p className='Title-01-1_1 text-black-400 -mt-2'>한눈에 볼 수 있어요</p>
        <p className='body-02-1_2 text-gray-900 mt-4'>
          매일의 미룸이 쌓여, 나를 이해하는 그래프가 됩니다.
        </p>
      </div>
      {data ? (
        <>
          <div className='flex flex-col items-center mt-[37px] w-[274px] h-[274px]'>
            <PieChart value={data.total.postponedPercent} width={20} shadow={true} />
            <div className='absolute flex flex-col items-center mt-25'>
              <p className='Title-01-1_1 text-black-400'>{data.total.postponedPercent}%</p>
              <p className='Title-03-3_3 text-gray-400 mt-1'>총 미룸 비율</p>
            </div>
          </div>
          <div className='flex w-[343px] h-[106px] bg-white shadow-xs rounded-2xl mt-12 items-center justify-center'>
            <div className='flex flex-col items-center mr-16'>
              <p className='body-02-1_2 text-black-400 mb-1'>했어요</p>
              <p className='Title-01-1_1 text-black-400'>{data.total.doneCount}</p>
            </div>
            <div className='w-px h-[46px] bg-gray-400'></div>
            <div className='flex flex-col items-center ml-16'>
              <p className='body-02-1_2 text-black-400 mb-1'>미뤘어요</p>
              <p className='Title-01-1_1 text-black-400'>{data.total.postponedCount}</p>
            </div>
            <div className='flex flex-col items-center'></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TotalChart
