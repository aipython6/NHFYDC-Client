<!-- 专用于各个方法查询回来的数据展示 -->
<template>
  <div class="pb-4">
    <div class="py-2">
      <a-button type="success" @click="defaultHeader" :disabled="props.dataList.length <= 0">导出
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <span class="text-red-500 font-bold text-md pl-2">(因页面空间有限,若数据大于3条,只展示前3条数据,若要浏览全部数据,请导出后浏览~)</span>
    </div>
    <div v-show="props.isClick && props.dataList.length <= 0">
      <a-result title="没有查询到数据">
        <template #icon>
          <FrownTwoTone />
        </template>
      </a-result>
    </div>
    <div v-if="props.dataList.length > 0">
      <div class="text-blue-500 font-bold">来源:{{ props.from }}</div>
      <div v-for="(item, index) of props.dataList.slice(0, 3)" :key="index" class="grid grid-cols-4 gap-2 md:grid-cols-7">
        <div class="col-span-4 md:col-span-7">
          <a-divider style="border-color: #7cb305" dashed>{{ item[0][1] }}</a-divider>
        </div>
        <div v-for="(subItem, subIndex) of item" :key="subIndex">{{ subItem[0] }}: <span class="text-blue-500 font-500">{{
          subItem[1] }};</span></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FrownTwoTone } from '@ant-design/icons-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import { jsonToSheetXlsx } from '@/components/basic/excel';
const props = defineProps({
  dataList: {
    type: <any>[],
    defalut: [],
  },
  downloadDataList: {
    type: <any>[],
    default: [],
  },
  from: {
    type: String,
    default: "",
  },
  fileName: {
    type: String,
    default: '默认的文件名',
  },
  isClick: {
    type: Number,
    default: 0,
  }
});
// const tableData = props.downloadDataList;
function defaultHeader() {
  // 默认Object.keys(data[0])作为header
  jsonToSheetXlsx({
    data: props.downloadDataList,
    filename: `${props.fileName}.xlsx`,
  });
}
</script>
