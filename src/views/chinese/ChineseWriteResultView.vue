<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const chineseStore = useChineseStore()
const userStore = useUserStore()

const article = computed(() => chineseStore.currentArticle)
const progress = computed(() => chineseStore.currentProgress)

function rewrite() {
  router.push('/chinese-write')
}

function finish() {
  userStore.checkin(new Date().toISOString().split('T')[0])
  userStore.addStudyMinutes(30)
  router.push('/home')
}
</script>

<template>
  <div class="result-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">默写结果</span>
      <span></span>
    </div>

    <div class="content">
      <div class="result-header">
        <p class="result-title">默写完成！</p>
        <p class="accuracy">
          正确率：<strong>{{ progress?.writeAccuracy }}%</strong>
        </p>
      </div>

      <div class="comparison">
        <p class="comparison-title">原文对照：</p>
        <div
          v-for="(line, index) in article?.content"
          :key="index"
          class="compare-line"
        >
          <span class="line-num">{{ index + 1 }}</span>
          <span class="line-text">{{ line }}</span>
        </div>
      </div>

      <div v-if="progress?.mistakes.length" class="mistakes">
        <p class="mistakes-title">错字记录：</p>
        <div
          v-for="(m, index) in progress.mistakes"
          :key="index"
          class="mistake-item"
        >
          <span class="wrong-char">"{{ m.char }}"</span>
          <span class="arrow">→</span>
          <span class="user-char">"{{ m.wrong }}"</span>
        </div>
        <p class="mistake-note">已加入错题本</p>
      </div>

      <div class="actions">
        <button class="btn-rewrite" @click="rewrite">再默写一遍</button>
        <button class="btn-finish" @click="finish">完成打卡</button>
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

.comparison {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.comparison-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.compare-line {
  display: flex;
  gap: 8px;
  padding: 6px 0;
  font-size: 15px;
  color: #333;
}

.line-num {
  color: #999;
  min-width: 20px;
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
  padding: 8px 0;
  font-size: 14px;
}

.wrong-char {
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

.mistake-note {
  font-size: 12px;
  color: #FAAD14;
  margin-top: 8px;
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

.btn-rewrite {
  background: #fff;
  color: #4A90E2;
  border: 1px solid #4A90E2;
}

.btn-finish {
  background: #52C41A;
  color: #fff;
}
</style>