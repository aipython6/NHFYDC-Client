<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  console.log(userStore.userInfo);
  const src = 'http://localhost:3010/avatar/images/default.jfif';
</script>
<template>
  <div class="text-gray-700 font-bold text-xl flex justify-center">
    <span>个人中心</span>
  </div>
  <div class="flex align-center justify-center pt-8">
    <div>
      <a-image :src="src" :width="120"> </a-image>
    </div>
    <div>{{ userStore.userInfo.departmentName }}</div>
  </div>
</template>
