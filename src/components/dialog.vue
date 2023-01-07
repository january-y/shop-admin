<template>
  <div>
    <div class="dialog-item">
      <el-dialog v-model="dialogVisible" :title="tipTitle" width="30%" :align-center="center">
        <span>{{ tipText }}</span>
        <input type="text" v-if="showInput" class="input" :value="inputBind" @input="updataFn" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div @click="dialogVisible = true">
      <slot>请传入按钮</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

interface IProps {
  tipTitle?: string
  tipText?: string
  center?: boolean
  showInput?: boolean
  inputBind?: number | string
}
const props = withDefaults(defineProps<IProps>(), {
  tipText: '确认信息-tipText',
  center: false,
  showInput: false,
  tipTitle: '提示',
})

const emit = defineEmits(['confirmFn'])
const inputValue = ref<any>()
let dialogVisible = ref(false)
const handleConfirm = () => {
  if (inputValue.value) {
    emit('confirmFn', inputValue.value.target.value)
  } else {
    emit('confirmFn', props.inputBind)
  }

  dialogVisible.value = false
}
const updataFn = (value: any) => {
  inputValue.value = value
}
const open = () => {
  dialogVisible.value = true
}

defineExpose({ open })
</script>
<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.input {
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border: 2px solid rgb(187, 186, 186);
  border-radius: 3px;
  &:focus {
    outline-color: #79bbff;
  }
}
</style>
