<template>
  <div class="access-list bgc-fff">
    <div class="menus">
      <div class="header dfb">
        <el-button type="primary" size="small" @click="" class="pd-8">新增</el-button>
        <el-icon class="cp" @click=""><Refresh /></el-icon>
      </div>
      <div class="main">
        <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false">
          <template #default="{ node, data }">
            <div class="item dfb">
              <div class="titlle dfs">
                <div>菜单</div>
                <div>icon</div>
                <div>{{ node.label }}</div>
              </div>
              <div class="handle">handle</div>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, reactive, watch } from 'vue'
import { useMessage } from '@/utils/useMessage'
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const inputWrappter = defineAsyncComponent(() => import('@/components/inputWrapper.vue'))

// ref
// 变量
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])
// hooks
</script>

<style lang="less" scoped>
.access-list {
  margin-top: 20px;
  margin-right: 20px;
  padding: 0 20px;
  border-radius: 5px;
  .menus {
    .header {
      padding: 20px 0;
      padding-right: 10px;
    }
    .main {
      .item {
        padding-right: 30px;
        flex: 1;
      }
    }
  }
  .footer {
  }
}
</style>
