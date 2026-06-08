<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const startDate = ref('2025-07-01')
const endDate = ref('2025-08-31')

const totalDays = computed(() => {
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return diff > 0 ? diff : 0
})

function nextStep() {
  userStore.setPlan({
    startDate: startDate.value,
    endDate: endDate.value,
    totalDays: totalDays.value
  })
  router.push('/guide-daily')
}

function skip() {
  router.push('/home')
}
</script>

<template>
  <div class="guide-page">
    <div class="header">
      <span class="step">1/3 设定暑假时间</span>
      <span class="skip" @click="skip">跳过</span>
    </div>

    <div class="content">
      <h2 class="question">暑假什么时候开始？</h2>
      <div class="date-picker">
        <input type="date" v-model="startDate" />
      </div>

      <h2 class="question">暑假什么时候结束？</h2>
      <div class="date-picker">
        <input type="date" v-model="endDate" />
      </div>

      <p class="days-summary">暑假共 <strong>{{ totalDays }}</strong> 天</p>
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
  margin-bottom: 12px;
}

.date-picker {
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 24px;
}

.date-picker input {
  width: 100%;
  border: none;
  font-size: 16px;
  color: #333;
  background: transparent;
}

.days-summary {
  font-size: 18px;
  color: #4A90E2;
  text-align: center;
  margin-top: 24px;
}

.days-summary strong {
  font-size: 32px;
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
