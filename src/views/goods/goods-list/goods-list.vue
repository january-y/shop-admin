<template>
  <div class="goods-list">
    <div class="tabs mgt-20">
      <el-tabs v-model="currentInfo.tab" class="demo-tabs" @tab-change="handleTabChange">
        <template v-for="(item, index) in tabList" :key="item.key">
          <el-tab-pane :label="item.title" :name="item.key"></el-tab-pane>
        </template>
      </el-tabs>
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
            <el-button type="primary" size="small">新增</el-button>
            <el-button type="danger" size="small">批量删除</el-button>
            <el-button size="small">上架</el-button>
            <el-button size="small">下架</el-button>
          </div>
          <div class="right">
            <el-icon class="cp"><Refresh @click="getData" /></el-icon>
          </div>
        </div>
      </div>
      <div class="table-main mgt-20">
        <el-table ref="multipleTableRef" :data="goodsStore.goodList" style="width: 100%">
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
                <span class="mgr-20 small fontc underline cp">修改</span>
                <span class="mgr-20 small fontc underline cp">商品规格</span>
                <span class="mgr-20 small fontc underline cp">设置轮播图</span>
                <span class="mgr-20 small fontc underline cp">商品详情</span>
                <span class="small fontc underline cp">删除</span>
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
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))

const goodsStore = useGoodsStore()
goodsStore.getGoodInfosAction(1, {
  tab: 'all',
})
// ref
const drawerNewEditRef = ref<InstanceType<typeof drawerWrapper>>()
// variable
interface ICurrentInfo {
  tab: string
  searchIcon: boolean
  selectCategory: string
  page: number
  searchGoodName: string | number
}
const currentInfo = reactive<ICurrentInfo>({
  tab: 'all',
  searchIcon: true,
  selectCategory: '',
  page: 1,
  searchGoodName: '',
})
const tabList = ref<any>([
  { key: 'all', title: '全部' },
  { key: 'checking', title: '审核中' },
  { key: 'saling', title: '出售中' },
  { key: 'off', title: '已下架' },
  { key: 'min_stock', title: '库存预警' },
  { key: 'delete', title: '回收站' },
])
// hooks
function getData() {
  goodsStore.getGoodInfosAction(1, {
    tab: 'all',
  })
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
