<template>
  <div class="image-list">
    <el-container class="bgc-fff">
      <el-header>
        <div class="header dfs">
          <el-button size="small" type="primary">新增图片分类</el-button>
          <el-button size="small" type="warning">上传图片</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="230px">
          <div class="asside page">
            <div class="menu">
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
              <div>asside</div>
            </div>
          </div>
          <div class="toggle dfc">asside</div>
        </el-aside>
        <el-main>
          <div class="main page">
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
          <div class="toggle-page dfc">toggle-page</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.image-list {
  margin-top: 20px;
  padding-right: 20px;
  border-radius: 5px;
  overflow: hidden;
  :deep(.el-header) {
    padding: 0 !important;
  }
  :deep(.el-main) {
    padding: 0 !important;
  }
  .header {
    padding-left: 20px;
    height: 60px;
    border-bottom: 1px solid #eeeeee;
  }
  .asside {
    height: calc(100vh - 250px);
    border-right: 1px solid #eeeeee;
  }
  .toggle {
    height: 40px;
    border: 1px solid red;
  }
  .main {
    padding: 15px;
    height: calc(100vh - 250px);
  }
  .toggle-page {
    height: 40px;
    border: 1px solid skyblue;
  }
}
</style>
