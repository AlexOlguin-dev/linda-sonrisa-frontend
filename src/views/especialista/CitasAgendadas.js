import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CitasAgendadas = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [citas_agendadas, set_citas_agendadas] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    list_citas_agendadas()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function list_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImZ3WHpqa295S25QbEVMQkFoSjR4SEE9PSIsInZhbHVlIjoiQ0EwZFJqVEJYQXdpL1lCQ0N1NEZIWU8zSlhKNkd4dmxheHNpUlMxcEJEdnVpREI2UERveFVFWWtsVTVBVUtYSEdJVXI4OHV4R1phRlJZVUxvTVBac1UvU21QcGx5S01WYUdUUWpSVnpUeEI4TFFoV2RRbk1obXlPWEhhbjFPcE4iLCJtYWMiOiI4Y2JjYWZhZWYyY2E4YzBjYmQ1NGU4NWNkMjMyNjk0ODVlMDEyOWE5YjgwMWFjZDFhYjAyODBjOWY3MGU2NGUxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlBIb1ZjS2dRb2pobDZ0Y2w2Zk9YUmc9PSIsInZhbHVlIjoiejlTUGRRc04yOEhXUGJMVVBWU0JGSytCM0pyUXpQRHhLUEdXR0FyRlFCVWdFRlBxZnd3WFpYTmMxeWtzYVZoU011dHgrTy9oZUovOXJUSDBXNXRQaGUwbzV2MkN1MkZLVW15OHlpdmZuU2NtRXRuckVaTmxCYjdlVnlUT2xJRWQiLCJtYWMiOiI4YzVmOGE0YmY5NjQwNjI0YWY2NzAwNGEzYTI3Nzk1Nzg1NmFkOGIzMWQ5OGNhM2U4ZTkyOGI3M2IwNmNkNTMwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_citas_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  function render_citas_agendadas(){
    return citas_agendadas.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.rut_paciente}</td>
          <td>{item.rut_especialista}</td>
          <td>{item.fecha}</td>
          <td>{item.hora}</td>
          <td>
          <ButtonGroup size="sm">
            {/*<Button variant="danger"><FaTrash size={15} /></Button>
            <Button variant="info"><FaEdit size={15} /></Button>*/}
          </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Citas Agendadas</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Paciente</th>
                      <th>Profesional</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_citas_agendadas()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CitasAgendadas;