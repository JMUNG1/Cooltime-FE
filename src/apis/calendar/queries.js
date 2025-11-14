import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  postLog,
  updateLog,
  postActivity,
  postReason,
  deleteActivity,
  deleteReason,
  getCalendar,
  getTag,
} from './axios'
import {
  useDidStore,
  useCategoryStore,
  useReasonStore,
  useCalendarStore,
} from '@/store/calendarStore'

export const useGetCalendar = ({ year, month }) => {
  const setLogs = useCalendarStore((state) => state.setLogs)
  const setCompletedCount = useCalendarStore((state) => state.setCompletedCount)
  const setPostponedCount = useCalendarStore((state) => state.setPostponedCount)
  const isEnabled = !!year && !!month

  const query = useQuery({
    queryKey: ['calendar', year, month],
    queryFn: () => getCalendar({ year, month }),
    placeholderData: (prev) => prev,
    enabled: isEnabled,
    staleTime: 30 * 60 * 1000,
    retry: 2,
  })

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const data = query.data
      const summary = data.summary
      const logs = data.logs

      setLogs(logs)
      setCompletedCount(summary.completedCount)
      setPostponedCount(summary.postponedCount)
    }
  }, [query.isSuccess, query.data, setLogs, setCompletedCount, setPostponedCount])

  useEffect(() => {
    if (query.isError) {
      console.error('캘린더 데이터 로드 실패:', query.error)
    }
  }, [query.isError, query.error])

  return query
}

export const usePostLog = (closeModal) => {
  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)
  const currentMonth = useCalendarStore((s) => s.currentMonth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => postLog(),
    onSuccess: async () => {
      closeModal?.()

      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1
      await queryClient.invalidateQueries({
        queryKey: ['calendar', year, month],
      })

      clearDid()
      clearCategory()
      clearReason()
    },
    onError: (err) => {
      console.error('미룸 기록 저장 실패', err)
      alert('기록 저장에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useUpdateLog = (onSuccess) => {
  const clearDid = useDidStore((s) => s.clearSelected)
  const clearCategory = useCategoryStore((s) => s.clearSelected)
  const clearReason = useReasonStore((s) => s.clearSelected)
  const currentMonth = useCalendarStore((s) => s.currentMonth)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => updateLog(),
    onSuccess: async () => {
      onSuccess?.()

      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1
      await queryClient.invalidateQueries({
        queryKey: ['calendar', year, month],
      })

      clearDid()
      clearCategory()
      clearReason()
    },
    onError: (err) => {
      console.error('미룸 기록 저장 실패', err)
      alert('기록 수정에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useGetTag = () => {
  const setCategories = useCategoryStore((s) => s.setCategories)
  const setReasons = useReasonStore((s) => s.setReasons)

  const query = useQuery({
    queryKey: ['tag'],
    queryFn: getTag,
    staleTime: 30 * 60 * 1000,
    retry: 2,
  })

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const { activities, reasons } = query.data

      setCategories(activities)
      setReasons(reasons)
    }
  }, [query.isSuccess, query.data, setCategories, setReasons])

  useEffect(() => {
    if (query.isError) {
      console.error('태그 목록 로드 실패:', query.error)
    }
  }, [query.isError, query.error])

  return query
}

export const usePostActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name) => postActivity({ name }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ['tag'] })
    },
    onError: (err) => {
      console.error('활동 추가 실패', err)
      alert('활동 추가에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useDeleteActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name) => deleteActivity({ name }),
    onSuccess: async (res, name) => {
      const categoryStore = useCategoryStore.getState()
      categoryStore.unselectItem(name)
      await queryClient.invalidateQueries({ queryKey: ['tag'] })
    },
    onError: (err) => {
      console.error('활동 삭제 실패', err)
      alert('활동 삭제에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const usePostReason = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name) => postReason({ name }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ['tag'] })
    },
    onError: (err) => {
      console.error('이유 추가 실패', err)
      alert('이유 추가에 실패했어요. 다시 시도해주세요.')
    },
  })
}

export const useDeleteReason = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name) => deleteReason({ name }),
    onSuccess: async (res, name) => {
      const reasonStore = useReasonStore.getState()
      reasonStore.unselectItem(name)
      await queryClient.invalidateQueries({ queryKey: ['tag'] })
    },
    onError: (err) => {
      console.error('이유 삭제 실패', err)
      alert('이유 삭제에 실패했어요. 다시 시도해주세요.')
    },
  })
}
