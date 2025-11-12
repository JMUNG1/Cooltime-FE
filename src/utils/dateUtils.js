const weekNamesKR = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주']

export const getWeeksInMonthISO = (year, month) => {
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

export const getCurrentDate = () => {
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
