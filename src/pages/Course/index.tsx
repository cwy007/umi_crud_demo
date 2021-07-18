import React from 'react';
import { Table } from 'antd';
import { Link } from 'umi';

const index = () => {
  const columns = [
    {
      title: '课程类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '课程数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '课程地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <>
          <a target="blank" href={text}>
            查看课程
          </a>
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: { id: string }) => (
        <>
          <Link to={`/course/edit/${record.id}`}>编辑</Link> &nbsp;
          {/* <a onClick={() => handleRemove(record.id)}>删除</a> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

export default index;
