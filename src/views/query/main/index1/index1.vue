<template>
  <div>
    <div>
      <CommonPage
        :title="childrenForm.title"
        :showDatePick="childrenForm.showDatePick"
        :showDept="childrenForm.showDept"
        :showDiagnosis="childrenForm.showDiagnosis"
        :showPeriod="childrenForm.showPeriod"
        :showOperator="childrenForm.showOpera"
        :showDoctor="childrenForm.showDoctor"
        :showOrder="childrenForm.showOrder"
        @datePickChange="datePickChange"
      />
    </div>
    <div class="pt-8">
      <a-button type="info" @click="back">返回</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { Dayjs } from 'dayjs';
  import CommonPage from '@/components/query/index';
  import { getDatabyDataid } from '@/api/query/q1/queryData';
  const router = useRouter();
  const route = useRoute();

  // 维护传递给子组件的所有变量
  interface childrenState {
    title: string;
    showDatePick: number;
    showType: number;
    showDept: number;
    showDiagnosis: number;
    showPeriod: number;
    showOpera: number;
    showDoctor: number;
    showOrder: number;
  }

  const childrenForm = reactive<childrenState>({
    title: '',
    showDatePick: 0,
    showType: 0,
    showDept: 0,
    showDiagnosis: 0,
    showPeriod: 0,
    showOpera: 0,
    showDoctor: 0,
    showOrder: 0,
  });

  const back = () => {
    router.go(-1);
  };
  const dataId = ref<any>('');
  const datePickChange = (dates: Dayjs[]) => {
    const obj = {
      date1: dates[0].format('YYYY-MM-DD HH:MM:ss'),
      date2: dates[1].format('YYYY-MM-DD HH:MM:ss'),
    };
    console.log(obj);
  };
  const getDataTitle = async (id: number) => {
    const data = await getDatabyDataid({ dataId: id });
    childrenForm.title = data.name;
    childrenForm.showDept = data.showDept;
    childrenForm.showDatePick = data.showDatePick;
    childrenForm.showType = data.showType;
    childrenForm.showPeriod = data.showPeriod;
    childrenForm.showOpera = data.showOpera;
    childrenForm.showDiagnosis = data.showDiagnosis;
    childrenForm.showDoctor = data.showDoctor;
    childrenForm.showOrder = data.showOrder;
  };
  onMounted(() => {
    dataId.value = route.params.dataId;
    getDataTitle(dataId.value);
  });
</script>
