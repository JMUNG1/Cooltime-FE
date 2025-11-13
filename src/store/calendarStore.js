import { create } from 'zustand'

export const useDidStore = create((set) => ({
  options: ['미뤘어요', '했어요'],
  selected: new Set(),
  isPostponed: true,
  maxSelected: 1,
  toggleOption: (o) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(o)) {
        next.delete(o)
        if (next.size === 0) {
          useCategoryStore.getState().clearSelected()
          useReasonStore.getState().clearSelected()
        }
        return { selected: next, isPostponed: true }
      }
      if (o === '했어요') {
        useCategoryStore.getState().clearSelected()
        useReasonStore.getState().clearSelected()
      }
      if (state.maxSelected === 1) {
        return { selected: new Set([o]), isPostponed: o === '미뤘어요' }
      }
      next.add(o)
    }),
  clearSelected: () => set({ selected: new Set(), isPostponed: true }),
}))

export const useCategoryStore = create((set) => ({
  categories: [],
  selected: new Set(),
  setCategories: (list) => set({ categories: list }),
  toggleCategory: (name) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(name)) {
        next.delete(name)
      } else {
        const didStore = useDidStore.getState()
        if (didStore.selected.size === 0) {
          didStore.toggleOption('미뤘어요')
        }
        next.add(name)
      }
      return { selected: next }
    }),

  unselectItem: (name) =>
    set((state) => {
      const next = new Set(state.selected)
      next.delete(name)
      return { selected: next }
    }),
  clearSelected: () => set({ selected: new Set() }),
}))

export const useReasonStore = create((set) => ({
  reasons: [],
  selected: new Set(),
  setReasons: (list) => set({ reasons: list }),

  toggleReason: (name) =>
    set((state) => {
      const next = new Set(state.selected)
      if (next.has(name)) {
        next.delete(name)
      } else {
        const didStore = useDidStore.getState()
        if (didStore.selected.size === 0) {
          didStore.toggleOption('미뤘어요')
        }
        next.add(name)
      }
      return { selected: next }
    }),

  unselectItem: (name) =>
    set((state) => {
      const next = new Set(state.selected)
      next.delete(name)
      return { selected: next }
    }),
  clearSelected: () => set({ selected: new Set() }),
}))

export const useCalendarStore = create((set) => ({
  currentMonth: new Date(),
  selectedDate: null,
  completedCount: 0,
  postponedCount: 0,
  logs: [],
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setLogs: (logs) => set({ logs }),
  setCompletedCount: (count) => set({ completedCount: count }),
  setPostponedCount: (count) => set({ postponedCount: count }),
}))

export const useLogStore = create((set, get) => ({
  currentLog: null,
  type: null,
  activity: [],
  reason: [],
  isPostponed: null,

  setCurrentLog: (log) =>
    set({
      currentLog: log,
      type: log?.type ?? null,
      activity: log?.activities?.map((a) => a.name) ?? [],
      reason: log?.reasons?.map((r) => r.name) ?? [],
      isPostponed: log?.isPostponed ?? null,
    }),

  initSelectionsFromCurrentLog: () => {
    const log = get().currentLog
    if (!log) return

    const didStore = useDidStore.getState()
    const categoryStore = useCategoryStore.getState()
    const reasonStore = useReasonStore.getState()

    const incomingActivities = log.activities || []
    const incomingReasons = log.reasons || []

    didStore.clearSelected()
    didStore.toggleOption(log.isPostponed ? '미뤘어요' : '했어요')

    if (incomingActivities.length > 0) {
      const mergedActivities = [
        ...categoryStore.categories,
        ...incomingActivities.filter(
          (a) => !categoryStore.categories.some((c) => c.name === a.name),
        ),
      ]
      categoryStore.setCategories(mergedActivities)
    }

    if (incomingReasons.length > 0) {
      const mergedReasons = [
        ...reasonStore.reasons,
        ...incomingReasons.filter((r) => !reasonStore.reasons.some((c) => c.name === r.name)),
      ]
      reasonStore.setReasons(mergedReasons)
    }

    categoryStore.clearSelected()
    incomingActivities.forEach((a) => {
      categoryStore.toggleCategory(a.name)
    })

    reasonStore.clearSelected()
    incomingReasons.forEach((r) => {
      reasonStore.toggleReason(r.name)
    })
  },
}))
