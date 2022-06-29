import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { PROFESIONAL, ADMINISTRATIVE, CLIENT, SERVICE, CITAS_AGENDADAS, PRODUCTOS, PROVEEDORES, ORDENES_PEDIDO, INVENTARY, INFORMES } from '../../commons/constants';
import Odontologos from './Odontologos';
import Administrativos from './Administrativos';
import Pacientes from './Pacientes';
import Tratamientos from './Tratamientos';
import Productos from './Productos';
import Proveedores from './Proveedores';
import OrdenesPedido from './OrdenesPedido';
import CitasAgendadas from './CitasAgendadas';
import Inventario from './Inventario';
import Informes from './Informes';

const Admin = () => {
  const [route, setRoute] = useState(CLIENT);
  return (

    <div>
      <Row>
        <Col xs="2" style={{ minHeight: '600px' }}>
          {/*-----------------SIDEBAR--------------*/}
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId={CLIENT}
            onSelect={item => {
              setRoute(item.itemId)

            }}
            items={[
              {
                title: 'Administración Usuarios',
                itemId: CLIENT,
                subNav: [
                  {
                    title: 'Paciente',
                    itemId: CLIENT,
                  },
                  {
                    title: 'Odontologos',
                    itemId: PROFESIONAL,
                  },
                  {
                    title: 'Administrativo',
                    itemId: ADMINISTRATIVE,
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
                title: 'Citas Agendadas',
                itemId: CITAS_AGENDADAS,
              }, {
                title: 'Inventario',
                itemId: INVENTARY,
              }, {
                title: 'Informes',
                itemId: INFORMES,
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
            <Productos />
          }

          {route === PROVEEDORES &&
            <Proveedores />
          }

          {route === ORDENES_PEDIDO && 
            <OrdenesPedido />
          }

          {route === CITAS_AGENDADAS &&
            <CitasAgendadas />
          }

          {route === INVENTARY &&
            <Inventario />
          }

          {route === INFORMES &&
            <Informes />
          }
    </Col>
      </Row >

    </div >
  );
};

export default Admin;