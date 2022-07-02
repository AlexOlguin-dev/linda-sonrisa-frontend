import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import OdontologosPopulares from './charts/OdontologosPopulares';
import TratamientosPopulares from './charts/TratamientosPopulares';
import ProductosSolicitados from './charts/ProductosSolicitados';

const Informes = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [especialistas_populares_data, set_especialistas_populares_data] = useState([]);
  const [tratamientos_populares_data, set_tratamientos_populares_data] = useState([]);
  const [productos_populares_data, set_productos_populares_data] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_especialistas_populares()
    get_tratamientos_populares()
    get_productos_populares()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_especialistas_populares(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkppQnduVXlIenQ5RUN6RlhDYTRMcWc9PSIsInZhbHVlIjoiaW5IWGFzV0xhRnFPZjdUVmNOcjEzUGpwclRPc25yL0tyZ0NqeFNBZzlMRWhWcnArYnhUUitKZFlwVVhVeWN1aGp2TGJOSC9qUGdKY3pTT29VZkJKMU1vMzQwTkRYWVJvWWFUSFVIL21Pa3EvSGl0NnMvamZ6Uml5djk5Y01DVnIiLCJtYWMiOiI1NmMzZTNmYTUyNmRlMjkwZWE1NmY5MDY3ZTljNDE0ZDZlYjAxOWVjMDI5YWNkZWFiNTkxMWQ0MGRkMWQ3MzA2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik1GeS9HZWFUb1J3WENKNGo0Zm5GaEE9PSIsInZhbHVlIjoiZDNrUGxnaXFNTENvRmVhajF5V2hmZ1BrMkpRYjlCWHVMZU9yQXluUzNMVGRmaUpuQmlXN2h6ejNWbDUrSDV5YUZDQVFVWlBRQ0E4YmJkaXpKQUVxcU9sOWhjVXpjN3RWeGovanBucWt3dSs4TUdZdW55Mjl6d0FYcnhveXljN20iLCJtYWMiOiI1ZDVmMmE4NTJjNDdlMzczN2MzMzhhYTFlYmQzM2NhYWE1ZmZkODRiOGFiODFjYzJlOTkwZTE1NDc4YjIwZTk2IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/popular_odontologos", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_especialistas_populares_data(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_tratamientos_populares(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlNMZ2daaWlzVlBXVHRBTDRaeWt5SkE9PSIsInZhbHVlIjoiYytjTDAzSUJCR0ZaZ2V3ZGlqMkNXRk5HQnJ5N2N4cEZ3a28va3ZJdDhmdVlZcC9TM0k2L2FkVE8xbG1MMC8xeG9oZFJGL2ZqRDlhQ2FucFJLUWlXUWtDS1JWSlpiUXh1d2t2dHpnTlVMekRzU2tLK2dnSUdVZVlXZmxTbVpmTXEiLCJtYWMiOiIzY2IzMjQ0MGUyN2M5YThhZDcyZGEyNTlkYjE0OTliYmYzYjk0OTRmZDM0MGVmOTFjZGE3OWI5ZmQ3YjkxYWVjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ikdlckw2Q1BtelNEbDJpQW0zMmpZQlE9PSIsInZhbHVlIjoicjl3aUlOYzB0R2tjNU5VdXRwcCs4eWI3UGRhZXJDL0ZtOW9DS3hZU1RtZzIxTDBqUFN2Z3hzUG1PNjE1cWpCQjZFV1lPaGVFdThUanJjYnpUS0JQRnpoUi9kb2NyaDI0cElhNUs5UHdCQ1Q4bGNqcHRDcjVmWDJOVlVjN3dZc2UiLCJtYWMiOiJiMzJmYzc1ZjUyZDg2MDJjMzk0MzQzZmJhNjcyYTZiNzZmOTZlOTAxNjVjZTJmNWE4NWEwNThhNTFmNTIyMjAyIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/popular_tratamiento", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos_populares_data(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_productos_populares(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjRraURKalVYajlidCthVzlFYVQwSlE9PSIsInZhbHVlIjoidGhZbDhpTEdqdVd4L0tmb0RWN2pNR2RrN2xPV3cvMkVsbWlhbVBQbURYaXV4MnBIZ0NDNVk0U2NjRFpRREZNTlJ5Wld6VkVwTHZ5RTcxelg1ZTRVcXBsenM4RXZmZ1FCNzNhY3MrOVhPSHd3a3d2UEtnU3BLNUtoZHFlSWs0ZDMiLCJtYWMiOiJlM2M0MGQ5NDBhNDNiODk4YWE2NmU2NGM1MmIzZmU2MWFhZjUyNzQ3ODkyZTJkZDc2YzAxOWI2YmEyZjM5ZjAwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9ZYUczczIySlF4VlVrNENmVS9lVHc9PSIsInZhbHVlIjoiNkMrMVltU1NUNG1XWmxxckYrMW8xNElCZG8wdndqYWR3ZU9XT2tGY29aQW5UNXUxcHBqckNyL3hPbUo4UDhZK3FoYllUNUFYMHpCeDQxc1R3VGpsZGx2Kzhza1I3VUpSMGp4aDNVMVNjZnlJN3BiNWo1eDY5MlBYclZiMnRsN1AiLCJtYWMiOiI1YTVkMmZlZGRlNjBjMWQwODg4YmFhNGJjOTg4MzQyYjJkNGE4NWIxZTE2ZDRlMTVkMWIwYmM3ZGQzYzMyOTg0IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/popular_producto", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_productos_populares_data(result)
      })
      .catch(error => console.log('error', error));
  }

  return(
    <>
      <Row style={{ padding: '50px 50px 10px 50px' }}>
        <Col xs="6" style={{ textAlign: 'center' }}>
          <h3>Popularidad de Odontologos</h3>
          <OdontologosPopulares especialista={especialistas_populares_data} />
        </Col>
        <Col xs="6" style={{ textAlign: 'center' }}>
          <h3>Tratamientos mas usados</h3>
          <TratamientosPopulares tratamiento={tratamientos_populares_data}/>
        </Col>
      </Row>
      <Row style={{ paddingTop: '50px' }}>
        <Col style={{ textAlign: 'center' }}>
          <h3>Productos Solicitados</h3>
          <ProductosSolicitados producto={productos_populares_data} />
        </Col>
      </Row>
    </>
  )
}

export default Informes;