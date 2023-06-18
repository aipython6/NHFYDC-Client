<template>
  <div>
    <DynamicTable
      header-title="指标分配"
      show-index
      :data-request="loadTableData"
      :columns="columns"
      :scroll="{ x: 2000 }"
    >
    </DynamicTable>
    <div>
      <a-modal
        v-model:visible="visible"
        title="指标分配"
        width="800px"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-input-search
          v-model:value="searchValue"
          style="margin-bottom: 8px; width: 500px"
          placeholder="搜索数据项"
          allowClear
        />
        <a-tree
          checkable
          :tree-data="state.treeData"
          :checkedKeys="checkedKeys"
          :expandedKeys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          @check="checked"
          @expand="onExpand"
        >
          <template #title="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </a-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { message } from 'ant-design-vue';
  import { useTable } from '@/components/core/dynamic-table';
  import type { LoadDataParams } from '@/components/core/dynamic-table';
  import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import { getUserListPage } from '@/api/system/user';
  import { getIndexList, assignIndex, getIndexByUserid } from '@/api/data/assign';
  import { baseColumns, type TableListItem, type TableColumnItem } from './columns';

  interface State {
    treeData: TreeDataItem[];
  }
  const state = reactive<State>({
    treeData: [],
  });
  const visible = ref(false);
  const userId = ref<number>(0);
  const [DynamicTable, dynamicTableInstance] = useTable({ formProps: { autoSubmitOnEnter: true } });
  const loadTableData = async (params: LoadDataParams) => {
    const data = await getUserListPage({
      ...params,
    });
    return data;
  };

  const getTreeData = async () => {
    const indexData = await getIndexList();
    state.treeData = indexData;
  };

  // 填充某个用户的树形节点
  const filltreeNode = async (userId: number) => {
    const indexs = await getIndexByUserid({ id: userId });
    checkedKeys.value = indexs;
  };

  const openAssignModal = async (record: Partial<TableListItem> = {}) => {
    visible.value = true;
    getTreeData();
    if (record?.id) {
      userId.value = record.id;
      filltreeNode(record.id);
    }
  };
  const searchValue = ref<string>('');
  const checkedKeys = ref<number[]>([]);
  const checked = (keys: any, e: any) => {
    // 因为最终只要选中的子节点，所以排除父节点
    const index = e.checkedNodes.filter((n: any) => n.children === undefined).map((n) => n.key);
    // 封装为[[],[],...]形式的数组
    checkedKeys.value = index;
  };
  const handleOk = async () => {
    const form = { userId: userId.value, indexs: checkedKeys.value.map((e) => e) };
    const data = await assignIndex(form);
    if (data.code === 200) {
      visible.value = false;
      checkedKeys.value = [];
      message.success('保存成功');
    }
  };
  const handleCancel = async () => {
    checkedKeys.value = [];
  };

  // 搜索功能实现
  const expandedKeys = ref<string[]>([]);
  const autoExpandParent = ref<boolean>(true);
  const getParentKey = (key: string, tree: TreeDataItem[]): string | number | undefined => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  watch(searchValue, (value) => {
    const expanded = state.treeData
      .map((item: TreeDataItem) => {
        if ((item.title as string).indexOf(value) > -1) {
          return getParentKey(item.key as string, state.treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.value = expanded as string[];
    searchValue.value = value;
    autoExpandParent.value = true;
  });

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
          onClick: () => openAssignModal(record),
        },
      ],
    },
  ];
</script>
