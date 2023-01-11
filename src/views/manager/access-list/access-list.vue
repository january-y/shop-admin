<template>
  <div class="access-list bgc-fff">
    <div class="menus">
      <div class="header dfb">
        <el-button type="primary" size="small" @click="handleNewRule" class="pd-8">新增</el-button>
        <el-icon class="cp" @click="handleRefresh"><Refresh /></el-icon>
      </div>
      <div class="main">
        <el-tree :data="dataSource" :props="defaultProps" node-key="id">
          <template #default="{ node, data }">
            <div class="item dfb">
              <div class="title dfa">
                <el-button :type="data.menu ? 'primary' : 'info'" plain size="small">{{
                  data.menu ? '菜单' : '权限'
                }}</el-button>
                <el-icon v-if="data.icon">
                  <component :is="data.icon"></component>
                </el-icon>
                <div>{{ node.label }}</div>
              </div>
              <div class="handle dfa">
                <el-switch :modelValue="true" />
                <div class="fontc" @click="handleEditRule(node, data)">修改</div>
                <div class="fontc" @click="handleAddRule(node, data)">增加</div>
                <el-popconfirm title="是否要删除?" @confirm="confirmDel">
                  <template #reference>
                    <div class="fontc" @click="handleDelRule(node, data)">删除</div>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-tree>
        <!-- 抽屉 -->
        <drawer-wrapper
          ref="drawerRef"
          :title="drawerFormInfo.handleTitle"
          @confirm="ConfirmNewEdit"
          @drawer-close="onDrawerClose"
        >
          <template #default>
            <span></span>
          </template>
          <template #main>
            <div class="form">
              <inputWrappter title="上级菜单" title-width="80px">
                <el-cascader
                  v-model="drawerFormInfo.parentMenu"
                  :options="options"
                  :props="caprops"
                />
              </inputWrappter>
              <inputWrappter title="菜单/规则" title-width="80px">
                <el-radio-group v-model="drawerFormInfo.menuOrRule">
                  <el-radio label="1" border>菜单</el-radio>
                  <el-radio label="2" border>规则</el-radio>
                </el-radio-group>
              </inputWrappter>
              <inputWrappter title="名称" title-width="80px">
                <input
                  type="text"
                  class="name focus-c"
                  placeholder="名称"
                  v-model="drawerFormInfo.name"
                />
              </inputWrappter>
              <inputWrappter
                class="dfs"
                title="菜单图标"
                title-width="80px"
                v-if="drawerFormInfo.menuOrRule == '1'"
              >
                <template #icon>
                  <div :style="{ width: '20px', height: '20px' }" v-if="currentIcon">
                    <component :is="currentIcon"></component>
                  </div>
                </template>
                <el-select
                  class="select-icon"
                  v-model="drawerFormInfo.icon"
                  filterable
                  placeholder="Select"
                  @change="handleSelectChange"
                >
                  <el-option
                    v-for="item in iconArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </inputWrappter>
              <inputWrappter
                title="后端规则"
                title-width="80px"
                v-if="drawerFormInfo.menuOrRule == '2'"
              >
                <input
                  type="text"
                  class="backend focus-c"
                  placeholder="后端规则"
                  v-model="drawerFormInfo.backEnd"
                />
              </inputWrappter>
              <inputWrappter
                title="请求方式"
                title-width="80px"
                v-if="drawerFormInfo.menuOrRule == '2'"
              >
                <select name="qifei" class="method cp" v-model="drawerFormInfo.method">
                  <option value="--请选择--">--请选择--</option>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </inputWrappter>
              <inputWrappter
                title="前端路由"
                title-width="80px"
                v-if="drawerFormInfo.handleTitle == '增加' && drawerFormInfo.menuOrRule == '1'"
              >
                <input
                  type="text"
                  class="path focus-c"
                  placeholder="前端路由path"
                  v-model="currentItemInfo.frontpath"
                />
              </inputWrappter>
              <inputWrappter title="排序" title-width="80px">
                <el-input-number
                  v-model="drawerFormInfo.sort"
                  :min="1"
                  :max="100000"
                  @change="handleChange"
                />
              </inputWrappter>
            </div>
          </template>
        </drawer-wrapper>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, reactive, watch } from 'vue'
import useManagerStore from '@/stores/manager'
import { getMenuRules, getMagagerList, addMenuRules } from '@/services/modules/manager'
import { useMessage } from '@/utils/useMessage'
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))
const inputWrappter = defineAsyncComponent(() => import('@/components/inputWrapper.vue'))

const managerStore = useManagerStore()
const getData = () => {
  getMenuRules().then((res: any) => {
    managerStore.menuRuleInfos = res.data
    useRenderTree(res.data.list)
  })
}
getData()
// ref
const drawerRef = ref<any>()
// 变量
interface IDrawerFormInfo {
  handleTitle: string
  parentMenu: any
  menuOrRule: string
  name: string | number
  icon: string
  backEnd: any
  method: string
  sort: number
}
interface ICurrentItemInfos {
  item: any
  currentNewRuleId: number
  currentNewMenu: number
  currentNewStatus: number
  frontpath: string
}
const defaultProps = {
  children: 'child',
  label: 'name',
}
let dataSource = ref<any>([])
let drawerFormInfo = reactive<IDrawerFormInfo>({
  handleTitle: '新增',
  parentMenu: '--请选择--',
  menuOrRule: '2',
  name: '',
  icon: 'help',
  backEnd: '',
  method: 'GET',
  sort: 1,
})
const currentItemInfo = reactive<ICurrentItemInfos>({
  item: '',
  currentNewMenu: 0,
  currentNewRuleId: 0,
  currentNewStatus: 1,
  frontpath: '',
})
let currentIcon = ref<any>('help')
let iconArr: any = []
const elIcons = JSON.parse(localStorage.getItem('elIcons')!)
for (let i in elIcons) {
  iconArr.push({
    label: elIcons[i],
    value: elIcons[i],
  })
}
const caprops = {
  expandTrigger: 'hover' as const,
}
let options = ref<any>([])
// hooks
const useResetForm = () => {
  drawerFormInfo.parentMenu = '--请选择--'
  drawerFormInfo.menuOrRule = '2'
  drawerFormInfo.name = ''
  drawerFormInfo.icon = 'help'
  drawerFormInfo.backEnd = ''
  drawerFormInfo.method = 'GET'
  drawerFormInfo.sort = 1
  currentItemInfo.frontpath = ''
}
const useRenderOptions = (infoArr: any) => {
  options.value = []
  let resArr: any = []
  infoArr.forEach((item: any, index: number) => {
    resArr.push({ value: item.name, label: item.name, children: [] })
    item.child.length >= 1 &&
      item.child.forEach((item2: any, index2: number) => [
        resArr[index].children.push({ value: item2.name, label: item2.name, children: [] }),
      ])
  })
  options.value = resArr
}
const useRenderTree = (infoArr: any) => {
  let treeData: any = []
  infoArr.forEach((item: any) => {
    treeData.push(item)
  })
  dataSource.value = treeData
}
const handleRefresh = () => {
  getData()
}
const handleNewRule = () => {
  useRenderOptions(managerStore?.menuRuleInfos?.list)
  drawerFormInfo.menuOrRule = '2'
  drawerFormInfo.handleTitle = '新增'
  drawerRef.value.open()
}
const handleChange = (e: number) => {
  drawerFormInfo.sort = e
}
const ConfirmNewEdit = () => {
  // 新增
  drawerFormInfo.handleTitle == '新增' &&
    addMenuRules(
      currentItemInfo.currentNewRuleId,
      currentItemInfo.currentNewMenu,
      drawerFormInfo.name,
      drawerFormInfo.method,
      currentItemInfo.currentNewStatus,
      drawerFormInfo.sort,
      drawerFormInfo.icon,
      currentItemInfo.frontpath,
      drawerFormInfo.backEnd,
    )
      .then((res: any) => {
        useMessage('success', '添加成功')
      })
      .finally(() => {
        useMessage('error', '添加失败')
      })

  console.log('confirmHandle')
}
const handleSelectChange = (e: any) => {
  currentIcon.value = e
}
const handleAddRule = (node: any, data: any) => {
  currentItemInfo.item = data
  drawerFormInfo.handleTitle = '增加'
  drawerFormInfo.menuOrRule = '2'
  drawerRef.value.open()
}
const handleDelRule = (node: any, data: any) => {
  currentItemInfo.item = data
}
const handleEditRule = (node: any, data: any) => {
  currentItemInfo.item = data
  drawerFormInfo.handleTitle = '修改'
  drawerFormInfo.menuOrRule = '1'
  drawerFormInfo.backEnd = data.condition
  drawerFormInfo.icon = data.icon
  currentIcon.value = data.icon
  drawerFormInfo.method = data.method
  drawerFormInfo.name = data.name
  if (node.parent.parent?.data.name) {
    drawerFormInfo.parentMenu = [node.parent.parent.data.name, node.parent.data.name]
  } else {
    drawerFormInfo.parentMenu = node.data.name
  }

  drawerFormInfo.sort = data.order
  useRenderOptions(managerStore.menuRuleInfos.list)
  drawerRef.value.open()
}
const onDrawerClose = () => {
  useResetForm()
}
const confirmDel = () => {
  console.log('confirmDel')
}

//
watch(
  () => drawerFormInfo.parentMenu,
  () => {
    let menu: any = ''
    let resRoleId: any = ''
    if (drawerFormInfo.parentMenu.length > 2) {
      menu = ['', drawerFormInfo.parentMenu]
    } else {
      menu = drawerFormInfo.parentMenu
    }

    function getRuleId(arr: any) {
      arr.forEach((item: any) => {
        if (item.name == menu[1]) {
          resRoleId = item.rule_id
          currentItemInfo.currentNewMenu = item.menu
          currentItemInfo.currentNewStatus = item.status
        }
        item.child && getRuleId(item.child)
      })
    }
    getRuleId(managerStore?.menuRuleInfos?.list)
    currentItemInfo.currentNewRuleId = resRoleId
  },
)
</script>

<style lang="less" scoped>
.access-list {
  margin-top: 20px;
  margin-right: 20px;
  padding: 0 20px;
  border-radius: 5px;
  .menus {
    .header {
      padding: 20px 0;
      padding-right: 10px;
    }
    .main {
      padding-bottom: 30px;
      .item {
        flex: 1;
        .title {
          font-size: 16px;
          width: 130px;
          :deep(.el-button--small) {
            padding: 3px 4px;
            padding-top: 5px;
            --el-button-size: 20px !important;
          }
        }
        .handle {
          width: 250px;
        }
      }
      :deep(.el-tree-node__content) {
        height: 33px !important;
      }
      .form {
        .parentMenu {
          border: 1px solid #c4c4c4;
          width: 250px;
          height: 30px;
          border-radius: 5px;
        }
        .name {
          height: 30px;
          width: 250px;
        }
        .backend {
          height: 30px;
          width: 250px;
        }
        .method {
          border: 1px solid #c4c4c4;
          width: 250px;
          height: 30px;
          border-radius: 5px;
        }
        .select-icon {
          margin-left: 10px;
        }
        .path {
          border: 1px solid #c4c4c4;
          width: 250px;
          height: 30px;
          border-radius: 5px;
        }
      }
    }
  }
  .footer {
  }
}
</style>
