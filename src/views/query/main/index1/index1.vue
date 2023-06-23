<template>
  <div>
    <div>
      <CommonPage :title="title" @datePickChange="datePickChange" />
    </div>
    <div class="pt-8">
      <a-button type="success" @click="back">返回</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import type { Dayjs } from 'dayjs';
  import CommonPage from '@/components/query/index';
  import { getDatabyDataid } from '@/api/query/q1/queryData';
  const router = useRouter();
  const route = useRoute();
  const title = ref<string>('');
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
    title.value = data[0].name;
  };
  onMounted(() => {
    dataId.value = route.params.dataId;
    getDataTitle(dataId.value);
  });
</script>
