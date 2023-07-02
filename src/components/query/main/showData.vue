<!-- 专用于各个方法查询回来的数据展示 -->
<template>
  <div>
    <div class="py-2">
      <a-button type="success" @click="defaultHeader"
        >导出
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <span class="text-red-500 font-bold text-md pl-2"
        >(若数据大于3条,因页面空间有限,此处只展示前3条数据,若要浏览全部数据,请导出~)</span
      >
    </div>
    <div v-if="props.dataList.length > 0">
      <div
        v-for="(item, index) of props.dataList.slice(0, 3)"
        :key="index"
        class="grid grid-cols-4 gap-2 md:grid-cols-7"
      >
        <div class="col-span-4 md:col-span-7">
          <a-divider style="border-color: #7cb305" dashed>{{ item[0][1] }}</a-divider>
        </div>
        <div v-for="(subItem, subIndex) of item" :key="subIndex"
          >{{ subItem[0] }}: <span class="text-blue-500 font-500">{{ subItem[1] }};</span></div
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
    fileName: {
      type: String,
      default: '默认的文件名',
    },
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
