<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" tab-position="top" animated>
      <a-tab-pane v-for="item of tabs" :key="item.id" :tab="item.name">
        <div v-show="item.id === 1">
          <CommonPage :page-prop="props.pageProp" :show-date-pick="props.showDatePick" :show-period="props.showPeriod"
            :show-sum-type="props.showSumType" :self-dept-options="deptOptions" @query="query">
            <template v-slot:HISDeptParent="scope">
              <div>
                <a-tooltip color="purple" :title="`点击查询${HISDeptParent?.label}全部`" placement="bottom"><a-button
                    type="primary" ghost
                    @click="centerAllData({ pickDate: scope.submitForm.pickDate, sumTypeName: scope.submitForm.sumTypeName, HISParentId: scope.submitForm.HISParentId })">{{
                      HISDeptParent?.label }}</a-button></a-tooltip>
              </div>
            </template>
            <template #textTip>
              <span class="text-green-500 text-md font-bold">(该查询根据所选择的科室返回门诊和住院数据)</span>
            </template>
          </CommonPage>
          <!-- 门诊数据 -->
          <showData class="pt-4 yb-4" :from="fromOutpatient" :is-click="isClick" :loading="Outpatientloading"
            :data-List="OutpatientDataList" :download-data-list="downloadOutpatientDataList" />
          <!-- 住院数据 -->
          <showData class="pt-4" :from="fromInpatient" :is-click="isClick" :loading="Inpatientloading"
            :data-List="InpatientDataList" :download-data-list="downloadInpatientDataList" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { CommonPage, showData } from '@/components/query/index';
import { selfDeptBasic, CenterAllData } from '@/api/query/deptSelf';
import { message } from 'ant-design-vue';
const userStore = useUserStore();
const activeKey = ref(1);
const fromInpatient = ref('');
const fromOutpatient = ref('');
const deptOptions = ref<API.deptDataType[] | undefined>([]);
const HISDeptParent = ref<API.deptDataType | undefined>({ value: '', label: '' });

const tabs = ref([
  { id: 1, name: '基础数据' },
  { id: 2, name: '常用指标' },
  { id: 3, name: '医嘱数据' },
  { id: 4, name: '收费项目' },
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
// 重置所有数据列表
const resetDataArr = () => {
  InpatientDataList.value = [];
  downloadInpatientDataList.value = [];
  OutpatientDataList.value = [];
  downloadOutpatientDataList.value = [];
  isClick.value = 0;
}
// 标记是否已经点击查询按钮
const isClick = ref(0);
const Outpatientloading = ref(0);
const Inpatientloading = ref(0);
const query = async (params: QUERY.formState) => {
  resetDataArr();
  Inpatientloading.value = 1;
  Outpatientloading.value = 1;
  await selfDeptBasic(params).then((data) => {
    InpatientDataList.value = data.InpatientDataList;
    downloadInpatientDataList.value = data.downloadInpatientDataList;
    fromInpatient.value = data.fromInpatient;
    OutpatientDataList.value = data.OutpatientDataList;
    downloadOutpatientDataList.value = data.downloadOutpatientDataList;
    fromOutpatient.value = data.fromOutpatient;
    setTimeout(() => {
      Outpatientloading.value = 0;
      Inpatientloading.value = 0;
      isClick.value = 1;
    }, 1000);
  });
};
// 获取某个中心下的所有数据
const centerAllData = async (params: QUERY.centerState) => {
  if (params.pickDate.length <= 0) {
    message.warning('请选择时间');
    return;
  }
  resetDataArr();
  Inpatientloading.value = 1;
  Outpatientloading.value = 1;
  await CenterAllData(params).then(data => {
    InpatientDataList.value = data.InpatientDataList;
    downloadInpatientDataList.value = data.downloadInpatientDataList;
    fromInpatient.value = data.fromInpatient;
    OutpatientDataList.value = data.OutpatientDataList;
    downloadOutpatientDataList.value = data.downloadOutpatientDataList;
    fromOutpatient.value = data.fromOutpatient;
    setTimeout(() => {
      Outpatientloading.value = 0;
      Inpatientloading.value = 0;
      isClick.value = 1;
    }, 1000);
  })

};

onMounted(() => {
  const depts = userStore.userInfo?.deptData;
  HISDeptParent.value = userStore.userInfo.HISDeptParent;
  deptOptions.value = depts;
});
</script>
