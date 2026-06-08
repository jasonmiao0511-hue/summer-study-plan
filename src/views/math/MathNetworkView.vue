<script setup lang="ts">
// const nodes = [
// nodes data
// ...
// ...
// ...
// ...
// ...
// ...
// ...
// ]

const operations = ['加法', '减法', '乘法', '除法', '乘方']
</script>

<template>
  <div class="network-page">
    <div class="header">
      <span class="back" @click="$router.push('/math')">←</span>
      <span class="title">知识网络图</span>
      <span></span>
    </div>

    <div class="content">
      <div class="tree-section">
        <p class="section-title">有理数分类</p>
        <div class="tree">
          <div class="node root">有理数</div>
          <div class="branches">
            <div class="branch">
              <div class="node">整数</div>
              <div class="sub-branches">
                <div class="node small">正整数</div>
                <div class="node small">0</div>
                <div class="node small">负整数</div>
              </div>
            </div>
            <div class="branch">
              <div class="node">分数</div>
              <div class="sub-branches">
                <div class="node small">正分数</div>
                <div class="node small">负分数</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ops-section">
        <p class="section-title">有理数运算</p>
        <div class="ops-list">
          <div v-for="op in operations" :key="op" class="op-item">
            {{ op }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.network-page {
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
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.tree-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.node {
  background: #4A90E2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
}

.node.root {
  font-size: 16px;
  padding: 12px 24px;
}

.node.small {
  font-size: 12px;
  padding: 6px 12px;
  background: #6BA5E7;
}

.branches {
  display: flex;
  gap: 40px;
}

.branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.sub-branches {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ops-section {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.ops-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.op-item {
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
}
</style>