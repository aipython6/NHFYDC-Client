<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" tab-position="top" animated>
      <a-tab-pane v-for="item of tabs" :key="item.id" :tab="item.name">
        <div v-show="item.id === 1">
          <CommonPage
            :page-prop="props.pageProp"
            :show-date-pick="props.showDatePick"
            :show-period="props.showPeriod"
            :show-sum-type="props.showSumType"
            :self-dept-options="deptOptions"
            @query="query"
          />
          <showData class="pt-4" :data-List="dataList" :download-data-list="downloadDataList" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import { CommonPage, showData } from '@/components/query/index';
  import { selfDeptBasic } from '@/api/query/deptSelf';
  const userStore = useUserStore();
  const activeKey = ref(1);
  const deptOptions = ref<API.deptDataType[] | undefined>([]);
  const tabs = ref([
    { id: 1, name: '基础数据' },
    { id: 2, name: '病案数据' },
    { id: 3, name: '医嘱数据' },
    { id: 4, name: '收费项目数据' },
    { id: 5, name: '其他' },
  ]);
  interface propState {
    pageProp: number;
    showDatePick: number;
    showPeriod: number;
    showSumType: number;
  }
  const props = reactive<propState>({
    pageProp: 1,
    showDatePick: 1,
    showPeriod: 1,
    showSumType: 1,
  });
  const dataList = ref([]);
  const downloadDataList = ref([]);
  const query = async (params: QUERY.formState) => {
    const data = await selfDeptBasic(params);
    dataList.value = data.dataList;
    downloadDataList.value = data.downloadDataList;
  };

  onMounted(() => {
    const depts = userStore.userInfo?.deptData;
    deptOptions.value = depts;
  });
</script>
