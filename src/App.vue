<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #e8e8e8;
  -webkit-font-smoothing: antialiased;
}

/* 移动端：全宽，无限制 */
#app {
  min-height: 100vh;
  background: #f5f5f5;
}

/* 桌面端：居中卡片式布局 */
@media (min-width: 768px) {
  body {
    background: #e0e5ec;
  }
  
  .app-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    background: #f5f5f5;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
}

/* 大屏：更宽 */
@media (min-width: 1400px) {
  .app-wrapper {
    max-width: 1400px;
  }
}
</style>