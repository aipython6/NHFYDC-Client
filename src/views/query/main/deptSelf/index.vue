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
            @date-pick-change="datePickChange"
            @self-dept-change="selfDeptChange"
            @query="query"
          >
            <template #HISDeptParent="scope">
              <div>
                <a-tooltip
                  color="purple"
                  :title="`点击查询${HISDeptParent?.label}全部`"
                  placement="bottom"
                  ><a-button
                    :disabled="selectedDepts.length !== 0"
                    type="primary"
                    ghost
                    @click="
                      centerAllData({
                        pickDate: scope.submitForm.pickDate,
                        sumTypeName: scope.submitForm.sumTypeName,
                        HISParentId: scope.submitForm.HISParentId,
                      })
                    "
                    >{{ HISDeptParent?.label }}</a-button
                  ></a-tooltip
                >
              </div>
            </template>
            <template #textTip>
              <span class="pl-2 text-green-500 text-md font-bold"
                >(该查询根据所选择的科室返回门诊和住院数据,若要查询整个中心的数据,则不需要选择科室)
              </span>
              <span
                class="pl-2 text-black-500 font-bold text-md cursor-pointer hover:text-red-500"
                @click="openModal"
                >全院汇总</span
              >
            </template>
          </CommonPage>
          <div class="modal">
            <a-modal
              v-model:visible="visible"
              width="1500px"
              :title="`${pickDate[0]}~${pickDate[1]}全院数据`"
              @ok="handleOk"
            >
              <showData :data-List="modelData" :is-model="0" :loading="modalLoading" />
            </a-modal>
          </div>
          <!-- 门诊数据 -->
          <showData
            class="pt-4 yb-4"
            :from="fromOutpatient"
            :is-click="isClick"
            :loading="Outpatientloading"
            :data-List="OutpatientDataList"
            :download-data-list="downloadOutpatientDataList"
          />
          <!-- 住院数据 -->
          <showData
            class="pt-4"
            :from="fromInpatient"
            :is-click="isClick"
            :loading="Inpatientloading"
            :data-List="InpatientDataList"
            :download-data-list="downloadInpatientDataList"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';
  import { CommonPage, showData } from '@/components/query/index';
  import { selfDeptBasic, CenterAllData, getAllDataSum } from '@/api/query/deptSelf';
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
  };
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
    if (params.pickDate.length === 0) {
      message.warning('请选择时间');
      return;
    }
    resetDataArr();
    Inpatientloading.value = 1;
    Outpatientloading.value = 1;
    await CenterAllData(params).then((data) => {
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

  // // 汇总全院数据
  const visible = ref<boolean>(false);
  const modalLoading = ref(0);
  // 用于显示modal的数据
  const modelData = ref({});
  const pickDate = ref([]);
  //用于保存用户是否已经选择了科室
  const selectedDepts = ref([]);
  // 监听选择的日期
  const datePickChange = async (val: []) => {
    pickDate.value = val;
  };
  // 监控是否选择科室
  const selfDeptChange = async (val: []) => {
    selectedDepts.value = val;
  };
  // 汇总全院数据
  const openModal = () => {
    if (pickDate.value.length <= 0) {
      message.warning('请选择时间');
      return;
    }
    visible.value = true;
    modalLoading.value = 1;
    setTimeout(() => {
      allDataSum();
      if (modelData.value.length > 0) {
        modalLoading.value = 0;
      }
    }, 1000);
  };
  const handleOk = () => {
    visible.value = false;
  };
  const allDataSum = async () => {
    await getAllDataSum({ pickDate: pickDate.value }).then((data) => {
      modelData.value = data;
    });
  };

  onMounted(() => {
    const depts = userStore.userInfo?.deptData;
    HISDeptParent.value = userStore.userInfo.HISDeptParent;
    deptOptions.value = depts;
  });
</script>
