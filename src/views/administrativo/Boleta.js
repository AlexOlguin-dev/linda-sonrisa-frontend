import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Table, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Boletas = () => {

    //VARIABLES------------------------------------------------------------------------------------------------------
    const [boletas, set_boletas] = useState([]);

    //FORMATOS------------------------------------------------------------------------------------------------

    //LOADERS--------------------------------------------------------------------------------------------------------
    useEffect(() => {
      get_boletas()
    },[])
    
    //LLAMADAS-------------------------------------------------------------------------------------------------------
    function get_boletas(){
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlFpaGNWWU5JYndxdzhBb3h0YW1jUHc9PSIsInZhbHVlIjoid1dDcjQ1MW9sZ0s0eWs5MmtPZ3VYTWpxcTRmenBMYWZ0TWRObnlqRm1tMjZYMG42bmt5SDhvRHR4Nmt2bzl3dWEwMVFoYkQrbm9LUXoyRFVmSXVvNFJxMW1vZ3Z2aHJ1a2RFRC9xV080bEQwR3F5dUorUlVwUU90Q25RcWUvREYiLCJtYWMiOiIwZWMzNjE1MGU1OTIwN2Q2MTc5OTVlMzU0ZTljN2ZmZWFjZWRiMzJkOGFlMzg1Y2MxMjI2MjE3YWVjODJjNDlkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Inc0TjN2TkJiZ2Juc2JYdFBLTFR1WUE9PSIsInZhbHVlIjoiaG9GdEtKQUtBc1BmME42eXZ6U3pWSXBWM0FjNEVHRkRvbGhrVDhTY0ZzRjdNK0dqZVJXUU91Q2NLcWZwaEhBcCttZHYvZnZkL0R5L2FZZEZEb0lURnBLMWZTZ041bGFXVEljaGU0bDBybXJlVWFWUXhEQlZ1TFhtVVVUdnk2Uk8iLCJtYWMiOiJhM2U0ZTUzMjQyOGEyNWI0ZWJkMDliZjMxZWU4ZDBiMTAyYTMxMzJmNzQwNzY2YjE1N2FiZDQ1MjJmY2ZhZmNkIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/get_all_boletas", requestOptions)
        .then(response => response.json())
        .then(result => {
          set_boletas(result)
        })
        .catch(error => console.log('error', error));
    }

    //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
    function render_boletas(){
      return boletas.map((item) => {
        return (
          <tr>
            <td>{item.id_boleta}</td>
            <td>{item.paciente_rut}</td>
            <td>{item.paciente_nombre}</td>
            <td>{item.fecha}</td>
            <td>{item.total_a_pagar}</td>
            <td>{item.medio_de_pago}</td>
            <td>{item.prevision}</td>
          </tr>
        )
      })
    }
    
    return (
      <div>
        <Row>
          <Col style={{ padding: '50px 50px 50px 50px' }}>
            <Card>
              <Card.Body>
                <Card.Title>Pacientes</Card.Title>
                <Card.Text>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Rut Paciente</th>
                        <th>Nombre Paciente</th>
                        <th>Fecha y Hora</th>
                        <th>Monto</th>
                        <th>Medio de pago</th>
                        <th>Previsión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {render_boletas()}
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
};

export default Boletas;