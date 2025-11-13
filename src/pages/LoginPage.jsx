import { useState, useEffect } from 'react'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import LoginInput from '@/components/signup/LoginInput'
import { useNavigate } from 'react-router-dom'
import { login } from '@/apis/login/login'
import { useUserStore } from '@/store/store'

const LoginPage = () => {
  const [disabled, setDisabled] = useState(false)
  const [idNotice, setIdNotice] = useState('none')
  const [passNotice, setPassNotice] = useState('none')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUserType, setNickname } = useUserStore()

  useEffect(() => {
    if (id.trim() !== '' && password.trim() !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [id, password])

  const handleWelcome = async () => {
    const result = await login(id, password)
    if (result.success) {
      localStorage.setItem('accessToken', result.data.data.accessToken)
      localStorage.setItem('refreshToken', result.data.data.refreshToken)
      if (result.data.data.myType === null) {
        setNickname(result.data.data.nickname)
        navigate('/welcome')
      } else {
        setUserType(result.data.data.myType)
        setNickname(result.data.data.nickname)
        navigate('/home')
      }
    } else {
      if (result.data.code === 400) {
        setPassNotice('error')
        setIdNotice('none')
      } else if (result.data.code === 404) {
        setIdNotice('error')
        setPassNotice('none')
      } else {
        setPassNotice('error')
        setIdNotice('error')
      }
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-[440px] w-full'>
        <div className='mt-10 ml-4'>
          <button onClick={() => navigate(-1)} className='cursor-pointer'>
            <Back />
          </button>
        </div>
        <div className='mt-8 ml-6'>
          <h3 className='Title-01-1_2 text-main-500'>로그인을 해주세요.</h3>
        </div>
        <div className='mt-8 flex flex-col items-center'>
          <LoginInput
            option='아이디'
            state={idNotice}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <LoginInput
            option='비밀번호'
            state={passNotice}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-center'>
          <Button label='다음' onClick={handleWelcome} disabled={disabled}></Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
