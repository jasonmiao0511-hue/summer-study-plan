import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { englishWords } from '../data/englishData'

export interface WordProgress {
  wordId: number
  status: 'new' | 'learning' | 'mastered' | 'forgotten'
  reviewCount: number
  lastReview: string
}

const STORAGE_KEY = 'summer-study-english'

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

export const useEnglishStore = defineStore('english', () => {
  const wordsPerDay = ref(10)
  const currentDay = ref(1)
  const wordProgress = ref<WordProgress[]>(
    loadFromStorage(`${STORAGE_KEY}-progress`, [])
  )

  const totalWords = computed(() => englishWords.length)
  const todayWords = computed(() => {
    const start = (currentDay.value - 1) * wordsPerDay.value
    return englishWords.slice(start, start + wordsPerDay.value)
  })

  // 加载day
  const savedDay = loadFromStorage<number | null>(`${STORAGE_KEY}-day`, null)
  if (savedDay) currentDay.value = savedDay

  const masteredCount = computed(() =>
    wordProgress.value.filter(w => w.status === 'mastered').length
  )

  const learningCount = computed(() =>
    wordProgress.value.filter(w => w.status === 'learning' || w.status === 'forgotten').length
  )

  function markWord(wordId: number, status: 'mastered' | 'learning' | 'forgotten') {
    const existing = wordProgress.value.find(w => w.wordId === wordId)
    if (existing) {
      existing.status = status
      existing.reviewCount++
      existing.lastReview = new Date().toISOString()
    } else {
      wordProgress.value.push({
        wordId,
        status,
        reviewCount: 1,
        lastReview: new Date().toISOString()
      })
    }
    saveToStorage(`${STORAGE_KEY}-progress`, wordProgress.value)
  }

  function setDay(day: number) {
    currentDay.value = day
    saveToStorage(`${STORAGE_KEY}-day`, day)
  }

  return {
    wordsPerDay,
    currentDay,
    wordProgress,
    totalWords,
    todayWords,
    masteredCount,
    learningCount,
    markWord,
    setDay
  }
})