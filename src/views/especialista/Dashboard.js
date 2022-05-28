import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { RESERVA_HORA_ESPECIALISTA, SOLICITUD_INSUMOS_ESPECIALISTA, CLIENTES_ESPECIALISTA, TRATAMIENTOS_AGENDADOS } from '../../commons/constants';
import CitasAgendadas from './CitasAgendadas';
import Diagnostico from './Diagnosticos';
import Tratamientos from './Tratamientos';
import SolicitudInsumos from './SolicitudInsumos';

const Dashboard = props => {
  const [route, setRoute] = useState(RESERVA_HORA_ESPECIALISTA);
  return(
    <>
      <div>
        <Row>
          <Col xs="2" style={{ minHeight: '600px' }}>
            {/*-----------------SIDEBAR--------------*/}
            <Navigation
              // you can use your own router's api to get pathname
              activeItemId={RESERVA_HORA_ESPECIALISTA}
              onSelect={item => {
                setRoute(item.itemId)
              }}
              items={[
                {
                  title: 'Mis Pacientes',
                  itemId: RESERVA_HORA_ESPECIALISTA,
                  subNav: [
                    {
                      title: 'Citas Agendadas',
                      itemId: RESERVA_HORA_ESPECIALISTA,
                    },
                    {
                      title: 'Pacientes y Diagnosticos',
                      itemId: CLIENTES_ESPECIALISTA,
                    },
                    {
                      title: 'Tratamientos Agendados',
                      itemId: TRATAMIENTOS_AGENDADOS,
                    }
                  ]
                },
                {
                  title: 'Solicitud de Insumos',
                  itemId: SOLICITUD_INSUMOS_ESPECIALISTA
                }
              ]}
            />
            {/*-----------------SIDEBAR--------------*/}
          </Col>
          <Col>
            {route === RESERVA_HORA_ESPECIALISTA &&
              <CitasAgendadas />
            }

            {route === CLIENTES_ESPECIALISTA &&
              <Diagnostico />
            }

            {route === TRATAMIENTOS_AGENDADOS &&
              <Tratamientos />
            }

            {route === SOLICITUD_INSUMOS_ESPECIALISTA &&
              <SolicitudInsumos />
            }
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard