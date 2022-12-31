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
      <el-form :model="formData" :rules="rules" ref="elFormRef">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="formData.username">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            placeholder="请输入密码"
            v-model="formData.password"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="handleLogin" :loading="publicStore.isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- el -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import usePublicStore from '@/stores/public'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { login } from '@/services/modules/login'

interface IFormData {
  username: any
  password: any
}

const router = useRouter()
const publicStore = usePublicStore()
const elFormRef = ref<FormInstance>()
const formData = reactive<IFormData>({ username: '', password: '' })
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度需在3~15位之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 15, message: '密码长度需3位以上', trigger: 'blur' },
  ],
})
let timer: any = null
const handleLogin = () => {
  if (timer) return
  timer = setTimeout(() => {
    elFormRef.value?.validate((res, file) => {
      res &&
        login(formData.username, formData.password)
          .then((res: any) => {
            if (res.data.token) {
              ElMessage.success('登入成功!')
              router.push('home')
              publicStore.token = res.data.token
              publicStore.isLogin = true
              localStorage.setItem('token', res.data.token)
            }
          })
          .catch(() => ElMessage.error('账号或密码错误!'))
    })
    timer = null
  }, 100)
}
</script>

<style lang="less" scoped>
.login {
  .left {
    width: 60vw;
    height: 100vh;
    background-color: #616ff7;
    background-image: url('https://hbimg.huabanimg.com/c04565904d7d891bb56a33b8484fbad151fedc35558f4-XNuUhg_fw658');
    background-repeat: no-repeat;
    background-size: cover;
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
      margin-top: 10px;
      padding: 8px 10px;
      background-color: #616ff7;
      text-align: center;
      width: 300px;
      border-radius: 15px;
      color: #f9f9f9;
    }
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
