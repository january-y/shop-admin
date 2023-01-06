<template>
  <div class="control-goods">
    <div class="goods">
      <div class="header dfb">
        <div class="left oc fontw">店铺及商品提示</div>
        <div class="right">店铺及商品提示</div>
      </div>
      <div class="main dfb oc">
        <template v-for="(item, index) in infoData" :key="index">
          <div class="message dfc boxs cp">
            <span class="number fontw">{{ item.value }}</span>
            <span>{{ item.label }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  infoData?: any
}>()
</script>

<style lang="less" scoped>
.control-goods {
  background-color: #ffffff;
  border-radius: 5px;
  .goods {
    .header {
      padding: 15px;
      .left {
        font-size: 15px;
      }
      .right {
        padding: 1px 2px;
        padding-top: 3px;
        font-size: 12px;
        border: 1px solid #f56c6c;
        border-radius: 3px;
        color: #f56c6c;
      }
    }
    .main {
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid rgb(229, 226, 226);
      .message {
        padding: 40px;
        margin: 10px;
        border-radius: 5px;
        background-color: #f6f6f6;
        font-size: 16px;
        .number {
          margin-bottom: 5px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
