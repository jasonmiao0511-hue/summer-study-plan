<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMathStore } from '../../stores/math'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const mathStore = useMathStore()
const userStore = useUserStore()

const rating = ref(3)
const notes = ref('')
const studyMinutes = ref(15)

function confirmCheckin() {
  mathStore.completeTask(rating.value, notes.value, studyMinutes.value)
  userStore.checkin(new Date().toISOString().split('T')[0])
  userStore.addStudyMinutes(studyMinutes.value)
  router.push('/home')
}
</script>

<template>
  <div class="checkin-page">
    <div class="header">
      <span class="back" @click="$router.push('/math-detail')">←</span>
      <span class="title">学习打卡</span>
      <span></span>
    </div>

    <div class="content">
      <div class="task-name">{{ mathStore.todayTask?.title }}</div>

      <div class="complete-info">
        <p>学习完成！</p>
        <p class="time">用时：{{ studyMinutes }}分钟</p>
      </div>

      <div class="rating-section">
        <p class="rating-title">理解程度自评：</p>
        <div class="stars">
          <span
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ active: i <= rating }"
            @click="rating = i"
          >
            ⭐
          </span>
        </div>
        <p class="rating-label">
          <span>完全不懂</span>
          <span>完全掌握</span>
        </p>
      </div>

      <div class="notes-section">
        <p class="notes-title">难点记录（可选）：</p>
        <textarea
          v-model="notes"
          class="notes-input"
          placeholder="有什么不懂的？记录下来..."
          rows="4"
        ></textarea>
      </div>
    </div>

    <button class="btn-confirm" @click="confirmCheckin">确认打卡</button>
  </div>
</template>

<style scoped>
.checkin-page {
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

.task-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
}

.complete-info {
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
}

.complete-info p {
  font-size: 16px;
  color: #333;
}

.complete-info .time {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.rating-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.rating-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.star {
  font-size: 28px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.star.active {
  opacity: 1;
}

.rating-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  padding: 0 20px;
}

.notes-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.notes-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.notes-input {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
}

.btn-confirm {
  width: calc(100% - 32px);
  margin: 0 16px 16px;
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