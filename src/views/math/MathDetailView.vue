<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMathStore } from '../../stores/math'

const router = useRouter()
const store = useMathStore()

const task = computed(() => store.todayTask)

function finishStudy() {
  router.push('/math-checkin')
}
</script>

<template>
  <div class="detail-page">
    <div class="header">
      <span class="back" @click="$router.push('/math')">←</span>
      <span class="title">{{ task?.title }}</span>
      <span></span>
    </div>

    <div class="content">
      <div class="section">
        <p class="section-title">📚 知识要点</p>
        <div class="section-body">
          <div
            v-for="(point, index) in task?.keyPoints"
            :key="index"
            class="point-item"
          >
            {{ point }}
          </div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">💡 示例</p>
        <div class="section-body">
          <div
            v-for="(ex, index) in task?.examples"
            :key="index"
            class="example-item"
          >
            <p class="ex-problem">{{ ex.problem }}</p>
            <p class="ex-solution">{{ ex.solution }}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">⚠️ 易错提醒</p>
        <div class="section-body">
          <div
            v-for="(w, index) in task?.warnings"
            :key="index"
            class="warning-item"
          >
            {{ index + 1 }}. {{ w }}
          </div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">💡 方法总结</p>
        <div class="section-body">
          <div
            v-for="(s, index) in task?.summary"
            :key="index"
            class="summary-item"
          >
            {{ s }}
          </div>
        </div>
      </div>
    </div>

    <button class="btn-finish" @click="finishStudy">完成学习，打卡</button>
  </div>
</template>

<style scoped>
.detail-page {
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
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.point-item {
  font-size: 14px;
  color: #333;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.example-item {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.ex-problem {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.ex-solution {
  font-size: 14px;
  color: #4A90E2;
  font-weight: bold;
}

.warning-item {
  font-size: 14px;
  color: #F5222D;
  padding: 6px 0;
}

.summary-item {
  font-size: 14px;
  color: #333;
  padding: 6px 0;
}

.btn-finish {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  height: 48px;
  background: #52C41A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>