<template>
  <div class="input-wrapper mgt-20">
    <div
      class="title"
      :style="{
        width: titleWidth,
        justifyContent: titleAligin,
        alignItems: itemAlign,
        fontSize: titleSize,
      }"
    >
      {{ title }}
    </div>
    <div class="main mgl-10 dfs">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    title?: string
    titleWidth?: string
    titleAligin?: string
    itemAlign?: string
    titleSize?: string
  }>(),
  {
    title: '标题',
    titleWidth: 'auto',
    titleAligin: 'flex-end',
    itemAlign: 'center',
    titleSize: '15px',
  },
)
</script>

<style lang="less" scoped>
.input-wrapper {
  display: flex;
  justify-content: flex-start;
  .title {
    display: flex;
    align-items: center;
    // background-color: gray;
  }
}
</style>
