<template>
  <div>
    <div v-show="indexLists.length > 0" class="bg-white p-4">
      <div class="">
        <h3 class="text-blue-600">{{ userStore.userCode }}您拥有的指标项如下:</h3>
        <a-input-search
          v-model:value="indexName"
          style="margin-bottom: 8px; width: 300px"
          placeholder="搜索指标名称"
          @change="search(indexName)"
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
      <div>
        <div class="pt-4 flex order-1">
          <a-pagination
            v-model:current="current"
            show-quick-jumper
            :total="total"
            @change="onChange"
            @show-size-change="showSizeChange"
          />
        </div>
      </div>
    </div>
    <div v-show="indexLists.length === 0">
      <a-result status="404" sub-title="您暂时没有可查询的指标项">
        <template #extra>
          <a-button type="primary" @click="backHome">回到首页</a-button>
        </template>
      </a-result>
    </div>
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
  const current = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);

  // 数据项列表
  const indexLists = ref<API.indexListItem>([]);
  const getIndexList = async () => {
    const data = await userIndexList({
      userCode: userStore.getUserCode,
      limit: limit.value,
      page: current.value,
    });
    indexLists.value = data;
    total.value = data.length;
  };
  const backHome = () => {
    router.push({ path: '/dashboard/welcome' });
  };
  // 根据关键词搜索指标
  const search = async (searchVal: string) => {
    if (searchVal) {
      const fullList = indexLists.value;
      indexLists.value = fullList.filter((e) => e.dataName.indexOf(searchVal) > -1);
    } else {
      getIndexList();
    }
  };
  //每页显示的条数触发
  const showSizeChange = async (current_: number, pageSize: number) => {
    limit.value = pageSize;
    current.value = current_;
    await getIndexList();
  };
  // 选择上下页触发
  const onChange = async (pageNumber: number) => {
    current.value = pageNumber;
    await getIndexList();
  };
  onMounted(() => {
    getIndexList();
  });
</script>
