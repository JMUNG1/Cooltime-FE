import RecordMirum from './RecordMirum'
import ShowRecordModal from './ShowRecordModal'
import ConfirmModal from './ConfirmModal'
import { useLogStore } from '@/store/calendarStore'

const ModalContainer = ({
  open,
  pickedDay,
  modalMode, // 'create' | 'show' | 'edit'
  closeModal,
  goEdit,
  showSuccess,
  setShowSuccess,
  showRestriction,
  setShowRestriction,
  showCreateSuccess,
  setShowCreateSuccess,
}) => {
  return (
    <>
      {open && (
        <div className='fixed inset-0 z-50 w-full max-w-[440px] mx-auto'>
          <div
            className='absolute inset-0 w-full max-w-[440px] bg-grey-400/30 flex justify-center items-center'
            onClick={closeModal}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {modalMode === 'show' ? (
                <ShowRecordModal
                  onClick={() => {
                    closeModal()
                  }}
                  date={pickedDay}
                  onEdit={goEdit}
                  isPostponed={useLogStore.getState().isPostponed}
                />
              ) : (
                <RecordMirum
                  date={pickedDay}
                  mode={modalMode === 'edit' ? 'update' : 'create'}
                  closeModal={() => {
                    closeModal()
                    setShowCreateSuccess(true)
                  }}
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
        />
      )}
      {showRestriction && (
        <ConfirmModal
          onClose={() => setShowRestriction(false)}
          message={'기록은 당일에만 가능해요!'}
        />
      )}
      {showCreateSuccess && (
        <ConfirmModal
          onClose={() => setShowCreateSuccess(false)}
          message={'기록이 성공적으로 완료되었어요'}
        />
      )}
    </>
  )
}

export default ModalContainer
