<template>
  <input
    :value="modelValue || 0"
    @change="handleChange"
    type="text"
    class="value focus-c"
    :style="{ width: inputWidth }"
  /><span class="yuan dfc">{{ label ? label : '元' }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: number
  inputWidth: string
  label: string | number
}>()
const emit = defineEmits([':update:modelValue'])

const handleChange = (val: any) => {
  emit(':update:modelValue', val.target.value)
}
</script>

<style lang="less" scoped>
.home {
  .value {
    height: 32px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .yuan {
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    background-color: #f5f7fa;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid #c0bfbf;
    border-left: 0;
    color: #999999;
  }
}
</style>
