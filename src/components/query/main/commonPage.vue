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
        />
        <a-select
          v-show="!props.pageProp"
          placeholder="请选择查询类别"
          v-model:value="form.typeName"
          :disabled="!props.showType"
          :options="options.typeOptions"
          @change="typeChange"
        >
        </a-select>
        <a-select
          v-show="!props.pageProp"
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
          @search="deptSearch"
          @change="deptChange"
        ></a-select>
        <!-- 专用于科室自助页面 -->
        <a-select
          v-show="props.pageProp"
          v-model:value="form.selfDeptName"
          placeholder="请输入科室名称"
          style="width: 100%"
          :default-active-first-option="false"
          :allow-clear="true"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :options="props.selfDeptOptions"
          @change="deptChange"
        ></a-select>
        <a-select
          v-show="!props.pageProp"
          v-model:value="form.periodName"
          placeholder="请选择时间段类别"
          :disabled="!props.showPeriod"
          :options="options.periodOptions"
          @change="periodChange"
        >
        </a-select>
        <a-input
          v-show="!props.pageProp"
          v-model:value="form.numName"
          placeholder="请输入门诊号或住院号"
          :disabled="!props.showNum"
        ></a-input>
      </div>
      <div class="grid grid-cols-5 gap-4 pt-4">
        <a-input
          v-show="!props.pageProp"
          v-model:value="form.diagnosisName"
          placeholder="请输入诊断名称"
          :disabled="!props.showDiagnosis"
        ></a-input>
        <a-input
          v-show="!props.pageProp"
          v-model:value="form.operaName"
          placeholder="请输入手术名称"
          :disabled="!props.showOpera"
        ></a-input>
        <a-input
          v-show="!props.pageProp"
          v-model:value="form.doctorName"
          placeholder="请输入医生姓名"
          :disabled="!props.showDoctor"
        ></a-input>
        <a-input
          v-show="!props.pageProp"
          v-model:value="form.orderName"
          placeholder="请输入医嘱内容"
          :disabled="!props.showOrder"
        ></a-input>
        <div>
          <a-button style="width: 90px" type="primary" @click="query">查询</a-button>
          <span class="pl-1 text-red-500 text-sm">(所有条件均为精确查询)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { string, number } from 'vue-types';
  import type { Dayjs } from 'dayjs';
  import { getDeptByName } from '@/api/system/dept';
  type RangeVal = [Dayjs, Dayjs];
  const props = defineProps({
    pageProp: {
      type: number,
      default: 0,
    },
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
    showNum: {
      type: number,
      default: 0,
    },
    showSelfDept: {
      type: number,
      default: 0,
    },
    selfDeptOptions: {
      type: Array,
      default: [],
    },
  });

  // 保存用户选择的所有条件
  interface state {
    deptName: string | number;
    pickDate: Array<String>;
    typeName: string | number;
    diagnosisName: string | number;
    periodName: string | number;
    operaName: string | number;
    doctorName: string | number;
    orderName: string | number;
    numName: string | number;
    selfDeptName: string | number;
  }

  const form = reactive<state>({
    deptName: '科室名称',
    pickDate: [],
    typeName: 1,
    diagnosisName: '',
    periodName: 1,
    operaName: '',
    doctorName: '',
    orderName: '',
    numName: '',
    selfDeptName: '',
  });

  const submitForm = reactive<state>({
    deptName: form.deptName,
    pickDate: form.pickDate,
    typeName: form.typeName,
    diagnosisName: form.diagnosisName,
    periodName: form.periodName,
    operaName: form.operaName,
    doctorName: form.doctorName,
    orderName: form.orderName,
    numName: form.numName,
    selfDeptName: form.selfDeptName,
  });

  // 所有的options
  type deptType = { value: string; label: string };
  const options = reactive({
    typeOptions: [
      { value: 1, label: '门诊' },
      { value: 2, label: '住院' },
      { value: 3, label: '全院' },
    ],
    deptOptions: <deptType[]>[],
    periodOptions: [
      { value: 1, label: '按天汇总' },
      { value: 2, label: '按月汇总' },
      { value: 3, label: '按年汇总' },
      { value: 4, label: '全部汇总' },
    ],
  });

  const emit = defineEmits(['query']);

  const deptList = async (deptname: string) => {
    const data = await getDeptByName({ deptName: deptname });
    const filterItem = data.map((d) => {
      return {
        value: d.HISdeptID,
        label: d.name,
      };
    });
    options.deptOptions = filterItem;
  };

  const deptSearch = (val: string) => {
    options.deptOptions = [];
    deptList(val);
  };

  // const deptSearch = (val: string) => {
  //   if (val) {
  //     const t = data.value;
  //     const data_ = t.filter((d) => d.label.indexOf(val) > -1);
  //     data.value = data_;
  //   } else {
  //     data.value = [
  //       { label: '科室1', value: 1 },
  //       { label: '科室2', value: 2 },
  //     ];
  //   }
  // };
  // 选择type触发
  const typeChange = (val: number) => {
    submitForm.typeName = val;
  };
  // 选择dept触发
  const deptChange = (val: string) => {
    submitForm.deptName = val;
  };
  // 选择period触发
  const periodChange = (val: number) => {
    submitForm.periodName = val;
  };
  // 选择时间触发
  const datePickChange = (val: RangeVal) => {
    const date1 = val[0].format('YYYY-MM-DD');
    const date2 = val[1].format('YYYY-MM-DD');
    submitForm.pickDate = [date1, date2];
  };

  const query = () => {
    emit('query', submitForm);
  };
</script>
