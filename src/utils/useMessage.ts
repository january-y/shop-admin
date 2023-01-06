import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export const useMessage = (type: string = 'error', text: string = '请输入提示信息') => {
  if (type == 'success') {
    ElMessage.success(text)
  } else if (type == 'error') {
    ElMessage.error(text)
  } else {
    ElMessage.warning(text)
  }
}
