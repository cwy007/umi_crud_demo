import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import styles from './index.scss';
import { Link } from 'umi';

const index = (props: { children: React.ReactNode }) => {
  return (
    <Layout className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth={0}>
        <div className="title">米修在线</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/course">课程记录</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">关于我们</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          header
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: '24px 16px', padding: 24, minHeight: 'max-content' }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>footer</Footer>
      </Layout>
    </Layout>
  );
};

export default index;
