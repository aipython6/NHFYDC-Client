<template>
  <div>
    <div class="header">
      <div class="text-md py-4"
        >您当前查询的指标为: <span class="text-red-500 font-bold">{{ props.title }}</span></div
      >
      <div class="grid grid-cols-5 gap-4 w-full items-center">
        <a-range-picker v-model:value="pickDate" @change="datePickChange" @ok="onOk" />
        <a-select
          v-model:value="value"
          show-search
          placeholder="请输入科室名称"
          style="width: 100%"
          :default-active-first-option="false"
          :allow-clear="true"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :disabled="showDept"
          :options="data"
          @search="handleSearch"
          @change="handleChange"
        ></a-select>
        <a-input placeholder="请输入诊断名称" :disabled="showDiagises"></a-input>
        <a-radio-group
          :disabled="showPeriod"
          style="width: 300px"
          v-model:value="checkNum"
          :options="plainOptions"
        />
      </div>
      <div class="grid grid-cols-5 gap-4 pt-4">
        <a-input placeholder="请输入手术名称" :disabled="showOpera"></a-input>
        <a-input placeholder="请输入医生姓名" :disabled="showDoctor"></a-input>
        <a-input placeholder="请输入医嘱内容" :disabled="showOrder"></a-input>
        <div>
          <a-button style="width: 90px" type="primary">查询</a-button>
          <span class="pl-1 text-red-500 text-sm">(所有条件均为精确查询)</span>
        </div>
      </div>

      <div class="pt-2">
        <a-button type="success" @click="defaultHeader"
          >导出
          <template #icon>
            <DownloadOutlined />
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { string, bool } from 'vue-types';
  import type { Dayjs } from 'dayjs';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { jsonToSheetXlsx } from '@/components/basic/excel';
  type RangeVal = [Dayjs, Dayjs];
  const pickDate = ref<RangeVal>();
  const props = defineProps({
    title: {
      type: string,
      default: '',
    },
    showDept: {
      type: bool,
      default: true,
    },
    showDiagises: {
      type: bool,
      default: true,
    },
    showPeriod: {
      type: bool,
      default: true,
    },
    showOpera: {
      type: bool,
      default: true,
    },
    showDoctor: {
      type: bool,
      default: true,
    },
    showOrder: {
      type: bool,
      default: true,
    },
  });
  let tableData = [];
  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }
  const emit = defineEmits(['datePickChange', 'onOk']);
  const plainOptions = ref<Array<string>>(['按天汇总', '按月汇总', '按年汇总']);
  const checkNum = ref<string>(plainOptions.value[0]);
  const data = ref<any[]>([
    { label: '科室1', value: 1 },
    { label: '科室2', value: 2 },
  ]);
  const value = ref();

  const handleSearch = (val: string) => {
    if (val) {
      const t = data.value;
      const data_ = t.filter((d) => d.label.indexOf(val) > -1);
      data.value = data_;
    } else {
      data.value = [
        { label: '科室1', value: 1 },
        { label: '科室2', value: 2 },
      ];
    }
  };
  const handleChange = (val: string) => {
    console.log(val);
    value.value = val;
  };
  const datePickChange = (val: RangeVal) => {
    emit('datePickChange', val);
  };
  const onOk = (e: any) => {
    emit('onOk', e);
  };
</script>
