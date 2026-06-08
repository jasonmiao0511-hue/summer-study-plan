<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChineseStore } from '../../stores/chinese'

const router = useRouter()
const store = useChineseStore()

const article = computed(() => store.currentArticle)
const userInput = ref('')
const submitted = ref(false)

const lines = computed(() => article.value?.content || [])

function submit() {
  submitted.value = true
  const userLines = userInput.value.split('\n').map(l => l.trim())
  let correct = 0
  let total = 0
  
  lines.value.forEach((line, i) => {
    const cleanLine = line.replace(/[，。；？！]/g, '')
    const userLine = (userLines[i] || '').replace(/[，。；？！]/g, '')
    
    for (let j = 0; j < cleanLine.length; j++) {
      total++
      if (cleanLine[j] === userLine[j]) {
        correct++
      } else if (userLine[j]) {
        store.addMistake(cleanLine[j], userLine[j])
      }
    }
  })
  
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  store.setWriteAccuracy(accuracy)
  store.completeStep('write')
  router.push('/chinese-write-result')
}

function clearInput() {
  userInput.value = ''
}
</script>

<template>
  <div class="write-page">
    <div class="header">
      <span class="back" @click="$router.push('/chinese')">←</span>
      <span class="title">默写检测</span>
      <span></span>
    </div>

    <div class="content">
      <div class="write-info">
        <p class="write-title">《{{ article?.title }}》全文默写</p>
        <p class="write-tip">提示：请完整默写全诗，不需要加标点符号。</p>
      </div>

      <textarea
        v-model="userInput"
        class="write-input"
        placeholder="在此输入默写内容..."
        rows="12"
      ></textarea>

      <div class="actions">
        <button class="btn-clear" @click="clearInput">清空</button>
        <button class="btn-submit" @click="submit">提交默写</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.write-page {
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

.write-info {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.write-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.write-tip {
  font-size: 13px;
  color: #999;
}

.write-input {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  line-height: 1.8;
  resize: vertical;
  min-height: 300px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.actions button {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-clear {
  background: #fff;
  color: #666;
  border: 1px solid #e8e8e8;
}

.btn-submit {
  background: #4A90E2;
  color: #fff;
}
</style>
