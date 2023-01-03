<template>
  <div class="home-asside" :style="{ width: homeStore.isOpenMenus ? 'auto' : '250px' }">
    <el-menu
      :default-active="publicStore.currentMenu"
      class="el-menu-vertical-demo"
      :collapse="homeStore.isOpenMenus"
      unique-opened
      @open=""
      @close=""
    >
      <!-- 循环 -->
      <template v-for="(item, index) in menus" :key="item.order">
        <el-sub-menu :index="item.index + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- 子菜单 -->
          <template v-for="(itemm, indexx) in item.child" :key="itemm.order">
            <!-- no have child -->
            <div>
              <el-menu-item-group>
                <el-menu-item
                  :index="itemm.index"
                  @click="handleItemClick(index + '-' + indexx, itemm)"
                >
                  <el-icon>
                    <component :is="itemm.icon"></component>
                  </el-icon>
                  {{ itemm.name }}</el-menu-item
                >
              </el-menu-item-group>
            </div>
            <!-- no have child -->
            <!-- havd child -->
            <!-- <div v-if="itemm.child.length >= 1">
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </div> -->
            <!-- havd child -->
          </template>

          <!-- 子菜单 -->
        </el-sub-menu>
      </template>
      <!-- 循环 -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useHomeStore from '@/stores/home'
import usePublicStore from '@/stores/public'
import { useRouter } from 'vue-router'

const props = defineProps<{
  menus: any
}>()

const router = useRouter()
const homeStore = useHomeStore()
const publicStore = usePublicStore()
const assideRef = ref<HTMLElement>()
let isClose = ref<boolean>(false)
const handleItemClick = (index: string, item: any) => {
  console.log(item.index)
  publicStore.currentMenu = index
  if (homeStore.topTabs.length >= 11) {
    homeStore.topTabs.splice(0, 1)
  }
  const theSame = homeStore.topTabs.find((itemm: any) => itemm.name == item.name)
  if (!theSame) {
    homeStore.topTabs.push({
      name: item.name,
      path: item.frontpath,
    })
  }

  // console.log(index)
  if (item.frontpath == '/') {
    router.push('/main/control')
  } else {
    router.push(item.frontpath)
  }
}
</script>

<style lang="less" scoped>
.home-asside {
  transition: all 0.5s !important;
  width: 300px;
  // width: 100%;
}
</style>
