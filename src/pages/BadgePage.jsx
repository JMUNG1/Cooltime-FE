import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/store'
import Header from '@/components/shared/Header'
import Badge1 from '@/assets/Badge1.svg'
import Badge2 from '@/assets/Badge2.svg'
import Badge3 from '@/assets/Badge3.svg'
import Badge4 from '@/assets/Badge4.svg'
import Badge5 from '@/assets/Badge5.svg'
import Badge6 from '@/assets/Badge6.svg'
import GoalProgressBar from '@/components/badge/GoalProgressBar'
import { getProgressData } from '@/apis/report/badgeProgress'
import { useNavigate } from 'react-router-dom'

const BadgePage = () => {
  const { theme } = useUserStore()
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProgressData()
        setData(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const color = {
    blue: {
      background: 'bg-linear-to-b from-blue-200 to-gray-100',
      text: 'text-blue-600',
      bar: { from: '#B4B9E6', to: '#8190FF' },
      fill: '#5A5D73',
    },
    mint: {
      background: 'bg-linear-to-b from-mint-200 to-gray-100',
      text: 'text-mint-600',
      bar: { from: '#9DCBBC', to: '#3FBE95' },
      fill: '#4E655E',
    },
    peach: {
      background: 'bg-linear-to-b from-peach-200 to-gray-100',
      text: 'text-peach-600',
      bar: { from: '#FFD6B3', to: '#DA9963' },
      fill: '#736051',
    },
  }

  const background = color[theme]?.background ?? 'bg-linear-to-b from-blue-200 to-gray-100'
  const textColor = color[theme]?.text ?? 'text-blue-600'
  const barColor = color[theme]?.bar ?? { from: '#B4B9E6', to: '#8190FF' }
  const fillColor = color[theme]?.fill ?? '#5A5D73'

  const badgeImages = {
    STREAK_10: Badge1,
    STREAK_30: Badge2,
    STREAK_50: Badge3,
    STREAK_100: Badge4,
    STREAK_365: Badge5,
    STREAK_500: Badge6,
  }

  return (
    <div className='flex flex-col items-center'>
      <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${background}`}>
        <Header label='배지' />
        <div className='flex flex-col w-full items-start mt-[94px] pl-4 mb-20'>
          <p className='Title-01-1_1 text-black-400'>연속 기록 시 배지를 얻어요</p>
          <p className='body-02-1_2 text-gray-900 mt-4'>
            작은 기록이 모여 나만의 성장 배지가 완성돼요.
          </p>
          <p className='body-02-1_2 text-gray-900 -mt-1'>
            꾸준함이 쌓일수록 나를 이해하는 기록이 늘어나요.
          </p>
        </div>
        {data ? (
          <>
            <img
              src={badgeImages[data?.badgeCode] || Badge1}
              alt='GoalBadge'
              className='w-[294px] h-[294px]'
            />
            <div className='w-[300px] mt-9'>
              <p className='text-center body-01-1_2 text-black-400 mb-4'>
                연속 기록 {data.longestStreak || 0}일
              </p>
              <GoalProgressBar
                maxDay={data.requiredDays || 0}
                day={data.longestStreak || 0}
                color={barColor}
                fill={fillColor}
              />
              <p className='text-right body-02-1_2 text-black-400 mt-2'>
                Day {data.requiredDays || 0}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
        <button
          className={`mt-25 mb-10 body-02-1_3 ${textColor} cursor-pointer`}
          onClick={() => navigate('/report/badge/all')}
        >
          모든 배지 보기
        </button>
      </div>
    </div>
  )
}

export default BadgePage
