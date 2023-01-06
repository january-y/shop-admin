<template>
  <div class="order-chart">
    <div class="title dfb">
      <div class="left">订单统计</div>
      <div class="right dfs">
        <template v-for="(item, index) in arrList" :key="index">
          <div
            class="filter-item fontw tc cp"
            @click="handleFetchData(item, index)"
            :class="{ active: index == currentIndex }"
          >
            {{ item.title }}
          </div>
        </template>
      </div>
    </div>
    <div class="main" ref="mainRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import useMainControlStore from '@/stores/main-control'
import { getMainControlInfo3 } from '@/services/modules/main-control'

const props = defineProps<{
  echartData?: any
}>()
const mainControlStore = useMainControlStore()
const mainRef = ref<HTMLElement>()
let currentIndex = ref<number>(0)
let myChart = ref<any>()
let isLoading = ref<boolean>(true)
const arrList = ref<any>([
  { title: '近1一个月', type: 'month' },
  { title: '近1周', type: 'week' },
  { title: '近24小时', type: 'hour' },
])
let options = reactive<any>({
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
})
const handleFetchData = (item: any, index: number) => {
  myChart.value.showLoading()
  currentIndex.value = index
  mainControlStore.currentEchart = item.type
  // console.log(mainControlStore.currentEchart)
  getMainControlInfo3(item.type).then((res: any) => {
    renderEchart(res.data)
    myChart.value.hideLoading()
  })
}

//
function renderEchart(data: any) {
  options.xAxis.data = []
  options.series[0].data = []
  data.x.forEach((item: any) => {
    options.xAxis.data.push(item)
  })
  data.y.forEach((item: any) => {
    options.series[0].data.push(item)
  })
  myChart.value = echarts.init(mainRef.value!)
  myChart.value.clear()
  myChart.value.setOption(options)
}
getMainControlInfo3('month').then((res: any) => {
  options.xAxis.data = []
  options.series[0].data = []
  res.data.x.forEach((item: any) => {
    options.xAxis.data.push(item)
  })
  res.data.y.forEach((item: any) => {
    options.series[0].data.push(item)
  })
  myChart.value = echarts.init(mainRef.value!)
  myChart.value.clear()
  myChart.value.hideLoading()
  myChart.value.setOption(options)
})
onMounted(() => {
  myChart.value = echarts.init(mainRef.value!)
  myChart.value.showLoading()
})
</script>

<style lang="less" scoped>
.order-chart {
  box-sizing: border-box;
  width: 625px;
  height: 400px;
  border-radius: 5px;
  background-color: #ffffff;
  .title {
    padding: 20px 0;
    border-bottom: 1px solid rgb(235, 233, 233);
    .left {
      padding-left: 20px;
      font-size: 14px;
    }
    .right {
      padding-right: 20px;
      font-size: 14px;

      .filter-item {
        padding: 5px 7px;
        margin-right: 10px;
        border-radius: 3px;
        background-color: #f4f4f5;
      }
      .active {
        background-color: #d9ecff;
        color: #40a0ff !important;
      }
    }
  }
  .main {
    position: relative;
    padding-bottom: 40px;
    height: 100%;
    width: 100%;
  }
}
</style>
