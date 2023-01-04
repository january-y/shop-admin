<template>
  <div class="main-control">
    <!-- 第一行 -->
    <!-- if -->
    <div class="panel dfa" v-if="mainControlStore?.mainControlInfo?.length > 0">
      <template v-for="(item, index) in mainControlStore.mainControlInfo" :key="index">
        <div class="panel-item dfcs cp boxs">
          <div class="header dfb">
            <div class="title fontw sc">{{ item.title }}</div>
            <div class="year">{{ item.unit }}</div>
          </div>
          <div class="main fontw sc" ref="totalRef">{{ item.value }}</div>
          <div class="total dfb">
            <div class="subtitle sc">
              {{ item.subTitle }}
            </div>
            <div class="subtotal">
              {{ item.subValue }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- else 骨架-->
    <div class="panel dfa" v-else>
      <template v-for="(item, index) in 4" :key="index">
        <el-skeleton style="width: 240px" :loading="true" animated>
          <div class="panel-item dfcs cp boxs">
            <div class="header dfb">
              <div class="title fontw sc">
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
              <div class="year"><el-skeleton-item variant="text" style="width: 30%" /></div>
            </div>
            <div class="main fontw sc"><el-skeleton-item variant="text" style="width: 30%" /></div>
            <div class="total dfb">
              <div class="subtitle sc"><el-skeleton-item variant="text" style="width: 30%" /></div>
              <div class="subtotal"><el-skeleton-item variant="text" style="width: 30%" /></div>
            </div>
          </div>
        </el-skeleton>
      </template>
    </div>
    <!-- 第二行 -->
    <iconNav :iconData="mainControlStore.iconNavs"></iconNav>
    <!-- 第三行 -->
    <div class="mainData dfb">
      <!-- 订单统计 -->
      <div class="left">
        <orderChart :echartData="echartData" v-if="echartData"></orderChart>
      </div>
      <!-- 店铺商品展示 -->
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, watchEffect, defineAsyncComponent, computed } from 'vue'
import useMainControlStore from '@/stores/main-control'
import { useCountUp } from '@/hooks/countUp'
const iconNav = defineAsyncComponent(() => import('../cpns/iconNavs.vue'))
const orderChart = defineAsyncComponent(() => import('../cpns/orderEchart.vue'))

const mainControlStore = useMainControlStore()
mainControlStore.getMainControlInfoAction()
mainControlStore.getMainControlInfoAction3()
mainControlStore.getMainControlInfoAction3Week('week')
mainControlStore.getMainControlInfoAction3Hour('hour')
let totalRef = ref<HTMLElement[]>()
const echartData = computed(() => {
  return mainControlStore.currentEchart == 'month'
    ? mainControlStore.mainControlInfo3
    : mainControlStore.currentEchart == 'week'
    ? mainControlStore.getMainControlInfoAction3Week
    : mainControlStore.getMainControlInfoAction3Hour
})
console.log(echartData.value)

onMounted(() => {
  totalRef.value?.forEach((item: HTMLElement) => {
    useCountUp(item)
  })
})
onActivated(() => {
  totalRef.value?.forEach((item: HTMLElement) => {
    useCountUp(item)
  })
})
watchEffect(() => {
  totalRef.value?.forEach((item: HTMLElement) => {
    useCountUp(item)
  })
})
</script>

<style lang="less" scoped>
.main-control {
  box-sizing: border-box;
  .panel {
    padding-right: 10px;
    margin-top: 20px;
    margin-left: -20px;
    .panel-item {
      flex: 1;
      margin-left: 20px;
      padding: 25px;
      border-radius: 5px;
      background-color: #ffffff;
      .header {
        .title {
          font-size: 18px;
          color: #000000;
        }
        .year {
          padding: 1px 4px;
          padding-top: 3px;
          color: green;
          border: 1px solid green;
          border-radius: 3px;
          font-size: 12px;
        }
      }
      .main {
        margin-top: 20px;
        border-top: 1px solid #e4e7ed;
        padding: 20px 0;
        font-size: 30px;
      }
      .total {
        border-top: 1px solid #e4e7ed;
        padding-top: 20px;
      }
    }
  }
  .mainData {
    margin-top: 20px;
    box-sizing: border-box;
    // width: 100%;
    // background-color: red;
  }
}
</style>
