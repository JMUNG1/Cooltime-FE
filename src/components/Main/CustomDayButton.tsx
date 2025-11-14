import { useMemo } from 'react'
import 'react-day-picker/style.css'
import React from 'react'
import { useUserStore } from '@/store/store'
import '@/index.css'
import PerfectDid from '@/assets/PerfectDid.svg?react'
import PerfectPostponed from '@/assets/PerfectPostponed.svg?react'
import StressDid from '@/assets/StressDid.svg?react'
import StressPostponed from '@/assets/StressPostponed.svg?react'
import LowMotivationDid from '@/assets/LowMotivationDid.svg?react'
import LowMotivationPostponed from '@/assets/LowMotivationPostponed.svg?react'
import type { DayButtonProps } from 'react-day-picker'
import { useCalendarStore } from '@/store/calendarStore'

// date 매핑
export function toISO(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 한 날 아이콘
const DidIcon: Record<'blue' | 'mint' | 'peach', React.FC<any>> = {
  blue: PerfectDid,
  mint: LowMotivationDid,
  peach: StressDid,
} as const

// 미룬날 아이콘
const PostponedIcon: Record<'blue' | 'mint' | 'peach', React.FC<any>> = {
  blue: PerfectPostponed,
  mint: LowMotivationPostponed,
  peach: StressPostponed,
} as const

export function CustomDayButton(props: DayButtonProps) {
  const theme = useUserStore((s) => s.theme)
  const logs = useCalendarStore((r) => r.logs)

  const logsByDate = useMemo(() => {
    const m: Record<string, { status: 'postponed' | 'did'; theme: string }> = {}
    for (const l of logs) {
      m[l.date] = { status: l.isPostponed ? 'postponed' : 'did', theme }
    }
    return m
  }, [logs, theme])

  const { day, modifiers, className, ...buttonProps } = props
  const key = toISO(day.date)
  const info = logsByDate[key]
  const label = String(day.date.getDate())

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDay = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate())

  const isPast = startOfDay.getTime() < startOfToday.getTime()
  const isToday = startOfDay.getTime() === startOfToday.getTime()

  let content: React.ReactNode = (
    <span
      className={`text-[12px] ${isPast ? 'text-grey-400' : isToday ? 'text-red ' : 'text-black-400'}`}
    >
      {label}
    </span>
  )
  if (info) {
    const Icon = info.status === 'postponed' ? PostponedIcon[info.theme] : DidIcon[info.theme]
    content = (
      <span className='inline-flex h-[33px] w-[38px] items-center justify-center'>
        <Icon />
      </span>
    )
  }

  return (
    <button
      {...buttonProps}
      className={`rdp-day-btn inline-flex items-center justify-center ${className ?? ''}`}
      aria-label={info ? `${key} ${info.status}` : buttonProps['aria-label']}
    >
      {content}
    </button>
  )
}
