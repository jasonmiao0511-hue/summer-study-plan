<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEnglishStore } from '../../stores/english'

const router = useRouter()
const store = useEnglishStore()

const currentIndex = ref(0)
const userAnswer = ref('')
const showResult = ref(false)
const correctCount = ref(0)

const currentWord = computed(() => store.todayWords[currentIndex.value])

const maskedWord = computed(() => {
  const word = currentWord.value?.word || ''
  const showCount = Math.ceil(word.length / 2)
  return word.slice(0, showCount) + '_'.repeat(word.length - showCount)
})

function check() {
  showResult.value = true
  if (userAnswer.value.trim().toLowerCase() === currentWord.value?.word.toLowerCase()) {
    correctCount.value++
  }
}

function next() {
  if (currentIndex.value < store.todayWords.length - 1) {
    currentIndex.value++
    userAnswer.value = ''
    showResult.value = false
  } else {
    router.push('/english-report')
  }
}

function playAudio() {
  const utterance = new SpeechSynthesisUtterance(currentWord.value?.word)
  utterance.lang = 'en-US'
  speechSynthesis.speak(utterance)
}
</script>

<template>
  <div class="spelling-page">
    <div class="header">
      <span class="back" @click="$router.push('/english')">←</span>
      <span class="title">拼写填空 {{ currentIndex + 1 }}/{{ store.todayWords.length }}</span>
      <span></span>
    </div>

    <div class="content">
      <div class="word-info">
        <p class="meaning">释义：{{ currentWord?.meaning }}</p>
        <p class="phonetic" @click="playAudio">
          音标：{{ currentWord?.phonetic }} 🔊
        </p>
        <p class="example">例句：{{ currentWord?.example }}</p>
      </div>

      <div class="input-area">
        <p class="hint">请输入单词：</p>
        <div class="masked">{{ maskedWord }}</div>
        <input
          v-model="userAnswer"
          :disabled="showResult"
          class="answer-input"
          :class="{
            correct: showResult && userAnswer.trim().toLowerCase() === currentWord?.word.toLowerCase(),
            wrong: showResult && userAnswer.trim().toLowerCase() !== currentWord?.word.toLowerCase()
          }"
          placeholder="输入完整单词"
        />
      </div>

      <div v-if="showResult" class="result">
        <p v-if="userAnswer.trim().toLowerCase() === currentWord?.word.toLowerCase()" class="correct-text">
          ✅ 正确！
        </p>
        <p v-else class="wrong-text">
          ❌ 正确答案是：{{ currentWord?.word }}
        </p>
      </div>

      <button
        v-if="!showResult"
        class="btn-check"
        @click="check"
      >
        检查答案
      </button>

      <button
        v-else
        class="btn-next"
        @click="next"
      >
        {{ currentIndex < store.todayWords.length - 1 ? '下一题' : '查看报告' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.spelling-page {
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

.word-info {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.word-info p {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.phonetic {
  cursor: pointer;
  color: #4A90E2;
}

.example {
  font-style: italic;
  color: #666;
}

.input-area {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  text-align: center;
}

.hint {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.masked {
  font-size: 24px;
  font-weight: bold;
  color: #4A90E2;
  margin-bottom: 12px;
  letter-spacing: 4px;
}

.answer-input {
  width: 100%;
  height: 48px;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 18px;
  text-align: center;
  text-transform: lowercase;
}

.answer-input.correct {
  border-color: #52C41A;
  background: #f6ffed;
}

.answer-input.wrong {
  border-color: #F5222D;
  background: #fff1f0;
}

.result {
  text-align: center;
  margin-bottom: 16px;
}

.correct-text {
  font-size: 18px;
  color: #52C41A;
  font-weight: bold;
}

.wrong-text {
  font-size: 16px;
  color: #F5222D;
}

.btn-check, .btn-next {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-check {
  background: #4A90E2;
  color: #fff;
}

.btn-next {
  background: #52C41A;
  color: #fff;
}
</style>