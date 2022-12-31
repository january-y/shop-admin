<template>
  <div class="not-found">
    <el-result icon="warning" title="页面错误" sub-title="404 NotFound">
      <template #extra>
        <el-button type="primary" @click="$router.push('/home')">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666666;
}
</style>
