import MoogChiMini from '@/assets/MoogChiMini.svg?react'
import ModalX from '@/assets/ModalX.svg?react'
const ConfirmModal = ({ onClose, message }) => {
  return (
    <div className='fixed inset-0 z-50 w-full max-w-[440px] mx-auto'>
      <div
        className='absolute inset-0 w-full max-w-[440px] bg-grey-400/30 flex justify-center items-center'
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-[273px] box-border px-6 py-4 bg-white rounded-2xl h-[114px] z-1000 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
        >
          <div className='w-full flex flex-col items-center'>
            <button onClick={onClose} className='w-full flex justify-end cursor-pointer'>
              <ModalX />
            </button>
            <div className='w-[225px] flex flex-col justify-center items-center gap-4'>
              <MoogChiMini />
              <p className='text-[16px]'>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
