<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const plan = userStore.planSettings
const dailyMinutes = ref(plan.dailyMinutes)
const freeDays = ref([...plan.freeDays])

const weekdays = [
  { value: 0, label: '周日' },
  { value: 1, label: '周一' },
  { value: 2, label: '周二' },
  { value: 3, label: '周三' },
  { value: 4, label: '周四' },
  { value: 5, label: '周五' },
  { value: 6, label: '周六' }
]

function toggleFreeDay(day: number) {
  const index = freeDays.value.indexOf(day)
  if (index > -1) {
    freeDays.value.splice(index, 1)
  } else {
    freeDays.value.push(day)
  }
}

function regenerate() {
  userStore.setPlan({
    dailyMinutes: dailyMinutes.value,
    freeDays: freeDays.value
  })
  router.push('/plan')
}
</script>

<template>
  <div class="adjust-page">
    <div class="header">
      <span class="back" @click="$router.push('/plan')">←</span>
      <span class="title">调整学习计划</span>
      <span></span>
    </div>

    <div class="content">
      <div class="section">
        <p class="section-title">暑假时间</p>
        <div class="info-card">
          <p>{{ plan.startDate }} - {{ plan.endDate }}</p>
          <p class="highlight">共{{ plan.totalDays }}天</p>
        </div>
      </div>

      <div class="section">
        <p class="section-title">每日学习时间</p>
        <div class="slider-card">
          <p class="time-display">{{ dailyMinutes }}分钟</p>
          <input
            type="range"
            min="30"
            max="180"
            step="15"
            v-model="dailyMinutes"
            class="slider"
          />
        </div>
      </div>

      <div class="section">
        <p class="section-title">科目时间分配</p>
        <div class="subject-bars">
          <div class="subject-bar">
            <span>英语</span>
            <div class="bar"><div class="fill" :style="{ width: '33%' }"></div></div>
            <span>{{ Math.floor(dailyMinutes / 3) }}分</span>
          </div>
          <div class="subject-bar">
            <span>语文</span>
            <div class="bar"><div class="fill" :style="{ width: '33%' }"></div></div>
            <span>{{ Math.floor(dailyMinutes / 3) }}分</span>
          </div>
          <div class="subject-bar">
            <span>数学</span>
            <div class="bar"><div class="fill" :style="{ width: '33%' }"></div></div>
            <span>{{ Math.floor(dailyMinutes / 3) }}分</span>
          </div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">自由日设置</p>
        <div class="weekday-grid">
          <div
            v-for="d in weekdays"
            :key="d.value"
            class="weekday-item"
            :class="{ active: freeDays.includes(d.value) }"
            @click="toggleFreeDay(d.value)"
          >
            {{ d.label }}
          </div>
        </div>
      </div>
    </div>

    <button class="btn-regenerate" @click="regenerate">重新生成计划</button>
  </div>
</template>

<style scoped>
.adjust-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
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

.section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.info-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.info-card p {
  font-size: 14px;
  color: #333;
}

.highlight {
  color: #4A90E2;
  font-weight: bold;
  margin-top: 4px;
}

.slider-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.time-display {
  font-size: 24px;
  font-weight: bold;
  color: #4A90E2;
  text-align: center;
  margin-bottom: 12px;
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

.subject-bars {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.subject-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.subject-bar span {
  font-size: 13px;
  color: #333;
  min-width: 40px;
}

.bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: #4A90E2;
  border-radius: 4px;
}

.weekday-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.weekday-item {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  border: 2px solid transparent;
}

.weekday-item.active {
  border-color: #4A90E2;
  color: #4A90E2;
}

.btn-regenerate {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
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