import apiClient from '../login/axiosConfig'

export const postTestAnswer = async (payload) => {
  const { data } = await apiClient.post(
    '/api/test',
    { answers: payload },
    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
  )
  return data.data
}
