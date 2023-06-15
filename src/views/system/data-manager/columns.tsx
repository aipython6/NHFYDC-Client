import type { TableColumn } from '@/components/core/dynamic-table';

export type TableListItem = API.dataListResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: '所属大类',
    width: 90,
    dataIndex: 'firstType',
    align: 'center',
  },
  {
    title: '所属小类',
    width: 90,
    align: 'center',
    dataIndex: 'secondType',
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    align: 'center',
    width: 110,
    ellipsis: true,
  },
  {
    title: '数据来源',
    dataIndex: 'dataSource',
    align: 'center',
    width: 140,
    ellipsis: true,
  },
  {
    title: 'sql',
    width: 280,
    align: 'center',
    dataIndex: 'sql',
    ellipsis: true,
  },
];
