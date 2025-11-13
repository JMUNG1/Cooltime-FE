import { useUserStore } from '@/store/store'
import X from '@/assets/X.svg?react'

const ModalButton = ({ text, selected = false, onClick = () => {}, onDelete, isDefault }) => {
  // 테마 로직
  const { theme } = useUserStore()
  const color = {
    blue: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-blue-400)_0%,#8F9BFF_100%)] border-blue-400' : 'text-grey-400 border-blue-400'} hover:border-blue-400`,
    mint: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-mint-400)_0%,#63CAAA_100%)] border-mint-400' : 'text-grey-400 border-mint-400'} hover:border-mint-400`,
    peach: `${selected ? 'text-white bg-[linear-gradient(180deg,var(--color-peach-400)_0%,#F59F55_100%)] border-peach-400' : 'text-grey-400 border-peach-400 hover:border-peach-400'}`,
  }
  const labelColor = color[theme] ?? null

  return (
    <div>
      <button
        onClick={onClick}
        className={`relative inline-flex text-[14px] px-3.5 py-1.5 rounded-3xl border transition-colors duration-200 cursor-pointer ${labelColor}`}
      >
        {text}
        {!isDefault && (
          <span
            role='button'
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(text)
            }}
            className='absolute bg-white border -right-1 -top-1 blue:border-blue-400  mint:border-mint-400 peach:border-peach-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center cursor-pointer'
          >
            <X className='blue:text-blue-400 mint:text-mint-400 peach:text-peach-400' />
          </span>
        )}
      </button>
    </div>
  )
}

export default ModalButton
