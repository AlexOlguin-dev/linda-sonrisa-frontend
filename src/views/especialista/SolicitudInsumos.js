import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const SolicitudInsumos = props => {

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
              <Card.Title>Solicitudes</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cantidad</th>
                      <th>Estado Solicitud</th>
                      <th>Productos Solicitados</th>
                      <th>Tratamiento</th>
                      <th>Estado</th>
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

export default SolicitudInsumos;