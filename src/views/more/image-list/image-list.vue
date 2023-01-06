<template>
  <div class="image-list" v-if="moreStore.imgList">
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
          :style="{ padding: '3px 5px 1px 5px', marginLeft: '7px' }"
          >上传图片</el-button
        >
      </template>
      <template #asside>
        <template v-for="(item, index) in moreStore.imgList" :key="index">
          <div
            class="menu-item dfb cp"
            @click="handleItemClick(index)"
            :class="{ active: currentIndex == index }"
          >
            <div class="title oc">{{ item.name }}</div>
            <div class="iconn dfa">
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
                  <el-icon class="cp" @click="handleClose"><Close /></el-icon>
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
        <div>1</div>
      </template>
    </layoutContain>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, getCurrentInstance } from 'vue'
import useMoreStore from '@/stores/more'
import { useMessage } from '@/utils/useMessage'
import { addImgCategory, updataImgCategory, delImgCategory } from '@/services/modules/more'
const layoutContain = defineAsyncComponent(() => import('@/components/layout-contain.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))

const instance = getCurrentInstance()
const moreStore = useMoreStore()
let currentPage = ref<number>(1)
moreStore.getImgListAction(currentPage.value)
const drawerRef1 = ref<any>()
const drawerEditRef = ref<any>()
const currentIndex = ref<number>(1)
const newImgName = ref<string>()
const newImgSort = ref<number>(1)
const ImgName = ref<string>()
const ImgSort = ref<number>()
const currentEditId = ref<number>()
let isFirstPage = ref<boolean>(true)
const confirmFlag = ref<boolean>(true)
const handlePrevPage = (currPage: number) => {
  currentPage.value = currPage
  moreStore.getImgListAction(currentPage.value)
}
const handNextPage = (currPage: number) => {
  currentPage.value = currPage
  moreStore.getImgListAction(currentPage.value)
}
const handleItemClick = (index: number) => {
  currentIndex.value = index
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
</script>

<style lang="less" scoped>
.image-list {
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
}
</style>
