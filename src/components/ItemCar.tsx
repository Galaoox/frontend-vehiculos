import { Car } from '@models/car.model';
import { Card, List,  Typography } from 'antd';
const { Title, Text } = Typography;
import "@styles/ItemCar.scss";



function ItemCar({ data: {averagePrice, brand, id, line, state, year} } : {data: Car}) {
  return (
    <List.Item>
    <Card
      cover={
        <img
          alt="Imagen de un automovil"
          src="https://via.placeholder.com/150"
          className='img-car'
        />
      }>
        <Title  level={5} style={{ margin: 0 }} >{brand} - {line}</Title>
        <Text strong>Modelo {year} {state}</Text>
        <Title  level={4} style={{ margin: 0 }} >${averagePrice}</Title>
    </Card>
  </List.Item>
  )
}

export default ItemCar