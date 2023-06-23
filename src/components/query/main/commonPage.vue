<template>
  <div>
    <div class="header">
      <a-range-picker v-model:value="pickDate" @change="datePickChange" @ok="onOk" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type { Dayjs } from 'dayjs';
  type RangeVal = [Dayjs, Dayjs];
  const pickDate = ref<RangeVal>();
  const emit = defineEmits(['datePickChange', 'onOk']);
  const datePickChange = (val: RangeVal) => {
    emit('datePickChange', val);
  };
  const onOk = (e: any) => {
    emit('onOk', e);
  };
</script>
