<template>
  <div class="skus-list bgc-fff">
    <div class="header dfb">
      <div class="left">
        <drawer-wrapper ref="drawerRef" @drawer-close="handleDrawerClose" @confirm="confirmNewEdit">
          <span></span>
          <template #main>
            <div class="form">
              <el-form
                ref="ruleFormRef"
                :model="drawerForm"
                status-icon
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item label="规格名称" prop="name">
                  <el-input v-model="drawerForm.name" type="text" />
                </el-form-item>
                <el-form-item label="排序" prop="order">
                  <el-input-number v-model="drawerForm.order" :min="1" :max="100000" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="drawerForm.status" />
                </el-form-item>
                <el-form-item label="规格值" prop="skus">
                  <el-tag
                    v-for="tag in drawerForm.skus"
                    :key="tag"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="drawerForm.inputValue"
                    class="ml-1 w-20"
                    size="small"
                    @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm"
                  />
                  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                    + New Tag
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </drawer-wrapper>
        <el-button type="primary" size="small" @click="handleNew">新增</el-button>
        <el-popconfirm title="是否要删除选中项?" @confirm="handleDelMuch">
          <template #reference>
            <el-button type="danger" size="small" @click="handleMuchDel">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="right">
        <el-icon><Refresh class="cp" @click="handleRefresh" /></el-icon>
      </div>
    </div>
    <div class="main">
      <el-table
        ref="tableRef"
        :data="skuStore?.skuInfos?.list"
        style="width: 100%"
        size="large"
        highlight-current-row
        v-if="skuStore?.skuInfos?.list"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" width="180" />
        <el-table-column prop="default" label="规格值" width="250" />
        <el-table-column prop="order" label="排序" width="180" />
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              :modelValue="scope.row.status ? true : false"
              @change="handleChangeSkuStatus($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="" width="80">
          <template #default="scope">
            <div class="cp fontc" @click="handleEdit(scope.row)">修改</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-popconfirm title="是否要删除选中项?" @confirm="handleDelOne(scope.row.id)">
              <template #reference>
                <div class="cp fontc" @click="handleDel(scope.row)">删除</div>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import useSkuStore from '@/stores/skus'
import { useRouter } from 'vue-router'
import 'element-plus/dist/index.css'
import { addSkus, delMuchSkus, editSKuStatus, editSKusInfo } from '@/services/modules/skus'
import { useMessage } from '@/utils/useMessage'
const drawerWrapper = defineAsyncComponent(() => import('@/components/drawer-wrapper.vue'))

const skuStore = useSkuStore()
skuStore.getSkuListAction()
const router = useRouter()
// ref
const tableRef = ref<any>()
const drawerRef = ref<any>()
const ruleFormRef = ref<any>()
const InputRef = ref<any>()
// variable
interface IDrawerForm {
  status: boolean
  name: string
  order: number
  skus: any
  inputValue: string | number
}
interface ICurrentItemInfo {
  item: any
  selects: any
  currentHandle: string
}
const drawerForm = reactive<IDrawerForm>({
  status: true,
  name: '',
  order: 1,
  skus: [],
  inputValue: '',
})
const currentItemInfo = reactive<ICurrentItemInfo>({
  item: null,
  selects: null,
  currentHandle: '',
})
const rules = reactive({
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
  order: [{ validator: validateOrder, trigger: 'blur' }],
  skus: [{ required: true, validator: validateSkus, trigger: 'blur' }],
})
let inputVisible = ref<boolean>(false)
// hooks
function ResetForm() {
  drawerForm.name = ''
  drawerForm.order = 1
  drawerForm.skus = []
  drawerForm.status = true
  drawerForm.inputValue = ''
}
function getData() {
  skuStore.getSkuListAction()
}
function validateName(rule: any, value: any, callback: any) {
  if (value == '') {
    callback(new Error('请输入规则名称'))
  } else {
    callback()
  }
}
function validateOrder(rule: any, value: any, callback: any) {
  if (value == '' || value == null) {
    callback(new Error('排序号不能为空'))
  } else {
    callback()
  }
}
function validateSkus(rule: any, value: any, callback: any) {
  if (value.length == 0) {
    callback(new Error('规格不能为空'))
  } else {
    callback()
  }
}
const handleClose = (tag: string) => {
  drawerForm.skus.splice(drawerForm.skus.indexOf(tag), 1)
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (drawerForm.inputValue) {
    drawerForm.skus.push(drawerForm.inputValue)
  }
  inputVisible.value = false
  drawerForm.inputValue = ''
}
const handleDrawerClose = () => {
  ResetForm()
  ruleFormRef.value.resetFields()
}
const handleNew = () => {
  currentItemInfo.currentHandle = '新增'
  drawerRef.value.open()
  console.log('handleNew')
}
const handleMuchDel = () => {
  currentItemInfo.selects = tableRef.value.getSelectionRows()
  console.log('handleMuchDel')
}
const handleRefresh = () => {
  getData()
  console.log('handleRefresh')
}
const handleEdit = (e: any) => {
  currentItemInfo.currentHandle = '修改'
  currentItemInfo.item = e
  drawerForm.name = e.name
  drawerForm.order = e.order
  let arr = e.default.split(',')
  arr.forEach((item: any) => drawerForm.skus.push(item))
  drawerForm.status = e.status ? true : false
  drawerRef.value.open()
}
const handleDel = (e: any) => {
  currentItemInfo.item = e
}
const confirmNewEdit = () => {
  currentItemInfo.currentHandle == '新增' &&
    ruleFormRef.value.validate((validateRes: boolean) => {
      validateRes &&
        addSkus(drawerForm.status ? 1 : 0, drawerForm.name, drawerForm.order, drawerForm.skus)
          .then((res: any) => {
            useMessage('success', '新增成功')
            getData()
            drawerRef.value.close()
          })
          .catch(() => useMessage('error', '新增失败'))
    })
  //
  currentItemInfo.currentHandle == '修改' &&
    editSKusInfo(
      currentItemInfo.item.id,
      drawerForm.status ? 1 : 0,
      drawerForm.name,
      drawerForm.order,
      drawerForm.skus,
    )
      .then((res: any) => {
        useMessage('success', '修改成功')
        getData()
        drawerRef.value.close()
      })
      .catch(() => useMessage('error', '修改失败'))
}
const handleDelMuch = () => {
  let ids: any = []
  currentItemInfo.selects.forEach((item: any) => {
    ids.push(item.id)
  })
  delMuchSkus(ids)
    .then((res: any) => {
      useMessage('success', '删除成功')
      getData()
    })
    .catch(() => useMessage('error', '删除失败'))
}
const handleChangeSkuStatus = (e: boolean, item: any) => {
  editSKuStatus(item.id, e ? 1 : 0)
    .then((res: any) => {
      useMessage('success', '修改成功')
      getData()
    })
    .catch(() => useMessage('error', '修改失败'))
}
const handleDelOne = (id: number) => {
  delMuchSkus([id])
    .then((res: any) => {
      useMessage('success', '删除成功')
      getData()
    })
    .catch(() => useMessage('error', '删除失败'))
}
</script>

<style lang="less" scoped>
.skus-list {
  margin-right: 20px;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  .header {
    .left {
      .form {
        margin-top: 20px;
        margin-left: -50px;
      }
    }
    .right {
    }
  }
  .main {
    margin-top: 20px;
    width: 100%;
  }
  .pagination {
  }
}
</style>
