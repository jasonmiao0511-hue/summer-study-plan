<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const modes = [
  { key: 'image', label: '🖼️ 图片选义', desc: '看图选择正确释义', tag: '适合：初识单词', path: '/english-quiz' },
  { key: 'meaning', label: '📝 选义模式', desc: '看单词选释义', tag: '适合：巩固记忆', path: '/english-quiz' },
  { key: 'listen', label: '🎧 听音选词', desc: '听发音选择单词', tag: '适合：听力训练', path: '/english-quiz' },
  { key: 'spell', label: '✏️ 拼写填空', desc: '看释义拼写单词', tag: '适合：深度掌握', path: '/english-spelling' }
]

function selectMode(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="practice-page">
    <div class="header">
      <span class="back" @click="$router.push('/english')">←</span>
      <span class="title">单词练习</span>
      <span></span>
    </div>

    <div class="content">
      <p class="section-title">选择练习模式</p>

      <div class="mode-list">
        <div
          v-for="mode in modes"
          :key="mode.key"
          class="mode-card"
          @click="selectMode(mode.path)"
        >
          <div class="mode-label">{{ mode.label }}</div>
          <div class="mode-desc">{{ mode.desc }}</div>
          <div class="mode-tag">{{ mode.tag }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
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

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
}

.mode-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mode-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
}

.mode-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.mode-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.mode-tag {
  font-size: 12px;
  color: #999;
}
</style>