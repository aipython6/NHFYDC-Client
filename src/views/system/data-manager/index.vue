<template>
  <div>
    <DynamicTable
      header-title="数据项管理"
      show-index
      :data-request="loadTableData"
      :columns="columns"
    >
      <template #toolbar>
        <a-button type="primary" :disabled="!$auth('sys.data.add')" @click="openDataModal({})">
          新增
        </a-button>
      </template>
    </DynamicTable>
  </div>
</template>
<script setup lang="ts">
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { dataSchemas } from './formSchemas';
  import { getDataList, updateData, deleteData, createData } from '@/api/data-manager';
  import { useTable } from '@/components/core/dynamic-table';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';

  defineOptions({
    name: 'DataManager',
  });

  const [DynamicTable, dynamicTableInstance] = useTable({
    formProps: { autoSubmitOnEnter: true },
  });
  const [showModal] = useFormModal();
  const loadTableData = async (params: LoadDataParams) => {
    const data = await getDataList(params);
    return data;
  };

  /**
   * @description 打开部门弹窗
   */
  const openDataModal = async (record: Partial<API.dataListResultItem> = {}) => {
    console.log('record', record);

    const [formRef] = await showModal<any>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}数据项`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑数据项', values);
          values.id = record.id;
          await (record.id ? updateData : createData)(values);
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: dataSchemas,
      },
    });

    formRef?.updateSchema([
      {
        field: 'id',
      },
    ]);

    // formRef?.setFieldsValue({
    //   ...record,
    //   parentId: record.parentId ?? -1,
    // });
  };

  /**
   * @description 表格删除行
   */
  const delRowConfirm = async (id: number) => {
    await deleteData({ id: id }).finally(dynamicTableInstance?.reload);
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
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record.id),
          },
        },
      ],
    },
  ];
</script>
