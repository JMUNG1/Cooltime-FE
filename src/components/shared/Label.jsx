import React from 'react'
import { useUserStore } from '@/store/store'

const Label = ({ label }) => {
  const { theme } = useUserStore()

  const color = {
    blue: 'bg-blue-100 bg-opacity-50 border-blue-400 text-blue-600',
    mint: 'bg-mint-100 bg-opacity-50 border-mint-400 text-mint-600',
    peach: 'bg-peach-100 bg-opacity-50 border-peach-400 border-opacity-50 text-peach-600',
  }
  const labelColor = color[theme] ?? 'bg-main-100 bg-opacity-50 border-main-400 text-main-600'
  return (
    <div
      className={`inline-flex px-4 py-2 text-[14px] justify-center items-center border border-solid rounded-full ${labelColor}`}
    >
      {label}
    </div>
  )
}

export default Label
