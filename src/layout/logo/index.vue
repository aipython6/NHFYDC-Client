<template>
  <div class="logo cursor-pointer" @click="home">
    <img src="~@/assets/images/cx.png" alt="" width="38" height="100" />
    <h3 v-show="!collapsed" class="title">数据查询平台</h3>
  </div>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();
  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
  const home = () => {
    router.push({ path: '/dashboard/welcome' });
  };
</script>

<style lang="less" scoped>
  .logo {
    @apply flex overflow-hidden whitespace-nowrap items-center;

    height: 64px;
    padding-left: 24px;
    line-height: 64px;

    img {
      height: 32px;
      margin-right: 8px;
    }

    .title {
      @apply mb-0 text-xl;
      color: @primary-color;
    }
  }
</style>
