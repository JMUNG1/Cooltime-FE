import PerfectCalendar from '@/assets/PerfectCalender.svg?react'
import StressCalendar from '@/assets/StressCalendar.svg?react'
import LowMotivationCalendar from '@/assets/LowMotivationCalendar.svg?react'
import CalendarCheck2 from '@/assets/CalendarCheck2.svg?react'
import CalendarLeftArrow from '@/assets/CalendarLeftArrow.svg?react'
import CalendarRightArrow from '@/assets/CalendarRightArrow.svg?react'
import CalendarCheck from '@/assets/CalendarCheck.svg?react'
import 'react-day-picker/style.css'
import { useDayPicker, type CalendarMonth } from 'react-day-picker'
import React from 'react'
import { useUserStore } from '@/store/store'
import '@/index.css'

type MonthCaptionProps = React.ComponentProps<'div'> & {
  calendarMonth: CalendarMonth
  displayIndex: number
  didCount?: number
  postponedCount?: number
  nothing?: null
}

export function CustomMonthCaption({
  calendarMonth,
  displayIndex,
  didCount,
  postponedCount,
  nothing,
  ...rest
}: MonthCaptionProps) {
  const { goToMonth } = useDayPicker()

  const image = {
    완벽주의형: <PerfectCalendar />,
    동기저하형: <LowMotivationCalendar />,
    스트레스형: <StressCalendar />,
  }
  const check = {
    완벽주의형: <CalendarCheck />,
    동기저하형: <CalendarCheck2 />,
    스트레스형: <CalendarCheck2 />,
  }
  const { userType } = useUserStore()
  const Image = image[userType] ?? null
  const Check = check[userType] ?? null

  return (
    <div {...rest} className={`flex flex-col items-center justify-center gap-2 mb-3 mt-1`}>
      <div className='flex items-center gap-1 px-4 pb-5'>
        <button
          className='cursor-pointer'
          onClick={() =>
            goToMonth(new Date(calendarMonth.date.getFullYear(), calendarMonth.date.getMonth() - 1))
          }
        >
          <CalendarLeftArrow />
        </button>
        <span className='font-[Medium] text-black-400'>
          {calendarMonth.date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}
        </span>
        <button
          className='cursor-pointer'
          onClick={() =>
            goToMonth(new Date(calendarMonth.date.getFullYear(), calendarMonth.date.getMonth() + 1))
          }
        >
          <CalendarRightArrow />
        </button>
      </div>

      <div className='flex h-5 items-center w-full justify-start gap-2'>
        <div className='flex items-center justify-center gap-2'>
          {Image}
          <div className='text-black-400 text-[14px]'>{postponedCount}</div>
        </div>
        <div className='flex items-center justify-center gap-2'>
          {Check}
          <div className='text-black-400 text-[14px]'>{didCount}</div>
        </div>
      </div>
    </div>
  )
}
