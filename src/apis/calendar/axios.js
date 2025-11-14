import apiClient from '../login/axiosConfig'
import { useDidStore, useCategoryStore, useReasonStore, useLogStore } from '@/store/calendarStore'
import { useUserStore } from '@/store/store'
import { userTypeMap } from '@/utils/userTypeMap'

export const getCalendar = async ({ year, month }) => {
  const { data } = await apiClient.get(`/api/calendar?year=${year}&month=${month}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  })

  return data.data
}

export const postLog = async () => {
  const { isPostponed } = useDidStore.getState()
  const { userType } = useUserStore.getState()
  const selectedCategories = Array.from(useCategoryStore.getState().selected)
  const selectedReasons = Array.from(useReasonStore.getState().selected)

  const typeMap = {
    완벽주의형: 'PERFECTION',
    동기저하형: 'MOTIVATION',
    스트레스형: 'STRESS',
  }

  const payload = {
    isPostponed: isPostponed,
    myType: typeMap[userType],
    activities: selectedCategories,
    reasons: selectedReasons,
  }

  const { data } = await apiClient.post('/api/log', payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  return data
}

export const updateLog = async () => {
  const { isPostponed } = useDidStore.getState()
  const { userType } = useUserStore.getState()
  const selectedCategories = Array.from(useCategoryStore.getState().selected)
  const selectedReasons = Array.from(useReasonStore.getState().selected)

  const typeMap = {
    완벽주의형: 'PERFECTION',
    동기저하형: 'MOTIVATION',
    스트레스형: 'STRESS',
  }

  const payload = {
    isPostponed: isPostponed,
    myType: typeMap[userType],
    activities: selectedCategories,
    reasons: selectedReasons,
  }

  const { data } = await apiClient.put('/api/log', payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  return data
}

export const getLog = async (dateString) => {
  const { setCurrentLog, initSelectionsFromCurrentLog } = useLogStore.getState()

  try {
    if (!dateString) throw new Error('Invalid date parameter.')

    const { data } = await apiClient.get(`/api/log?date=${dateString}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })

    const res = data.data
    const normalized = {
      ...res,
      type: userTypeMap[res.myType] ?? null,
      activities: (res.activities || []).map((name, idx) => ({ id: idx, name })),
      reasons: (res.reasons || []).map((name, idx) => ({ id: idx, name })),
    }

    setCurrentLog(normalized)
    initSelectionsFromCurrentLog()

    return normalized
  } catch (err) {
    console.error('기록 조회 실패:', err)
    setCurrentLog(null)

    if (err.response?.status === 404) {
      return null
    }
    throw err
  }
}

export const getTag = async () => {
  const { data } = await apiClient.get('/api/tag', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  const Activities = data.data?.activities || []
  const Reasons = data.data?.reasons || []

  const activities = Activities.map((a, idx) => {
    return {
      id: a.id ?? idx,
      name: a.name,
      isDefault: a.isDefault,
    }
  })

  const reasons = Reasons.map((r, id) => {
    return {
      id: r.id ?? id,
      name: r.name,
      isDefault: r.isDefault,
    }
  })

  return { activities, reasons }
}

export const postActivity = async ({ name }) => {
  const { data } = await apiClient.post(
    '/api/activity',
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return data
}

export const deleteActivity = async ({ name }) => {
  const { data } = await apiClient.delete('/api/activity', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: { name: name },
  })
  return data
}

export const postReason = async ({ name }) => {
  const { data } = await apiClient.post(
    '/api/reason',
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  )
  return data
}

export const deleteReason = async ({ name }) => {
  const { data } = await apiClient.delete('/api/reason', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    data: { name: name },
  })
  return data
}
