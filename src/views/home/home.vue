<template>
  <div class="home">home</div>
</template>

<script setup lang="ts">
import useHomeStore from '@/stores/home'
import { ref, onMounted } from 'vue'

const homeStore = useHomeStore()
homeStore.getMenuInfosAction()
</script>

<style lang="less" scoped></style>
