import { Button, Card, Col, Form, Row, Select, Space } from 'antd'
import { useState } from 'react';
const { Option } = Select;

import "@styles/FiltersSearch.scss";


function FiltersSearch() {
    const [form] = Form.useForm();

    const [listStates, setListStates] = useState([]);
    const [listYears, setListYears] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [listLines, setListLines] = useState([]);




    const onFinish = async (values: any) => {

        form.resetFields();
    };
    return (
        <Card id="card-filter-search">
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                id="container-form"
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='stateId' label="Estado:" >
                            <Select style={{ width: '100%' }} >
                                {listStates.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='year' label="Modelo:">
                            <Select style={{ width: '100%' }} >

                                {listYears.map((item: number) => (<Option key={item} value={item}>{item}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='brand' label="Marca:">
                            <Select style={{ width: '100%' }} >

                                {listBrands.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='line' label="Linea:">
                            <Select style={{ width: '100%' }} >

                                {listLines.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 4 }} style={{display:'flex'}}>
                        <Space direction="vertical" style={{ width: '100%', margin: 'center' }}>
                            <Button type="primary" block >
                                Buscar
                            </Button>
                        </Space>
                    </Col>



                </Row>

            </Form>
        </Card>
    )
}

export default FiltersSearch