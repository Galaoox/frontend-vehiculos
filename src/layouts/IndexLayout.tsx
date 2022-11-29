import { useLoading } from '@hooks/useLoading';
import { Layout, Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ListCars from '@components/ListCars';
import '@styles/IndexLayout.scss';

const { Header, Footer, Sider, Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'green' }} spin />;

function IndexLayout() {
  const { loading } = useLoading();
  return (
    <Spin size='large' spinning={loading} indicator={antIcon} style={{zIndex: 10004}} >
    <Layout>
      <Header></Header>
      <Content id='container-content'>
        <ListCars/>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    </Spin>
  )
}

export default IndexLayout
