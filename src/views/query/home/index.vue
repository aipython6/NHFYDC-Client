<template>
  <div class="bg-white p-4" v-if="indexLists.length > 0">
    <div class="">
      <h3 class="text-blue-600">{{ userStore.userCode }}您拥有的指标项如下:</h3>
      <a-input-search
        v-model:value="indexName"
        style="margin-bottom: 8px; width: 300px"
        placeholder="搜索指标名称"
      >
      </a-input-search>
    </div>
    <div>
      <a-list bordered :data-source="indexLists">
        <template #renderItem="{ item }">
          <a-list-item class="text-md cursor-pointer hover:bg-violet-100">
            <router-link :to="`/query/home/dataId=${item.dataId}`"
              >{{ item.id }}.{{ item.dataName }}</router-link
            >
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
  <div v-else>
    <a-result status="404" sub-title="您暂时没有可查询的指标项">
      <template #extra>
        <a-button type="primary" @click="backHome">回到首页</a-button>
      </template>
    </a-result>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { userIndexList } from '@/api/query/home';
  const router = useRouter();

  const userStore = useUserStore();
  const indexName = ref<string>('');

  // 数据项列表
  const indexLists = ref<API.indexListItem>([]);
  const getIndexList = async () => {
    const data = await userIndexList({ userCode: userStore.getUserCode });
    // const data = await userIndexList({ userCode: '10531' });
    indexLists.value = data;
  };
  const backHome = () => {
    router.push({ path: '/dashboard/welcome' });
  };
  onMounted(() => {
    getIndexList();
    // console.log(route);
    // console.log(router);
  });
</script>
