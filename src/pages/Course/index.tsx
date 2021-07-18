import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { Link } from 'umi';
import axios from 'axios';

const { Search } = Input;

const index: React.FC<any> = () => {
  const [datas, setDatas] = useState([]);
  const [keyword, setKeyword] = useState<string>('');

  const getData = async (params?: any) => {
    const res = await axios.get('/api/courseList', { params });
    if (res && res.data && res.data.datas) {
      setDatas(res.data.datas);
    }
  };
  useEffect(() => {
    getData({ keywords: keyword });
  }, [keyword]);

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

  const onSearch = (text: string) => {
    setKeyword(text);
    getData({ keywords: text });
  };

  return (
    <div>
      <Search
        placeholder="请输入搜索的课程名称"
        onSearch={onSearch}
        style={{ width: 200 }}
      />

      <Table
        columns={columns}
        dataSource={datas}
        rowKey={(datas: { id: string }) => datas.id}
      />
    </div>
  );
};

export default index;
