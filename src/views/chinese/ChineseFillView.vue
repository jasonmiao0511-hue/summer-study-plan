<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)
const progress = computed(() => store.currentProgress)

const currentLevel = ref(progress.value?.fillLevel || 0)
const level = computed(() => article.value?.fillBlanks[currentLevel.value])

const answers = ref<Record<number, string>>({})
const showHint = ref(false)
const submitted = ref(false)

const blanks = computed(() => {
  if (!level.value) return []
  return level.value.blanks
})

function getLineText(lineIndex: number) {
  const line = article.value?.content[lineIndex] || ''
  const lineBlanks = blanks.value.filter(b => b.line === lineIndex)
  let result = line
  lineBlanks.forEach((b) => {
    result = result.replace(b.answer, `____`)
  })
  return result
}

function submit() {
  submitted.value = true
  let correct = 0
  blanks.value.forEach((b, i) => {
    if (answers.value[i]?.trim() === b.answer) {
      correct++
    }
  })
  if (correct === blanks.value.length) {
    store.setFillLevel(currentLevel.value + 1)
  }
}

function nextLevel() {
  if (currentLevel.value < (article.value?.fillBlanks.length || 1) - 1) {
    currentLevel.value++
    answers.value = {}
    submitted.value = false
    showHint.value = false
  } else {
    store.completeStep('fill')
    router.push('/chinese-fill-result')
  }
}

// function goResult() {
//   router.push('/chinese-fill-result')
// }
</script>

<template>
  <div class="fill-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">挖空背诵 [{{ currentLevel + 1 }}/{{ article?.fillBlanks.length }}]</span>
      <span></span>
    </div>

    <div class="content">
      <div class="level-info">
        <p>《{{ article?.title }}》· {{ level?.name }}</p>
        <p class="difficulty">
          难度：{{ '⭐'.repeat(level?.difficulty || 2) }}
        </p>
        <p class="blank-count">共{{ blanks.length }}个空</p>
      </div>

      <div class="poem-fill">
        <div
          v-for="(blank, index) in blanks"
          :key="index"
          class="blank-item"
        >
          <p class="line-text">{{ getLineText(blank.line) }}</p>
          <input
            v-model="answers[index]"
            :disabled="submitted"
            class="blank-input"
            :class="{
              correct: submitted && answers[index]?.trim() === blank.answer,
              wrong: submitted && answers[index]?.trim() !== blank.answer
            }"
            placeholder="填写答案"
          />
          <div v-if="submitted" class="blank-result">
            <span v-if="answers[index]?.trim() === blank.answer" class="correct-text">✅</span>
            <span v-else class="wrong-text">❌ 正确：{{ blank.answer }}</span>
          </div>
        </div>
      </div>

      <div v-if="showHint" class="hint-box">
        <p>提示：{{ blanks.map(b => b.hint).join('、') }}</p>
      </div>

      <div class="actions">
        <button
          v-if="!submitted"
          class="btn-hint"
          @click="showHint = true"
        >
          查看提示
        </button>

        <button
          v-if="!submitted"
          class="btn-submit"
          @click="submit"
        >
          提交答案
        </button>

        <button
          v-if="submitted"
          class="btn-next"
          @click="nextLevel"
        >
          {{ currentLevel < (article?.fillBlanks.length || 1) - 1 ? '进入进阶挖空' : '完成挖空练习' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fill-page {
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

.level-info {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.level-info p {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.difficulty {
  color: #F5A623;
}

.blank-count {
  font-size: 12px;
  color: #999;
}

.poem-fill {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.blank-item {
  margin-bottom: 16px;
}

.line-text {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 8px;
}

.blank-input {
  width: 100%;
  height: 40px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 14px;
}

.blank-input.correct {
  border-color: #52C41A;
  background: #f6ffed;
}

.blank-input.wrong {
  border-color: #F5222D;
  background: #fff1f0;
}

.blank-result {
  margin-top: 4px;
  font-size: 13px;
}

.correct-text {
  color: #52C41A;
}

.wrong-text {
  color: #F5222D;
}

.hint-box {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions button {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-hint {
  background: #fff;
  color: #4A90E2;
  border: 1px solid #4A90E2;
}

.btn-submit {
  background: #4A90E2;
  color: #fff;
}

.btn-next {
  background: #52C41A;
  color: #fff;
}
</style>
