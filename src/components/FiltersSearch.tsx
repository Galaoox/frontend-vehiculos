import { Button, Card, Col, Form, Row, Select, Space } from 'antd'
import { useState } from 'react';
const { Option } = Select;

import "@styles/FiltersSearch.scss";
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { getLists, getLinesByBrand } from '@services/cars.service';
import { useAsync } from '@hooks/useAsync';


function FiltersSearch() {
    const [form, setform] = useState<any>({
        stateId: null,
        year: null,
        brandId: null,
        lineId: null
    })
    const { loading, callEndpoint } = useFetchAndLoad();

    const [listStates, setListStates] = useState([]);
    const [listYears, setListYears] = useState<number[]>([]);
    const [listBrands, setListBrands] = useState([]);
    const [listLines, setListLines] = useState([]);

    const _getLists = async () => await callEndpoint(getLists());


    const onFinish = async (values: any) => {
        console.log(form);
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

    const handleChangeForm = (name:string) => {
        return (value:string) =>  {

            if(name === 'brandId'){
                _getLinesByBrand(Number(value)).then(()=> {
                    setform({
                        ...form,
                        [name]: value,
                        lineId: null
                    })
                    console.log(form);
                });

            }else{
                setform({
                    ...form,
                    [name]: value
                })
            }
        }

    }

    useAsync(_getLists, adaptElementoMenu, () => { });

    return (
        <Card id="card-filter-search">
            <Form
                layout="vertical"
                onFinish={onFinish}
                id="container-form"
                onChange={(val) => console.log(val)}
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='stateId' label="Estado:" fieldId="stateId" >
                            <Select style={{ width: '100%' }}
                                showSearch
                                optionFilterProp="children"
                                allowClear
                                value={form.stateId}
                                onChange={handleChangeForm('stateId')}
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
                                value={form.year}
                                onChange={handleChangeForm('year')}
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
                                value={form.brandId}
                                onChange={handleChangeForm('brandId')}
                                placeholder="Seleccione una marca"
                            >

                                {listBrands.map((item: any) => (<Option key={item?.id} value={item?.id}>{item?.name}</Option>))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item name='lineId' label="Linea:" fieldId='lineId'  >
                            <Select style={{ width: '100%' }}
                                showSearch
                                optionFilterProp="children"
                                allowClear
                                value={form.lineId}
                                disabled={!form.brandId}
                                onChange={handleChangeForm('lineId')}
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
        </Card>
    )
}

export default FiltersSearch