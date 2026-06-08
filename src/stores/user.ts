import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserProfile {
  name: string
  grade: string
  classType: string
}

export interface PlanSettings {
  startDate: string
  endDate: string
  totalDays: number
  dailyMinutes: number
  subjectMinutes: Record<string, number>
  freeDays: number[] // 0=周日, 6=周六
}

const STORAGE_KEY = 'summer-study-user'

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn('localStorage save failed:', e)
  }
}

export const useUserStore = defineStore('user', () => {
  // State - 从localStorage加载
  const profile = ref<UserProfile>(
    loadFromStorage(`${STORAGE_KEY}-profile`, {
      name: '小明',
      grade: '准初一',
      classType: '5+4班'
    })
  )

  const planSettings = ref<PlanSettings>(
    loadFromStorage(`${STORAGE_KEY}-plan`, {
      startDate: '2025-07-01',
      endDate: '2025-08-31',
      totalDays: 62,
      dailyMinutes: 90,
      subjectMinutes: { english: 30, chinese: 30, math: 30 },
      freeDays: [0, 6]
    })
  )

  const hasSetup = ref(loadFromStorage(`${STORAGE_KEY}-hasSetup`, false))
  const streakDays = ref(loadFromStorage(`${STORAGE_KEY}-streak`, 0))
  const totalStudyMinutes = ref(loadFromStorage(`${STORAGE_KEY}-minutes`, 0))
  const checkinDates = ref<string[]>(loadFromStorage(`${STORAGE_KEY}-checkins`, []))

  // Getters
  const studyDays = computed(() => checkinDates.value.length)
  const completionRate = computed(() => {
    if (planSettings.value.totalDays === 0) return 0
    return Math.round((studyDays.value / planSettings.value.totalDays) * 100)
  })

  // Actions
  function setPlan(settings: Partial<PlanSettings>) {
    planSettings.value = { ...planSettings.value, ...settings }
    hasSetup.value = true
    saveToStorage(`${STORAGE_KEY}-plan`, planSettings.value)
    saveToStorage(`${STORAGE_KEY}-hasSetup`, true)
  }

  function updateProfile(p: Partial<UserProfile>) {
    profile.value = { ...profile.value, ...p }
    saveToStorage(`${STORAGE_KEY}-profile`, profile.value)
  }

  function checkin(date: string) {
    if (!checkinDates.value.includes(date)) {
      checkinDates.value.push(date)
      checkinDates.value.sort()
      streakDays.value += 1
      saveToStorage(`${STORAGE_KEY}-checkins`, checkinDates.value)
      saveToStorage(`${STORAGE_KEY}-streak`, streakDays.value)
    }
  }

  function addStudyMinutes(minutes: number) {
    totalStudyMinutes.value += minutes
    saveToStorage(`${STORAGE_KEY}-minutes`, totalStudyMinutes.value)
  }

  return {
    profile,
    planSettings,
    hasSetup,
    streakDays,
    totalStudyMinutes,
    checkinDates,
    studyDays,
    completionRate,
    setPlan,
    updateProfile,
    checkin,
    addStudyMinutes
  }
})