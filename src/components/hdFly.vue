<template>
  <div class="hd-fly">
    <h2>红洞fly------</h2>
    <div class="box dfa">
      <div class="cp" @click="handleHongdong1" ref="startRef">红洞start1</div>
      <div class="cp" @click="handleHongdong1End">红洞end1</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { hdRequest } from '@/services'

const props = defineProps<{
  token: any
  name: any
}>()
const startRef = ref<HTMLElement>()
let maxInterval: any = null
let interval: any = null
const token =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiIxODMyMjk2NzgyOCIsInJlYWxfbmFtZSI6IueOi-aMr-mbhCIsImF2YXRhciI6Imh0dHBzOi8vaHJ5LWh5cGVyY2hhaW4tcHVibGljLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS9maWxlL2M4MWYyNDIwLTk1NDktNDFlYS1hNmYzLTYwMmQ5OTcxNWU0MC53ZWJwIiwiY2xpZW50X2lkIjoiYXBwIiwicm9sZV9uYW1lIjoiIiwibGljZW5zZSI6InBvd2VyZWQgYnkgYmxhZGV4IiwicG9zdF9pZCI6IiIsInVzZXJfaWQiOiIxMDE4NjYiLCJyb2xlX2lkIjoiIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IuaVsOWtl-a0nuiXj-WutiIsIm9hdXRoX2lkIjoiIiwiZGV0YWlsIjp7InR5cGUiOiJhcHAiLCJnb29nbGVLZXkiOm51bGwsImNpdHkiOm51bGwsImlkQ2FyZE5vIjoiMzYyNTMxMjAwMjEyMjcwMzM5IiwiY291bnR5IjpudWxsLCJyZWZlcnJhbE51bWJlciI6MCwiYmxvY2tjaGFpbkVuY3J5cHREYXRhIjoiVXZ1a3NNU1I3a2tEY1VORDduT01qVTVOS2JFZmoycVYxVzVKdFpGN294QXVVOEs3UkJHRFU0eUZzMUpzZSsrYlpQeHVVSmhsRW4rd3N1amszcmNLZkxoNDRrR2hoRzhhcjlQTUdzcmJXSU50d3hDem8rbnAvQW5uNGRoR3Y0QUxuVlNBYytBVk5YLzlVSXphckhaQmRVL2MrZWRUZzNIWUkza3VyZm5qdGtwVExDQTM0M3A2Umx6L0pzd2o4ZW9pLzBBcUhLdm1wRGdyQXo3WnJiRmQzYXJ6Y3R6ZkNyMzkwM3dPeUFLTkk3SUxWcmg1L1pOSmkwUjRUaHpkaWFkZVBGeXhldFo2T3dDT0RZbjFmMW1BWWN2b0VHTHpsM1dad214TGx0azFoS0huRmxiY1NVeTVUQ0dmWkt2Y0I5RU5JYW91T0NVdEpVNytqdFhqc0tVQUh6WUNFSWlYZFZvOHNMRUUxZGVGdmxYRForcnNRNlNSN2Q3dkdKMTJzYzlWRHA0bytYSllTWmErMVo0RlR6WTM0N2V5ZURQcjZIbGkzbGpIMWMxV2crbmFQcTRISUJtYTlrNHpvVGFRWm02REd0YkVHU1EvR2NINGN6V3VmRkxwYTB2VGMxcXdacFdTeWpTMUJCWEhPcEh3cVRVcWVXVGorUT09IiwidWtleU5vIjpudWxsLCJjdXN0b21lclR5cGUiOm51bGwsImlkZW50aWZpY2F0aW9uIjpudWxsLCJwcm92aW5jZSI6bnVsbCwiaGVhZFBvcnRyYWl0U3RhdGUiOjEsImludGVncmFsIjozMiwicmVmZXJyYWxDb2RlIjoiY01NUDIybmY3cSIsInNpZ25BdXRob3JpemF0aW9uVXJsIjpudWxsLCJpZCI6bnVsbCwidWtleVN0YXRlIjpudWxsLCJjaGFubmVsQ29kZSI6bnVsbCwiYmluZENhcmRTdGF0dXMiOjEsImFkZHJlc3MiOm51bGwsInNhbHQiOm51bGwsImNvbW1lbmRDb2RlIjoicmtwTzBKN2ExVyIsImhlYWRQb3J0cmFpdFJlbWFyayI6bnVsbCwid2VjaGF0QXV0aExvZ2luIjpudWxsLCJyZWdTb3VyY2UiOjAsIm5pY2tuYW1lU3RhdGUiOjEsInVzZXJFeHQiOm51bGwsInVzZXJJZCI6bnVsbCwiaXNDaGVjayI6MCwiYmxvY2tjaGFpbkFjY291bnQiOiJkaWQ6aHBjOlJlZENhdmU6NTM2dzBjNTkyMzJtdDI2aCIsImlkQ2FyZEZyb250VXJsIjoiIiwiYXV0aG9yaXphdGlvblVybCI6bnVsbCwib3BlcmF0ZVBhc3N3b3JkIjoiYzZjZjRjNTk5MGRiYWEwMzUzZDQ3Mzg1NjY4NzA3YTA0ZjQzMzUxNCIsInNhYXNJZCI6bnVsbCwid2VjaGF0SWQiOm51bGwsImdvb2dsZVN0YXRlIjpudWxsLCJpZENhcmRCYWNrVXJsIjoiIiwibmlja25hbWVSZW1hcmsiOm51bGwsImlzUmVhbE5hbWUiOjEsImJsb2NrY2hhaW5EYXRhIjoie1wiZGlkQWRkcmVzc1wiOlwiZGlkOmhwYzpSZWRDYXZlOjUzNncwYzU5MjMybXQyNmhcIixcImFjY291bnRcIjp7XCJhZGRyZXNzXCI6XCI5OGJiZGNmMGZmZDk4ZTVkZjdlNjkxYzJmOWRmNDA0NmRiMTNiN2U4XCIsXCJwdWJsaWNLZXlcIjpcIjA0YTI0OTgyZmI1YjlkNGRhYjQ3NjRlNzdkZjAyM2FjOWRmOTljZWUyYjYwMmYwZjk1NWViM2ZkYzM4MmFlMTMyNDMwOTIyNjY4MDU0ZjIwNzdkNDQwZTE2OWU3Y2UyOWU1YmI5ZGU1NTMxNDA4NTRmNDEwNDY5OTY2YzQ5YjA1ZTRcIixcInByaXZhdGVLZXlcIjpcIjRjMDIzYzFkNmQwMTRkZTY2NWJjYTJjN2EwNDJlZTg3ZjRmNWM3M2RkNzY2ZGI3Yjk0MGZmNzVhZTZiMDNlZThcIixcInZlcnNpb25cIjpcIjQuMFwiLFwiYWxnb1wiOlwiMHgxM1wifX0ifSwiZXhwIjoxNjczODM2Mzc0LCJkZXB0X2lkIjoiIiwianRpIjoiMDYyZDg4ZjItYjNjNC00M2Q3LTg5MzAtNDRhZjM2YzU1ZThmIiwiYWNjb3VudCI6IjE4MzIyOTY3ODI4Iiwic3RhdHVzIjoxfQ.YMM8J7VFuJX6Vq7fkDg91jhyWXLfWVJYJH28NFVZK94'
// -----------------------------
const handleHongdong1 = () => {
  maxInterval = setInterval(() => {
    const date = new Date()
    const s = date.getSeconds()
    if (s == 59) {
      interval = setInterval(() => {
        hdRequest
          .post({
            url: `api/redcave-order/app/order/blindBoxBuy?seriesId=1611943845959081985`,
            data: {
              seriesId: 1611943845959081985,
            },
            headers: {
              'blade-auth': props.token,
            },
          })
          .then((res: any) => {
            if (res.data.code == 200) {
              clearInterval(maxInterval)
              clearInterval(interval)
            }
            console.log(props.name, res.data.msg)
          })
      }, 200)
    }
  }, 1000)
}
const handleHongdong1End = () => {
  clearInterval(maxInterval)
  clearInterval(interval)
}

//
const handleStartFn = () => {
  startRef.value?.click()
}

defineExpose({ handleStartFn })
</script>

<style lang="less" scoped>
.hd-fly {
  .box {
    margin-top: 50px;
  }
}
</style>
