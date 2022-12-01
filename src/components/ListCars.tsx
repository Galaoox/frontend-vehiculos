import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { Car } from '@models/car.model';
import { Search } from '@services/cars.service';

import { createElement, useState } from 'react';
import FiltersSearch from './FiltersSearch';
import ItemCar from './ItemCar';
import '@styles/ListCars.scss';
import { Button, Empty, Pagination, Space } from 'antd';
import ModalFormCar from './ModalFormCar';
import { PlusCircleOutlined } from '@ant-design/icons';


function ListCars() {
  const { callEndpoint } = useFetchAndLoad();
  const limit = 8;
  const [filters, setfilters] = useState({})
  const initialValuesPagination = {
    maxPage: 1,
    next: 1,
    page: 1,
    total: 8
  }

  const [pagination, setPagination] = useState<any>(initialValuesPagination);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);


  const [listCars, setListCars] = useState<Car[]>([])

  const onSearch = async (_filters: any) => {
    setfilters(_filters);
    setPagination(initialValuesPagination)
    await search(_filters, initialValuesPagination);
  }

  const handleChangePagination = async (page: number, pageSize: number) => {
    const _pagination = { ...pagination, page };
    await search(filters, _pagination);
  }



  const closeModal = async (val: boolean) => {
    setVisibleForm(false);
  }

  const handleAdd = () => {
    setVisibleForm(true);
  }

  const search = async (filtersData: any, paginationData: any) => {
    const { data: { data, info } } = await callEndpoint(Search({
      ...filtersData,
      options: {
        page: paginationData.page,
        limit
      }
    }));
    setListCars(data);
    setPagination(info);
  }


  return (<div>

    <FiltersSearch onSearch={onSearch} />
    <Space style={styles.containerButtons} className='container-buttons'>
      <Button icon={createElement(PlusCircleOutlined)} htmlType="button" onClick={handleAdd}>Crear vehiculo</Button>
    </Space>

    <div id="container-grid-cars">

      {
        listCars.map((car: Car) => (
          <ItemCar data={car} key={car.id} />
        ))
      }

    </div>
    {
      listCars.length ? (
        <div className='container-buttons'>
          <Pagination onChange={handleChangePagination} defaultCurrent={pagination.page} total={pagination.total} pageSize={limit} />
        </div>
      ) : (
        <Empty description="No se encontraron resultados" />
      )
    }

    {
      visibleForm && (<ModalFormCar closeModal={closeModal} visible={visibleForm} />)
    }
  </div>

  )
}

const styles = {
  containerButtons: {
    marginBottom: '1rem',
  }
}

export default ListCars;