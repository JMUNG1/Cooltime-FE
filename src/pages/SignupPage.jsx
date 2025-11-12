import { useState, useEffect } from 'react'
import StepControl from '@/components/signup/StepControl'
import Button from '@/components/shared/Button'
import Back from '@/assets/Back.svg?react'
import LoginInput from '@/components/signup/LoginInput'
import { useNavigate } from 'react-router-dom'
import { signup } from '@/apis/signup/signup'
import { checkId, checkNickname, checkPassword } from '@/apis/signup/checkValue'

const SignupPage = () => {
  const totalSteps = 3
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [state, setState] = useState('default')
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  })

  const navigate = useNavigate()

  const option = [
    { step: 0, key: 'id', label: '아이디' },
    { step: 1, key: 'password', label: '비밀번호' },
    { step: 2, key: 'nickname', label: '닉네임' },
  ]

  const currentKey = option[activeStep].key
  const currentValue = formData[currentKey]

  const handleChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [currentKey]: value,
    }))
  }

  useEffect(() => {
    setState('default')
    setDisabled(currentValue.trim().length === 0)
  }, [currentValue])

  useEffect(() => {
    setState('default')
    setDisabled(true)
  }, [activeStep])

  const validateId = async () => {
    const result = await checkId(formData.id)

    if (result.success) {
      setState('none')
      setDisabled(false)
      return true
    } else {
      if (result.code === 409) {
        setState('duplicate')
      } else if (result.code === 400) {
        setState('invalid')
      } else {
        setState('error')
      }
      setDisabled(true)
      return false
    }
  }

  const validatePassword = async () => {
    const result = await checkPassword(formData.password)

    if (!result.success) {
      if (result.code === 400) {
        setState('invalid')
      } else {
        setState('default')
      }
      setDisabled(true)
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setState('duplicate')
      setDisabled(true)
      return false
    }
    setState('none')
    setDisabled(false)
    return true
  }

  const validateNickname = async () => {
    const result = await checkNickname(formData.nickname)

    if (result.success) {
      setState('none')
      setDisabled(false)
      return true
    } else {
      if (result.code === 409) {
        setState('duplicate')
      } else if (result.code === 400) {
        setState('invalid')
      } else {
        setState('default')
      }
      setDisabled(true)
      return false
    }
  }

  const handleCheck = async () => {
    switch (activeStep) {
      case 0:
        return await validateId()
      case 1:
        return validatePassword()
      case 2:
        return validateNickname()
      default:
        return false
    }
  }

  const handleComplete = async () => {
    const isValid = await handleCheck()
    if (isValid) {
      setCompleted((prev) => ({ ...prev, [activeStep]: true }))
      if (activeStep < totalSteps - 1) {
        setActiveStep((prev) => prev + 1)
      } else {
        signup(formData)
        navigate('/signupwelcome')
      }
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col w-full max-w-[440px] min-h-screen'>
        <div className='mt-10 ml-4'>
          <button onClick={() => navigate(-1)}>
            <Back />
          </button>
        </div>

        <div className='mt-9 ml-3 w-[131px]'>
          <StepControl activeStep={activeStep} totalSteps={totalSteps} completed={completed} />
        </div>

        <div className='mt-10 ml-6'>
          <h3 className='Title-01-1_2 text-main-500'>{option[activeStep].label} 입력</h3>
        </div>

        <div className='mt-8 flex flex-col items-center'>
          <LoginInput
            option={option[activeStep].label}
            state={state}
            value={currentValue}
            onChange={handleChange}
            step={activeStep}
          />

          {activeStep === 1 && (
            <LoginInput
              option='비밀번호_확인'
              state={state}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              step={activeStep}
            />
          )}
        </div>

        <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-center'>
          <Button label='다음' onClick={handleComplete} disabled={disabled}></Button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
