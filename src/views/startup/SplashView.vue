<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startLearning() {
  router.push('/guide-time')
}
</script>

<template>
  <div class="splash-page">
    <div class="content">
      <div class="icons">📚 📖 ✏️</div>
      <h1 class="title">暑期学霸养成计划</h1>
      <p class="subtitle">过程记录 · 深度学习</p>
    </div>
    <div class="actions">
      <button class="btn-primary" @click="startLearning">开始学习</button>
      <p class="login-link">已有账号？登录</p>
    </div>
  </div>
</template>

<style scoped>
.splash-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #4A90E2 0%, #6BA5E7 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  color: #fff;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icons {
  font-size: 48px;
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.actions {
  width: 100%;
  max-width: 320px;
  padding-bottom: 40px;
}

.btn-primary {
  width: 100%;
  height: 48px;
  background: #fff;
  color: #4A90E2;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  opacity: 0.8;
}
</style>
