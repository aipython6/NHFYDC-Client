<!-- 常用指标 -->
<template>
  <div>
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  dataSource: {
    type: Array,
    defalut: <any>[]
  }
});
 columns: [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
],
</script>
