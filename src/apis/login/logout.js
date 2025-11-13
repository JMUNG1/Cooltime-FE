import apiClient from '../login/axiosConfig'

export const postSignOut = async () => {
  const { data } = await apiClient.post('/api/auth/sign-out', null, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })
  return data.data
}
