import './App.css'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ThemeGate from './hooks/ThemeGate'

function App() {
  const hasToken = !!localStorage.getItem('accessToken')
  const location = useLocation()

  const publicPaths = ['/', '/login', '/signup', '/signupwelcome']

  if (!hasToken && !publicPaths.includes(location.pathname)) {
    alert('로그인 후 이용 가능한 서비스입니다.')
    return <Navigate to='/' replace />
  }

  return (
    <>
      <ThemeGate />
      <Outlet />
    </>
  )
}

export default App
