<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)
const progress = computed(() => store.currentProgress)

const accuracy = computed(() => {
  const level = progress.value?.fillLevel || 0
  const totalBlanks = article.value?.fillBlanks.slice(0, level).reduce((sum, l) => sum + l.blanks.length, 0) || 0
  const correct = totalBlanks - (progress.value?.mistakes.length || 0)
  return totalBlanks > 0 ? Math.round((correct / totalBlanks) * 100) : 0
})

function goWrite() {
  router.push('/chinese-write')
}

function retry() {
  router.push('/chinese-fill')
}
</script>

<template>
  <div class="result-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">练习结果</span>
      <span></span>
    </div>

    <div class="content">
      <div class="result-header">
        <p class="result-title">挖空练习完成！</p>
        <p class="accuracy">正确率：<strong>{{ accuracy }}%</strong></p>
      </div>

      <div class="level-progress">
        <p class="progress-title">完成等级：</p>
        <div class="levels">
          <div
            v-for="(level, index) in article?.fillBlanks"
            :key="index"
            class="level-item"
            :class="{ completed: (progress?.fillLevel || 0) > index }"
          >
            {{ level.name }}
            <span v-if="(progress?.fillLevel || 0) > index">✅</span>
            <span v-else>🔒</span>
          </div>
        </div>
      </div>

      <div v-if="progress?.mistakes.length" class="mistakes">
        <p class="mistakes-title">错题记录：</p>
        <div
          v-for="(m, index) in progress.mistakes"
          :key="index"
          class="mistake-item"
        >
          <span class="correct-char">"{{ m.char }}"</span>
          <span class="arrow">→</span>
          <span class="user-char">"{{ m.wrong }}"</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn-retry" @click="retry">再练一次</button>
        <button class="btn-next" @click="goWrite">进入默写检测</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-page {
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

.result-header {
  text-align: center;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.accuracy {
  font-size: 16px;
  color: #666;
}

.accuracy strong {
  font-size: 32px;
  color: #4A90E2;
}

.level-progress {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.progress-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.levels {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.level-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
}

.level-item.completed {
  color: #52C41A;
  background: #f6ffed;
}

.mistakes {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.mistakes-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.mistake-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 14px;
}

.correct-char {
  color: #52C41A;
  font-weight: bold;
}

.arrow {
  color: #999;
}

.user-char {
  color: #F5222D;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 12px;
}

.actions button {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-retry {
  background: #fff;
  color: #4A90E2;
  border: 1px solid #4A90E2;
}

.btn-next {
  background: #52C41A;
  color: #fff;
}
</style>