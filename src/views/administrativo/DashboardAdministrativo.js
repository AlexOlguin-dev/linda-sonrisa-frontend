import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Table, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { CLIENT, ORDENES_PEDIDO, CITAS_AGENDADAS, CLIENTE, BOLETA } from '../../commons/constants';
import Recepcion from './Recepcion';
import Boletas from './Boleta';
import RecepcionPedido from './RecpecionPedido';

const DashboardAdministrativo = () => {
    const [route, setRoute] = useState(CLIENT);

    return (
      <div>
        <Row>
          <Col xs="2" style={{ minHeight: '600px' }}>
            {/*-----------------SIDEBAR--------------*/}
            <Navigation
              // you can use your own router's api to get pathname
              activeItemId={CLIENT}
              onSelect={item => { setRoute(item.itemId) }}
              items={[
                {
                  title: 'Clientes',
                  itemId: CLIENT,
                  subNav: [
                    {
                      title: 'Recepción pacientes',
                      itemId: CLIENT,
                    },
                    {
                      title: 'Boleta',
                      itemId: BOLETA,
                    }
                  ]
                },{
                  title: 'Recepción de Pedidos',
                  itemId: ORDENES_PEDIDO,
                }
              ]}
            />
            {/*-----------------SIDEBAR--------------*/}
          </Col>
          <Col>
          {route === CLIENT &&
            <Recepcion />
          }
          {route === BOLETA &&
            <Boletas />
          }
          {route === ORDENES_PEDIDO &&
            <RecepcionPedido />
          }
          </Col>
        </Row>
      </div >
    );
};

export default DashboardAdministrativo;