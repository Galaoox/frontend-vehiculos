import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { Car } from '@models/car.model';
import { createCar, getLinesByBrand, getLists, uploadImageCar } from '@services/cars.service';
import { getBase64 } from '@utilities/file-upload.utility';
import { Modal, Button, Form, Input, Row, Col, Select, InputNumber } from 'antd';
import { FC, useEffect, useState } from 'react';

const { Option } = Select;

interface ModalFormCarProps {
    closeModal: (result: any) => void;
    visible: boolean;
}



const ModalFormCar: FC<ModalFormCarProps> = ({ closeModal, visible }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [listStates, setListStates] = useState([]);
    const [listYears, setListYears] = useState<number[]>([]);
    const [listBrands, setListBrands] = useState([]);
    const [listLines, setListLines] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [brandIsSelected, setBrandIsSelected] = useState<boolean>(false);


    const _getLists = async () => await callEndpoint(getLists());


    const create = async (data: Car) => {
        return await callEndpoint(createCar(data));
    };

    const uploadImage = async (id: number) => {
        if (id && selectedFile) {
            const file = await getBase64(selectedFile);
            if (file) {
                const data = { image: file }
                await callEndpoint(uploadImageCar(id, data));
            }
        }
    }

    const handleSubmit = async () => {
        try {
            let result = await form.validateFields();
            result.averagePrice = Number(result.averagePrice);
            const resultCreate = await create(result);
            const id = resultCreate.data.id;
            await uploadImage(id);
            closeModal(true);
        } catch (e) {
            console.log(e);
        }
    }




    const rulesForm = {
        stateId: [{ required: true, message: 'El estado es requerido' }],
        brandId: [{ required: true, message: 'La marca es requerida' }],
        averagePrice: [{ required: true, message: 'El valor es requerido' }],
        lineId: [{ required: true, message: 'La Linea es requerida' }],
        year: [{ required: true, message: 'El año es requerido' }],
    }



    const _getLinesByBrand = async (brandId: number) => {
        const list = await callEndpoint(getLinesByBrand(brandId));
        setListLines(list.data);
    };

    const generateListYears = () => {
        const currentYear = new Date().getFullYear();
        const listYears = [];
        for (let i = currentYear + 1; i >= 1950; i--) {
            listYears.push(i);
        }
        return listYears;
    }

    const adaptLists = (data: any) => {
        setListStates(data.listStates);
        setListYears(generateListYears());
        setListBrands(data.listBrands);
    }


    useAsync(_getLists, adaptLists, () => { });

    const handleChangeBrand = (value: any) => {
        if (value) {
            _getLinesByBrand(value);
        }
        form.setFieldValue('lineId', null);

        setBrandIsSelected(!!value); 
    }


    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <Modal
            forceRender
            visible={visible}
            title={'Crear vehiculo'}
            onCancel={closeModal}
            footer={[
                <Button key="back" htmlType='button' onClick={closeModal}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" htmlType='button' onClick={handleSubmit}>
                    Guardar
                </Button>,
            ]}
            destroyOnClose={true}
            maskClosable={false}
        >

            <Form

                layout="vertical"
                form={form}
                id="container-form"
            >
                <Row gutter={16}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item name='stateId' label="Estado:" fieldId="stateId" rules={rulesForm.stateId} >
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

                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item name='year' label="Modelo:" fieldId="year" rules={rulesForm.year}>
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

                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item name='brandId' label="Marca:" fieldId="brandId" rules={rulesForm.brandId}>
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

                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item name='lineId' label="Linea:" fieldId='lineId' rules={rulesForm.lineId} >
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

                    <Col xs={{ span: 24 }} >
                        <Form.Item name='averagePrice' label="Precio promedio:" fieldId='averagePrice' rules={rulesForm.averagePrice} >

                            <InputNumber
                            style={{ width: '100%' }}
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>



                    <Col xs={{ span: 24 }} >
                        <Form.Item label="Imagen:" >
                            <Input type={'file'} onChange={changeHandler} />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>
    )
}

export default ModalFormCar