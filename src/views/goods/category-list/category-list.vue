<template>
  <div class="category-list">
    <div @click="selectImgRef.open">111111111</div>
    <transition>
      <select-imgs ref="selectImgRef"></select-imgs>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, watch } from 'vue'
const selectImgs = defineAsyncComponent(() => import('@/components/select-imgs.vue'))

const selectImgRef = ref<any>()
</script>

<style lang="less" scoped>
.category-list {
}
</style>
