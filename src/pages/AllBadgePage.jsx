import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/store'
import { getBadgeData } from '@/apis/report/badgeList'
import Header from '@/components/shared/Header'
import Badge1 from '@/assets/Badge1.svg'
import Badge2 from '@/assets/Badge2.svg'
import Badge3 from '@/assets/Badge3.svg'
import Badge4 from '@/assets/Badge4.svg'
import Badge5 from '@/assets/Badge5.svg'
import Badge6 from '@/assets/Badge6.svg'
import GrayBadge1 from '@/assets/GrayBadge1.svg'
import GrayBadge2 from '@/assets/GrayBadge2.svg'
import GrayBadge3 from '@/assets/GrayBadge3.svg'
import GrayBadge4 from '@/assets/GrayBadge4.svg'
import GrayBadge5 from '@/assets/GrayBadge5.svg'
import GrayBadge6 from '@/assets/GrayBadge6.svg'

const AllBadgePage = () => {
  const { theme } = useUserStore()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBadgeData()
        setData(data.data)
        console.log(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const color = {
    blue: 'bg-linear-to-b from-blue-200 to-gray-100',
    mint: 'bg-linear-to-b from-mint-200 to-gray-100',
    peach: 'bg-linear-to-b from-peach-200 to-gray-100',
  }
  const background = color[theme] ?? 'bg-blue-100'
  return (
    <div className='flex flex-col items-center'>
      <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${background}`}>
        <Header label='배지' />
        <div className='flex flex-col w-full items-start mt-[94px] pl-4 mb-20'>
          <p className='Title-01-1_1 text-black-400'>연속 기록 해봐요</p>
          <p className='body-02-1_2 text-gray-900 mt-4'>
            쿨타임에서 연속 기록 시 주어지는 배지입니다.
          </p>
        </div>
        {data ? (
          <>
            <div className='flex max-w-[327px] mx-auto mb-20'>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[0]?.earned ? (
                  <img src={Badge1} className='w-full h-auto mb-4' />
                ) : (
                  <img src={GrayBadge1} className='w-full h-auto mb-4' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 10일</p>
              </div>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[1]?.earned ? (
                  <img src={Badge2} className='w-full h-auto mb-4' />
                ) : (
                  <img src={GrayBadge2} className='w-full h-auto mb-4' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 30일</p>
              </div>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[2]?.earned ? (
                  <img src={Badge3} className='w-full h-auto mb-3.5' />
                ) : (
                  <img src={GrayBadge3} className='w-full h-auto mb-3.5' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 50일</p>
              </div>
            </div>
            <div className='flex max-w-[327px] mx-auto mb-20'>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[3]?.earned ? (
                  <img src={Badge4} className='w-full h-auto mb-3' />
                ) : (
                  <img src={GrayBadge4} className='w-full h-auto mb-3' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 100일</p>
              </div>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[4]?.earned ? (
                  <img src={Badge5} className='w-full h-auto mb-4' />
                ) : (
                  <img src={GrayBadge5} className='w-full h-auto mb-4' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 365일</p>
              </div>
              <div className='flex flex-col items-center w-1/3'>
                {data?.badges[5]?.earned ? (
                  <img src={Badge6} className='w-full h-auto mb-[19.5px]' />
                ) : (
                  <img src={GrayBadge6} className='w-full h-auto mb-[19.5px]' />
                )}
                <p className='body-02-1_2 text-black-400'>연속 기록 500일</p>
              </div>
            </div>
          </>
        ) : (
          <p className='body-02-1_2 text-gray-600 mt-10'>배지 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  )
}

export default AllBadgePage
