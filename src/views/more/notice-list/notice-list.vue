<template>
  <div class="notice-list" ref="noticeRef">
    <div class="panel">
      <div class="header dfb">
        <drawerWrapper @confirm="handleConfirmNew" ref="drawerWrapperNewRef">
          <el-button type="primary" size="small" :style="{ paddingTop: '8px' }">新增</el-button>
          <template #main>
            <div class="main">
              <div>
                公告标题<input
                  class="notice-title"
                  type="text"
                  v-model="newNoticeInfo.noticeTitle"
                />
              </div>
              <!-- <div>公告内容<input class="notice-content" type="textare" /></div> -->
              <div>
                公告内容<textarea
                  v-model="newNoticeInfo.noticeContent"
                  name="content"
                  id=""
                  cols="30"
                  rows="10"
                  class="notice-content"
                ></textarea>
              </div>
            </div>
          </template>
        </drawerWrapper>
        <el-icon class="cp" @click="handleRefresh"><Refresh /></el-icon>
      </div>
      <!-- main -->
      <div class="main">
        <layoutTable>
          <layoutTableCol class="tab-col fontw" width="50%">
            <div class="title">公告标题</div>
            <template v-for="(item, index) in moreStore?.noticeInfos?.list" :key="item.id">
              <div class="content dfs hover-bg">{{ item.title }}</div>
            </template>
          </layoutTableCol>
          <layoutTableCol class="tab-col fontw" width="35%">
            <div class="title text-center">发布时间</div>
            <template v-for="(item, index) in moreStore?.noticeInfos?.list" :key="item.id">
              <div class="content hover-bg text-center">{{ item.create_time }}</div>
            </template>
          </layoutTableCol>
          <layoutTableCol class="tab-col fontw" width="130px">
            <div class="title text-center">操作</div>
            <template v-for="(item, index) in moreStore?.noticeInfos?.list" :key="item.id">
              <div class="content hover-bg dfa">
                <el-popconfirm title="是否要删除该公告?" @confirm="confirmDelNotice">
                  <template #reference>
                    <span class="del cp text-center" @click="handleDel(item)">删除</span>
                  </template>
                </el-popconfirm>
                <drawerWrapper @confirm="handleConfirmEdit(index)" ref="drawerWrapperRef">
                  <span class="edit cp text-center" @click="handleEdit(item)">修改</span>
                  <template #main>
                    <div class="main">
                      <div>
                        公告标题<input
                          class="notice-title"
                          type="text"
                          v-model="editNoticeInfo.noticeTitle"
                        />
                      </div>
                      <!-- <div>公告内容<input class="notice-content" type="textare" /></div> -->
                      <div>
                        公告内容<textarea
                          v-model="editNoticeInfo.noticeContent"
                          name="content"
                          id=""
                          cols="30"
                          rows="10"
                          class="notice-content"
                        ></textarea>
                      </div>
                    </div>
                  </template>
                </drawerWrapper>
              </div>
            </template>
          </layoutTableCol>
        </layoutTable>
      </div>
      <!-- pagination -->
      <div class="footer dfc">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="moreStore?.noticeInfos?.totalCount"
          v-model="noticeInfo.currentPage"
          @next-click="handleNext"
          @prev-click="handlePrev"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <!--  -->
    <div class="bottom dfc tc">
      芜湖起飞芜湖起飞芜湖起飞芜湖起飞芜湖起飞芜湖起飞芜湖起飞芜湖起飞
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, reactive } from 'vue'
import useMoreStore from '@/stores/more'
import { useMessage } from '@/utils/useMessage'
import { editNotice, newNotice, delNotice } from '@/services/modules/more'
const layoutTable = defineAsyncComponent(() => import('@/components/layout-table.vue'))
const layoutTableCol = defineAsyncComponent(() => import('@/components/layout-table-col.vue'))
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))

const moreStore = useMoreStore()
moreStore.getNoticeAction()
const noticeRef = ref<HTMLElement>()
const drawerWrapperRef = ref<any>()
const drawerWrapperNewRef = ref<any>()
// pagination
interface InoticeInfo {
  currentPage: number
  currentIndex: number | string
  currentItemInfo: any
}
interface IEditNoticeInfo {
  noticeTitle: string
  noticeContent: string
}
const noticeInfo = reactive<InoticeInfo>({
  currentPage: 1,
  currentIndex: '',
  currentItemInfo: '',
})
const newNoticeInfo = reactive<IEditNoticeInfo>({
  noticeTitle: '',
  noticeContent: '',
})
const editNoticeInfo = reactive<IEditNoticeInfo>({
  noticeTitle: '',
  noticeContent: '',
})
const handleRefresh = () => {
  moreStore.getNoticeAction()
}
const handlePageChange = (e: any) => {
  noticeInfo.currentPage = e
  moreStore.getNoticeAction(noticeInfo.currentPage)
  // console.log(noticeInfo.currentPage)
}
const handlePrev = (e: any) => {
  noticeInfo.currentPage = e
  moreStore.getNoticeAction(noticeInfo.currentPage)
  // console.log(noticeInfo.currentPage)
}
const handleNext = (e: any) => {
  noticeInfo.currentPage = e
  moreStore.getNoticeAction(noticeInfo.currentPage)
  // console.log(noticeInfo.currentPage)
}
// 删除修改
const handleDel = (item: any) => {
  noticeInfo.currentItemInfo = item
  // console.log(item)
}
const confirmDelNotice = () => {
  delNotice(noticeInfo.currentItemInfo.id)
    .then((res: any) => {
      useMessage('success', '删除成功')
      moreStore.getNoticeAction()
    })
    .catch(() => [useMessage('error', '删除失败')])
}
const handleEdit = (item: any) => {
  editNoticeInfo.noticeTitle = item.title
  editNoticeInfo.noticeContent = item.content
  noticeInfo.currentItemInfo = item
  // console.log(item)
}
const handleConfirmEdit = (index: number) => {
  if (editNoticeInfo.noticeTitle && editNoticeInfo.noticeContent) {
    editNotice(
      noticeInfo.currentItemInfo.id,
      editNoticeInfo.noticeTitle,
      editNoticeInfo.noticeContent,
    ).then(() => {
      useMessage('success', '修改成功!')
      moreStore.getNoticeAction()
      drawerWrapperRef.value[index].closeDrawer()
    })
    // console.log(editNoticeInfo.noticeTitle, editNoticeInfo.noticeContent)
  } else {
    useMessage('error', '内容不能为空!')
  }
}
// 新增
const handleConfirmNew = () => {
  if (newNoticeInfo.noticeTitle && newNoticeInfo.noticeContent) {
    newNotice(newNoticeInfo.noticeTitle, newNoticeInfo.noticeContent)
      .then((res: any) => {
        useMessage('success', '发布成功!')
        moreStore.getNoticeAction()
        drawerWrapperNewRef.value.closeDrawer()
        newNoticeInfo.noticeTitle = ''
        newNoticeInfo.noticeContent = ''
      })
      .catch(() => useMessage('errow', '发布失败!'))
  } else {
    useMessage('errow', '内容不能为空!')
  }
}
</script>

<style lang="less" scoped>
.notice-list {
  box-sizing: border-box;
  padding-right: 20px;
  margin-top: 20px;
  width: 100%;
  // background-color: #ffffff;
  .panel {
    padding: 20px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 3px;
    .header {
      .notice-title {
        &:focus {
          outline-color: skyblue;
        }
        margin-left: 15px;
        padding-left: 5px;
        height: 35px;
        width: 60%;
        border: 1px solid #bebebe;
        border-radius: 4px;
      }
      .notice-content {
        &:focus {
          outline-color: skyblue;
        }
        margin-top: 20px;
        margin-left: 15px;
        padding-left: 5px;
        // height: 35px;
        width: 60%;
        border: 1px solid #bebebe;
        border-radius: 4px;
      }
    }
    .main {
      box-sizing: border-box;
      margin-top: 25px;
      padding-left: 10px;
      width: 100%;
      .tab-col {
        .title {
          padding-bottom: 10px;
          padding-left: 10px;
          width: 100%;
          font-size: 16px;
          color: #939496;
          border-bottom: 1px solid #e3e3e3;
        }
        .content {
          padding: 10px 10px;
          width: 100%;
          font-size: 15px;
          color: var(--second-color);
          border-bottom: 1px solid #e3e3e3;
          .del {
            color: #409eff;
          }
          .edit {
            margin-left: 30px;
            color: #409eff;
          }
          .main {
            margin-top: 20px;
            .notice-title {
              &:focus {
                outline-color: skyblue;
              }
              margin-left: 15px;
              padding-left: 5px;
              height: 35px;
              width: 60%;
              border: 1px solid #bebebe;
              border-radius: 4px;
            }
            .notice-content {
              &:focus {
                outline-color: skyblue;
              }
              margin-top: 20px;
              margin-left: 15px;
              padding-left: 5px;
              // height: 35px;
              width: 60%;
              border: 1px solid #bebebe;
              border-radius: 4px;
            }
          }
        }
      }
    }
    .footer {
      margin-top: 20px;
      padding: 10px 0;
    }
  }
  .bottom {
    margin-top: 40px;
  }
}
</style>
