import { Button, Card, Col, Form, Row, Select, Space } from 'antd'
import { useEffect, useState } from 'react';
const { Option } = Select;

import "@styles/FiltersSearch.scss";
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { getLists, getLinesByBrand } from '@services/cars.service';
import { useAsync } from '@hooks/useAsync';


function FiltersSearch({ onSearch }: { onSearch: (filters: any) => void }) {
    const [form] = Form.useForm();

    const { callEndpoint } = useFetchAndLoad();

    const [listStates, setListStates] = useState([]);
    const [listYears, setListYears] = useState<number[]>([]);
    const [listBrands, setListBrands] = useState([]);
    const [listLines, setListLines] = useState([]);
    const [brandIsSelected, setBrandIsSelected] = useState<boolean>(false);

    const _getLists = async () => await callEndpoint(getLists());

    const onFinish = async (values: any) => {
        onSearch(form.getFieldsValue());
    };

    const generateListYears = () => {
        const currentYear = new Date().getFullYear();
        const listYears = [];
        for (let i = currentYear + 1; i >= 1950; i--) {
            listYears.push(i);
        }
        return listYears;
    }

    const adaptElementoMenu = (data: any) => {
        setListStates(data.listStates);
        setListYears(generateListYears());
        setListBrands(data.listBrands);
    }

    const _getLinesByBrand = async (brandId: number) => {
        const list = await callEndpoint(getLinesByBrand(brandId));
        setListLines(list.data);
    };
    const handleChangeBrand = (value:any) => {
        if(value){
            _getLinesByBrand(value);
        }
        form.setFieldValue('lineId', null);

        setBrandIsSelected(!!value);
    }

    useAsync(_getLists, adaptElementoMenu, () => { });



    return (
        <Card id="card-filter-search">
                    <Form
                    
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                        id="container-form"
                        initialValues={{
                            stateId: null,
                            year: null,
                            brandId: null,
                            lineId: null
                        }}
                    >
                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} md={{ span: 4 }}>
                                <Form.Item name='stateId' label="Estado:" fieldId="stateId" >
                                    <Select style={{ width: '100%' }}
                                        showSearch
                                        optionFilterProp="children"
                                        allowClear
                                        placeholder="Seleccione un estado"
                                    >
                                        {listStates.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 4 }}>
                                <Form.Item name='year' label="Modelo:" fieldId="year">
                                    <Select style={{ width: '100%' }}
                                        showSearch
                                        optionFilterProp="children"
                                        allowClear
                                        placeholder="Seleccione un año"
                                    >

                                        {listYears.map((item: number) => (<Option key={item} value={item}>{item}</Option>))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 4 }}>
                                <Form.Item name='brandId' label="Marca:" fieldId="brandId">
                                    <Select style={{ width: '100%' }}
                                        showSearch
                                        optionFilterProp="children"
                                        allowClear
                                        onChange={handleChangeBrand}
                                        placeholder="Seleccione una marca"
                                    >

                                        {listBrands.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 4 }}>
                                <Form.Item name='lineId' label="Linea:" fieldId='lineId' >
                                    <Select style={{ width: '100%' }}
                                        showSearch
                                        optionFilterProp="children"
                                        allowClear
                                        disabled={!brandIsSelected}
                                        placeholder="Seleccione una linea"
                                    >

                                        {listLines.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 4 }} style={{ display: 'flex' }}>
                                <Space direction="vertical" style={{ width: '100%', margin: 'center' }}>
                                    <Button type="primary" htmlType='submit' block >
                                        Buscar
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Form>
2        </Card>
    )
}

export default FiltersSearch