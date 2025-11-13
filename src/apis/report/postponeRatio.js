import apiClient from '../login/axiosConfig'

export const getTotalData = async () => {
  try {
    const response = await apiClient.get('/api/stats/postpone-ratio/total', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('총 미룸 비율 조회 실패:', error)
    throw error
  }
}

export const getWeekData = async (year, month, weekOfMonth) => {
  try {
    const response = await apiClient.get('/api/stats/postpone-ratio/week/by-calendar', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        year,
        month,
        weekOfMonth,
      },
    })
    return response.data
  } catch (error) {
    console.error('주간 미룸 비율 조회 실패:', error)
    throw error
  }
}

export const getMonthData = async (year, month) => {
  try {
    const response = await apiClient.get('/api/stats/postpone-ratio/month/by-ym', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        year,
        month,
      },
    })
    return response.data
  } catch (error) {
    console.error('월간 미룸 비율 조회 실패:', error)
    throw error
  }
}

export const getYearData = async (year) => {
  try {
    const response = await apiClient.get('/api/stats/postpone-ratio/year/by-year', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        year,
      },
    })
    return response.data
  } catch (error) {
    console.error('연간 미룸 비율 조회 실패:', error)
    throw error
  }
}
