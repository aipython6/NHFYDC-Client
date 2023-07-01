<template>
  <div>
    <div class="header">
      <div class="text-md py-4"
        >您当前查询的指标为: <span class="text-red-500 font-bold">{{ props.title }}</span></div
      >
      <div class="grid grid-cols-5 gap-4 w-full items-center">
        <a-range-picker
          :disabled="!props.showDatePick"
          v-model:value="form.pickDate"
          @change="datePickChange"
          @ok="onOk"
        />
        <a-select
          placeholder="请选择查询类别"
          v-model:value="form.typeName"
          :disabled="!props.showType"
          :options="options.typeOptions"
          @change="typeChange"
        >
        </a-select>
        <a-select
          v-model:value="form.deptName"
          show-search
          placeholder="请输入科室名称"
          style="width: 100%"
          :default-active-first-option="false"
          :allow-clear="true"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :disabled="!props.showDept"
          :options="options.deptOptions"
          @search="handleSearch"
          @change="deptChange"
        ></a-select>
        <a-select
          placeholder="请选择时间段类别"
          v-model:value="form.periodName"
          :disabled="!props.showPeriod"
          :options="options.periodOptions"
          @change="periodChange"
        >
        </a-select>
        <a-input
          v-model:value="form.diagnosisName"
          placeholder="请输入诊断名称"
          :disabled="!props.showDiagnosis"
        ></a-input>
      </div>
      <div class="grid grid-cols-5 gap-4 pt-4">
        <a-input
          v-model:value="form.operaName"
          placeholder="请输入手术名称"
          :disabled="!props.showOpera"
        ></a-input>
        <a-input
          v-model:value="form.doctorName"
          placeholder="请输入医生姓名"
          :disabled="!props.showDoctor"
        ></a-input>
        <a-input
          v-model:value="form.orderName"
          placeholder="请输入医嘱内容"
          :disabled="!props.showOrder"
        ></a-input>
        <div>
          <a-button style="width: 90px" type="primary" @click="query">查询</a-button>
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
  import { ref, reactive } from 'vue';
  import { string, number } from 'vue-types';
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
    showDatePick: {
      type: number,
      default: 0,
    },
    showType: {
      type: number,
      default: 0,
    },
    showDept: {
      type: number,
      default: 0,
    },
    showDiagnosis: {
      type: number,
      default: 0,
    },
    showPeriod: {
      type: number,
      default: 0,
    },
    showOpera: {
      type: number,
      default: 0,
    },
    showDoctor: {
      type: number,
      default: 0,
    },
    showOrder: {
      type: number,
      default: 0,
    },
  });
  const tableData = [];
  function defaultHeader() {
    // 默认Object.keys(data[0])作为header
    jsonToSheetXlsx({
      data: tableData,
      filename: '使用key作为默认头部.xlsx',
    });
  }

  // 保存用户选择的所有条件
  interface state {
    deptName: string;
    pickDate: Array<Dayjs>;
    typeName: string | number;
    diagnosisName: string | number;
    periodName: string | number;
    operaName: string | number;
    doctorName: string | number;
    orderName: string | number;
  }

  const form = reactive<state>({
    deptName: '',
    pickDate: [],
    typeName: '',
    diagnosisName: '',
    periodName: '',
    operaName: '',
    doctorName: '',
    orderName: '',
  });

  // 所有的options

  const options = reactive({
    typeOptions: [
      { value: 1, label: '门诊' },
      { value: 2, label: '住院' },
      { value: 3, label: '全院' },
    ],
    deptOptions: [],
    periodOptions: [
      { value: 1, label: '按天汇总' },
      { value: 2, label: '按月汇总' },
      { value: 3, label: '按年汇总' },
    ],
  });

  const emit = defineEmits(['datePickChange', 'onOk']);

  const data = ref<any[]>([
    { label: '科室1', value: 1 },
    { label: '科室2', value: 2 },
  ]);
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
  // 选择type触发
  const typeChange = (val: number) => {};
  // 选择dept触发
  const deptChange = (val: number) => {};
  // 选择period触发
  const periodChange = (val: number) => {
    console.log(val);
  };

  // 选择时间
  const datePickChange = (val: RangeVal) => {
    pickDate.value = val;
  };
  const onOk = (e: any) => {
    emit('onOk', e);
  };
  const query = () => {};
</script>
