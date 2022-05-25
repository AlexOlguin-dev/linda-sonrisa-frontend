import React, { useState } from 'react';
import { Table, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { PROFESIONAL, ADMINISTRATIVE, CLIENT, SERVICE, ORDER, INVENTARY } from '../../commons/constants';


const Admin = () => {
  const [route, setRoute] = useState(PROFESIONAL);
  return (

    <div>
      <Row>
        <Col xs="2">
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
                    title: 'Profesionales',
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
                title: 'Pedidos',
                itemId: ORDER,
              }, {
                title: 'Inventario',
                itemId: INVENTARY,
              }


            ]}
          />
        </Col>
        <Col>
          {route === PROFESIONAL &&
            <Card style={{ width: '70rem', marginLeft: "30px", marginTop: "20px" }}>

              <Card.Body>
                <Card.Title>Profesionales</Card.Title>
                <Card.Text>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cargo</th>
                        <th>Número de contacto</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Juan</td>
                        <td>Figueroa Veloso</td>
                        <td>Odontologo Cirujano</td>
                        <td>569 3245 5454</td>
                        <td>jfigueroa@gmail.com</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Mario</td>
                        <td>Burgos Perez</td>
                        <td>Oontologo</td>
                        <td>569 7654 0404</td>
                        <td>maburgosp@gmail.com</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Michael</td>
                        <td>Evans Vanhauten</td>
                        <td>Jefe de Odontologos</td>
                        <td>569 6932 5592</td>
                        <td>mevanhauten@gmail.com</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          }

          {route === ADMINISTRATIVE &&
            <Card style={{ width: '70rem', marginLeft: "30px", marginTop: "20px" }}>
              <Card.Body>
                <Card.Title>Administrativos</Card.Title>
                <Card.Text>
                  <Table responsive="md">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cargo</th>
                        <th>Número de contacto</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mike</td>
                        <td>Wazowski</td>
                        <td>Recepcionista</td>
                        <td>569 9424 1234</td>
                        <td>mwasowski@gmail.com</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Edward</td>
                        <td>Sullivan</td>
                        <td>Recepcionista</td>
                        <td>569 9235 1245</td>
                        <td>esullivan@gmail.com</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Berto</td>
                        <td>Anvorgueso</td>
                        <td>Junior Ejecutivo</td>
                        <td>569 3461 7451</td>
                        <td>banvorgueso@gmail.com</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          }

          {route === CLIENT &&
            <Card style={{ width: '70rem', marginLeft: "30px", marginTop: "20px" }}>
              <Card.Body>
                <Card.Title>Clientes</Card.Title>
                <Card.Text>
                  <Table responsive="lg">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Rut</th>
                        <th>Número de contacto</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Berlini</td>
                        <td>Nohacenadi</td>
                        <td>17118394-k</td>
                        <td>569 2343 4935</td>
                        <td>bnohacenadi@gmail.com</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Papita</td>
                        <td>Duquesa</td>
                        <td>18334304-k</td>
                        <td>569 4856 2353</td>
                        <td>pduquesa@gmail.com</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Arwen</td>
                        <td>Ibáñez Albornoz</td>
                        <td>17293434-k</td>
                        <td>569 2343 9760</td>
                        <td>arwenibal@gmail.com</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          }

          {route === SERVICE &&
            <>
              <Row><Col xs="3">
                <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                  <Card.Img variant="top" src={require("../Images/extraccion.jpg")} />
                  <Card.Body>
                    <Card.Title>Extracción de pieza dental</Card.Title>
                    <Card.Text>
                      Este es uno de los tratamientos dentales más utilizados, ya que a medida que va pasando el tiempo,
                      muchas veces se necesita extraer algunas piezas bucales, ya sea por infección o porque genera molestia o malestar.

                      Lo que suele llevar a cabo este proceso de extracción suele ser dolores intensos en los terceros molares,
                      inflamación de encías, malocusión, surgimiento de quistes o infecciones bucales.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
                <Col xs="3">
                  <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                    <Card.Img variant="top" src={require("../Images/blanqueamiento.jpg")} />
                    <Card.Body>
                      <Card.Title>Blanqueamiento Dental</Card.Title>
                      <Card.Text>
                        Este es otro procedimiento para conseguir el blanco natural de tus dientes. Para ello utilizamos
                        una férula a medida que se ajustará a la  dentadura del paciente y aplicamos el agente blanqueador
                        (gel de peróxido de carbamida o de hidrógeno) a la dentadura.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col >
                  <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                    <Card.Img variant="top" src={require("../Images/implante.jpg")} />
                    <Card.Body>
                      <Card.Title>Implante dental</Card.Title>
                      <Card.Text>
                        Se acude a este tipo de tratamiento dental cuando necesitamos sustituir piezas bucales a causa de infecciones o caída de las mismas.
                        Los implantes dentales se hacen con el fin de que sean a largo plazo, de tal forma que se intenta no crear
                        ningún malestar al paciente después de su colocación.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          }

          {route === ORDER &&
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
          }

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