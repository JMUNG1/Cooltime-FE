import Main from '@/components/Main/Main'
import Footer from '@/components/shared/Footer'
import { useRecordModal } from '@/utils/mirumUtils'
import ModalContainer from '@/components/Main/ModalContainer'

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
    showCreateSuccess,
    setShowCreateSuccess,
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
      <ModalContainer
        open={open}
        pickedDay={pickedDay}
        modalMode={modalMode}
        closeModal={closeModal}
        goEdit={goEdit}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        showRestriction={showRestriction}
        setShowRestriction={setShowRestriction}
        showCreateSuccess={showCreateSuccess}
        setShowCreateSuccess={setShowCreateSuccess}
      />
    </div>
  )
}

export default MainPage
