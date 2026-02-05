import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Auth/Login'
import SignupPage from '@/pages/Auth/Signup'
import MyPage from '@/pages/Users/My'
import TeamCreatePage from '@/pages/Team/TeamCreate'
import TeamDetailPage from '@/pages/Team/TeamDetail'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> },
          { path: '/mypage', element: <MyPage /> },
          { path: '/team/create', element: <TeamCreatePage /> },
          { path: '/team/:teamId', element: <TeamDetailPage /> },
        ],
      },
    ],
  },
])
