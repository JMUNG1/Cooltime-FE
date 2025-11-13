import React from 'react'
import Icon from '@/assets/More.svg?react'
import { useUserStore } from '@/store/store'

const More = ({ onClick = () => {}, disabled = false }) => {
  const { theme } = useUserStore()

  const color = {
    blue: { background: 'bg-blue-600', disabled: 'bg-blue-300' },
    mint: { background: 'bg-mint-600', disabled: 'bg-mint-300' },
    peach: { background: 'bg-peach-600', disabled: 'bg-peach-300' },
  }

  const background = disabled ? color[theme]?.disabled : color[theme]?.background

  return (
    <button
      className={`flex flex-col w-5 h-5 ${background} rounded-[50px] items-center pt-0.5 cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon />
    </button>
  )
}

export default More
