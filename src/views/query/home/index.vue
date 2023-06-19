<template>
  <div class="bg-white p-4">
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
          <a-list-item
            class="text-md cursor-pointer hover:bg-violet-100"
            @click="open(item.dataId)"
          >
            <span>{{ item.id }}.{{ item.dataName }}</span>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { userIndexList } from '@/api/query/home';
  import { getDatabyDataid } from '@/api/query/q1/queryData';

  const userStore = useUserStore();
  const indexName = ref<string>('');

  // 数据项列表
  const indexLists = ref<API.indexListItem>([]);
  const getIndexList = async () => {
    // const data = await userIndexList({ userCode: userStore.getUserCode });
    const data = await userIndexList({ userCode: '10531' });
    indexLists.value = data;
  };
  const open = async (dataId: number) => {
    getDatabyDataid({ dataId });
  };
  onMounted(() => {
    getIndexList();
  });
</script>
