<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const plan = computed(() => userStore.planSettings)

function startJourney() {
  userStore.hasSetup = true
  router.push('/home')
}

function skip() {
  router.push('/home')
}
</script>

<template>
  <div class="guide-page">
    <div class="header">
      <span class="step">3/3 生成学习计划</span>
      <span class="skip" @click="skip">跳过</span>
    </div>

    <div class="content">
      <div class="success-icon">🎉</div>
      <h2 class="success-title">计划生成成功！</h2>

      <div class="plan-card">
        <p class="plan-title">📊 计划概览</p>
        <div class="plan-items">
          <div class="plan-item">英语：500词</div>
          <div class="plan-item">语文：30篇</div>
          <div class="plan-item">数学：60个任务</div>
          <div class="plan-item">日均学习：{{ plan.dailyMinutes }}分钟</div>
        </div>
      </div>

      <div class="first-day">
        <p class="first-title">{{ plan.startDate }} 第一天任务：</p>
        <ul>
          <li>英语：ability ~ advice</li>
          <li>语文：《观沧海》</li>
          <li>数学：认识正负数</li>
        </ul>
      </div>
    </div>

    <button class="btn-primary" @click="startJourney">开启学习之旅</button>
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
  margin-bottom: 24px;
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

.success-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 8px;
}

.success-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 24px;
}

.plan-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.plan-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.plan-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.plan-item {
  font-size: 14px;
  color: #666;
}

.first-day {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.first-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.first-day ul {
  list-style: none;
  padding: 0;
}

.first-day li {
  font-size: 14px;
  color: #666;
  padding: 4px 0;
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
