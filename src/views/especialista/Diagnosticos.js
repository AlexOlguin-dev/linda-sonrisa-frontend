import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Diagnostico = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------


  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------


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