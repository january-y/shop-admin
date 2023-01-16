<template>
  <div class="select-imgs dfc" v-if="isShow">
    <div class="contain">
      <layoutContain asideWidth="250px" maintogglePage="80px" assidetogglePage="80px">
        <template #header>
          <div class="header sc fontw">图片选择</div>
        </template>
        <template #asside>
          <div class="asside">
            <template v-for="(item, index) in moreStore.imgInfos?.list" :key="item.id">
              <div class="item dfb hover-bg">
                <div class="title dfs oc">{{ item.name }}</div>
                <div class="handle dfa fontc">
                  <el-icon>
                    <Edit class="cp" />
                  </el-icon>
                  <el-icon><CloseBold class="cp" /></el-icon>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template #astoggle>
          <div class="astoggle dfc mgb-20">
            <el-pagination
              background
              layout="prev, next"
              :total="moreStore.imgInfos?.totalCount"
              @current-change="handlePageChange"
            />
          </div>
        </template>
        <template #main>
          <div class="main">
            <template v-for="(item, index) in moreStore.nowCategoryImgs?.list" :key="item.id">
              <div class="item">
                <div class="content">
                  <div class="top">
                    <img :src="item.url" alt="" />
                    <div class="dfc">{{ item.name }}</div>
                  </div>
                  <div class="footer dfa">
                    <input type="checkbox" class="cp" @change="handleInputChange($event, item)" />
                    <div class="fontc cp">重命名</div>
                    <div class="fontc cp">删除</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template #maintoggle>
          <div class="maintoggle dfc">
            <el-pagination
              v-model:current-page="currentInfos.currentMainPage"
              @current-change="handleMainPageChange"
              background
              layout="prev, pager, next"
              :total="moreStore.nowCategoryImgs?.totalCount"
            />
          </div>
        </template>
        <template #main-footer>
          <div class="contain-footer dfe pdr-20 pdb-20">
            <el-button @click="handleExit">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </template>
      </layoutContain>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMoreStore from '@/stores/more'
import { useMessage } from '@/utils/useMessage'
import { ref, reactive, defineAsyncComponent, watch } from 'vue'
const layoutContain = defineAsyncComponent(() => import('@/components/layout-contain.vue'))

const moreStore = useMoreStore()
moreStore.getImgListAction()

// ref

// variable
interface ICurrentInfos {
  currentItem: any
  checkImgArr: any
  currentMainPage: number
}
const currentInfos = reactive<ICurrentInfos>({
  currentItem: '',
  checkImgArr: [],
  currentMainPage: 1,
})
let isShow = ref<boolean>(false)
// hooks
const handlePageChange = (page: number) => {
  moreStore.getImgListAction(page, 10)
}
const handleInputChange = (e: any, item: any) => {
  if (e.target.checked) {
    currentInfos.checkImgArr.push(item)
    if (currentInfos.checkImgArr.length > 1) {
      useMessage('warning', '最多选择一张图片')
    }
  } else {
    currentInfos.checkImgArr.forEach((item2: any, index: number) => {
      if (item2.id == item.id) {
        currentInfos.checkImgArr.splice(index, 1)
      }
    })
  }
  console.log(currentInfos.checkImgArr)
}
const handleMainPageChange = (page: number) => {
  moreStore.getNowCategoryImgsAction(moreStore.firstCateId!, page, 10)
}
const open = () => {
  isShow.value = true
}
const close = () => {
  isShow.value = false
}
const handleExit = () => {
  isShow.value = false
}

//
defineExpose({ open, close })
</script>

<style lang="less" scoped>
.select-imgs {
  justify-content: flex-start;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  .contain {
    .header {
      font-size: 20px;
    }
    .asside {
      .item {
        padding: 15px 15px;
        .title {
          flex: 1;
          font-size: 14px;
        }
        .handle {
          width: 100px;
        }
      }
    }
    .main {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
      width: 1000px;
      .item {
        padding: 10px;
        box-sizing: border-box;
        width: 25%;
        height: 220px;
        .content {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          border: 1px solid rgb(217, 216, 216);
          .top {
            position: relative;
            img {
              width: 100%;
              height: 140px;
              object-fit: cover;
            }
            div {
              padding-left: 10px;
              align-items: flex-start;
              position: absolute;
              bottom: 0px;
              left: 0px;
              right: 0px;
              height: 30px;
              background-color: rgba(0, 0, 0, 0.5);
              color: #ffffff;
              font-size: 14px;
            }
          }
          .footer {
            padding: 0 20px;
            margin: auto 0;
            height: 50px;
            // background-color: gray;
            div {
              font-size: 14px;
            }
            input {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
    }
    .maintoggle {
    }
  }
}
</style>
