import { Tag, Space } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
export type TableListItem = API.DictInfo;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '字段名称',
    width: 100,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '类别',
    width: 80,
    align: 'center',
    dataIndex: 'type',
    customRender: ({ record }) => (
      <Space>
        <Tag color={'success'} key={record.type}>
          {record.type}
        </Tag>
      </Space>
    ),
  },
  {
    title: '创建时间',
    width: 80,
    align: 'center',
    dataIndex: 'createdAt',
    hideInSearch: true,
  },
  {
    title: '更新时间',
    width: 80,
    align: 'center',
    dataIndex: 'updatedAt',
    hideInSearch: true,
  },
  {
    title: 'remark',
    dataIndex: 'remark',
    hideInSearch: true,
    align: 'center',
    width: 180,
  },
];
