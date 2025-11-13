import { useState } from 'react'
import { getCurrentDate, getWeeksInMonthISO } from '@/utils/dateUtils'

export const useWeekNavigation = () => {
  const { year: nowYear, month: nowMonth, week: nowWeek, weeks: currentWeeks } = getCurrentDate()

  const [currentYear, setCurrentYear] = useState(nowYear)
  const [currentMonth, setCurrentMonth] = useState(nowMonth)
  const [weekNames, setWeekNames] = useState(currentWeeks)
  const [currentWeek, setCurrentWeek] = useState(currentWeeks.indexOf(nowWeek) - 1)

  const updateWeeks = (year, month) => {
    const weeks = getWeeksInMonthISO(year, month)
    setWeekNames(weeks)
    return weeks
  }

  const handlePrevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1)
    } else {
      let prevMonth = currentMonth - 1
      let year = currentYear
      if (prevMonth < 1) {
        prevMonth = 12
        year -= 1
      }
      const weeks = updateWeeks(year, prevMonth)
      setCurrentYear(year)
      setCurrentMonth(prevMonth)
      setCurrentWeek(weeks.length - 1)
    }
  }

  const handleNextWeek = () => {
    if (
      currentYear > nowYear ||
      (currentYear === nowYear &&
        currentMonth >= nowMonth &&
        currentWeek >= currentWeeks.indexOf(nowWeek) - 1)
    )
      return

    if (currentWeek < weekNames.length - 1) {
      setCurrentWeek(currentWeek + 1)
    } else {
      let nextMonth = currentMonth + 1
      let year = currentYear
      if (nextMonth > 12) {
        nextMonth = 1
        year += 1
      }
      const weeks = updateWeeks(year, nextMonth)
      setCurrentYear(year)
      setCurrentMonth(nextMonth)
      setCurrentWeek(0)
    }
  }

  const handlePrevMonth = () => {
    let prevMonth = currentMonth - 1
    let year = currentYear
    if (prevMonth < 1) {
      prevMonth = 12
      year -= 1
    }
    const weeks = updateWeeks(year, prevMonth)
    setCurrentYear(year)
    setCurrentMonth(prevMonth)
    setCurrentWeek(Math.min(currentWeek, weeks.length - 1))
  }

  const handleNextMonth = () => {
    if (currentYear > nowYear || (currentYear === nowYear && currentMonth >= nowMonth)) return

    let nextMonth = currentMonth + 1
    let year = currentYear
    if (nextMonth > 12) {
      nextMonth = 1
      year += 1
    }
    const weeks = updateWeeks(year, nextMonth)
    setCurrentYear(year)
    setCurrentMonth(nextMonth)
    setCurrentWeek(Math.min(currentWeek, weeks.length - 1))
  }

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1)
  }

  const handleNextYear = () => {
    if (nowYear > currentYear) {
      setCurrentYear(currentYear + 1)
    }
  }

  const isNextDisabled =
    currentYear > nowYear ||
    (currentYear === nowYear &&
      (currentMonth > nowMonth ||
        (currentMonth === nowMonth && currentWeek + 1 >= weekNames.indexOf(nowWeek))))

  return {
    weekNames,
    currentWeek,
    currentMonth,
    currentYear,
    handlePrevWeek,
    handleNextWeek,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
    isNextDisabled,
  }
}
