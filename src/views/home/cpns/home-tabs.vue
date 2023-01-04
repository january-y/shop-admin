<template>
  <div class="home-tabs dfb">
    <div class="left dfs" ref="scollBar">
      <template v-for="(item, index) in homeStore.topTabs" :key="index">
        <div class="tab dfa" :class="{ active: item.path == $route.path }">
          <div class="name cp" @click="handleNavigate(item, index)">{{ item.name }}</div>
          <div class="del tc cp hover" @click="handleDelTab(item)">×</div>
        </div>
      </template>
    </div>
    <div class="right cp" @click="handleClear" v-if="homeStore.topTabs.length > 0">全部关闭</div>
  </div>
</template>
<script lang="ts" setup>
import useHomeStore from '@/stores/home'
import usePublicStore from '@/stores/public'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const homeStore = useHomeStore()
const publicStore = usePublicStore()
const scollBar = ref<HTMLElement>()
const currentIndex = ref<number | string>('')
const handleNavigate = (item: any, index: number) => {
  router.push(item.path)
  currentIndex.value = index
  // 修改菜单索引
  function deepFind(menusArr: any) {
    menusArr.forEach((itemm: any) => {
      if (itemm.frontpath == item.path) publicStore.currentMenu = itemm.index
      if (itemm.child) deepFind(itemm.child)
    })
  }
  deepFind(homeStore.haveIndexMenus)
}
const handleDelTab = (item: any) => {
  const res = homeStore.topTabs.findIndex((itemm: any) => itemm.name == item.name)
  homeStore.topTabs.splice(res, 1)
}
const handleClear = () => {
  homeStore.topTabs = []
  // if (scollBar.value) scollBar.value.style.transform = 'translateX(50px)'
}
</script>

<style lang="less" scoped>
.home-tabs {
  padding-right: 20px;
  .left {
    position: relative;
    width: 90%;
    overflow: hidden;
    transition: all 0.5s;
    // background-color: #999999;
    .tab {
      margin-left: 10px;
      padding: 2px 7px;
      border-radius: 3px;
      width: 100px;
      background-color: #fdfdfd;
      .name {
        font-size: 13px;
      }
      .del {
        margin-left: 5px;
        font-size: 25px;
        // &:hover {
        //   color: skyblue !important;
        // }
      }
    }
    .active {
      background-color: skyblue;
    }
    .left-arrow {
      padding: 5px;
      background-color: #fff;
      border-radius: 50%;
    }
    .right-arrow {
      padding: 5px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
  .right {
    padding: 4px 5px;
    border-radius: 3px;
    font-size: 14px;
    // line-height: 1;
    color: #f3f3f3;
    background-color: #409eff;
  }
}
</style>
