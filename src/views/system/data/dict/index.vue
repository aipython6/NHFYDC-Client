<template>
  <div class="content">
    <div class="pb-4">
      <a-select
        v-model:value="remarkName"
        style="width: 200px"
        :options="options"
        @change="handleChange"
      ></a-select>
    </div>
    <div>
      <DynamicTable
        header-title="字典维护"
        :data-request="loadTableData"
        :columns="columns"
        :scroll="{ x: 2000 }"
      >
        <template #toolbar>
          <a-button
            type="primary"
            :disabled="!$auth('sys.data.dict.add')"
            @click="openDictModal({})"
          >
            新增
          </a-button>
        </template>
      </DynamicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import { dictSchemas } from './formSchemas';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import { useFormModal } from '@/hooks/useModal/useFormModal';
  import {
    getDictDataById,
    list,
    createDict,
    updateDict,
    deleteDict,
    getAllDicts,
  } from '@/api/data/dict/';
  const options = ref<API.options>([]);
  // 选中该值的value
  const remarkId = ref<Number>(1);
  // 显示选中的label
  const remarkName = ref<String>('');
  const [DynamicTable, dynamicTableInstance] = useTable({ formProps: { autoSubmitOnEnter: true } });
  const [showModal] = useFormModal();
  const loadTableData = async (params: LoadDataParams) => {
    const data = await list({
      ...params,
      remarkId: remarkId.value,
    });
    return data;
  };
  const openDictModal = async (record: Partial<TableListItem> = {}) => {
    // console.log(record);
    const [formRef] = await showModal<any>({
      modalProps: {
        title: `${record.id ? '编辑' : '新增'}指标项`,
        width: 700,
        onFinish: async (values) => {
          console.log('新增/编辑指标项', values);
          values.id = record.id;
          await (record.id ? updateDict : createDict)(values);
          dynamicTableInstance?.reload();
        },
      },
      formProps: {
        labelWidth: 100,
        schemas: dictSchemas,
        autoSubmitOnEnter: true,
      },
    });
    formRef?.setFieldsValue(record);
    if (record?.id) {
      const data = await getDictDataById({ id: record.id });
      formRef?.setFieldsValue(data);
    }
  };
  const initOptions = async () => {
    options.value = await getAllDicts();
  };
  const handleChange = (e: string) => {
    console.log(e);
  };
  const delRowConfirm = async (record: TableListItem) => {
    await deleteDict({ id: record.id });
    dynamicTableInstance.reload();
  };
  const columns: TableColumnItem[] = [
    ...baseColumns,
    {
      title: '操作',
      width: 100,
      dataIndex: 'ACTION',
      align: 'center',
      fixed: 'right',
      actions: ({ record }) => [
        {
          label: '编辑',
          auth: {
            perm: 'sys.data.dict.update',
            effect: 'disable',
          },
          onClick: () => openDictModal(record),
        },
        {
          label: '删除',
          auth: 'sys.data.dict.delete',
          popConfirm: {
            title: '你确定要删除吗？',
            onConfirm: () => delRowConfirm(record),
          },
        },
      ],
    },
  ];
  onMounted(() => {
    initOptions();
  });
</script>
