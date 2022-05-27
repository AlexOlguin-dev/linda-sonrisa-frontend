import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { PROFESIONAL, ADMINISTRATIVE, CLIENT, SERVICE, ORDER, PRODUCTOS, PROVEEDORES, ORDENES_PEDIDO, INVENTARY } from '../../commons/constants';
import Odontologos from './Odontologos';
import Administrativos from './Administrativos';
import Pacientes from './Pacientes';
import Tratamientos from './Tratamientos';


const Admin = () => {
  const [route, setRoute] = useState(PROFESIONAL);
  return (

    <div>
      <Row>
        <Col xs="2" style={{ minHeight: '600px' }}>
          {/*-----------------SIDEBAR--------------*/}
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId={PROFESIONAL}
            onSelect={item => {
              setRoute(item.itemId)

            }}
            items={[
              {
                title: 'Administración Usuarios',
                itemId: PROFESIONAL,
                subNav: [
                  {
                    title: 'Odontologos',
                    itemId: PROFESIONAL,
                  },
                  {
                    title: 'Administrativo',
                    itemId: ADMINISTRATIVE,
                  },
                  {
                    title: 'Cliente',
                    itemId: CLIENT,
                  },
                ],
                // title: 'Servicios',
                // itemId: SERVICE
              }, {
                title: 'Servicios',
                itemId: SERVICE,
              }, {
                title: 'Productos y Pedidos',
                itemId: PRODUCTOS,
                subNav: [
                  {
                    title: 'Productos',
                    itemId: PRODUCTOS,
                  },
                  {
                    title: 'Proveedores',
                    itemId: PROVEEDORES,
                  },
                  {
                    title: 'Ordenes de pedido',
                    itemId: ORDENES_PEDIDO,
                  },
                ],
              }, {
                title: 'Inventario',
                itemId: INVENTARY,
              }

            ]}
          />
          {/*-----------------SIDEBAR--------------*/}
        </Col>
        <Col>
          {route === PROFESIONAL &&
            <Odontologos/>
          }

          {route === ADMINISTRATIVE &&
            <Administrativos />
          }

          {route === CLIENT &&
            <Pacientes />
          }

          {route === SERVICE &&
            <Tratamientos />
          }

          {route === PRODUCTOS &&
            <>
            productos
            </>
          }

          {route === PROVEEDORES &&
            <>
            proveedores
            </>
          }

          {route === ORDENES_PEDIDO && 
            <>
            ordenes_pedido
            </>
          }

          {/*route === ORDER &&
            <><Row><Col xs="3">
              <Form.Select aria-label="proveedor" style={{ marginTop: "20px" }}>
                <option>Seleccione Proveedor</option>
                <option value="1">Juanito Cepillo</option>
                <option value="2">Mario Moreno Insumos</option>
                <option value="3">Aquiles Castro Insumos médicos</option>
              </Form.Select>,
              <Button variant="primary" style={{ marginTop: "10px" }}>Mostrar productos</Button>{' '}
            </Col></Row>
              <Row>
                <Col xs="5">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre Producto</th>
                        <th>Stock</th>
                        <th>Costo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>12</td>
                        <td>Cepillo cerdas duras</td>
                        <td>23</td>
                        <td>$2000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>10</td>
                        <td>Hilo dental</td>
                        <td>30</td>
                        <td>$3500</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>Gasa esterilizada</td>
                        <td>50</td>
                        <td>$4000</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" style={{ marginTop: "10px" }}>Agregar Productos</Button>{' '}
                </Col>
              </Row>
            </>
          */}

          {route === INVENTARY &&
            <Row><Col xs="6">
              <Card style={{ width: '70rem', marginLeft: "30px", marginTop: "20px" }}>

              <Card.Body>
                <Card.Title>Profesionales</Card.Title>
                <Card.Text>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre Producto</th>
                        <th>Stock</th>
                        <th>Proveedor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>12</td>
                        <td>Cepillo cerdas duras</td>
                        <td>23</td>
                        <td>Juanito Cepillito</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>10</td>
                        <td>Hilo dental</td>
                        <td>30</td>
                        <td>Juanito Cepillito</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>Gasa esterilizada</td>
                        <td>50</td>
                        <td>Aquiles Castro insumos médicos</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
            </Col></Row>
          }
    </Col>
      </Row >

    </div >
  );
};

export default Admin;