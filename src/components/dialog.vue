<template>
  <div>
    <div class="dialog-item">
      <el-dialog :modelValue="dialogVisible" title="提示" width="30%">
        <span>{{ tipText }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div @click="dialogVisible = true">
      <slot :visible="dialogVisible">请传入按钮</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

interface IProps {
  tipText?: string
  confirmFn?: any
}
const props = withDefaults(defineProps<IProps>(), {
  tipText: '确认信息-tipText',
})
let dialogVisible = ref(true)
const handleConfirm = () => {
  if (props.confirmFn) {
    props.confirmFn()
    dialogVisible.value = false
    ElMessage.success('操作成功!')
  }
  dialogVisible.value = false
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
/* :deep(.el-button.is-text) {
  background-color: skyblue !important;
  color: red;
} */
</style>
