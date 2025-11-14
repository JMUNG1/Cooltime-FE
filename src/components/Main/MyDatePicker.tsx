import { useState, useEffect } from 'react'
import 'react-day-picker/style.css'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import { type ThHTMLAttributes, type TableHTMLAttributes } from 'react'
import '@/index.css'
import { CustomMonthCaption } from './CustomMonthCaption'
import { CustomDayButton } from './CustomDayButton'
import { useCalendarStore } from '@/store/calendarStore'
import { useGetCalendar } from '@/apis/calendar/queries'
import { useNavigate } from 'react-router-dom'

export function MyDatePicker({
  onPickDay,
  selected,
}: {
  onPickDay: (d: Date) => void
  selected: Date | null | undefined
}) {
  const postponedCount = useCalendarStore((c) => c.postponedCount)
  const completedCount = useCalendarStore((c) => c.completedCount)
  const navigate = useNavigate()

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth() + 1

  const { isError } = useGetCalendar({ year, month: month })
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month)
  }

  useEffect(() => {
    if (isError) {
      alert('캘린더 로드에 실패했습니다. 다시 로그인해주세요')
      navigate('/')
    }
  }, [isError, navigate])

  function CustomChevron() {
    return null
  }
  function CustomWeekDay(props: ThHTMLAttributes<HTMLTableCellElement>) {
    return <th {...props} className='text-[12px] text-black-400 pb-1 font-light' />
  }
  function CustomMonthGrid(props: TableHTMLAttributes<HTMLTableElement>) {
    return <table {...props} className='border-separate border-spacing-y-3' />
  }

  return (
    <div>
      <DayPicker
        locale={ko}
        weekStartsOn={1}
        mode='single'
        onMonthChange={handleMonthChange}
        onSelect={(day) => {
          onPickDay(day)
        }}
        navLayout='around'
        components={{
          MonthCaption: (props) => (
            <CustomMonthCaption
              {...props}
              didCount={completedCount}
              postponedCount={postponedCount}
            />
          ),
          Chevron: CustomChevron,
          Weekday: CustomWeekDay,
          MonthGrid: CustomMonthGrid,
          DayButton: CustomDayButton,
        }}
      />
    </div>
  )
}
