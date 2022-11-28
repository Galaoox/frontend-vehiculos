import { useLoading } from '@hooks/useLoading';
import { Layout, Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'green' }} spin />;

function IndexLayout() {
  const { loading } = useLoading();
  return (
    <Spin size='large' spinning={loading} indicator={antIcon} style={{zIndex: 10004}} >
    <Layout>
      <Header>Header</Header>
      <Content>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque quam aliquam illum, necessitatibus, non saepe a voluptate nobis molestias nam dolorum officiis eveniet blanditiis. Harum reprehenderit necessitatibus possimus veritatis esse?</Content>
      <Footer>Footer</Footer>
    </Layout>
    </Spin>
  )
}

export default IndexLayout
