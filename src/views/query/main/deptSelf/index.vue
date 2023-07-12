<template>
  <div>
    <CommonPage
      :page-prop="props.pageProp"
      :show-date-pick="props.showDatePick"
      :self-dept-options="deptOptions"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { CommonPage, showData } from '@/components/query/index';
  import type { Dayjs } from 'dayjs';
  const userStore = useUserStore();

  interface deptStat {
    HISdeptID: string;
    deptName: string;
  }
  const deptOptions = ref<Array<deptStat>>([]);
  type RangeVal = [Dayjs, Dayjs];
  interface propState {
    pageProp: number;
    showDatePick: number;
  }
  const props = reactive<propState>({ pageProp: 1, showDatePick: 1 });
  onMounted(() => {});
</script>
