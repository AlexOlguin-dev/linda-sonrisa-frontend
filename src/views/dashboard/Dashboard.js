import React, { Component } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class Dashboard extends Component{

  render(){
    return (
      <div className="dashboard-cliente">
        
        <Row style={{  }}>
          <Col xs="3">

            <ProSidebar>
              <Menu iconShape="square">
                <MenuItem >Dashboard</MenuItem>
                <SubMenu title="Components">
                  <MenuItem>Component 1</MenuItem>
                  <MenuItem>Component 2</MenuItem>
                </SubMenu>
              </Menu>
            </ProSidebar>

          </Col>
          <Col xs="9">

            <Row>
              <Col xs="4">

              <Form.Group className="mb-3">
                <Form.Label>Especialidad</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Seleccione una especialidad</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profesional</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Seleccione un profecional</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Seleccione una fecha</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 d-grid gap-2">
                <Button variant="info">BUSCAR</Button>
              </Form.Group>

              </Col>
            </Row>

          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;