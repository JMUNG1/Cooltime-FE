import { useEffect } from 'react'
import Button from '@/components/shared/Button'
import MoogChi from '@/assets/MoogChi.svg?react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

const SignupWelcomePage = () => {
  const navigate = useNavigate()

  function firework() {
    var duration = 15 * 100
    var animationEnd = Date.now() + duration
    var defaults = { startVelocity: 20, spread: 360, ticks: 150, zIndex: 0, scalar: 0.8 }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      var particleCount = 50 * (timeLeft / duration)

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: 0.5, y: 0.17 },
        }),
      )
    }, 900)
  }

  useEffect(() => {
    firework()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col min-h-screen w-full max-w-[440px] items-center bg-linear-to-b from-main-200 to-white'>
        <MoogChi className='fixed top-[8vh]' />
        <div className='flex flex-col items-center w-max-[440px] min-h-screen text-center'>
          <h1 className='Title-01-1_1 text-black-400 mt-[15vh]'>회원가입이 완료되었어요!</h1>
          <h3 className='body-01-1_2 text-gray-400 mt-[26px]'>로그인 후 쿨타임을 시작해보세요.</h3>
          <div className='fixed bottom-10'>
            <Button label='로그인하기' onClick={() => navigate('/login')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupWelcomePage
