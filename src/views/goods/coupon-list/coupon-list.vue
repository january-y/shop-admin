<template>
  <div class="coupon-list">
    <div class="table">
      <div class="header dfb">
        <el-button type="primary" size="small" @click="handleNew" class="pdt-8">新增</el-button>
        <el-icon><Refresh class="cp" @click="getData" /></el-icon>
      </div>
      <!-- 抽屉开始 -->
      <drawer-wrapper
        ref="drawerRef"
        @confirm="drawerConfirm"
        @drawer-close="onDrawerClose"
        :title="currentItemInfo.drawerTitle"
      >
        <template #default>
          <span></span>
        </template>
        <template #main>
          <div class="drawer-table">
            <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="优惠券名" prop="couponName">
                <el-input v-model="ruleForm.couponName" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio label="满减" border @click="ruleForm.type = '满减'">满减</el-radio>
                  <el-radio label="折扣" border @click="ruleForm.type = '满减'"
                    >折扣</el-radio
                  ></el-radio-group
                >
              </el-form-item>
              <el-form-item label="面值" class="value">
                <template #default="scope">
                  <inputAndEndLabel
                    :model-value="ruleForm.value"
                    @:update:model-value="handleValueChange"
                    input-width="150px"
                    :label="ruleForm.type == '满减' ? '元' : '折'"
                  ></inputAndEndLabel>
                  <span class="validate-value small error-c" ref="valueRef">面值最小为1</span>
                </template>
              </el-form-item>
              <el-form-item label="发行量" prop="total">
                <el-input-number
                  v-model="ruleForm.total"
                  :min="1"
                  :max="100000"
                  @change="(e: any) => ruleForm.total = e"
                />
              </el-form-item>
              <el-form-item label="最低使用" class="minimun">
                <template #default="scope">
                  <inputAndEndLabel
                    :model-value="ruleForm.minimun"
                    @:update:model-value="handleMinimunChange"
                    input-width="150px"
                    label="元"
                  ></inputAndEndLabel>
                  <span class="validate-minimun small error-c" ref="minimunRef"
                    >最低使用为必填项</span
                  >
                </template>
              </el-form-item>
              <el-form-item label="排序" prop="order">
                <el-input-number
                  v-model="ruleForm.order"
                  :min="1"
                  :max="100000"
                  @change="(e: any) => ruleForm.order = e"
                />
              </el-form-item>
              <el-form-item label="活动时间" prop="startToEndTime">
                <el-date-picker
                  v-model="ruleForm.startToEndTime"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="default"
                />
              </el-form-item>
              <el-form-item label="描述" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" autocomplete="off" />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </drawer-wrapper>
      <!-- 抽屉结束 -->
      <div class="main">
        <el-table :data="couponStore?.couponInfos?.list" stripe style="width: 100%">
          <el-table-column label="优惠券名称" width="380">
            <template #default="scope">
              <div class="coupon-item" v-validatebgc="scope.row">
                <div class="coupon-name">
                  {{ scope.row.name }}
                </div>
                <div>
                  <span class="start small">{{ scope.row.start_time }}</span>
                  <span>&nbsp;~&nbsp;</span>
                  <span class="end small">{{ scope.row.end_time }}</span>
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
                  scope.row.type == 1 ? `折扣 ${scope.row.value}折` : `满减 ¥ ${scope.row.value}`
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="发放数量" align="center" />
          <el-table-column prop="used" label="已使用" align="center" />
          <el-table-column label="操作" width="180" align="center">
            <template #default="scope">
              <div class="dfa">
                <div
                  class="cp fontc small"
                  v-if="scope.row.status == 1 && validateEndTime(scope.row) == '未开始'"
                  @click="handleEditCoupon(scope.row)"
                >
                  修改
                </div>
                <el-popconfirm
                  title="是否要删除?"
                  @confirm="handleDelCoupon(scope.row.id)"
                  v-if="validateEndTime(scope.row) !== '领取中'"
                >
                  <template #reference>
                    <div class="cp fontc small" v-if="validateEndTime(scope.row) !== '领取中'">
                      删除
                    </div>
                  </template>
                </el-popconfirm>
                <div
                  class="destory dfc cp"
                  v-if="scope.row.status == 1 && validateEndTime(scope.row) == '领取中'"
                  @click="handleInvalid(scope.row.id, scope.row.status)"
                >
                  失效
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination dfc">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @next-click="handlleNext"
          @prev-click="handlePrev"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <!--  -->
    <div class="footer dfc">页脚部分</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, reactive } from 'vue'
import useCouponStore from '@/stores/coupon'
import { validateEndTime } from '@/utils/validateEndTime'
import type { FormInstance } from 'element-plus'
import { useFormatDate } from '@/hooks/formatDate'
import { newCoupon, delCoupon, editCoupon, editCouponStatus } from '@/services/modules/coupon'
import { useMessage } from '@/utils/useMessage'
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const inputAndEndLabel = defineAsyncComponent(() => import('@/components/inputAndEndLabel.vue'))

const couponStore = useCouponStore()
couponStore.getCouponListAction()
// ref
const drawerRef = ref<InstanceType<typeof drawerWrapper> | null>()
const ruleFormRef = ref<FormInstance>()
const valueRef = ref<HTMLSpanElement>()
const minimunRef = ref<HTMLSpanElement>()
// variable
interface IRuleForm {
  couponName: string
  type: string | number
  value: number
  total: number
  minimun: number
  order: number
  startToEndTime: any
  desc: string | number
}
interface ICurrentItemInfo {
  drawerTitle: string
  currentItem: any
  currentPage: number
}
const ruleForm = reactive<IRuleForm>({
  couponName: '',
  type: '满减',
  value: 0,
  total: 100,
  minimun: 0,
  order: 50,
  startToEndTime: '',
  desc: '',
})
const currentItemInfo = reactive<ICurrentItemInfo>({
  drawerTitle: '新增',
  currentItem: '',
  currentPage: 1,
})
const rules = reactive({
  couponName: [{ validator: validateName, trigger: 'blur' }],
  type: [{ validator: validateType, trigger: 'blur' }],
  total: [{ validator: validateTotal, trigger: 'blur' }],
  order: [{ validator: validateOrder, trigger: 'blur' }],
  startToEndTime: [{ validator: validateDate, trigger: 'blur' }],
  desc: [{ validator: validateDesc, trigger: 'blur' }],
})
// hooks
// 表单验证
function validateName(rule: any, value: any, callback: any) {
  if (value == '') {
    callback(new Error('优惠券名称不能为空'))
  } else {
    callback()
  }
}
function validateType(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error('类型不能为空'))
  }
}
function validateTotal(rule: any, value: any, callback: any) {
  if (!value || value == 0) {
    callback(new Error('发行总量至少为1'))
  } else {
    callback()
  }
}
function validateOrder(rule: any, value: any, callback: any) {
  if (!value) {
    callback(new Error('序号不合法'))
  } else {
    callback()
  }
}
function validateDate(rule: any, value: any, callback: any) {
  if (value.length < 2) {
    callback(new Error('时间区间不完整'))
  } else {
    callback()
  }
}
function validateDesc(rule: any, value: any, callback: any) {
  if (value.length < 3) {
    callback(new Error('描述至少为3个字符'))
  } else {
    callback()
  }
}
function getData() {
  couponStore.getCouponListAction()
}
function resetForm() {
  ruleForm.couponName = ''
  ruleForm.desc = ''
  ruleForm.minimun = 0
  ruleForm.order = 50
  ruleForm.startToEndTime = ''
  ruleForm.total = 100
  ruleForm.type = '满减'
  ruleForm.value = 0
}
const handleNew = () => {
  ruleFormRef.value?.resetFields()
  resetForm()
  currentItemInfo.drawerTitle = '新增'
  drawerRef.value?.open()
  console.log('handleNew')
}
const drawerConfirm = () => {
  // 只能验证单个,bug
  const start = new Date(ruleForm.startToEndTime[0])
  const end = new Date(ruleForm.startToEndTime[1])
  const start_time = Math.round(start.getTime() / 1000)
  const end_time = Math.round(end.getTime() / 1000)
  //
  if (
    !ruleForm.couponName ||
    ruleForm.value < 1 ||
    ruleForm.total < 1 ||
    !ruleForm.startToEndTime ||
    ruleForm.order < 1
  ) {
    useMessage('error', '信息填写不规范！')
  } else {
    if (currentItemInfo.drawerTitle == '新增') {
      newCoupon({
        name: ruleForm.couponName,
        type: ruleForm.type == '满减' ? 0 : 1,
        value: ruleForm.value,
        total: ruleForm.total,
        min_price: ruleForm.minimun,
        start_time,
        end_time,
        order: ruleForm.order,
      })
        .then(() => {
          useMessage('success', '创建成功')
          getData()
          drawerRef.value?.close()
        })
        .catch(() => useMessage('error', '创建失败'))
    } else {
      editCoupon(currentItemInfo.currentItem.id, {
        name: ruleForm.couponName,
        type: ruleForm.type == '满减' ? 0 : 1,
        value: ruleForm.value,
        total: ruleForm.total,
        min_price: ruleForm.minimun,
        start_time,
        end_time,
        order: ruleForm.order,
      })
        .then(() => {
          useMessage('success', '修改成功')
          getData()
          drawerRef.value?.close()
        })
        .catch(() => useMessage('error', '修改失败'))
    }
  }
}
const onDrawerClose = () => {
  resetForm()
  ruleFormRef.value?.resetFields()
}
const handleMinimunChange = (e: number) => {
  ruleForm.minimun = e * 1
  if (!e) {
    minimunRef.value!.style.display = 'inline-block'
    minimunRef.value!.style.transform = 'translateY(20px)'
  } else {
    minimunRef.value!.style.display = 'none'
  }
}
const handleValueChange = (e: number) => {
  ruleForm.value = e * 1
  if (!e) {
    valueRef.value!.style.display = 'inline-block'
    valueRef.value!.style.transform = 'translateY(20px)'
  } else {
    valueRef.value!.style.display = 'none'
  }
}
const handleDelCoupon = (id: number) => {
  delCoupon(id)
    .then((res: any) => {
      useMessage('success', '删除成功')
      getData()
    })
    .catch(() => useMessage('error', '删除失败'))
}
const handleEditCoupon = (item: any) => {
  currentItemInfo.currentItem = item
  currentItemInfo.drawerTitle = '修改'
  ruleForm.couponName = item.name
  ruleForm.desc = item.desc
  ruleForm.minimun = item.min_price * 1
  ruleForm.order = item.order * 1
  ruleForm.startToEndTime = [item.start_time, item.end_time]
  ruleForm.total = item.total * 1
  ruleForm.type = item.type == 1 ? '折扣' : '满减'
  ruleForm.value = item.value * 1
  drawerRef.value?.open()
}
const handleInvalid = (id: number, status: number) => {
  editCouponStatus(id, status)
    .then((res: any) => {
      useMessage('warning', res.response.data.msg)
      getData()
    })
    .catch(() => useMessage('error', '修改失败'))
}
//pagination
const handlePageChange = (page: number) => {
  currentItemInfo.currentPage = page
  couponStore.getCouponListAction(page)
}
const handlleNext = (page: number) => {
  currentItemInfo.currentPage = page
  couponStore.getCouponListAction(page)
}
const handlePrev = (page: number) => {
  currentItemInfo.currentPage = page
  couponStore.getCouponListAction(page)
}
//
</script>

<style lang="less" scoped>
.coupon-list {
  box-sizing: border-box;
  padding-right: 20px;
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
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
        color: #999999;
        background-color: #f9fafb;
        .coupon-name {
          font-weight: 900;
          font-size: 16px;
          .start {
            color: #999999;
          }
          .end {
            color: #999999;
          }
        }
      }
      .destory {
        padding: 5px 10px;
        padding-top: 6px;
        line-height: 1;
        font-size: 12px !important;
        cursor: pointer;
        color: #f56c6c;
        background-color: #fef0f0;
        border: 1px solid #f56c6c;
        border-radius: 5px;
      }
    }
    .pagination {
      margin-top: 25px;
    }
    :deep(.cell) {
      color: var(--second-color);
      font-size: 15px;
      // font-weight: 700;
    }
    .drawer-table {
      margin-top: 30px;
      margin-left: -60px;
      .value {
        position: relative;
        .validate-value {
          display: none;
          position: absolute;
          top: 5px;
          left: 3px;
          transition: all 3s;
        }
      }
      .minimun {
        position: relative;
        .validate-minimun {
          display: none;
          position: absolute;
          top: 5px;
          left: 3px;
          transition: all 3s;
        }
      }
    }
  }
  .footer {
    margin-top: 40px;
  }
}
</style>
