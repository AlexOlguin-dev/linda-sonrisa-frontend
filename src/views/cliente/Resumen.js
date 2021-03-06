import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import Cookies from 'universal-cookie';
import { FaCalendar, FaPrint } from 'react-icons/fa';
//import PdfComponent from './PDF/PdfComponent';
import jsPDF from 'jspdf';

const cookies = new Cookies();

const Resumen = props => {

  //VARIABLES-----------------------------------------------------------------------------------------------
  const [nombre_especialista,set_nombre_especialista] = useState('');
  const [nombre_especialidad,set_nombre_especialidad] = useState('');

  //LOADERS--------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_data_especialista()
    get_data_especialidad()
  },[]);

  //LLAMADAS------------------------------------------------------------------------------------------------
  function get_data_especialista(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjVhVUFGUkRKWjgwNHloRTVoaHYyMEE9PSIsInZhbHVlIjoiMEM5SUVtL01McHh5b3EwSEs2UkJQV0RxR1VLMWViTTJqMUtockRDSkFrNTU3ODFCbUtTNFk3NUYzSk5NL3dndG5hSmFpcjVva0J3NUhzb095ckxBUmQvSUdVMUdZWXZZbWlFaUs3QmVKK0hqRnh4TG8wekgvNG43dG1Rd0xBem0iLCJtYWMiOiJhZWFlYmYzY2VmNWQzYzZjY2QzMjgwOWFhMmMzYzE1MmU1MjI0ZTVjYjFiMGVlMWY4NzcyMzg5NTQ1OTQ1OWU2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjBSVWVmeEJCYUNpdHZpd3VSSENpenc9PSIsInZhbHVlIjoiZWRSdEVFeE81UWc1OHQ2VkZ0T2d6Qm1TRndOZHl1UDhuNEZRSjBBZjdMSEwzd3BUVzA2ajM2RHFuYkNoRXBnb2E2RFhPNVlJODRPbWlVN3hGejB5cEZoTllNMlFkQStjSHRaM2JpZkl6SXlGNTlBOHlOMDRseEZYTFZxRFE1YlEiLCJtYWMiOiJiZGVmZTNlMGZjMjBlYTYyNzM4N2EzYmM4NzZlZGRlM2E1NTZhN2E4YzFlMTNiNmIxNDVlOTE5Y2Y4YTY0ZTA0IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/nombre_especialistas?rut="+cookies.get('CLIENTE_rut_especialista'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_nombre_especialista(result.nombre_completo)
      })
      .catch(error => console.log('error', error));
  }

  function get_data_especialidad(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlVyd01Qdy9tazQ0aUl4SUVDZWVkV1E9PSIsInZhbHVlIjoiRXdNN3YycUJQb1FzTWhVN3ljVGgzZUk0cldmVzBJbUpZY09pdEJDb05pZ1Z6L0tRYXd1WEthWDNaRElncEd6TGp1UEhES09FUm16a3dhcXZVR2NxM0lSUWJKZlgvTmxRYW9wbG91OTRQVTFPemlvVGQ3Q3NPM3AwYlczUW4wS1AiLCJtYWMiOiJhYmRhMDk0MWZlYTJiNWZhNzVjMjI3ZDJjYjc2YjU2YzQ5ZTkxNDYyOTljYmRlNWY1NTFiYWNjNDc2OWYyMDlkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlZST3hXbFVaa1ZwU0QrUVI5b09ybWc9PSIsInZhbHVlIjoiY2xPeG5LdW1teDZXMzZZRk1iUEZRWE9DNzBJVmVodjZTSERsYytVWVAvY2FCVWNMZm5OWHpYQXF0M2E2WkxBNW1TVXdVNUgzMkZHMDk4cjVDRU1KTGkyc0NxYkw3KzZrWnltVGkvV2xnS2Zwc2xSUmZRMGxOelp2ckFEZ2d2MHkiLCJtYWMiOiI5NDFlNTI3OWQ5YWQwNGNjYTNkNjRjNDFiYjIyZTRkOTM2YmY1Y2ZhMDE1NDU4OGQwM2ExMzc4NTRkYmM5Y2EwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/nombre_especialidad?id_especialidad="+cookies.get('CLIENTE_id_especialidad'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_nombre_especialidad(result[0].nombre)
      })
      .catch(error => console.log('error', error));
  }

  //FUNCIONES-----------------------------------------------------------------------------------------------
  function aceptar_cita(){
    cookies.remove('CLIENTE_fecha_cita_agendada')
    cookies.remove('CLIENTE_hora')
    cookies.remove('CLIENTE_id_especialidad')
    cookies.remove('CLIENTE_rut_especialista')
    window.location.href="./dashboard_cliente"
  }

  function PDFgenerate(){
    var doc = new jsPDF('landscape','px','a4','false');
    doc.text(40,60,'TICKET DE ATENCI??N');
    doc.line(40,70,550,70,'S');
    doc.text(40,90,nombre_especialista);
    doc.text(40,105,nombre_especialidad);
    doc.text(40,120,cookies.get('CLIENTE_fecha_cita_agendada')+" "+cookies.get('CLIENTE_hora'));
    doc.text(40,135,cookies.get('nombre_paciente') + " " + cookies.get('apellido_paciente'));
    doc.save('ticket_atencion_'+cookies.get('rut_cliente')+'.pdf');
  }

  return(
    <>
    <div className='p-5' style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className="text-center w-50">
        <Card.Header>
          <Card.Title>TICKET DE ATENCI??N</Card.Title>
        </Card.Header>
        <Card.Body>
          
          <Card.Text>
            <Row>
              <Col className="fs-4 text">{nombre_especialista}</Col>
            </Row>
            <Row>
              <Col className="fs-6 text">{nombre_especialidad}</Col>
            </Row>
            <Row>
              <Col className="p-2"><FaCalendar size={30} color={"#2E64FE"}/></Col>
            </Row>
            <Row>
              <Col className="fs-3 text text-primary">{cookies.get('CLIENTE_fecha_cita_agendada')} {cookies.get('CLIENTE_hora')}</Col>
            </Row>
            <Row>
              <Col className="fs-4 text">{cookies.get('nombre_paciente') + " " + cookies.get('apellido_paciente')}</Col>
            </Row>
          </Card.Text>
          
          <Row>
            <Col xs={1}>
              {/*<PdfComponent />*/}
              <Button variant="outline-primary" onClick={PDFgenerate}><FaPrint /></Button>
            </Col>
            <Col xs={11}>
              <Button variant="primary" style={{ marginRight: '70px' }} onClick={() => aceptar_cita()}>ACEPTAR</Button>
            </Col>
          </Row>
          
        </Card.Body>
      </Card>
    </div>
    </>
  )
}

export default Resumen;