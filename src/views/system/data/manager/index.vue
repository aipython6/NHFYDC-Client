<template>
  <div>
    <DynamicTable
      header-title="指标管理"
      show-index
      :data-request="loadTableData"
      :columns="columns"
      :row-selection="rowSelection"
    >
      <template v-if="isCheckRows" #title>
        <Alert class="w-full" type="info" show-icon>
          <template #message>
            已选 {{ isCheckRows }} 项
            <a-button type="link" @click="rowSelection.selectedRowKeys = []">取消选择</a-button>
          </template>
        </Alert>
      </template>
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.user.add')" @click="openDataModal({})">
          <PlusOutlined /> 新增
        </a-button>
        <a-button
          type="danger"
          :disabled="!isCheckRows || !$auth('sys.user.delete')"
          @click="delRowConfirm(rowSelection.selectedRowKeys)"
        >
          <DeleteOutlined /> 删除
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, computed, onMounted, createVNode } from 'vue';
  import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Modal, Alert } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { dataSchemas } from './formSchemas';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import type { TreeDataItem } from '@/core/permission/utils';
  import {
    getDataList,
    updateData,
    deleteDatas,
    createData,
    getDataInfo,
  } from '@/api/data/manager';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import { formatDept2Tree, findChildById } from '@/core/permission/utils';
  import { getDeptList } from '@/api/system/dept';

  defineOptions({
    name: 'DataManager',
  });

  interface State {
    expandedKeys: number[];
    departmentIds: number[];
    deptTree: TreeDataItem[];
  }

  const state = reactive<State>({
    expandedKeys: [],
    departmentIds: [],
    deptTree: [],
  });

  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      rowSelection.value.selectedRowKeys = selectedRowKeys;
    },
  });

  // 是否勾选了表格行
  const isCheckRows = computed(() => rowSelection.value.selectedRowKeys.length);

  const deptListLoading = ref(false);

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: { autoSubmitOnEnter: true },
  });
  const [showModal] = useFormModal();
  const loadTableData = async (params: LoadDataParams) => {
    const data = await getDataList(params);
    return data;
  };

  /**
   * @description 打开指标项弹窗
   */
  const openDataModal = async (record: Partial<TableListItem> = {}) => {
    console.log(record);
    const [formRef] = await showModal<any>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}指标项`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑指标项', values);
          values.id = record.id;
          await (record.id ? updateData : createData)(values);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: dataSchemas,
        autoSubmitOnEnter: true,
      },
    });

    formRef?.updateSchema([
      {
        field: 'useDeptId',
        componentProps: {
          treeDefaultExpandedKeys: findChildById(record?.useDeptId, state.deptTree)?.keyPath || [],
          treeData: state.deptTree,
        },
      },
    ]);

    formRef?.setFieldsValue(record);
    if (record?.id) {
      const data = await getDataInfo({ dataId: record.id });
      formRef?.setFieldsValue(data);
    }
  };

  const fetchDeptList = async () => {
    deptListLoading.value = true;
    const dept = await getDeptList().finally(() => (deptListLoading.value = false));
    state.deptTree = formatDept2Tree(dept);
    state.expandedKeys = [...state.expandedKeys, ...state.deptTree.map((n) => Number(n.key))];
  };

  /**
   * @description 表格删除行
   */
  const delRowConfirm = async (dataId: number | number[]) => {
    if (Array.isArray(dataId)) {
      Modal.confirm({
        title: '确定要删除所选的指标项吗?',
        icon: createVNode(ExclamationCircleOutlined),
        centered: true,
        onOk: async () => {
          await deleteDatas({ ids: dataId });
          fetchDeptList();
          // loadTableData({ page: 1, limit: 10 });
        },
      });
    } else {
      await deleteDatas({ ids: [dataId] }).finally(dynamicTableInstance?.reload);
      // loadTableData({ page: 1, limit: 10 });
    }
  };

  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 200,
      dataIndex: 'ACTION',
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys.user.update',
            effect: 'disable',
          },
          onClick: () => openDataModal(record),
        },
        {
          label: '删除',
          auth: 'sys.user.delete',
          popConfirm: {
            title: '你确定要删除吗?',
            onConfirm: () => delRowConfirm(record.id),
          },
        },
      ],
    },
  ];
  onMounted(() => {
    fetchDeptList();
  });
</script>
