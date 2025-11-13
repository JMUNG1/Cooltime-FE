import { create } from 'zustand'
import { userTypeMap } from '@/utils/userTypeMap'
import { persist } from 'zustand/middleware'

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken')
}

const mapTypeTheme = (t) => {
  if (t === '완벽주의형') return 'blue'
  if (t == '동기저하형') return 'mint'
  return 'peach'
}

export const useUserStore = create(
  persist(
    (set) => ({
      userType: '',
      theme: '',
      nickname: '',
      setUserType: (t) => {
        const koreanType = userTypeMap[t] ?? t
        set({ userType: koreanType, theme: mapTypeTheme(koreanType) })
      },
      setNickname: (n) => set({ nickname: n }),
      resetUser: () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user-store')
        localStorage.removeItem('refreshToken')
        set({
          userType: '',
          theme: '',
          nickname: '',
        })
      },
    }),
    {
      name: 'user-store',
    },
  ),
)
