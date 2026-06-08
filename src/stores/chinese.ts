import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { chineseArticles } from '../data/chineseData'

export interface ChineseProgress {
  articleId: number
  steps: {
    read: boolean
    guide: boolean
    fill: boolean
    write: boolean
  }
  fillLevel: number
  writeAccuracy: number
  mistakes: { char: string; wrong: string }[]
}

const STORAGE_KEY = 'summer-study-chinese'

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

export const useChineseStore = defineStore('chinese', () => {
  const articles = ref(chineseArticles)
  const currentArticleId = ref(
    loadFromStorage(`${STORAGE_KEY}-articleId`, 1)
  )
  const progress = ref<ChineseProgress[]>(
    loadFromStorage(`${STORAGE_KEY}-progress`,
      chineseArticles.map(a => ({
        articleId: a.id,
        steps: { read: false, guide: false, fill: false, write: false },
        fillLevel: 0,
        writeAccuracy: 0,
        mistakes: []
      }))
    )
  )

  const currentArticle = computed(() =>
    articles.value.find(a => a.id === currentArticleId.value)
  )

  const currentProgress = computed(() =>
    progress.value.find(p => p.articleId === currentArticleId.value)
  )

  function setArticle(id: number) {
    currentArticleId.value = id
    saveToStorage(`${STORAGE_KEY}-articleId`, id)
  }

  function completeStep(step: 'read' | 'guide' | 'fill' | 'write') {
    const p = currentProgress.value
    if (p) {
      p.steps[step] = true
      saveToStorage(`${STORAGE_KEY}-progress`, progress.value)
    }
  }

  function setFillLevel(level: number) {
    const p = currentProgress.value
    if (p) {
      p.fillLevel = level
      saveToStorage(`${STORAGE_KEY}-progress`, progress.value)
    }
  }

  function addMistake(char: string, wrong: string) {
    const p = currentProgress.value
    if (p) {
      p.mistakes.push({ char, wrong })
      saveToStorage(`${STORAGE_KEY}-progress`, progress.value)
    }
  }

  function setWriteAccuracy(accuracy: number) {
    const p = currentProgress.value
    if (p) {
      p.writeAccuracy = accuracy
      saveToStorage(`${STORAGE_KEY}-progress`, progress.value)
    }
  }

  const completedArticles = computed(() =>
    progress.value.filter(p => p.steps.write)
  )

  const totalMistakes = computed(() =>
    progress.value.reduce((sum, p) => sum + p.mistakes.length, 0)
  )

  return {
    articles,
    currentArticleId,
    progress,
    currentArticle,
    currentProgress,
    completedArticles,
    totalMistakes,
    setArticle,
    completeStep,
    setFillLevel,
    addMistake,
    setWriteAccuracy
  }
})