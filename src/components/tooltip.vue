<template>
  <el-tooltip :effect="color" :content="title" :placement="position">
    <slot> </slot>
  </el-tooltip>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

interface IProps {
  title?: string
  color?: string
  position?: string
}
const props = withDefaults(defineProps<IProps>(), {
  color: 'dark',
  position: 'top',
  title: '相机',
})
</script>

<style lang="less" scoped></style>
