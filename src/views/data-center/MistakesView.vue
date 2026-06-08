<script setup lang="ts">
import { ref } from 'vue'
import { useChineseStore } from '../../stores/chinese'
import { useEnglishStore } from '../../stores/english'

const activeTab = ref('chinese')
const chineseStore = useChineseStore()
const englishStore = useEnglishStore()

const tabs = [
  { key: 'chinese', label: '语文' },
  { key: 'english', label: '英语' },
  { key: 'math', label: '数学' }
]

const chineseMistakes = chineseStore.progress.flatMap(p =>
  p.mistakes.map(m => ({
    article: chineseStore.articles.find(a => a.id === p.articleId)?.title || '',
    ...m
  }))
)

const englishMistakes = englishStore.wordProgress.filter((p: { status: string }) => p.status === 'forgotten').map((p: { wordId: number }) => ({
  word: englishStore.todayWords[p.wordId % englishStore.wordsPerDay]?.word,
  count: 1
}))
</script>

<template>
  <div class="mistakes-page">
    <div class="header">
      <span class="back" @click="$router.push('/home')">←</span>
      <span class="title">错题本</span>
      <span></span>
    </div>

    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="content">
      <!-- 语文错题 -->
      <div v-if="activeTab === 'chinese'" class="tab-content">
        <div v-if="chineseMistakes.length === 0" class="empty">
          <p>📭 暂无错题记录</p>
          <p class="empty-tip">好好学习，保持下去！</p>
        </div>
        <div v-else class="mistake-list">
          <div
            v-for="(m, index) in chineseMistakes"
            :key="index"
            class="mistake-card"
          >
            <p class="mistake-article">《{{ m.article }}》</p>
            <div class="mistake-detail">
              <span class="correct">"{{ m.char }}"</span>
              <span class="arrow">→</span>
              <span class="wrong">"{{ m.wrong }}"</span>
            </div>
            <button class="btn-practice">再练一次</button>
          </div>
        </div>
      </div>

      <!-- 英语错题 -->
      <div v-if="activeTab === 'english'" class="tab-content">
        <div v-if="englishMistakes.length === 0" class="empty">
          <p>📭 暂无错题记录</p>
          <p class="empty-tip">好好学习，保持下去！</p>
        </div>
        <div v-else class="mistake-list">
          <div
            v-for="(m, index) in englishMistakes"
            :key="index"
            class="mistake-card"
          >
            <p class="mistake-word">{{ m.word }}</p>
            <p class="mistake-count">拼错{{ m.count }}次</p>
            <button class="btn-practice">强化记忆</button>
          </div>
        </div>
      </div>

      <!-- 数学错题 -->
      <div v-if="activeTab === 'math'" class="tab-content">
        <div class="empty">
          <p>📭 暂无错题记录</p>
          <p class="empty-tip">好好学习，保持下去！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mistakes-page {
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

.tabs {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.tab.active {
  color: #4A90E2;
  border-bottom: 2px solid #4A90E2;
}

.content {
  padding: 16px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
}

.empty p {
  font-size: 16px;
  color: #999;
}

.empty-tip {
  font-size: 13px;
  color: #ccc;
  margin-top: 8px;
}

.mistake-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mistake-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.mistake-article {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.mistake-detail {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 12px;
}

.correct {
  color: #52C41A;
  font-weight: bold;
}

.arrow {
  color: #999;
}

.wrong {
  color: #F5222D;
  font-weight: bold;
}

.mistake-word {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.mistake-count {
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
}

.btn-practice {
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 12px;
  cursor: pointer;
}
</style>