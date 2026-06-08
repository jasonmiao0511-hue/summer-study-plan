import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mathTasks } from '../data/mathData'

export interface MathProgress {
  taskId: number
  completed: boolean
  rating: number
  notes: string
  studyMinutes: number
}

const STORAGE_KEY = 'summer-study-math'

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

export const useMathStore = defineStore('math', () => {
  const tasks = ref(mathTasks)
  const currentDay = ref(loadFromStorage(`${STORAGE_KEY}-day`, 1))
  const progress = ref<MathProgress[]>(
    loadFromStorage(`${STORAGE_KEY}-progress`,
      mathTasks.map(t => ({
        taskId: t.id,
        completed: false,
        rating: 0,
        notes: '',
        studyMinutes: 0
      }))
    )
  )

  const todayTask = computed(() =>
    tasks.value.find(t => t.day === currentDay.value)
  )

  const todayProgress = computed(() =>
    progress.value.find(p => p.taskId === todayTask.value?.id)
  )

  const completedCount = computed(() =>
    progress.value.filter(p => p.completed).length
  )

  function completeTask(rating: number, notes: string, minutes: number) {
    const p = todayProgress.value
    if (p) {
      p.completed = true
      p.rating = rating
      p.notes = notes
      p.studyMinutes = minutes
      saveToStorage(`${STORAGE_KEY}-progress`, progress.value)
    }
  }

  function nextDay() {
    currentDay.value++
    saveToStorage(`${STORAGE_KEY}-day`, currentDay.value)
  }

  const completedTasks = computed(() =>
    progress.value.filter(p => p.completed)
  )

  const averageRating = computed(() => {
    const completed = completedTasks.value
    if (completed.length === 0) return 0
    return completed.reduce((sum, p) => sum + p.rating, 0) / completed.length
  })

  return {
    tasks,
    currentDay,
    progress,
    todayTask,
    todayProgress,
    completedCount,
    completedTasks,
    averageRating,
    completeTask,
    nextDay
  }
})