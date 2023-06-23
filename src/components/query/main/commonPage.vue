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
          placeholder="请输入科室查询"
          style="width: 400px"
          :default-active-first-option="false"
          :allow-clear="true"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :disabled="true"
          :options="data"
          @search="handleSearch"
          @change="handleChange"
        ></a-select>
        <a-radio-group v-model:value="checkNum" :options="plainOptions" class="col-span-2" />
        <a-button style="width: 90px" type="primary">搜索</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { string } from 'vue-types';
  import type { Dayjs } from 'dayjs';
  type RangeVal = [Dayjs, Dayjs];
  const pickDate = ref<RangeVal>();
  const props = defineProps({
    title: {
      type: string,
      default: '',
    },
  });
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
