<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user';
  import { FormOutlined } from '@ant-design/icons-vue';
  const userStore = useUserStore();
  console.log(userStore.userInfo);
  const src = 'http://localhost:3010/avatar/images/default.jfif';
</script>
<template>
  <div class="text-gray-700 font-bold text-xl">
    <span>个人中心</span>
  </div>
  <div class="pl-12 pt-12">
    <div class="grid gird-cols-1 gap-4 content-between h-64 text-md">
      <div>
        <a-image :src="src" :width="120" class="rounded-lg"> </a-image>
        <a-tooltip placement="bottom">
          <template #title>
            <span>点击更换头像</span>
          </template>
          <FormOutlined
            class="pl-4 cursor-pointer"
            style="width: 10px; height: 10px; color: rgb(105, 105, 232)"
          />
        </a-tooltip>
      </div>
      <div
        >姓名: <span class="font-semibold">{{ userStore.userInfo.name }}</span></div
      >
      <div
        >科室: <span class="font-semibold">{{ userStore.userInfo.departmentName }}</span></div
      >
      <div
        >手机: <span class="font-semibold">{{ userStore.userInfo.phone }}</span></div
      >
      <div
        >邮箱: <span class="font-semibold">{{ userStore.userInfo.email }}</span></div
      >
      <div
        >备注: <span class="font-semibold">{{ userStore.userInfo.remark }}</span></div
      >
    </div>
  </div>
</template>
