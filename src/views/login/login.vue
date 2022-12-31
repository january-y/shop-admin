<template>
  <div class="login dfs">
    <div class="left dfc">
      <div class="title fontw">欢迎光临</div>
      <div class="subtitle">此站点是january开发的商城后台管理系统</div>
    </div>
    <!--  -->
    <div class="right dfc">
      <div class="title fontw">欢迎回来</div>
      <!-- el -->
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="btn">登录</div>
        </el-form-item>
      </el-form>
      <!-- el -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let ruleForm = ref<[] | {}>({})
</script>

<style lang="less" scoped>
.login {
  .left {
    width: 60vw;
    height: 100vh;
    background-color: #616ff7;
    background-image: url('https://hbimg.huabanimg.com/c04565904d7d891bb56a33b8484fbad151fedc35558f4-XNuUhg_fw658');
    background-repeat: no-repeat;
    background-size: 100%;
    .title {
      // margin-bottom: 90px;
      color: #ffffff;
      font-size: 60px;
    }
    .subtitle {
      margin-top: 5px;
      color: #f6f6f6;
      font-size: 20px;
    }
  }
  .right {
    width: 40vw;
    height: 100vh;
    background-color: #f3f3f3;
    .title {
      margin-bottom: 30px;
      color: #000000;
      font-size: 40px;
    }
    .btn {
      background-color: #616ff7;
      text-align: center;
      width: 250px;
      border-radius: 15px;
      color: #f9f9f9;
    }
  }
}
</style>
