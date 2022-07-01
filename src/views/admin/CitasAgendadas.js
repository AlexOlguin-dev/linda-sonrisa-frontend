import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const CitasAgendadas = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [citas_agendadas, set_citas_agendadas] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    listar_citas_agendadas()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function listar_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkxTUnMyWWZOdldwSWk2RXhYNmtlQlE9PSIsInZhbHVlIjoiKzNtOFkzUjU5V2JnRVoyOGNLNXJnWGc0eVVKT2RFS0pjb2ZHbUhMUk5NUE5Va0lkOU1rMVk3UlhVMzVibGk2cDUzaW9Yem8yclZQWldnZGVLSDR5R3o5Wm03NzBLZ2R3SmE4Mkx5dG91SzVBRElDUVZZOGdYejVuTStSNnZpMmgiLCJtYWMiOiI4NjQwYzU4NGFjN2U1NTJiYTA2OWEyYjJmNGZhYTMzNDQwNWQwMmIxMDdjZmRjYmIyZGNhOTJhOWE5ZjQ2N2I5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9mV2xJV2R4Nm1KR2lJaWhjUE04R3c9PSIsInZhbHVlIjoid2pJYnlpcTNjNGNCS1BGa2hQWWtLZHlwMDJlOUNJaSs2eGRZOTdMd3BFNG9Na1NldFpmS204NzJDbUJOTCtIT2xkaWFWUmZIS1JnVmUzWi9adC9vdVdLUVp6UGo0M2hsMHNGUGpVcWQvL0VXSVUzUHA2Qll5dVFzZGRBOW1xa1IiLCJtYWMiOiI4MzhmZDIyMzRlNWE0MDA0OTllNTljNTE5NDU3YjZiZjFlZDZkNTYzOTJiY2E2MzdmZTU5NWIzOTZhYjIwZmJkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/all_citas", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  function delete_cita_agendada(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkhOR1VuVXFjSlFkcjhjWFQ1YVZ5aWc9PSIsInZhbHVlIjoiOG1yL0NEMzJFbHBlM1JlVk9PM0pJc2REekx6b012TTNXS1ZxYVZXd1BjZHdsS05RYnJJYXVlSzI1SFRMMVBkWE1tbDhKSFJESFlLZXJYc2lxUzFqWW5UWFN3YldaRUplWjBWRkNRaGFJTEttZ1ptUUNtK3VueHFRallsNkMrc3AiLCJtYWMiOiI3NmM1NThiMTdlNjdkNjYyNmZiNGQ1NGJjNWE5NGRmNWFlYTc1ODcxNDhmOTY2MWExYTlmMjY2NDQ5MDkyYjlkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InpnU0hmV2xJRTdMdTJHRTJaSzIzVXc9PSIsInZhbHVlIjoiY05PU0E4YjVrVEhFOUQ5MjRZN3BBeFVxdjRYSUthWGZnL3pvVGJlQmRxRzhBVFpCdGo2Y004M1I0Ym9SL2VkL2xVZS9FOUpYeVVLdlYyQnJ2VSt0YXhWK3NPaEdJS280ZVNycURKOVVjWHFvRDhrVmk5NUZSQnlNLzRibnBWbzgiLCJtYWMiOiI5NTkwNDIxNzczODI4NDEwY2QyZGE4YWZjYjc4N2ViODJlMDc0Njk0MjVkMTQ2M2Y3OWQyZGZmYTZiZmFlNGQ4IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_cita?id="+id, requestOptions)
      .then(response => response.text())
      .then(result => {
        listar_citas_agendadas()
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  function render_citas_agendadas(){
    return citas_agendadas.map((item)=>{
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.rut_paciente}</td>
          <td>{item.nombre_paciente}</td>
          <td>{item.nombre_especialista}</td>
          <td>{item.fecha}</td>
          <td>{item.hora}</td>
          <td>{item.estado}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => delete_cita_agendada(item.id)}><FaTrash size={15} /></Button>
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
                      <th>Rut Paciente</th>
                      <th>Nombre Paciente</th>
                      <th>Nombre Profesional</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
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