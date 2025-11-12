import apiClient from '../login/axiosConfig'

export const getAIReportData = async (year, month, weekOfMonth) => {
  try {
    const response = await apiClient.get('/api/ai-reports/by-calendar', {
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
    console.error('AI 레포트 조회 실패:', error)
    throw error
  }
}
