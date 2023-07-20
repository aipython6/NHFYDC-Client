<template>
  <div>
    <div>
      <CommonPage
        :title="childrenForm.title"
        :show-date-pick="childrenForm.showDatePick"
        :show-dept="childrenForm.showDept"
        :show-diagnosis="childrenForm.showDiagnosis"
        :show-period="childrenForm.showPeriod"
        :show-operator="childrenForm.showOpera"
        :show-doctor="childrenForm.showDoctor"
        :show-order="childrenForm.showOrder"
        @query="query"
      />
    </div>
    <div class="pt-4">
      <showData
        :data-List="dataList"
        :downloadDataList="downloadDataList"
        :file-name="childrenForm.title"
      />
    </div>
    <div class="py-8">
      <a-button type="info" @click="back">返回</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { CommonPage, showData } from '@/components/query/index';
  import { getDatabyDataid } from '@/api/query/home';
  import { qBasicQuery } from '@/core/permission/modules/query/main/qBasic';
  import { basicSum } from '@/api/query/main/qBasic';
  const router = useRouter();
  const route = useRoute();
  const back = () => {
    router.go(-1);
  };
  // 维护提交给服务端的所有变量
  interface state {
    deptName: string | number;
    pickDate: Array<String>;
    typeName: string | number;
    diagnosisName: string | number;
    periodName: string | number;
    operaName: string | number;
    doctorName: string | number;
    orderName: string | number;
    numName: string | number;
  }

  // 维护传递给子组件的所有变量
  interface childrenState {
    title: string;
    showDatePick: number;
    showType: number;
    showDept: number;
    showDiagnosis: number;
    showPeriod: number;
    showOpera: number;
    showDoctor: number;
    showOrder: number;
    showNum: number;
  }

  const childrenForm = reactive<childrenState>({
    title: '',
    showDatePick: 0,
    showType: 0,
    showDept: 0,
    showDiagnosis: 0,
    showPeriod: 0,
    showOpera: 0,
    showDoctor: 0,
    showOrder: 0,
    showNum: 0,
  });

  const reqRouter = ref<string>('');
  const reqMethod = ref<string>('');
  // 最终要展示的数据列表
  const dataList = ref([]);
  // 用户导出的数据列表
  const downloadDataList = ref([]);
  const query = async (submitForm: state) => {
    const reqRouter1 = qBasicQuery[reqRouter.value];
    const reqMethod1 = reqMethod.value;
    const data = await basicSum(reqRouter1, reqMethod1, submitForm);
    dataList.value = data.dataList;
    downloadDataList.value = data.downloadDataList;
  };

  // 初始化数据项内容
  const dataId = ref<any>('');
  const initData = async (id: number) => {
    const data = await getDatabyDataid({ dataId: id });
    childrenForm.title = data.name;
    childrenForm.showDept = data.showDept;
    childrenForm.showDatePick = data.showDatePick;
    childrenForm.showType = data.showType;
    childrenForm.showPeriod = data.showPeriod;
    childrenForm.showOpera = data.showOpera;
    childrenForm.showDiagnosis = data.showDiagnosis;
    childrenForm.showDoctor = data.showDoctor;
    childrenForm.showOrder = data.showOrder;
    childrenForm.showNum = data.showNum;
    reqRouter.value = data.reqRouter;
    reqMethod.value = data.reqMethod;
  };
  onMounted(() => {
    dataId.value = route.params.dataId;
    initData(dataId.value);
  });
</script>
