import UploadBtn from '@/assets/UploadBtn.svg?react'
import { useUserStore } from '@/store/store'
import { useState, useRef } from 'react'

const InputBox = ({ inputRef, onClick, placeholder }) => {
  // 테마 색상
  const { theme } = useUserStore()
  const color = {
    blue: 'border-blue-300 focus-within:border-blue-400',
    mint: 'border-mint-300 focus-within:border-mint-400',
    peach: 'border-peach-300 focus-within:border-peach-400',
  }

  const [composing, setComposing] = useState(false)
  const submittingRef = useRef(false)

  const handleClick = () => {
    const value = inputRef.current?.value.trim()
    if (!value) return alert('값을 입력해주세요')
    submittingRef.current = true
    onClick(value)
    inputRef.current.value = ''
    submittingRef.current = false
  }

  const handleKeyDown = (e) => {
    if (composing || e.isComposing || e.nativeEvent?.isComposing) return

    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      handleClick()
    }
  }

  const Color = color[theme] ?? 'border-main-300 focus-within:border-main-400'
  return (
    <div>
      <div className='flex gap-4'>
        <div
          className={`flex justify-center px-4 py-2 border mb-1 text-black-400  rounded-2xl ${Color}`}
        >
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={() => setComposing(false)}
            className='resize-none border-none outline-none text-[12px] w-[200px]'
            placeholder={placeholder}
          />
        </div>
        <button type='button' onClick={handleClick}>
          <UploadBtn className='blue:text-blue-400 mint:text-mint-400 peach:text-peach-400' />
        </button>
      </div>
    </div>
  )
}

export default InputBox
