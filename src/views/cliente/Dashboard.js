import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import UserStore from '../stores/UserStore';

const Dashboard = props => {

  //VARIABLES-----------------------------------------------------------------------------------------------
  const [especialidades,set_especialidades] = useState([]);
  const [especialistas,set_especialistas] = useState([]);

  //LLAMADAS------------------------------------------------------------------------------------------------
  function get_especialidades(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlV4Y1FjQlN3Q0tOemRIUHYxTklxcHc9PSIsInZhbHVlIjoidUh0RW1MUUFYZ0hqSWpiTVdFd1MyMjJCYWVJRWp5Mm05VXc1VndVajdOcmJDZVYxSm9wdmJJTVFJVUpFOFJrMDI0SG93WDVYeDJMTnI3VnY2SERYWDZvRFZ6Z2dYeHA4RGpuNEh6ZXk3MkViZzY4OFM0ZlZGaTY5cSt6TEtYYmwiLCJtYWMiOiI1NzdjZTg5NWFjMGJlMDJkMGU1ODVhMWFlMWU1NjQxMzM0YjcxYmNmY2Y3MTk3NDVmZWQyNzgwMWFhOTk0OGE2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IldHM0UxUHFuOU5hZXhoekNLMkdjN1E9PSIsInZhbHVlIjoid2Z4bU5VV0FUdW8zSzltUDAxclZTaUQwVmJmR0hoaHhKbDhDRE5pVWc5Q1dFY0tVU1V1V3RiVUUxSmVJOWE0ekJiR3JCNVBNQ3NhUmxEcFBkbHY5TGQvZW1JbUEwY2lIYzMwN2tkVmJuVXVBQzNGRjI3Z0lFN2RDUVkvZytURG0iLCJtYWMiOiJmZjRjYjNjYTQwNzU2ODNlZTVkNjE1ZTExYjVkZWI4NDAwNmE1YmY5YTg4ZmJkM2Q2N2I3NzBhYThlYTgxZTgzIiwidGFnIjoiIn0%3D");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/especialidades", requestOptions)
      .then(response => response.json())
      .then(result => {
        UserStore.especialidades = result
        set_especialidades(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_especialistas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkhjMW9QY1E0dkpVMjlKR0VsOWRqaWc9PSIsInZhbHVlIjoieCsxS1pHN1E5OWVScVArZG5Ibzk1TCtIMTVCdWRFU1Bqa09RaGJJQ1JZOWZKUnlvZkVGOE50cmxCMWxpWjk1Z0d2MGF0cng3RnVTdzZnUmpQdjJSc21rR3Y0cjZxWnRINVZYV3hXZFVTRGh5VFFHL0I1a2F0UFlmV2NJQ3VUUWIiLCJtYWMiOiI0YWU1ZmUwZDJiOWZjZDhiNjczNDI2NzY1ZTBjNjgyOWUyYmNhZWQ4OWU1MTdmMjhhYTY0OTYxMzU1MWRjOTI0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkxiTXVhSXU3Ums0QU9sVk5VZnpwaWc9PSIsInZhbHVlIjoicDJuVGd2Z3R4UHVySEx2OXp5aURBRHZ4UTZZVUdjUU1rWktidE5WRGRiWHpxOWsxb0ZUaXpKUFdhK3VnVFFxWGVUcU4vWlNmd1B5VVdNM3ZmOVFZZWNaOUc2VTg2cTFvMHdkSXRKaFh3eWhTak9zeEgzY2J3YkRPT3hPV0FBMXoiLCJtYWMiOiI5MmEyY2Q4YThjMDVlYTNjZjQ4ZTlhNzI1NWUyZDIyNTEzM2M5ZWM4YzczZjgzOGIxNzNiNWQxYmFjMjUzYzQ0IiwidGFnIjoiIn0%3D");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/especialistas", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_especialistas(result)
      })
      .catch(error => console.log('error', error));
  }

  //LOADERS--------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_especialidades()
    get_especialistas()
  },[]);

  useEffect(() => {
  },[especialidades]);

  useEffect(() => {
  },[especialistas]);

  //RENDERIZACION SELECT ------------------------------------------------------------------------------------
  function render_especialidades(){
    if (especialidades.length !== 0) {
      return especialidades.map((value) => {
        return <option value={value.id}>{value.nombre}</option> 
      })
    }
  }

  function render_especialistas(){
    if (especialistas.length !== 0) {
      return especialistas.map((value) => {
        return <option value={value.rut}>{value.nombre_completo}</option> 
      })
    }
  }

  return(
    <>
    <div className="dashboard-cliente">

    <Row>
      <Col xs="4" className="p-5">

        <Form.Group className="mb-3">
          <Form.Label>Especialidad</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Seleccione una especialidad</option>
            {render_especialidades()}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profesional</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Seleccione un profecional</option>
            {render_especialistas()}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col className="mb-4">
              Año
            </Col>
            <Col className="mb-4">
              Mes
            </Col>
            <Col className="mb-4">
              Dia
            </Col>
          </Row>
          <Row>
            <Col className="mb-4">
              <Form.Select aria-label="Default select example">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </Form.Select>
            </Col>
            <Col className="mb-4">
              <Form.Select aria-label="Default select example">
                <option value="01">Enero</option>
                <option value="02">Febrero</option>
                <option value="03">Marzo</option>
                <option value="04">Abril</option>
                <option value="05">Mayo</option>
                <option value="06">Junio</option>
                <option value="07">Julio</option>
                <option value="08">Agosto</option>
                <option value="09">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </Form.Select>
            </Col>
            <Col className="mb-4">
              <Form.Select aria-label="Default select example">
                <option value="2022">01</option>
                <option value="2023">02</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3 d-grid gap-2">
          <Button variant="info">BUSCAR</Button>
        </Form.Group>

        </Col>
        <Col className="p-5">

          <h1>Citas disponibles</h1>
          <h3>Fecha: xx-xx-xxxx</h3>

          <Card style={{ width: '10rem' }}>
            <Card.Body>
              <Card.Text>
                8:00 AM
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '10rem' }}>
            <Card.Body>
              <Card.Text>
                9:00 AM
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '10rem' }}>
            <Card.Body>
              <Card.Text>
                10:00 AM
              </Card.Text>
            </Card.Body>
          </Card>

        </Col>
      </Row>

    </div>
    </>
  )
}

export default Dashboard;