<template>
  <div class="access-list">
    <h2>access-list</h2>
    11<input type="checkbox" @change="handleFn" />22
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputVal = ref<any>()
const handleFn = (e: any) => {
  console.log(e.target.checked)
}
</script>

<style lang="less" scoped>
.access-list {
  color: skyblue;
}
</style>
