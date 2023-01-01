<template>
  <div class="drawer-wrapper">
    <!-- 按钮插槽 -->
    <slot>
      <el-button type="primary" style="margin-left: 16px" @click="isShow = true"> open </el-button>
    </slot>

    <el-drawer v-model="isShow" title="I am the title" :with-header="false" size="45%">
      <div class="content">
        <div class="header dfb">
          <div class="title">{{ title }}</div>
          <div class="out cp" @click="handleCancel">×</div>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>
        <div class="footer">
          <el-button type="primary" @click="handleConfirm">确定</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    confirmFn?: any
  }>(),
  {
    title: '标题',
  },
)

let isShow = ref(false)
const handleCancel = () => {
  isShow.value = false
}
const handleConfirm = () => {
  if (props.confirmFn) props.confirmFn()
  isShow.value = false
}
</script>
<style lang="less" scoped>
.drawer-wrapper {
  .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .header {
      padding-right: 20px;
      .title {
        font-size: 21px;
      }
      .out {
        font-size: 35px;
      }
    }
    .main {
      background-color: gray;
      padding: 10px 10px;
      height: 600px;
      overflow-y: auto;
      // 滚动条
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .footer {
      margin-top: 5px;
    }
  }
}
</style>
