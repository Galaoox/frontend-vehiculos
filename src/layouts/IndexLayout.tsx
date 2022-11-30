import { LoadingOutlined } from '@ant-design/icons';
import ListCars from '@components/ListCars';
import { useLoading } from '@hooks/useLoading';
import '@styles/IndexLayout.scss';
import { Layout, Spin, Typography } from 'antd';
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'green' }} spin />;

function IndexLayout() {
  const { loading } = useLoading();
  return (
    <Spin size='large' spinning={loading} indicator={antIcon} style={{zIndex: 10004}} >
    <Layout>
      <Header>
      <Title  level={1} style={{ color: '#fff' }} >Prueba tecnica</Title>
      </Header>
      <Content id='container-content'>
        <ListCars/>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    </Spin>
  )
}

export default IndexLayout
