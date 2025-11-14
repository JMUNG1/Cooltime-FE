import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/store'
import ReportPerfect from '@/assets/ReportPerfect.svg?react'
import ReportMotivation from '@/assets/ReportMotivation.svg?react'
import ReportStress from '@/assets/ReportStress.svg?react'
import Footer from '@/components/shared/Footer'
import MoogChiMini from '@/assets/MoogChiMini.svg?react'
import ReportCard from '@/components/report/ReportCard'
import ReportBadge from '@/assets/ReportBadge.svg?react'
import PieChart from '@/components/report/PieChart'
import { getDashboardData } from '@/apis/report/DashBoard'

const ReportPage = () => {
  const { userType, theme, nickname } = useUserStore()
  const [Data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData()
        setData(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const color = {
    blue: 'bg-main-100',
    mint: 'bg-mint-100',
    peach: 'bg-peach-100',
  }

  const image = {
    완벽주의형: <ReportPerfect />,
    동기저하형: <ReportMotivation />,
    스트레스형: <ReportStress />,
  }

  const Image = image[userType] ?? null
  const background = color[theme] ?? 'bg-main-100'

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`flex flex-col max-w-[440px] w-full text-center min-h-screen items-center ${background}`}
      >
        <div className='flex mt-[70px]'>
          <div className='mr-4'>{Image}</div>
          <div className='flex flex-col items-start'>
            <p className='Title-03-3_1 text-black-400'>{nickname}</p>
            <p className='Title-03-3_2 text-black-400'>님의 미룸 요약이에요.</p>
            <p className='body-02-1_3 text-gray-400'>조금 미뤄도 괜찮아요.</p>
            <p className='body-02-1_3 text-gray-400'>오늘도 나를 돌아본 게 중요하니까요.</p>
          </div>
        </div>

        <div className='flex mt-10 mb-4'>
          <ReportCard title='총 기록일' more={false}>
            <p className='Title-01-1_2 text-black mt-0.5'>{Data?.recordedDays || 0}일</p>
            <p className='body-03-1_2 text-gray-400 mt-0.5'>
              {Data?.totalDays || 0}일 중 {Data?.recordedDays || 0}일
            </p>
            <p className='body-03-1_2 text-gray-400'>기록했어요.</p>
            <div className='flex flex-col items-end justify-end text-end w-full mt-1'>
              <MoogChiMini />
            </div>
          </ReportCard>

          <div className='mr-4' />
          <ReportCard title='미룸 비율'>
            <p className='Title-01-1_2 text-black mt-0.5'>{Data?.postponedPercent || 0}%</p>
            <span className='ml-15'>
              <PieChart value={Data?.postponedPercent || 0} width={30} />
            </span>
          </ReportCard>
        </div>

        <div className='flex'>
          <ReportCard title='카테고리별'>
            <p className='Title-01-1_2 text-black mt-0.5 max-w-[135px] overflow-hidden text-ellipsis whitespace-nowrap '>
              {Data?.categoryName}
            </p>
            {Data?.categoryName && (
              <p className='body-03-1_2 text-black mt-0.5'>를 제일 미뤘어요.</p>
            )}
            {Data?.categoryName ? (
              <>
                <p className='body-03-1_2 text-gray-400 mt-2.5'>카테고리별 미룬 일을</p>
                <p className='body-03-1_2 text-gray-400 -mt-1'>확인해보세요.</p>
              </>
            ) : (
              <>
                <p className='body-03-1_2 text-gray-400 mt-17'>아직 미룬 일이 없어요.</p>
                <p className='body-03-1_2 text-gray-400 -mt-1'>첫 기록을 남겨보세요!</p>
              </>
            )}
          </ReportCard>

          <div className='mr-4' />
          <ReportCard title='배지' align='center'>
            <ReportBadge />
          </ReportCard>
        </div>

        <div className='mt-6'>
          <ReportCard
            title='AI 레포트'
            width='343px'
            height='74px'
            disabled={!Data?.aiReportAvailable || false}
          >
            {Data?.aiReportAvailable ? (
              <p className='body-03-1_2 text-gray-400 mt-2'>
                AI가 당신의 미룸 패턴을 읽고, 가볍게 솔루션을 제안해드려요.
              </p>
            ) : (
              <p className='body-03-1_2 text-gray-400 mt-2'>
                3일 이상 기록하면, 다음 주 월요일에 확인할 수 있어요!
              </p>
            )}
          </ReportCard>
        </div>
        <Footer selectedMenu='report' />
      </div>
    </div>
  )
}

export default ReportPage
