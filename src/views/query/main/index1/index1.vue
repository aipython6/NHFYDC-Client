<template>
  <div>
    <div>
      <a-button type="success" @click="back">返回</a-button>
    </div>
    <div>{{ dataId }}</div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getDatabyDataid } from '@/api/query/q1/queryData';
  const router = useRouter();
  const route = useRoute();
  const back = () => {
    router.go(-1);
  };
  const dataId = ref<any>('');
  onMounted(() => {
    dataId.value = route.params.dataId;
  });
</script>
