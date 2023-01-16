<template>
  <div class="goods-list">
    <div class="tabs mgt-20">
      <el-tabs v-model="currentInfo.tab" class="demo-tabs" @tab-change="handleTabChange">
        <template v-for="(item, index) in tabList" :key="item.key">
          <el-tab-pane :label="item.title" :name="item.key"></el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <!-- drawer -->
    <drawer-wrapper
      ref="drawerNewEditRef"
      @confirm="drawerNewEditConfirm"
      @drawer-close="handleNewEditClose"
      :title="currentInfo.drawerTitle"
    >
      <template #default>
        <span></span>
      </template>
      <template #main>
        <div class="main">
          <el-form
            ref="ruleFormRef"
            :model="drawerAddEditForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品名称" prop="title">
              <el-input
                v-model="drawerAddEditForm.title"
                type="text"
                autocomplete="off"
                placeholder="请输入商品名称，不能超过60个字符"
              />
            </el-form-item>
            <el-form-item label="封面" prop="cover">
              <img class="img" :src="drawerAddEditForm.cover" v-if="showCover" ref="coverRef" />
              <div class="addbox dfc cp" @click="handleUpload">+</div>
            </el-form-item>
            <el-form-item label="商品分类" prop="category_id">
              <el-select v-model="drawerAddEditForm.category_id" placeholder="请选择商品分类">
                <template v-for="(item, index) in goodsStore.categorySelectList" :key="item.id">
                  <el-option :label="item.name" :value="item.id" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
              <el-input
                v-model="drawerAddEditForm.desc"
                type="textarea"
                autocomplete="off"
                placeholder="选填，商品卖点描述"
              />
            </el-form-item>
            <el-form-item label="商品单位" prop="unit">
              <div class="width-50">
                <el-input v-model="drawerAddEditForm.unit" type="text" autocomplete="off" />
              </div>
            </el-form-item>
            <el-form-item label="总库存" prop="stock">
              <div class="width-40">
                <el-input v-model="drawerAddEditForm.stock">
                  <template #append>件</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="库存预警" prop="min_stock">
              <div class="width-40">
                <el-input v-model="drawerAddEditForm.min_stock">
                  <template #append>件</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="最低销售价" prop="min_price">
              <div class="width-40">
                <el-input v-model="drawerAddEditForm.min_price">
                  <template #append>元</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="最低原价" prop="min_oprice">
              <div class="width-40">
                <el-input v-model="drawerAddEditForm.min_oprice">
                  <template #append>元</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="库存显示" prop="stock_display">
              <el-radio-group v-model="drawerAddEditForm.stock_display">
                <el-radio :label="1" border>是</el-radio>
                <el-radio :label="0" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否上架" prop="status">
              <el-radio-group v-model="drawerAddEditForm.status">
                <el-radio :label="0" border>放入仓库</el-radio>
                <el-radio :label="1" border>立即上架</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </drawer-wrapper>
    <!-- layout-contain -->
    <div class="select-img" ref="selectImgRef">
      <div class="close" @click="selectImgRef!.style.display = 'none'">×</div>
      <div class="contain dfc">
        <layout-contain>
          <template #header>
            <div>图片选择</div>
          </template>
        </layout-contain>
      </div>
    </div>
    <!-- table -->
    <div class="table">
      <div class="table-header">
        <div class="search dfb">
          <div class="search-input pdl-20 dfs">
            <span class="goods-name">商品名称</span>
            <input
              type="text"
              placeholder="商品名称"
              class="goods-input focus-c mgl-10"
              v-model="currentInfo.searchGoodName"
            />
            <span class="goods-category" v-if="currentInfo.searchIcon == false">商品分类</span>
            <el-select
              v-model="currentInfo.selectCategory"
              placeholder="请选择商品分类"
              class="goods-select"
              v-if="currentInfo.searchIcon == false"
            >
              <template v-for="(item, index) in goodsStore.goodInfos?.cates" :key="index">
                <el-option :label="item.name" :value="item.name" />
              </template>
            </el-select>
          </div>
          <div class="btn dfa">
            <el-button type="primary" size="small" class="pdt-8" @click="handleSearchGood"
              >搜索</el-button
            >
            <el-button size="small" class="pdt-8" @click="handleResetSearch">重置</el-button>
            <el-button
              size="small"
              class="pdt-8 fontc"
              bg
              text
              @click="currentInfo.searchIcon = !currentInfo.searchIcon"
            >
              <span>{{ currentInfo.searchIcon ? '展开' : '收起' }}</span
              ><el-icon
                ><component
                  :is="currentInfo.searchIcon ? 'ArrowDownBold' : 'ArrowUpBold'"
                ></component
              ></el-icon>
            </el-button>
          </div>
        </div>
        <div class="main-handle dfb">
          <div class="left">
            <el-button type="primary" size="small" @click="handleNewClick">新增</el-button>
            <el-popconfirm title="是否要删除？" @confirm="handleDelGoods">
              <template #reference>
                <el-button type="danger" size="small">批量删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="small">上架</el-button>
            <el-button size="small">下架</el-button>
          </div>
          <div class="right">
            <el-icon class="cp"><Refresh @click="getData" /></el-icon>
          </div>
        </div>
      </div>
      <div class="table-main mgt-20">
        <el-table ref="tableRef" :data="goodsStore.goodList" style="width: 100%">
          <el-table-column type="selection" width="45" />
          <el-table-column label="商品" width="300">
            <template #default="scope">
              <div class="goods-item">
                <img :src="scope.row?.cover" alt="" class="img" />
                <div class="info">
                  <div class="name">{{ scope.row?.title }}</div>
                  <div class="price">
                    <span class="min-price-rmb">¥</span>
                    <span class="min-price">{{ scope.row?.min_price }}</span>
                    <span> | </span>
                    <span class="min-oprice-rmb">¥</span>
                    <span class="min-oprice">{{ scope.row?.min_oprice }}</span>
                  </div>
                  <div class="category">分类： {{ scope.row?.category?.name }}</div>
                  <div class="create-time">创建时间：{{ scope.row.create_time }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="sale_count" label="实际销量" width="100" align="center" />
          <el-table-column label="商品状态" width="100" align="center">
            <template #default="scope">
              <div class="dfc">
                <div class="status-up" v-if="scope.row.status == 1">上架</div>
                <div class="status-down" v-if="scope.row.status != 1">仓库</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="150" align="center">
            <template #default="scope">
              <div v-if="scope.row.ischeck == 1" class="dfc">通过</div>
              <div v-else-if="scope.row.ischeck == 2" class="dfc">拒绝</div>
              <div v-else class="dfc">
                <div class="checkTrue cp">审核成功</div>
                <div class="checkFalse cp">审核失败</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="stock" label="总库存" width="80" align="center" />
          <el-table-column label="操作" align="right">
            <template #default="scope">
              <div class="dfe">
                <span class="mgr-20 small fontc underline cp" @click="handleEdit(scope.row)"
                  >修改</span
                >
                <span class="mgr-20 small fontc underline cp">商品规格</span>
                <span class="mgr-20 small fontc underline cp">设置轮播图</span>
                <span class="mgr-20 small fontc underline cp">商品详情</span>
                <el-popconfirm title="是否要删除?" @confirm="handleDelGood(scope.row.id)">
                  <template #reference>
                    <span class="small fontc underline cp">删除</span>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination mgt-20 dfc mgb-10">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="goodsStore.goodInfos?.totalCount"
          v-model:current-page="currentInfo.page"
        />
      </div>
    </div>
    <div class="footer mgt-20 dfc"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, watch } from 'vue'
import useGoodsStore from '@/stores/goods'
import { useIsNumber } from '@/utils/useCheckTypeof'
import type { FormInstance } from 'element-plus'
import { addGood, editGoods, delGoodsByIds } from '@/services/modules/goods'
import { useMessage } from '@/utils/useMessage'
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const layoutContain = defineAsyncComponent(() => import('@/components/layout-contain.vue'))

const goodsStore = useGoodsStore()
goodsStore.getGoodInfosAction(1, {
  tab: 'all',
})
// ref
const drawerNewEditRef = ref<InstanceType<typeof drawerWrapper>>()
const coverRef = ref<HTMLImageElement>()
const ruleFormRef = ref<FormInstance>()
const selectImgRef = ref<HTMLElement>()
const tableRef = ref<any>()
// variable
interface ICurrentInfo {
  tab: string
  searchIcon: boolean
  selectCategory: string
  page: number
  searchGoodName: string | number
  drawerTitle: string
  item: any
}
interface IDrawerAddEditForm {
  title: string
  category_id: number
  cover: string
  desc: string
  unit: string
  stock: number
  min_stock: number
  status: number
  stock_display: number
  min_price: number
  min_oprice: number
}
const currentInfo = reactive<ICurrentInfo>({
  tab: 'all',
  searchIcon: true,
  selectCategory: '',
  page: 1,
  searchGoodName: '',
  drawerTitle: '新增',
  item: '',
})
const drawerAddEditForm = reactive<IDrawerAddEditForm>({
  title: '',
  category_id: 5,
  cover:
    'https://img0.baidu.com/it/u=2652437070,1782133479&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  desc: '',
  unit: '件',
  stock: 100,
  min_stock: 10,
  status: 1,
  stock_display: 1,
  min_price: 0,
  min_oprice: 0,
})
const showCover = ref<boolean>(false)
const tabList = ref<any>([
  { key: 'all', title: '全部' },
  { key: 'checking', title: '审核中' },
  { key: 'saling', title: '出售中' },
  { key: 'off', title: '已下架' },
  { key: 'min_stock', title: '库存预警' },
  { key: 'delete', title: '回收站' },
])
const rules = reactive({
  title: [{ validator: validateTitle, trigger: 'blur' }],
  category_id: [{ required: true, trigger: 'blur' }],
  desc: [{ validator: validateDesc, trigger: 'blur' }],
  unit: [{ validator: validateTitle, trigger: 'blur' }],
  stock: [{ required: true, trigger: 'blur' }],
  min_stock: [{ required: true, trigger: 'blur' }],
  status: [{ required: true, trigger: 'blur' }],
  stock_display: [{ required: true, trigger: 'blur' }],
  min_price: [{ required: true, trigger: 'blur' }],
  min_oprice: [{ required: true, trigger: 'blur' }],
})
// hooks
function validateTitle(rule: any, value: any, callback: any) {
  if (!value || value.replace(/\s*/g, '').length < 1) {
    callback(new Error('该项不能为空'))
  } else {
    callback()
  }
}
function validateDesc(rule: any, value: any, callback: any) {
  if (!value || value.replace(/\s*/g, '').length < 3) {
    callback(new Error('商品描述需在3个字符以上'))
  } else {
    callback()
  }
}
function validateStock(rule: any, value: any, callback: any) {
  if (!useIsNumber(value) || value < 1) {
    callback(new Error('商品库存至少为1'))
  } else {
    callback()
  }
}
function validateMinStock(rule: any, value: any, callback: any) {
  if (!useIsNumber(value) || value < 0) {
    callback(new Error('库存预警至少为0'))
  } else {
    callback()
  }
}
function validateMinPrice(rule: any, value: any, callback: any) {
  if (!useIsNumber(value) || value < 0) {
    callback(new Error('最低销售价至少为0'))
  } else {
    callback()
  }
}
function validateMinOprice(rule: any, value: any, callback: any) {
  if (!useIsNumber(value) || value < 0) {
    callback(new Error('最低原价至少为0'))
  } else {
    callback()
  }
}
function getData() {
  goodsStore.getGoodInfosAction(1, {
    tab: 'all',
  })
}
function resetForm() {
  drawerAddEditForm.title = ''
  drawerAddEditForm.category_id = 5
  drawerAddEditForm.cover =
    'https://img0.baidu.com/it/u=2652437070,1782133479&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
  drawerAddEditForm.desc = ''
  drawerAddEditForm.unit = '件'
  drawerAddEditForm.stock = 100
  drawerAddEditForm.min_stock = 10
  drawerAddEditForm.status = 1
  drawerAddEditForm.stock_display = 1
  drawerAddEditForm.min_price = 0
  drawerAddEditForm.min_oprice = 0
}
const handleTabChange = (tabName: string) => {
  // 发送相关网络请求
  console.log(tabName)
}
const handleSearchGood = () => {
  let res: any = ''
  if (currentInfo.searchGoodName && !currentInfo.selectCategory) {
    res = goodsStore.goodInfos?.list?.find((item: any) => item.title == currentInfo.searchGoodName)
  } else if (currentInfo.searchGoodName && currentInfo.selectCategory) {
    res = goodsStore.goodInfos?.list?.find(
      (item: any) =>
        item.title == currentInfo.searchGoodName &&
        item.category.name == currentInfo.selectCategory,
    )
  }

  if (res) {
    goodsStore.goodList = [res]
  } else {
    goodsStore.goodList = []
  }
}
const handleResetSearch = () => {
  currentInfo.searchGoodName = ''
  currentInfo.selectCategory = ''
  getData()
}
const handleUpload = () => {
  selectImgRef.value!.style.display = 'block'
}
// 抽屉
const handleNewEditClose = () => {
  resetForm()
  ruleFormRef.value?.resetFields()
}
const drawerNewEditConfirm = () => {
  ruleFormRef.value?.validate((e: boolean) => {
    // 新增
    if (currentInfo.drawerTitle == '新增') {
      // 验证表单输入
      if (
        drawerAddEditForm.category_id &&
        drawerAddEditForm.cover &&
        drawerAddEditForm.desc &&
        drawerAddEditForm.min_oprice &&
        drawerAddEditForm.min_price &&
        drawerAddEditForm.min_stock &&
        drawerAddEditForm.stock &&
        drawerAddEditForm.title &&
        drawerAddEditForm.unit
      ) {
        addGood(drawerAddEditForm).then((res: any) => {
          useMessage('success', '添加成功')
          getData()
          drawerNewEditRef.value?.close()
        })
      } else {
        useMessage('error', '信息填写错误')
      }
    } else {
      // 修改
      if (
        drawerAddEditForm.category_id &&
        drawerAddEditForm.cover &&
        drawerAddEditForm.desc &&
        drawerAddEditForm.min_oprice &&
        drawerAddEditForm.min_price &&
        drawerAddEditForm.min_stock &&
        drawerAddEditForm.stock &&
        drawerAddEditForm.title &&
        drawerAddEditForm.unit
      ) {
        editGoods(currentInfo.item.id, { ...drawerAddEditForm, content: '芜湖起飞' }).then(
          (res: any) => {
            useMessage('success', '修改成功')
            getData()
            drawerNewEditRef.value?.close()
          },
        )
      } else {
        useMessage('error', '信息填写错误')
      }
    }
  })
}
const handleNewClick = () => {
  currentInfo.drawerTitle = '新增'
  drawerNewEditRef.value?.open()
}
const handleEdit = (item: any) => {
  currentInfo.item = item
  currentInfo.drawerTitle = '修改'
  //
  drawerAddEditForm.category_id = item.category_id
  drawerAddEditForm.cover = item.cover
  drawerAddEditForm.desc = item.desc
  drawerAddEditForm.min_oprice = item.min_oprice
  drawerAddEditForm.min_price = item.min_price
  drawerAddEditForm.min_stock = item.min_stock
  drawerAddEditForm.status = item.status
  drawerAddEditForm.stock = item.stock
  drawerAddEditForm.stock_display = item.stock_display
  drawerAddEditForm.title = item.title
  drawerAddEditForm.unit = item.unit
  //
  drawerNewEditRef.value?.open()
  showCover.value = true
}
const handleDelGoods = () => {
  const ids = tableRef.value.getSelectionRows().map((item: any) => item.id)
  delGoodsByIds(ids)
    .then((res: any) => {
      useMessage('success', '删除成功')
      getData()
    })
    .catch(() => useMessage('error', '删除失败'))
}
const handleDelGood = (id: number) => {
  delGoodsByIds([id])
    .then((res: any) => {
      useMessage('success', '删除成功')
      getData()
    })
    .catch(() => useMessage('error', '删除失败'))
}

//
watch(
  () => currentInfo.page,
  () => {
    goodsStore.getGoodInfosAction(currentInfo.page, { tab: 'all' })
  },
  { immediate: true, deep: true },
)
</script>

<style lang="less" scoped>
.goods-list {
  box-sizing: border-box;
  padding-right: 20px;
  width: 100%;
  border-radius: 5px;
  .tabs {
  }
  .table {
    padding: 15px;
    width: 100%;
    background-color: #ffffff;
  }
  .footer {
  }
  .main {
    margin-top: 30px;
    margin-left: -50px;
    .img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .addbox {
      width: 100px;
      height: 100px;
      font-size: 35px;
      color: #999999;
      border: 1px dashed #dad9d9;
    }
  }
}
.select-img {
  display: none;
  position: fixed;
  z-index: 999999999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .close {
    top: 30px;
    right: 150px;
    position: absolute;
    font-size: 100px;
    color: #9d9c9c;
    cursor: pointer;
  }
}
.table {
  box-sizing: border-box;
  .table-header {
    .search {
      .goods-name {
        font-size: 12px;
      }
      .goods-input {
        padding: 3px 5px;
        font-size: 13px;
        width: 250px;
      }
      .goods-category {
        margin-left: 30px;
        font-size: 12px;
      }
      .goods-select {
        margin-left: 10px;
        :deep(.el-input__inner) {
          height: 20px;
        }
      }
    }
    .main-handle {
      margin-top: 30px;
    }
  }
  .table-main {
    .goods-item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 5px;
      }
      .info {
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: var(--first-color);
        }
        .price {
          .min-price {
            margin-left: 4px;
            color: #f43f5e;
            font-size: 14px;
            font-weight: 600;
          }
          .min-price-rmb {
            color: #f43f5e;
            font-size: 14px;
            font-weight: 600;
          }
          .min-oprice {
            margin-left: 4px;
            color: var(--second-color);
            font-size: 12px;
          }
          .min-oprice-rmb {
            color: var(--second-color);
            font-size: 12px;
          }
        }
        .category {
          color: var(--three-color);
          font-size: 12px;
        }
        .create-time {
          color: var(--three-color);
          font-size: 12px;
        }
      }
    }
    .status-up {
      padding-bottom: 10px;
      width: 50px;
      height: 20px;
      font-size: 10px;
      background-color: #f0f9eb;
      color: #67c23a;
      border: 1px solid #67c23a;
      border-radius: 5px;
    }
    .status-down {
      padding-bottom: 10px;
      width: 50px;
      height: 20px;
      font-size: 10px;
      background-color: #fef0f0;
      color: #f56c6c;
      border: 1px solid #f56c6c;
      border-radius: 5px;
    }
    .checkTrue {
      padding-bottom: 10px;
      width: 100px;
      height: 20px;
      font-size: 10px;
      background-color: #f0f9eb;
      color: #67c23a;
      border: 1px solid #67c23a;
      border-radius: 5px;
    }
    .checkFalse {
      margin-top: 10px;
      padding-bottom: 10px;
      width: 100px;
      height: 20px;
      font-size: 10px;
      background-color: #fef0f0;
      color: #f56c6c;
      border: 1px solid #f56c6c;
      border-radius: 5px;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
