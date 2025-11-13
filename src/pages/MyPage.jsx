import Label from '@/components/shared/Label'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/store'
import Footer from '@/components/shared/Footer'
import RightArrow from '@/assets/RightArrow.svg?react'
import { typeImage } from '@/data/typeImage'
import { postSignOut } from '@/apis/login/logout'
import { useQueryClient } from '@tanstack/react-query'
import apiClient from '@/apis/login/axiosConfig'
import {
  useDidStore,
  useCategoryStore,
  useReasonStore,
  useCalendarStore,
  useLogStore,
} from '@/store/calendarStore'

const MyPage = () => {
  const { userType } = useUserStore((s) => s)
  const navigate = useNavigate()
  const nickname = useUserStore((n) => n.nickname)
  const resetUser = useUserStore((s) => s.resetUser)
  const queryClient = useQueryClient()

  const Image = typeImage[userType] ?? null

  const label =
    userType === '완벽주의형' ? '완벽주의' : userType === '동기저하형' ? '동기저하' : '스트레스'

  const handleSignOut = async () => {
    try {
      try {
        await postSignOut()
      } catch (_) {}
      delete apiClient.defaults.headers.common?.Authorization

      await queryClient.cancelQueries()

      queryClient.clear()

      useDidStore.getState().clearSelected()
      useCategoryStore.getState().clearSelected()
      useReasonStore.getState().clearSelected()

      const cal = useCalendarStore.getState()
      cal.setLogs([])
      cal.setCompletedCount(0)
      cal.setPostponedCount(0)
      cal.setSelectedDate?.(null)

      useLogStore.getState().setCurrentLog(null)

      resetUser()
      navigate('/')
    } catch (err) {
      console.error('로그아웃 실패:', err)
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div className='w-full flex flex-col items-center max-w-[440px] min-h-screen blue:bg-blue-100 mint:bg-mint-100 peach:bg-peach-100'>
        <div className='mt-20'>{Image}</div>
        <div className='flex flex-col justify-center items-center gap-[19px] mt-6'>
          <p className='font-[Medium] text-[22px] text-black-400'>{nickname}</p>
          <Label label={label} />
        </div>
        <div className='flex flex-col gap-6 mt-20'>
          <button
            onClick={() => navigate('/test')}
            className='w-[343px] shadow-xs text-black-400 text-[14px] font-[Medium] py-4 px-4 flex items-center justify-between bg-white border rounded-2xl cursor-pointer blue:border-blue-500 mint:border-mint-500 peach:border-peach-500'
          >
            유형 재검사하기
            <RightArrow />
          </button>
          <button
            onClick={handleSignOut}
            className='w-[343px] shadow-xs text-black-400 text-[14px] font-[Medium] py-4 px-4 flex items-center justify-between bg-white border rounded-2xl cursor-pointer blue:border-blue-500 mint:border-mint-500 peach:border-peach-500'
          >
            로그아웃
            <RightArrow />
          </button>
        </div>

        <Footer selectedMenu='mypage' />
      </div>
    </div>
  )
}

export default MyPage
