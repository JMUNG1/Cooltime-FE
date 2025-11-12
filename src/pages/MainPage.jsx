import Main from '@/components/Main/Main'
import Footer from '@/components/shared/Footer'
import RecordMirum from '@/components/Main/RecordMirum'
import ShowRecordModal from '@/components/Main/ShowRecordModal'
import UpdateRecordModal from '@/components/Main/UpdateRecordModal'
import ConfirmModal from '@/components/Main/ConfirmModal'
import { useRecordModal } from '@/utils/mirumUtils'
import { useLogStore } from '@/store/calendarStore'

const MainPage = () => {
  const {
    open,
    pickedDay,
    modalMode,
    showSuccess,
    setShowSuccess,
    handlePickDay,
    closeModal,
    goEdit,
    showRestriction,
    setShowRestriction,
  } = useRecordModal()

  return (
    <div className='flex min-h-screen justify-center items-center w-full scrollbar-hide'>
      <div
        className='w-full max-w-[440px] min-h-screen
      blue:bg-[linear-gradient(180deg,var(--color-blue-300)_15.09%,var(--color-blue-100)_83%)]
      mint:bg-[linear-gradient(180deg,var(--color-mint-300)_15.09%,var(--color-mint-100)_83%)]
      peach:bg-[linear-gradient(180deg,var(--color-peach-300)_15.09%,var(--color-peach-100)_83%)]
      '
      >
        <div className='px-4 pt-[17px] pb-20'>
          <Main onPickDay={handlePickDay} pickedDay={pickedDay} />
        </div>
        <Footer selectedMenu='home' />
      </div>
      {open && (
        <div className='fixed inset-0 z-50 w-full max-w-[440px] mx-auto'>
          <div
            className='absolute inset-0 w-full max-w-[440px] bg-grey-400/30 flex justify-center items-center'
            onClick={closeModal}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {modalMode === 'create' ? (
                <RecordMirum date={pickedDay} closeModal={closeModal} />
              ) : modalMode === 'show' ? (
                <ShowRecordModal
                  onClick={() => {
                    closeModal()
                  }}
                  date={pickedDay}
                  onEdit={goEdit}
                  isPostponed={useLogStore.getState().isPostponed}
                />
              ) : (
                <UpdateRecordModal
                  date={pickedDay}
                  onSuccess={() => {
                    closeModal()
                    setShowSuccess(true)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {showSuccess && (
        <ConfirmModal
          onClose={() => setShowSuccess(false)}
          message={'수정이 성공적으로 완료되었어요'}
          closeModal={closeModal}
        />
      )}
      {showRestriction && (
        <ConfirmModal
          onClose={() => setShowRestriction(false)}
          message={'기록은 당일에만 가능해요!'}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}

export default MainPage
