<template>
  <div class="coupon-list">
    <div class="table">
      <div class="header dfb">
        <el-button type="primary" size="small" @click="handleNew" class="pdt-8">新增</el-button>
        <el-icon><Refresh class="cp" @click="handleRefresh" /></el-icon>
      </div>
      <div class="main">
        <el-table :data="couponStore?.couponInfos?.list" stripe style="width: 100%">
          <el-table-column label="优惠券名称" width="380">
            <template #default="scope">
              <div class="coupon-item" v-validatebgc="scope.row">
                <div class="coupon-name tc">{{ scope.row.name }}</div>
                <div>
                  <span class="start small tc">{{ scope.row.start_time }}</span>
                  <span>&nbsp;~&nbsp;</span>
                  <span class="end small tc">{{ scope.row.end_time }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="50" />
          <el-table-column label="状态" width="180" align="center">
            <template #default="scope">
              <div v-validatetime="scope.row">
                {{ scope.row.status }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="优惠" width="180" align="center">
            <template #default="scope">
              <div>
                {{
                  scope.row.type == 1 ? `满减 ¥ ${scope.row.value}` : `折扣 ${scope.row.value}折`
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="发放数量" align="center" />
          <el-table-column prop="used" label="已使用" align="center" />
          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <div class="dfa">
                <div class="cp fontc small">修改</div>
                <div class="cp fontc small">删除</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination"></div>
    </div>
    <!--  -->
    <div class="footer dfc">页脚部分</div>
  </div>
</template>

<script setup lang="ts">
import useCouponStore from '@/stores/coupon'

const couponStore = useCouponStore()
couponStore.getCouponListAction()
// ref

// variable

// hooks
const handleNew = () => {
  console.log('handleNew')
}
const handleRefresh = () => {
  console.log('handleRefresh')
}
</script>

<style lang="less" scoped>
.coupon-list {
  padding-right: 20px;
  width: 100%;
  .table {
    margin-top: 20px;
    padding: 20px;
    padding-right: 30px;
    padding-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    .header {
    }
    .main {
      margin-top: 15px;
      .coupon-item {
        padding: 10px;
        padding-left: 20px;
        border: 1px dashed #d9d9d9;
        border-radius: 5px;
        background-color: #f9fafb;
        .coupon-name {
          font-weight: 900;
          font-size: 16px;
          .start {
          }
        }
      }
    }
    .pagination {
    }
    :deep(.cell) {
      color: var(--second-color);
      font-size: 15px;
      // font-weight: 700;
    }
  }
  .footer {
    margin-top: 40px;
  }
}
</style>
