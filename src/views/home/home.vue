<template>
  <div class="home page" ref="homeRef">
    <template v-for="(item, index) in 150" :key="index">
      <div>{{ item }}</div>
    </template>
    <img
      src="@/assets/img/cc.jpg"
      data-url="https://hbimg.huabanimg.com/c04565904d7d891bb56a33b8484fbad151fedc35558f4-XNuUhg_fw658"
      ref="imgRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useLazyImg from '@/hooks/lazy-img'

const homeRef = ref<HTMLElement>()
const imgRef = ref<HTMLImageElement>()

onMounted(() => {
  useLazyImg(homeRef.value as HTMLElement, imgRef.value as HTMLImageElement)
})
</script>

<style lang="less" scoped>
.home {
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
