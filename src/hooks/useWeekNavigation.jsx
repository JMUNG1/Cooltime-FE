import { useState, useMemo } from 'react'

const weekNamesKR = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주']

const getWeeksInMonthISO = (year, month) => {
  const weeks = []
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const lastDayOfMonth = new Date(year, month, 0)

  let current = new Date(firstDayOfMonth)

  while (current <= lastDayOfMonth) {
    const monday = new Date(current)
    monday.setDate(current.getDate() - (current.getDay() || 7) + 1)

    const thursday = new Date(monday)
    thursday.setDate(monday.getDate() + 3)

    if (thursday.getMonth() + 1 === month) {
      const weekIndex = weeks.length
      if (weekIndex < weekNamesKR.length) {
        weeks.push(weekNamesKR[weekIndex])
      }
    }
    current = new Date(monday)
    current.setDate(monday.getDate() + 7)
  }

  return weeks
}

const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  const weeks = getWeeksInMonthISO(year, month)

  let week = weeks[0]
  let current = new Date(year, month - 1, 1)

  for (let i = 0; i < weeks.length; i++) {
    const monday = new Date(current)
    monday.setDate(current.getDate() - (current.getDay() || 7) + 1)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    if (today >= monday && today <= sunday) {
      week = weeks[i]
      break
    }

    current = new Date(monday)
    current.setDate(monday.getDate() + 7)
  }

  return { year, month, date, week, weeks }
}

export const useWeekNavigation = ({ initialPrevWeek = false } = {}) => {
  const { nowYear, nowMonth, nowWeekIndex, initialWeeks } = useMemo(() => {
    const { year, month, week, weeks } = getCurrentDate()
    return {
      nowYear: year,
      nowMonth: month,
      nowWeekIndex: weeks.indexOf(week) - 1,
      initialWeeks: weeks,
    }
  }, [])

  const [currentYear, setCurrentYear] = useState(nowYear)
  const [currentMonth, setCurrentMonth] = useState(nowMonth)
  const [weekNames, setWeekNames] = useState(initialWeeks)

  const initialWeek = initialPrevWeek ? Math.max(nowWeekIndex - 1, 0) : nowWeekIndex

  const [currentWeek, setCurrentWeek] = useState(initialWeek)

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
      initialPrevWeek &&
      (currentYear > nowYear ||
        (currentYear === nowYear && currentMonth >= nowMonth && currentWeek >= nowWeekIndex - 1))
    )
      return
    else if (
      currentYear > nowYear ||
      (currentYear === nowYear && currentMonth >= nowMonth && currentWeek >= nowWeekIndex)
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

  const isNextDisabled = initialPrevWeek
    ? currentYear > nowYear ||
      (currentYear === nowYear &&
        (currentMonth > nowMonth || (currentMonth === nowMonth && currentWeek >= nowWeekIndex - 1)))
    : currentYear > nowYear ||
      (currentYear === nowYear &&
        (currentMonth > nowMonth || (currentMonth === nowMonth && currentWeek >= nowWeekIndex)))

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
