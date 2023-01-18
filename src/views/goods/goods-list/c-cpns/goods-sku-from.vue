<template>
  <div class="goods-sku-form">
    <el-form
      ref="ruleFormRef"
      :model="skuForm"
      status-icon
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="规格类型">
        <el-radio-group v-model="skuForm.sku_type">
          <el-radio :label="0" border>单规格</el-radio>
          <el-radio :label="1" border>多规格</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="市场价格" style="width: 400px">
        <el-input v-model.number="skuForm.oprice" placeholder="请输入市场价格">
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="销售价格" style="width: 400px">
        <el-input v-model.number="skuForm.pprice" placeholder="请输入销售价格">
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="成本价格" style="width: 400px">
        <el-input v-model.number="skuForm.cprice" placeholder="请输入成本价格">
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品重量" style="width: 400px">
        <el-input v-model.number="skuForm.weight" placeholder="请输入商品重量">
          <template #append>公斤</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品体积" style="width: 400px">
        <el-input
          v-model.number="skuForm.volume"
          placeholder="请输入商品体积"
          @change="handleFromChange"
        >
          <template #append>立方米</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'

const props = defineProps<{
  skuFromProps: ISkuForm
}>()
const emit = defineEmits(['change'])
// ref
const ruleFormRef = ref<FormInstance>()
// variable
interface ISkuForm {
  sku_type: number
  oprice: number
  pprice: number
  cprice: number
  weight: number
  volume: number
}
let skuForm = reactive<ISkuForm>({
  sku_type: 0,
  oprice: 0,
  pprice: 0,
  cprice: 0,
  weight: 0,
  volume: 0,
})
// hooks
const handleFromChange = () => {
  console.log(skuForm)
}
function resetForm() {
  skuForm.cprice = 0
  skuForm.oprice = 0
  skuForm.pprice = 0
  skuForm.sku_type = 0
  skuForm.volume = 0
  skuForm.weight = 0
}

//
watch(
  () => skuForm,
  () => {
    emit('change', skuForm)
  },
  {
    deep: true,
  },
)
watch(
  () => props.skuFromProps,
  () => {
    skuForm = props.skuFromProps
    console.log(props.skuFromProps)
  },
  {
    immediate: true,
    deep: true,
  },
)

defineExpose({ resetForm })
</script>

<style lang="less" scoped>
.goods-sku-form {
}
</style>
