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
          >
            <template #HISDeptParent>
              <div>
                <a-tooltip
                  color="purple"
                  :title="`点击查询${HISDeptParent?.label}全部`"
                  placement="bottom"
                  ><a-button type="primary" ghost>{{ HISDeptParent?.label }}</a-button></a-tooltip
                >
              </div>
            </template>
          </CommonPage>
          <showData
            class="pt-4"
            :from="fromOutpatient"
            :is-click="isClick"
            :loading="loading"
            :data-List="OutpatientDataList"
            :download-data-list="downloadOutpatientDataList"
          />
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
  const fromInpatient = ref('');
  const fromOutpatient = ref('');
  const deptOptions = ref<API.deptDataType[] | undefined>([]);
  const HISDeptParent = ref<API.deptDataType | undefined>({ value: '', label: '' });

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
  const InpatientDataList = ref([]);
  const downloadInpatientDataList = ref([]);
  const OutpatientDataList = ref([]);
  const downloadOutpatientDataList = ref([]);
  // 标记是否已经点击查询按钮
  const isClick = ref(0);
  const loading = ref(0);
  const query = async (params: QUERY.formState) => {
    loading.value = 1;
    await selfDeptBasic(params).then((data) => {
      InpatientDataList.value = data.InpatientDataList;
      downloadInpatientDataList.value = data.downloadInpatientDataList;
      fromInpatient.value = data.fromInpatient;
      OutpatientDataList.value = data.OutpatientDataList;
      downloadOutpatientDataList.value = data.downloadOutpatientDataList;
      fromOutpatient.value = data.fromOutpatient;
      console.log(data.OutpatientDataList);
      setTimeout(() => {
        loading.value = 0;
        isClick.value = 1;
      }, 1000);
    });
  };

  onMounted(() => {
    const depts = userStore.userInfo?.deptData;
    HISDeptParent.value = userStore.userInfo.HISDeptParent;
    deptOptions.value = depts;
  });
</script>
