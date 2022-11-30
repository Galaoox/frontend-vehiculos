import { Car } from '@models/car.model';
import { List, Col, Row } from 'antd';

import { useState } from 'react';
import FiltersSearch from './FiltersSearch';
import ItemCar from './ItemCar';


function ListCars() {
  const GenerateMockData = () => {
    const data: any = [];

    for (let i = 0; i < 23; i++) {
      data.push(new Car({
        id: i,
        state: i % 2 === 0 ? 'Nuevo' : 'Usado',
        averagePrice: 1290000,
        brand: 'Toyota',
        line: 'Corolla',
        year: 2019,
      }));

    }
    return data;

  }
  const [listCars, setListCars] = useState<Car[]>(GenerateMockData())





  return (<>

    <FiltersSearch />
    <List
      grid={{
        gutter: 12,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 4,
        xl: 4,
      }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={listCars}
      renderItem={(item) => <ItemCar data={item} key={item.id} />}
    />
  </>

  )
}

export default ListCars;