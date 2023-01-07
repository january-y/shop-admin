<template>
  <div class="image-list" v-if="moreStore.imgList">
    <!-- 点击放大图片 -->
    <div class="big-img-box" v-show="isShowBigImg" @click="isShowBigImg = false">
      <img class="big-img" ref="bigImgRef" src="" />
      <div class="out" @click="isShowBigImg = false">×</div>
    </div>
    <layoutContain>
      <template #header>
        <!-- newImageCategroy -->
        <drawerWrapper @confirm="confirmNewCategory" title="新增" ref="drawerRef1">
          <!-- default -->
          <el-button size="small" type="primary" :style="{ padding: '2px 5px 0px 5px' }"
            >新增图片分类</el-button
          >
          <template #main>
            <div class="new-category">
              <div class="imgname sc dfs">
                <div class="title">相册名称</div>
                <input type="text" class="input oc" v-model="newImgName" ref="inputRef" />
              </div>
              <div class="sort sc dfs">
                <div class="title">排序</div>
                <el-input-number
                  class="input"
                  v-model.number="newImgSort"
                  :min="1"
                  :max="9999"
                  @change=""
                />
              </div>
            </div>
          </template>
        </drawerWrapper>
        <el-button
          size="small"
          type="warning"
          ref="uploadBtnRef"
          @click="handleOpenUpload"
          :style="{ padding: '3px 5px 1px 5px', marginLeft: '7px' }"
          >上传图片</el-button
        >
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref="upLoadInputRef"
          @change="inputChangeFn"
          :style="{ display: 'none' }"
        />
      </template>
      <template #asside>
        <template v-for="(item, index) in moreStore.imgList" :key="index">
          <div
            class="menu-item dfb cp"
            @click="handleItemClick(index, item)"
            :class="{ active: currentIndex == index }"
          >
            <div class="title oc">{{ item.name }}</div>
            <div class="iconn dfa" @click.stop="() => {}">
              <drawerWrapper @confirm="confirmEdit" title="修改" ref="drawerEditRef">
                <!-- default -->
                <el-icon class="cp" @click="handleEdit(item.id)"><Edit /></el-icon>
                <template #main>
                  <div class="imgname sc dfs">
                    <div class="title">相册名称</div>
                    <input
                      type="text"
                      class="input oc"
                      :value="item.name"
                      @input="updataImgName"
                      ref="inputRef"
                      @blur.trim="handleInputVali"
                    />
                  </div>
                  <div class="sort sc dfs">
                    <div class="title">排序</div>
                    <el-input-number
                      class="input"
                      :modelValue="item.order"
                      @update:modelValue="updataImgSort"
                      ref="sortRef"
                      :min="1"
                      :max="9999"
                      @change=""
                    />
                  </div>
                </template>
              </drawerWrapper>
              <el-popconfirm
                title="是否要删除改分类?"
                @confirm="confirmDel(item.id)"
                @cancel="cancelDel"
              >
                <template #reference>
                  <el-icon class="cp" @click.stop="handleClose"><Close /></el-icon>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </template>
      <template #astoggle>
        <div class="dfb">
          <el-pagination
            background
            layout="prev,next"
            :total="moreStore.assideTotalPage"
            v-model="currentPage"
            @next-click="handNextPage"
            @prev-click="handlePrevPage"
          />
        </div>
      </template>
      <template #main>
        <div class="main">
          <layoutRow>
            <template v-for="(item, index) in currentCateImgs" :key="index">
              <layoutCol col-width="25%">
                <div class="item boxs">
                  <div class="img">
                    <img :src="item.url" alt="" class="cp" @click="currentImgClick(item.url)" />
                    <div class="path">{{ item.name }}</div>
                  </div>
                  <div class="tool">
                    <div class="cp" @click="handleRename(item)">重命名</div>
                    <el-popconfirm title="是否要删除改图片?" @confirm="confirmDelImg">
                      <template #reference>
                        <div class="del cp" @click="handleDelImg(item.id)">删除</div>
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
              </layoutCol>
            </template>
          </layoutRow>
        </div>
      </template>
      <template #maintoggle>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="currentCateTotla"
          v-model="currentCatePage"
          @next-click="currentCateNext"
          @prev-click="currentCatePrev"
          @current-change="currentCatePageChange"
        />
      </template>
    </layoutContain>
    <dialogVue
      ref="dialogRef"
      @confirm-fn="RenameConfirm"
      tip-text=""
      :show-input="true"
      tip-title="重命名"
      :inputBind="currentItemName"
      ><span></span
    ></dialogVue>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, getCurrentInstance, reactive, watch } from 'vue'
import useMoreStore from '@/stores/more'
import { useMessage } from '@/utils/useMessage'
import {
  addImgCategory,
  updataImgCategory,
  delImgCategory,
  getNowCategoryImgs,
  editImgName,
  delImg,
  uploadImg,
} from '@/services/modules/more'
import { useReadFilePath } from '@/hooks/useReadFilePath'
const layoutContain = defineAsyncComponent(() => import('@/components/layout-contain.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const layoutRow = defineAsyncComponent(() => import('@/components/layout-row.vue'))
const layoutCol = defineAsyncComponent(() => import('@/components/layout-col.vue'))
const dialogVue = defineAsyncComponent(() => import('@/components/dialog.vue'))

const instance = getCurrentInstance()
const moreStore = useMoreStore()
const currentCateInfo = reactive<any>({
  id: '',
})
// 当前分裂图片列表
let currentPage = ref<number>(1)
let currentCateImgs = ref<any>()
let currentCateTotla = ref<number>()
const currentCateClassId = ref<number>()
const dialogRef = ref<any>()
moreStore.getImgListAction(currentPage.value)
const currentCatePage = ref<number>()
const drawerRef1 = ref<any>()
const drawerEditRef = ref<any>()
const currentIndex = ref<number>(0)
const newImgName = ref<string>()
const newImgSort = ref<number>(1)
const ImgName = ref<string>()
const ImgSort = ref<number>()
const currentEditId = ref<number>()
let delImgId = ref<number>()
// let isFirstPage = ref<boolean>(true)
const confirmFlag = ref<boolean>(true)
const isShowBigImg = ref<boolean>(false)
const bigImgRef = ref<HTMLImageElement>()
let currentItemName = ref<number | string>()
let currentImgItemId = ref<number>()
// 上传
const upLoadInputRef = ref<any>()
const uploadBtnRef = ref<any>()
const handleRename = (item: any) => {
  // console.log(item)
  currentItemName.value = item.name
  currentImgItemId.value = item.id
  dialogRef.value.open()
}
const RenameConfirm = (inputValue: any) => {
  // console.log(inputValue, currentImgItemId.value)
  // console.log('修改成功')
  editImgName(currentImgItemId.value!, inputValue).then((res: any) => {
    useMessage('success', '修改成功')
    getNowCategoryImgs(currentCateInfo.id, 1, 10).then((res: any) => {
      currentCateImgs.value = res.data.list
      currentCateTotla.value = res.data.totalCount
      currentCateClassId.value = res.data.list[0].image_class_id
    })
  })
}
const handleDelImg = (id: number) => {
  delImgId.value = id
  // console.log(id)
}
const confirmDelImg = () => {
  delImg([delImgId.value!]).then((res: any) => {
    useMessage('success', '由于改数据用于课程演示,故不可删除')
  })
}
const currentImgClick = (imgUrl: string) => {
  bigImgRef.value!.src = imgUrl
  isShowBigImg.value = true
}
const handlePrevPage = (currPage: number) => {
  currentPage.value = currPage
  moreStore.getImgListAction(currentPage.value)
}
const handNextPage = (currPage: number) => {
  currentPage.value = currPage
  moreStore.getImgListAction(currentPage.value)
}
const currentCatePrev = (e: number) => {
  currentCatePage.value = e
  getNowCategoryImgs(currentCateInfo.id, currentCatePage.value, 10).then((res: any) => {
    currentCateImgs.value = res.data.list
    currentCateTotla.value = res.data.totalCount
    currentCateClassId.value = res.data.list[0].image_class_id
  })
}
const currentCateNext = (e: number) => {
  currentCatePage.value = e
  getNowCategoryImgs(currentCateInfo.id, currentCatePage.value, 10).then((res: any) => {
    currentCateImgs.value = res.data.list
    currentCateTotla.value = res.data.totalCount
    currentCateClassId.value = res.data.list[0].image_class_id
  })
}
const currentCatePageChange = (e: number) => {
  getNowCategoryImgs(currentCateInfo.id, e, 10).then((res: any) => {
    currentCateImgs.value = res.data.list
    currentCateTotla.value = res.data.totalCount
    currentCateClassId.value = res.data.list[0].image_class_id
  })
}
const handleItemClick = (index: number, item: any) => {
  currentIndex.value = index
  // 获取相关分类图片列表
  currentCateInfo.id = item.id
  getNowCategoryImgs(item.id, 1, 10).then((res: any) => {
    currentCateImgs.value = res.data.list
    currentCateTotla.value = res.data.totalCount
    currentCateClassId.value = res.data.list[0].image_class_id
  })
}
const handleEdit = (id: number) => {
  currentEditId.value = id
  console.log('edit')
}
const handleClose = () => {
  console.log('close')
}
const confirmDel = (id: number) => {
  delImgCategory(id)
  moreStore.getImgListAction(currentPage.value)
  useMessage('success', '删除成功')
  console.log('confirmDel')
}
const cancelDel = () => {
  console.log('cancelDel')
}
const confirmNewCategory = () => {
  if (newImgName.value && newImgSort.value) {
    addImgCategory(newImgName.value, newImgSort.value).then((res: any) => {
      moreStore.getImgListAction(1)
      useMessage('success', '新增成功')
      drawerRef1.value.closeDrawer()
    })
  } else {
    console.log('新增失败')
    useMessage('error', '相册名称或序号不能为空!')
  }
}
const confirmEdit = () => {
  if (confirmFlag.value) {
    if (ImgName.value || ImgSort.value) {
      updataImgCategory(currentEditId.value!, ImgName.value!, ImgSort.value!).then((res: any) => {
        moreStore.getImgListAction(currentPage.value)
        useMessage('success', '修改成功')
        instance?.proxy?.$mitt.emit('close-drawer')
      })
    } else {
      useMessage('error', '未检测到修改')
    }
  } else {
    // useMessage('error', '相册名称或序号不能为空!')
  }
}

//
const handleInputVali = (e: any) => {
  if (e.target.value == '') {
    confirmFlag.value = false
    useMessage('error', '相册名称不能为空!')
  } else {
    confirmFlag.value = true
  }
}
const updataImgName = (e: any) => {
  ImgName.value = e.target.value
}
const updataImgSort = (e: any) => {
  ImgSort.value = e
}
// 上传
const handleOpenUpload = () => {
  upLoadInputRef.value.click()
}
const inputChangeFn = (e: any) => {
  useReadFilePath(e.target.files[0]).then((res: any) => {
    // console.log(res)
    uploadImg(currentCateClassId.value!, [res]).then((res: any) => {
      console.log(res)
    })
  })
}

// hooks
watch(
  () => moreStore.firstCateId,
  () => {
    getNowCategoryImgs(moreStore.firstCateId!, 1, 10).then((res: any) => {
      currentCateImgs.value = res.data.list
      currentCateTotla.value = res.data.totalCount
      currentCateInfo.id = moreStore.imgList[0].id
      currentCateClassId.value = res.data.list[0].image_class_id
    })
  },
  {
    immediate: true,
  },
)
</script>

<style lang="less" scoped>
.image-list {
  // position: relative;
  .menu-item {
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
    &:hover {
      background-color: #eff6ff;
    }
    .title {
      width: 130px;
      font-size: 14px;
      // border: 1px solid red;
    }
    .iconn {
      flex: 1;
      color: #409eff;
      .imgname {
        margin-top: 30px;
        .title {
          width: 70px;
          text-align: right;
        }
        .input {
          // flex: 1;
          height: 25px;
          width: calc(100% - 60px);
          padding-left: 6px;
          border: 1px solid #cccccc;
          border-radius: 3px;
          margin-left: 12px;
          &:focus {
            outline-color: #5fabf8;
          }
        }
      }
      .sort {
        margin-top: 20px;
        .title {
          width: 70px;
          text-align: right;
        }
        .input {
          // flex: 1;
          // border: 1px solid red;
          margin-left: 12px;
        }
      }
    }
  }
  .active {
    background-color: #eff6ff !important;
  }
  .new-category {
    .imgname {
      margin-top: 30px;
      .title {
        width: 70px;
        text-align: right;
      }
      .input {
        // flex: 1;
        height: 25px;
        width: calc(100% - 60px);
        padding-left: 6px;
        border: 1px solid #cccccc;
        border-radius: 3px;
        margin-left: 12px;
        &:focus {
          outline-color: #5fabf8;
        }
      }
    }
    .sort {
      margin-top: 20px;
      .title {
        width: 70px;
        text-align: right;
      }
      .input {
        // flex: 1;
        // border: 1px solid red;
        margin-left: 12px;
      }
    }
  }
  .main {
    box-sizing: border-box;
    width: 100%;
    .item {
      padding: 10px;

      overflow: hidden;
      .img {
        position: relative;
        img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }
        .path {
          position: absolute;
          bottom: 5px;
          left: 5px;
          font-size: 13px;
          color: #ffffff;
        }
      }
      .tool {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        font-size: 13px;
        border: 1px solid #eeeeee;
        color: #2d92f7;
        .del {
          margin-left: 20px;
        }
      }
    }
  }
  .big-img-box {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100 vh;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    .big-img {
      margin: 30px auto;
      width: 80vw;
      height: 90vh;
      object-fit: cover;
    }
    .out {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 90px;
      cursor: pointer;
      color: #888888;
    }
  }
}
</style>
