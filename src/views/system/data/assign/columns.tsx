import { Space, Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
export type TableListItem = API.UserAssignData;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '姓名',
    width: 100,
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '用户名',
    width: 80,
    align: 'center',
    dataIndex: 'username',
  },
  {
    title: '所在部门',
    dataIndex: 'departmentName',
    hideInSearch: true,
    align: 'center',
    width: 180,
  },
  {
    title: '所属角色',
    dataIndex: 'roleNames',
    align: 'center',
    hideInSearch: true,
    width: 150,
    customRender: ({ record }) => (
      <Space>
        {record.roleNames.map((item) => (
          <Tag color={'success'} key={item}>
            {item}
          </Tag>
        ))}
      </Space>
    ),
  },

  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    width: 100,
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const isEnable = record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
    },
  },
];
