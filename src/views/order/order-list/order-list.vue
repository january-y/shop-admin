<template>
  <div class="order-list">
    <h2>order-list</h2>
    <el-tree
      ref="treeRef"
      v-if="flag"
      :data="currentData"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="currentNode"
    />
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <button @click="currentData = data2">change currentNode</button>
    <button @click="flag = false">change currentNode</button>
    <button @click="flag = true">change currentNode</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const treeRef = ref<any>()
const flag = ref<boolean>(true)
const currentNode = ref<any>(['1-1'])
const checkedNode = ref<any>('2-1')
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}
let currentData = ref<any>()
let data = ref<any>([
  {
    id: '1',
    label: '1',
    children: [
      { id: '1-1', label: '1-1' },
      { id: '1-2', label: '1-2' },
    ],
  },
  {
    id: '2',
    label: '2',
    children: [
      { id: '2-1', label: '2-1' },
      { id: '2-2', label: '2-2' },
    ],
  },
  {
    id: '3',
    label: '3',
    children: [
      { id: '3-1', label: '3-1' },
      { id: '3-2', label: '3-2' },
    ],
  },
])
let data2 = ref<any>([
  {
    id: '11',
    label: '11',
    children: [
      { id: '11-1', label: '11-1' },
      { id: '11-2', label: '11-2' },
    ],
  },
  {
    id: '2',
    label: '2',
    children: [
      { id: '2-1', label: '2-1' },
      { id: '2-2', label: '2-2' },
    ],
  },
  {
    id: '3',
    label: '3',
    children: [
      { id: '3-1', label: '3-1' },
      { id: '3-2', label: '3-2' },
    ],
  },
])
currentData.value = data
const handleChecked = () => {
  console.log(treeRef.value.getCheckedNodes())
}
//
watch(
  () => checkedNode.value,
  () => {
    console.log(currentNode.value)
  },
)
</script>

<style lang="less" scoped>
.order-list {
}
</style>
