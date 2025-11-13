import { useState } from 'react'
import Header from '@/components/shared/Header'
import { useUserStore } from '@/store/store'
import TotalChart from '@/components/chart/TotalChart'
import WeekChart from '@/components/chart/WeekChart'
import MonthChart from '@/components/chart/MonthChart'
import YearChart from '@/components/chart/YearChart'
import { useNavigate } from 'react-router-dom'

const ChartPage = () => {
  const [menu, setMenu] = useState('총')
  const { theme } = useUserStore()
  const navigate = useNavigate()

  const menus = ['총', '주', '월', '년']

  const color = {
    blue: {
      background: 'bg-linear-to-b from-blue-200 to-gray-100',
      active: 'bg-blue-400 text-white',
      inactive: 'bg-white text-gray-400',
    },
    mint: {
      background: 'bg-linear-to-b from-mint-200 to-gray-100',
      active: 'bg-mint-400 text-white',
      inactive: 'bg-white text-gray-400',
    },
    peach: {
      background: 'bg-linear-to-b from-peach-200 to-gray-100',
      active: 'bg-peach-400 text-white',
      inactive: 'bg-white text-gray-400',
    },
  }

  const background = color[theme]?.background ?? 'bg-linear-to-b from-blue-200 to-gray-100'
  const currentColor = color[theme] ?? color.blue

  return (
    <div className='flex flex-col items-center'>
      <div className={`flex flex-col w-full max-w-[440px] min-h-screen items-center ${background}`}>
        <Header label='미룸 비율' />
        <div className='flex gap-2 shadow-xs mt-[94px] w-[343px] h-[33px] bg-white rounded-[50px] items-center justify-center pl-3 pr-3'>
          {menus.map((m) => (
            <button
              key={m}
              onClick={() => setMenu(m)}
              className={`flex-1 rounded-[50px] body-02-1_2 transition-all h-[22px] cursor-pointer
              ${menu === m ? currentColor.active : currentColor.inactive}`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className='mt-6 w-full'>
          {menu === '총' && <TotalChart />}
          {menu === '주' && <WeekChart />}
          {menu === '월' && <MonthChart />}
          {menu === '년' && <YearChart />}
        </div>
      </div>
    </div>
  )
}

export default ChartPage
