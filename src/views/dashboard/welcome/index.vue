<template>
  <div class="box">
    <div>
      <h3
        ><span class="text-blue-500">{{ name }}({{ userCode }})</span> 欢迎您使用系统~</h3
      >
    </div>
    <img src="~@/assets/analysis.svg" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  defineOptions({
    name: 'DashboardWelcome',
  });
  const userStore = useUserStore();
  const name = ref<string>(userStore.name);
  const userCode = ref<string>(userStore.userCode);
</script>

<style lang="less" scoped>
  @import '@/styles/theme.less';

  .themeBgColor(box);

  .box {
    display: flex;
    padding: 12px;
    width: 100%;
    height: calc(100vh - 280px);
    flex-direction: column;

    img {
      min-height: 0;
      flex: 1;
    }

    .ant-form {
      flex: 2;
    }
  }
</style>
