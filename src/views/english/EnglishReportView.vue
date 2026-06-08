<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEnglishStore } from '../../stores/english'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const englishStore = useEnglishStore()
const userStore = useUserStore()

const todayProgress = computed(() =>
  englishStore.wordProgress.filter((p: { wordId: number; status: string }) => {
    const start = (englishStore.currentDay - 1) * englishStore.wordsPerDay
    return p.wordId >= start && p.wordId < start + englishStore.wordsPerDay
  })
)

const mastered = computed(() => todayProgress.value.filter((p: { status: string }) => p.status === 'mastered').length)
const learning = computed(() => todayProgress.value.filter((p: { status: string }) => p.status === 'learning').length)
const forgotten = computed(() => todayProgress.value.filter((p: { status: string }) => p.status === 'forgotten').length)

function finish() {
  userStore.checkin(new Date().toISOString().split('T')[0])
  userStore.addStudyMinutes(35)
  router.push('/home')
}

function share() {
  alert('分享功能开发中')
}
</script>

<template>
  <div class="report-page">
    <div class="header">
      <span class="back" @click="$router.push('/english')">←</span>
      <span class="title">单词学习报告</span>
      <span></span>
    </div>

    <div class="content">
      <h2>Day {{ englishStore.currentDay }} 学习完成！</h2>

      <div class="stats-card">
        <p class="stats-title">📊 本次学习</p>
        <div class="stats-grid">
          <div class="stat">
            <div class="stat-num">{{ englishStore.wordsPerDay }}</div>
            <div class="stat-label">新学</div>
          </div>
          <div class="stat">
            <div class="stat-num green">{{ mastered }}</div>
            <div class="stat-label">掌握</div>
          </div>
          <div class="stat">
            <div class="stat-num orange">{{ learning + forgotten }}</div>
            <div class="stat-label">待复习</div>
          </div>
          <div class="stat">
            <div class="stat-num">35</div>
            <div class="stat-label">分钟</div>
          </div>
        </div>
      </div>

      <div class="word-list">
        <p class="list-title">单词掌握情况</p>
        <div
          v-for="p in todayProgress"
          :key="p.wordId"
          class="word-item"
        >
          <span class="word-status">
            {{ p.status === 'mastered' ? '✅' : p.status === 'learning' ? '⚠️' : '❌' }}
          </span>
          <span class="word-name">{{ englishStore.todayWords[p.wordId % englishStore.wordsPerDay]?.word }}</span>
          <span v-if="p.status !== 'mastered'" class="word-note">（需复习）</span>
        </div>
      </div>

      <div class="tomorrow">
        <p>明日复习计划</p>
        <div class="tomorrow-card">
          <div>需复习：{{ learning + forgotten }}词</div>
          <div>新学：{{ englishStore.wordsPerDay }}词</div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-share" @click="share">分享学习成果</button>
      <button class="btn-finish" @click="finish">完成打卡</button>
    </div>
  </div>
</template>

<style scoped>
.report-page {
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

.content h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.stats-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.stats-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat {
  text-align: center;
}

.stat-num {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-num.green {
  color: #52C41A;
}

.stat-num.orange {
  color: #FAAD14;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.word-list {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.list-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.word-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.word-status {
  font-size: 14px;
}

.word-name {
  font-size: 14px;
  color: #333;
}

.word-note {
  font-size: 12px;
  color: #FAAD14;
}

.tomorrow {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.tomorrow p {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.tomorrow-card {
  display: flex;
  gap: 16px;
}

.tomorrow-card div {
  font-size: 13px;
  color: #666;
}

.actions {
  padding: 16px;
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

.btn-share {
  background: #fff;
  color: #4A90E2;
  border: 1px solid #4A90E2;
}

.btn-finish {
  background: #4A90E2;
  color: #fff;
}
</style>
