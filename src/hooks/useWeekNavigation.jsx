import { useState } from 'react'
import { getCurrentDate, getWeeksInMonthISO } from '@/utils/dateUtils'

export const useWeekNavigation = () => {
  const { month: nowMonth, week: nowWeek, weeks: currentWeeks } = getCurrentDate()
  const [currentMonth, setCurrentMonth] = useState(nowMonth)
  const [weekNames, setWeekNames] = useState(currentWeeks)
  const [currentWeek, setCurrentWeek] = useState(currentWeeks.indexOf(nowWeek))

  const updateWeeks = (month) => {
    const weeks = getWeeksInMonthISO(new Date().getFullYear(), month)
    setWeekNames(weeks)
    return weeks
  }

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else {
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
      const weeks = updateWeeks(prevMonth)
      setCurrentMonth(prevMonth)
      setCurrentWeek(weeks.length - 1)
    }
  }

  const handleNextWeek = () => {
    if (currentWeek < weekNames.length - 1) {
      setCurrentWeek(currentWeek + 1)
    } else {
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
      const weeks = updateWeeks(nextMonth)
      setCurrentMonth(nextMonth)
      setCurrentWeek(0)
    }
  }

  const handlePrevMonth = () => {
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1
    const weeks = updateWeeks(prevMonth)
    setCurrentMonth(prevMonth)
    setCurrentWeek(Math.min(currentWeek, weeks.length - 1))
  }

  const handleNextMonth = () => {
    if (currentMonth >= nowMonth) return
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
    const weeks = updateWeeks(nextMonth)
    setCurrentMonth(nextMonth)
    setCurrentWeek(Math.min(currentWeek, weeks.length - 1))
  }

  const isNextDisabled =
    currentMonth > nowMonth ||
    (currentMonth === nowMonth && currentWeek >= weekNames.indexOf(nowWeek))

  return {
    weekNames,
    currentWeek,
    currentMonth,
    handlePrevWeek,
    handleNextWeek,
    handlePrevMonth,
    handleNextMonth,
    isNextDisabled,
  }
}
