import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { steps } from '@/data/testData'
import { postTestAnswer } from '@/apis/test/test'
import { useUserStore } from '@/store/store'

export const useTestStep = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const [selectedAnswers, setSelectedAnswers] = useState(Array(steps.length).fill(null))
  const setUserType = useUserStore((s) => s.setUserType)

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswers((prev) => {
      const next = [...prev]
      next[step] = Number(answerId)
      return next
    })
  }

  const nextStep = async () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1)
      return
    }
    try {
      const payload = selectedAnswers.map((v) => Number(v))
      const data = await postTestAnswer(payload)
      console.log('response:', data)

      const mytype = data?.data?.mytype ?? data?.mytype
      if (mytype) setUserType(mytype)
      navigate('/result')
    } catch (err) {
      console.error('테스트 제출 실패', err)
      alert('결과 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    } else {
      navigate(-1)
    }
  }

  return {
    step,
    selectedAnswers,
    handleSelectAnswer,
    nextStep,
    prevStep,
  }
}
