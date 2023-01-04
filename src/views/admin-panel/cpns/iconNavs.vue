<template>
  <div class="icon-navs dfb">
    <template v-for="(item, index) in DataList" :key="item.icon">
      <div class="icon-item dfc boxs" :class="item.color" @click="$router.push(item.path)">
        <el-icon :size="16">
          <component :is="item.icon"></component>
        </el-icon>
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import useHomeStore from '@/stores/home'

const props = defineProps<{
  iconData?: any
}>()
const homeStore = useHomeStore()
// 验证权限是否有相关item
let DataList = ref<any>([])
function deepEach(arr: any) {
  for (let item of arr) {
    for (let itemm of homeStore.haveIndexMenus!) {
      for (let itemmm of itemm.child) {
        if (item.path == itemmm.frontpath) {
          DataList.value.push(item)
        }
      }
    }
  }
}

onBeforeMount(() => {
  deepEach(props.iconData)
})
</script>

<style lang="less" scoped>
.icon-navs {
  margin-top: 20px;
  margin-left: -15px;
  padding-right: 10px;
  .icon-item {
    flex: 1;
    margin-left: 15px;
    padding: 20px 30px;
    background-color: #ffffff;
    border-radius: 5px;
    .title {
      margin-top: 10px;
      color: #000000;
    }
  }
}
</style>
