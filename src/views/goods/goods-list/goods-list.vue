<template>
  <div class="goods-list">
    <h2>goods-list</h2>
    <div ref="countRef">4566</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue'
import { useCountUp } from '@/hooks/countUp'

const countRef = ref<HTMLElement>()
onMounted(() => {
  useCountUp(countRef.value!)
})
</script>

<style lang="less" scoped>
.goods-list {
  color: skyblue;
}
</style>
