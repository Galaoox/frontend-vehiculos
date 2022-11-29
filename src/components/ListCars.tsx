import { Car } from '@models/car.model';
import { Card, List, Col, Row, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

function ListCars() {
  const GenerateMockData = () => {
    const data: any = [];

    for (let i = 0; i < 23; i++) {
      data.push(new Car({
        id: i,
        state: `new`,
        averagePrice: 1000,
        brand: 'Toyota',
        line: 'Corolla',
        year: 2019,
      }));

    }
    return data;

  }
  const [listCars, setListCars] = useState<Car[]>(GenerateMockData())





  return (<>
    <Row>
      <Col flex={2}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat, id soluta blanditiis tenetur magnam nesciunt quo officiis assumenda veniam. Officia id voluptas incidunt sed laboriosam odio atque sint odit. Veniam.</Col>
      <Col flex={3}>
        <List
          grid={{
            gutter: 12,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 6,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={listCars}
          renderItem={(item) => (
            <List.Item>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://via.placeholder.com/150"
                  />
                }>
                  <Title  level={5} >{item.line}</Title>
              </Card>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  </>

  )
}

export default ListCars;