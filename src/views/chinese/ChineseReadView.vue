<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)
const showPinyin = ref(false)
const showNotes = ref(false)
const showTranslation = ref(false)

function playAudio() {
  const text = article.value?.content.join(' ')
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

function finishRead() {
  store.completeStep('read')
  router.push('/chinese')
}
</script>

<template>
  <div class="read-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">{{ article?.title }}</span>
      <span class="pinyin-toggle" @click="showPinyin = !showPinyin">
        {{ showPinyin ? '隐藏拼音' : '拼音' }}
      </span>
    </div>

    <div class="content">
      <h2 class="poem-title">{{ article?.title }}</h2>
      <p class="poem-author">{{ article?.author }} · {{ article?.dynasty }}</p>

      <div class="poem-body">
        <div
          v-for="(line, index) in article?.content"
          :key="index"
          class="poem-line"
        >
          <p v-if="showPinyin && article?.pinyin[index]" class="pinyin-line">
            {{ article.pinyin[index] }}
          </p>
          <p class="text-line">{{ line }}</p>
        </div>
      </div>

      <button class="audio-btn" @click="playAudio">
        🔊 全文朗读
      </button>

      <button class="action-btn" @click="showNotes = true">
        📋 查看注释
      </button>

      <button class="action-btn" @click="showTranslation = !showTranslation">
        📖 {{ showTranslation ? '隐藏译文' : '查看译文' }}
      </button>

      <div v-if="showTranslation" class="translation-box">
        <p>{{ article?.translation }}</p>
      </div>

      <button class="finish-btn" @click="finishRead">
        我已熟读原文
      </button>
    </div>

    <!-- 注释弹窗 -->
    <div v-if="showNotes" class="modal-overlay" @click="showNotes = false">
      <div class="modal-content" @click.stop>
        <h3>注释与释义</h3>
        <div class="notes-list">
          <div
            v-for="(value, key) in article?.annotations"
            :key="key"
            class="note-item"
          >
            <span class="note-key">{{ key }}</span>
            <span class="note-value">{{ value }}</span>
          </div>
        </div>
        <button class="close-btn" @click="showNotes = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-page {
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

.pinyin-toggle {
  font-size: 13px;
  color: #4A90E2;
  cursor: pointer;
}

.content {
  padding: 20px 16px;
}

.poem-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 8px;
}

.poem-author {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 24px;
}

.poem-body {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.poem-line {
  margin-bottom: 12px;
}

.pinyin-line {
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.text-line {
  font-size: 18px;
  color: #333;
  line-height: 1.8;
}

.audio-btn, .action-btn {
  width: 100%;
  height: 44px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin-bottom: 8px;
}

.translation-box {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.translation-box p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.finish-btn {
  width: 100%;
  height: 48px;
  background: #52C41A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 200;
}

.modal-content {
  background: #fff;
  width: 100%;
  max-height: 70vh;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  overflow-y: auto;
}

.modal-content h3 {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.note-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.note-key {
  color: #4A90E2;
  font-weight: bold;
  min-width: 60px;
}

.note-value {
  color: #666;
  flex: 1;
}

.close-btn {
  width: 100%;
  height: 44px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin-top: 16px;
}
</style>
