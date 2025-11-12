import { useState } from 'react'
import { useRef } from 'react'
import ModalButton from './ModalButton'
import { useDidStore, useCategoryStore, useReasonStore } from '@/store/calendarStore'
import { useScrollFocus } from '@/hooks/useScrollFocus'
import InputBox from './InputBox'
import { useUpdateLog } from '@/apis/calendar/queries'

const UpdateRecordModal = ({ date, onSuccess }) => {
  const mutation = useUpdateLog(onSuccess)
  const formattedDate = date
    ? date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    : '날짜 없음'

  // 할 일, 이유 추가 관련 로직
  const [categoryAddBtnOpen, setCategoryAddBtnOpen] = useState(false)
  const [reasonAddBtnOpen, setReasonAddBtnOpen] = useState(false)

  const handleAddCategory = () => {
    setCategoryAddBtnOpen((prev) => !prev)
  }
  const handleAddReason = () => {
    setReasonAddBtnOpen((prev) => !prev)
  }

  const inputRef = useRef(null)
  useScrollFocus(reasonAddBtnOpen, inputRef)
  useScrollFocus(categoryAddBtnOpen, inputRef)

  // store 로직
  const options = useDidStore((d) => d.options)
  const didSelected = useDidStore((d) => d.selected)
  const toggleOption = useDidStore((d) => d.toggleOption)

  const categories = useCategoryStore((c) => c.categories)
  const categorySelected = useCategoryStore((c) => c.selected)
  const toggleCategory = useCategoryStore((c) => c.toggleCategory)

  const reasons = useReasonStore((r) => r.reasons)
  const reasonSelected = useReasonStore((r) => r.selected)
  const toggleReason = useReasonStore((r) => r.toggleReason)

  const isPostponed = useDidStore((s) => s.isPostponed)

  const isCompleted =
    (!isPostponed && didSelected.size > 0) || // '했어요' 선택
    (isPostponed && categorySelected.size > 0 && reasonSelected.size > 0) // '미뤘어요' 선택 시 조건

  const handleSubmit = async () => {
    mutation.mutate()
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='w-[343px] rounded-[20px] z-1000 bg-white h-[530px] fixed bottom-7 left-1/2 -translate-x-1/2'
    >
      <div className='px-[29.5px] w-full flex flex-col justify-center items-center'>
        <hr className='bg-grey-400 h-0.5 w-[119px] mt-4 flex ' />
        <div className='font-[SemiBold] text-[18px] font-thin mt-6 mb-3 text-black-400 '>
          {formattedDate}
        </div>
        <div className='flex flex-col justify-start w-full gap-8 h-[350px] overflow-y-auto scrollbar-hide'>
          <div className='mt-3'>
            <p className='body-02-1_2 text-black-400'>오늘 할 일을 했나요?</p>
            <div className={`flex gap-6 mt-3`}>
              {options.map((option, id) => {
                return (
                  <ModalButton
                    key={`option-${id}-${option}`}
                    text={option}
                    selected={didSelected.has(option)}
                    onClick={() => toggleOption(option)}
                    isDefault={true}
                  />
                )
              })}
            </div>
          </div>
          <div>
            <p className='body-02-1_2 text-black-400'>무슨 일을 미뤘나요?</p>
            <div
              className={`flex flex-wrap gap-x-6 gap-y-4 mt-3 ${isPostponed ? '' : 'opacity-70 pointer-events-none'}`}
            >
              {categories.map((c, id) => {
                return (
                  <ModalButton
                    key={`category-${id}-${c.name}`}
                    text={c.name}
                    selected={categorySelected.has(c.name)}
                    onClick={() => toggleCategory(c.name)}
                    onDelete={() => useCategoryStore.getState().removeCategory(c.name)}
                    isDefault={c.isDefault}
                  />
                )
              })}
              <ModalButton
                text='+'
                onClick={handleAddCategory}
                selected={categoryAddBtnOpen}
                isDefault={true}
              />
              {categoryAddBtnOpen && <InputBox inputRef={inputRef} />}
            </div>
          </div>
          <div>
            <p className='body-02-1_2 text-black-400'>왜 미뤘나요?</p>
            <div
              className={`flex flex-wrap gap-x-6 gap-y-4 mt-3 ${isPostponed ? '' : 'opacity-70 pointer-events-none'}`}
            >
              {reasons.map((r, id) => (
                <ModalButton
                  key={`${r.name}-${id}`}
                  text={r.name}
                  selected={reasonSelected.has(r.name)}
                  onClick={() => toggleReason(r.name)}
                  onDelete={() => useReasonStore.getState().removeReason(r.name)}
                  isDefault={r.isDefault}
                />
              ))}
              <ModalButton
                text='+'
                onClick={handleAddReason}
                selected={reasonAddBtnOpen}
                isDefault={true}
              />
              {reasonAddBtnOpen && <InputBox inputRef={inputRef} />}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className={`mt-10 mb-4 px-10 py-2 rounded-full text-white flex justify-center items-center cursor-pointer blue:bg-blue-400 mint:bg-mint-400 peach:bg-peach-400 ${isCompleted ? '' : 'opacity-70 pointer-events-none'}`}
        >
          완료
        </button>
      </div>
    </div>
  )
}

export default UpdateRecordModal
