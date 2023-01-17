<template>
  <div class="layout-contain">
    <el-container class="bgc-fff">
      <el-header>
        <div class="header dfs" :style="{ height: headerHeight }">
          <slot name="header"> header部分 </slot>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <div class="asside page" :style="{ height: assideHeight }">
            <div class="menu">
              <slot name="asside"> asside部分 </slot>
            </div>
          </div>
          <div class="toggle dfc" :style="{ height: assidetogglePage }">
            <slot name="astoggle"> asside-toggle部分 </slot>
          </div>
        </el-aside>
        <el-main>
          <div class="main page" :style="{ height: mainHeight }">
            <slot name="main"> main部分 </slot>
          </div>
          <div class="toggle-page dfc" :style="{ height: maintogglePage }">
            <slot name="maintoggle"> main-toggle部分 </slot>
          </div>
          <slot name="main-footer"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    headerHeight?: string
    assideHeight?: string
    mainHeight?: string
    asideWidth?: string
    maintogglePage: string
    assidetogglePage: string
  }>(),
  {
    headerHeight: '60px',
    assideHeight: 'calc(100vh - 250px)',
    mainHeight: 'calc(100vh - 250px)',
    asideWidth: '230px',
    maintogglePage: '40px',
    assidetogglePage: '40px',
  },
)
</script>

<style lang="less" scoped>
.layout-contain {
  margin-top: 20px;
  padding-right: 20px;
  border-radius: 5px;
  overflow: hidden;
  :deep(.el-header) {
    padding: 0 !important;
  }
  :deep(.el-main) {
    padding: 0 !important;
  }
  .header {
    padding: 0px 20px;
    height: 60px;
    border-bottom: 1px solid #eeeeee;
  }
  .asside {
    height: calc(100vh - 250px);
    border-right: 1px solid #eeeeee;
  }
  .toggle {
    height: 40px;
    // border: 1px solid red;
  }
  .main {
    padding: 15px;
    height: calc(100vh - 250px);
  }
  .toggle-page {
    height: 40px;
    // border: 1px solid skyblue;
  }
}
</style>
