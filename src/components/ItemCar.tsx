import { Car } from '@models/car.model';
import { Card, List,  Typography } from 'antd';
const { Title, Text } = Typography;
import "@styles/ItemCar.scss";


export default function ItemCar({ data: {averagePrice, brand, line, state, year, image} } : {data: Car}) {
  return (
    <Card
      cover={
        <img
          alt="Imagen de un automovil"
          src={image}
          className='img-car'
        />
      }>
        <Title  level={5} style={{ margin: 0 }} >{brand.name} - {line.name}</Title>
        <Text strong>Modelo {year} {state.name}</Text>
        <Title  level={4} style={{ margin: 0 }} >{`$ ${averagePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Title>
    </Card>
  )
}
