<template>
  <div class="content">
    <div class="pb-4">
      <a-select
        v-model:value="remark"
        style="width: 200px"
        :options="options"
        @change="selectOption"
      ></a-select>
    </div>
    <div>
      <DynamicTable
        header-title="字典维护"
        :data-request="loadTableData"
        :columns="columns"
        :scroll="{ x: 2000 }"
      >
      </DynamicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, watch, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import { useTable } from '@/components/core/dynamic-table';
  import {
    getDictById,
    list,
    addDict,
    updateDict,
    deleteDict,
    getAllDicts,
  } from '@/api/data/dict/';
  const visible = ref<Boolean>(false);
  const options = ref<API.options>([]);
  const remarkId = ref<Number>(0);
  const [DynamicTable] = useTable({ formProps: { autoSubmitOnEnter: true } });
  const loadTableData = async (params: LoadDataParams) => {
    const data = await list({
      ...params,
      remarkId: remarkId.value,
    });
    return data;
  };
  const openDictModal = (record: Partial<TableListItem> = {}) => {
    visible.value = true;
  };
  const initOptions = async () => {
    options.value = await getAllDicts();
    console.log(options.value);
  };
  const selectOption = (e: string) => {
    console.log(e);
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
          label: '指标分配',
          auth: {
            perm: 'sys.data.assignIndex',
            effect: 'disable',
          },
          onClick: () => openDictModal(record),
        },
      ],
    },
  ];
  onMounted(() => {
    initOptions();
  });
</script>
