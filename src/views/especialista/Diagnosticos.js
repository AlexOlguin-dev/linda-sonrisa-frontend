import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaFileMedical, FaClinicMedical } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Diagnostico = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [pacientes, set_pacientes] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_pacientes()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_pacientes(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IitNaUY5VWpkbjlSWmIrUlBZSy9adFE9PSIsInZhbHVlIjoiVjE1YnJUZTV4WmhBK084ajdLeHpqdWhVcWx1WlFNeWVOQ2lvZy9pQTJybnRUSU0xbEROMEF2aWRUVVQ4UmVkRUJzSkt5VXltN2JhQ0JLTXlMKzJlV3RIN1JCMGRUeFFlUFZNZ21SWi9wOHJ0MHdtOUxTbDY2ajFuN2pka1NYV0wiLCJtYWMiOiJiNWVlZmJmZGM4ZTg4MDFmMTEyNDZhYzE2MGEwZWI0MDRiYjAwNzc1NzY0ZmM2MmNiOGY1ZjBmMjU1ZTY0YTUxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjgxOXZZcTJIZElMTWpzZk5GQ0RSaEE9PSIsInZhbHVlIjoiTjF0YVJJWVVybUUrYlpEamdxODBRcS80eGk0MW1iT2NYc3d5dDZvOVpnb2UrOUtienltWG5TcnRsbFBxODA1bjhmVnVjUlpQbE5qNE11VlVFVzNqaEhabWpKUWkydkJrVy93VG9Fd25jYVRCTUpHNGo3R3pPU0gyOTNmbEh4WjIiLCJtYWMiOiI3OWM2MGM5NWVkMTYxNDlkNzU1MjUxZDMxNDlkYjQ2MjY2ZDVjOGEwNzFkMWY5MWVkODdiNDM5MTI0ZGM2YjkzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_pacientes_segun_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_pacientes(result)
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  function render_pacientes(){
    return pacientes.map((item) => {
      return (
        <tr>
          <td>{item}</td>
          <td>{item}</td>
          <td>
            <Button variant="warning"><FaFileMedical /></Button>
          </td>
          <td>
            <Button variant="secondary"><FaClinicMedical /></Button>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Paciente</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el nombre del paciente.
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '50px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Pacientes</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Rut</th>
                      <th>Nombre Paciente</th>
                      <th>Diagnosticos</th>
                      <th>Tratamientos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_pacientes()}
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

export default Diagnostico;