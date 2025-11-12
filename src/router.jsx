import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import MainPage from './pages/MainPage'
import TestPage from '@/pages/TestPage'
import SignupPage from './pages/SignupPage'
import StartPage from './pages/StartPage'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import ReportPage from './pages/ReportPage'
import ChartPage from './pages/ChartPage'
import CategoryPage from './pages/CategoryPage'
import AIPage from './pages/AIPage'
import BadgePage from './pages/BadgePage'
import AllBadgePage from './pages/AllBadgePage'
import TestResultIntroPage from './pages/TestResultIntroPage'
import TypeResultPage from './pages/TypeResultPage'
import MyPage from './pages/MyPage'
import SignupWelcomePage from './pages/SignupWelcomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <StartPage /> },
      { path: 'home', element: <MainPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'result/intro', element: <TestResultIntroPage /> },
      { path: 'result', element: <TypeResultPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'signupwelcome', element: <SignupWelcomePage /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'report/chart', element: <ChartPage /> },
      { path: 'report/category', element: <CategoryPage /> },
      { path: 'report/badge', element: <BadgePage /> },
      { path: 'report/badge/all', element: <AllBadgePage /> },
      { path: 'report/ai', element: <AIPage /> },
    ],
  },
])

export default router
