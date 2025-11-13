import { useEffect, useState } from 'react'
import {
  useCalendarStore,
  useDidStore,
  useCategoryStore,
  useReasonStore,
  useLogStore,
} from '@/store/calendarStore'
import { toISO } from '@/components/Main/CustomDayButton'
import { getLog } from '@/apis/calendar/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useGetTag } from '@/apis/calendar/queries'

export const useRecordModal = () => {
  const [open, setOpen] = useState(false)
  const [pickedDay, setPickedDay] = useState(null)
  const [modalMode, setModalMode] = useState('create') // 'create' | 'show' | 'edit'
  const [showSuccess, setShowSuccess] = useState(false)
  const [showRestriction, setShowRestriction] = useState(false)
  const [showCreateSuccess, setShowCreateSuccess] = useState(false)

  const queryClient = useQueryClient()
  useGetTag()

  const monthLogs = useCalendarStore((s) => s.logs)
  const setCurrentLog = useLogStore((s) => s.setCurrentLog)

  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [open])

  const resetSelections = () => {
    clearDid()
    clearCategory()
    clearReason()
  }

  const closeModal = () => {
    setOpen(false)
    setPickedDay(null)
    resetSelections()
  }

  const handlePickDay = async (day) => {
    if (!day) return

    const iso = toISO(day)
    const dayLog = monthLogs.find((log) => log.date === iso)
    const todayIso = toISO(new Date())

    if (open && pickedDay && pickedDay.toDateString() === day.toDateString()) {
      closeModal()
      return
    }

    // 1) 기록 있는 날이면 그대로 열기
    if (dayLog) {
      const log = await getLog(iso)

      if (log) {
        setModalMode('show')
        setPickedDay(day)
        setOpen(true)
      } else {
        alert('로그 데이터가 없습니다')
      }
      return
    }

    // 2) 기록 없는 날인데 오늘이 아니면 create 열지 않음
    if (iso !== todayIso) {
      setShowRestriction(true)
      return
    }

    // 3) 기록 없고 오늘이면 create 열기
    resetSelections()
    setCurrentLog(null)
    await queryClient.invalidateQueries({ queryKey: ['tag'] })
    setModalMode('create')
    setPickedDay(day)
    setOpen(true)
  }

  const goEdit = async (date) => {
    await queryClient.invalidateQueries({ queryKey: ['tag'] })
    setModalMode('edit')
    setOpen(true)
    setPickedDay(date)
  }

  return {
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
  }
}
