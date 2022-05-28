import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const CitasAgendadas = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------


  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------


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