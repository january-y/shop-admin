<template>
  <div class="change-pwd">
    <div class="title dfb sc">
      <div>修改密码</div>
      <slot></slot>
    </div>
    <!--  -->
    <div class="pwd-form">
      <el-form :model="formData" :rules="rules" ref="elFormRef">
        <el-form-item prop="oldPwd">
          <el-input placeholder="请输入旧密码" v-model="formData.oldPwd" show-password>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input
            type="password"
            show-password
            placeholder="请输入新密码"
            v-model="formData.newPwd"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="secondPwd">
          <el-input placeholder="确认新密码" v-model="formData.secondPwd" show-password>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round :loading="false" @click="handleConfirm"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!--  -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { editPwd } from '@/services/modules/login'
import { ElMessage } from 'element-plus'
interface IFormData {
  oldPwd: any
  newPwd: any
  secondPwd: any
}
const elFormRef = ref<FormInstance>()
const formData = reactive<IFormData>({ oldPwd: '', newPwd: '', secondPwd: '' })
const rules = reactive<FormRules>({
  oldPwd: [
    { required: true, message: '请输入正确的旧密码', trigger: 'blur' },
    { min: 3, max: 15, message: '密码长度需3位以上', trigger: 'blur' },
  ],
  newPwd: [
    { required: true, message: '请输入正确的密码', trigger: 'blur' },
    { min: 3, max: 15, message: '密码长度需3位以上', trigger: 'blur' },
  ],
  secondPwd: [
    { required: true, message: '请输入正确的密码', trigger: 'blur' },
    { min: 3, max: 15, message: '密码长度需3位以上', trigger: 'blur' },
  ],
})

let timer: any = null
const handleConfirm = () => {
  if (timer) return
  timer = setTimeout(() => {
    elFormRef.value?.validate((res, file) => {
      if (res) {
        editPwd(formData.oldPwd, formData.newPwd, formData.secondPwd).then(() => {
          ElMessage.success('修改成功!')
        })
      }
    })
    timer = null
  }, 100)
}
</script>

<style lang="less" scoped>
.change-pwd {
  .title {
    padding-right: 20px;
    font-size: 20px;
    .out {
      font-size: 35px;
    }
  }
  .pwd-form {
    margin-top: 50px;
  }
}
</style>
