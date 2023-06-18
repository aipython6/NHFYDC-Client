<template>
  <div> hello </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { userIndexList } from '@/api/query/home';

  const userStore = useUserStore();

  // 数据项列表
  const indexLists = ref<API.indexListItem>([]);
  const getIndexList = async () => {};
  onMounted(() => {
    // console.log(userStore);
  });
</script>
