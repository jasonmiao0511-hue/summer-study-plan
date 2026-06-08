<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEnglishStore } from '../../stores/english'

const router = useRouter()
const store = useEnglishStore()

const currentIndex = ref(0)
const selected = ref<number | null>(null)
const showResult = ref(false)
const correctCount = ref(0)

const currentWord = computed(() => store.todayWords[currentIndex.value])

const options = computed(() => {
  const word = currentWord.value
  if (!word) return []
  const allOptions = [word.meaning, ...word.distractors.map((d) => `${d}`)]
  return shuffle([...allOptions])
})

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    /* eslint-disable */ /* @ts-ignore */;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function selectOption(index: number) {
  if (showResult.value) return
  selected.value = index
  showResult.value = true
  if (options.value[index] === currentWord.value.meaning) {
    correctCount.value++
  }
}

function next() {
  if (currentIndex.value < store.todayWords.length - 1) {
    currentIndex.value++
    selected.value = null
    showResult.value = false
  } else {
    router.push('/english-report')
  }
}

function playAudio() {
  const utterance = new SpeechSynthesisUtterance(currentWord.value.word)
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}
</script>

<template>
  <div class="quiz-page">
    <div class="header">
      <span class="back" @click="$router.push('/english')">←</span>
      <span class="title">单词练习 {{ currentIndex + 1 }}/{{ store.todayWords.length }}</span>
      <span></span>
    </div>

    <div class="content">
      <div class="word-display">
        <div class="image-area">
          <div class="image-placeholder">{{ currentWord?.imageKeyword }}</div>
        </div>
        <div class="word-text">{{ currentWord?.word }}</div>
        <div class="phonetic" @click="playAudio">
          {{ currentWord?.phonetic }} 🔊
        </div>
      </div>

      <p class="question">请选择正确释义：</p>

      <div class="options">
        <div
          v-for="(opt, index) in options"
          :key="index"
          class="option"
          :class="{
            correct: showResult && opt === currentWord?.meaning,
            wrong: showResult && selected === index && opt !== currentWord?.meaning,
            selected: selected === index && !showResult
          }"
          @click="selectOption(index)"
        >
          {{ String.fromCharCode(65 + index) }}. {{ opt }}
        </div>
      </div>

      <button v-if="showResult" class="btn-next" @click="next">
        {{ currentIndex < store.todayWords.length - 1 ? '下一题' : '查看报告' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
}

.back {
  font-size: 20px;
  cursor: pointer;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.content {
  padding: 16px;
}

.word-display {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
}

.image-area {
  height: 100px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.image-placeholder {
  font-size: 40px;
}

.word-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.phonetic {
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.question {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.option {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  border: 2px solid transparent;
}

.option.selected {
  border-color: #4A90E2;
}

.option.correct {
  border-color: #52C41A;
  background: #f6ffed;
}

.option.wrong {
  border-color: #F5222D;
  background: #fff1f0;
}

.btn-next {
  width: 100%;
  height: 48px;
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
