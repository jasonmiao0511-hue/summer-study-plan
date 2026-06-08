<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const dailyMinutes = ref(90)
const subjects = ref([
  { name: 'english', label: '英语', minutes: 30 },
  { name: 'chinese', label: '语文', minutes: 30 },
  { name: 'math', label: '数学', minutes: 30 }
])

function updateDistribution() {
  const perSubject = Math.floor(dailyMinutes.value / 3)
  subjects.value.forEach(s => s.minutes = perSubject)
}

function nextStep() {
  const subjectMinutes: Record<string, number> = {}
  subjects.value.forEach(s => {
    subjectMinutes[s.name] = s.minutes
  })
  userStore.setPlan({
    dailyMinutes: dailyMinutes.value,
    subjectMinutes
  })
  router.push('/guide-plan')
}

function skip() {
  router.push('/home')
}
</script>

<template>
  <div class="guide-page">
    <div class="header">
      <span class="step">2/3 每日学习时间</span>
      <span class="skip" @click="skip">跳过</span>
    </div>

    <div class="content">
      <h2 class="question">每天大概能学多久？</h2>

      <div class="time-display">⏱️ {{ dailyMinutes }} 分钟</div>

      <input
        type="range"
        min="30"
        max="180"
        step="15"
        v-model="dailyMinutes"
        @input="updateDistribution"
        class="slider"
      />

      <div class="slider-labels">
        <span>30分</span>
        <span>90分</span>
        <span>180分</span>
      </div>

      <p class="suggest-title">建议分配：</p>
      <div class="subject-cards">
        <div v-for="sub in subjects" :key="sub.name" class="subject-card">
          <div class="sub-name">{{ sub.label }}</div>
          <div class="sub-time">{{ sub.minutes }}分</div>
        </div>
      </div>
    </div>

    <button class="btn-primary" @click="nextStep">下一步</button>
  </div>
</template>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.step {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.skip {
  font-size: 14px;
  color: #999;
  cursor: pointer;
}

.content {
  flex: 1;
}

.question {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.time-display {
  font-size: 24px;
  font-weight: bold;
  color: #4A90E2;
  text-align: center;
  margin-bottom: 24px;
}

.slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: #e0e0e0;
  border-radius: 4px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: #4A90E2;
  border-radius: 50%;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.suggest-title {
  font-size: 14px;
  color: #666;
  margin: 24px 0 12px;
}

.subject-cards {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.subject-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  min-width: 80px;
}

.sub-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.sub-time {
  font-size: 12px;
  color: #4A90E2;
}

.btn-primary {
  width: 100%;
  height: 48px;
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 24px;
}
</style>
