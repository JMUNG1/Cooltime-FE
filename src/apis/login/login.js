import { baseURL } from './axiosConfig'

export const login = async (id, password) => {
  try {
    const response = await fetch(`${baseURL}/api/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify({
        username: id,
        password: password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('로그인 실패:', errorData)
      return { success: false, data: errorData }
    }

    const data = await response.json()
    return { success: true, data }
  } catch (err) {
    console.error('로그인 중 오류 발생:', err)
    return { success: false, data: err }
  }
}

export default login
