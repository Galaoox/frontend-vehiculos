import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { Car } from '@models/car.model';
import { Search } from '@services/cars.service';

import { useState } from 'react';
import FiltersSearch from './FiltersSearch';
import ItemCar from './ItemCar';
import '@styles/ListCars.scss';
import { Pagination } from 'antd';


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
    <div id="container-grid-cars">

      {
        listCars.map((car: Car) => (
          <ItemCar data={car} key={car.id} />
        ))
      }

    </div>
    {
      listCars.length ? (
        <div id="container-pagination">
          <Pagination onChange={handleChangePagination} defaultCurrent={pagination.page} total={pagination.total} pageSize={limit} />
        </div>
      ) : null
    }
  </div>

  )
}

export default ListCars;