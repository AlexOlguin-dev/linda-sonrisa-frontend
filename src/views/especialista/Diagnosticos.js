import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaFileMedical, FaClinicMedical } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Diagnostico = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [pacientes, set_pacientes] = useState([]);
  const [showDiagnosticos, setShowDiagnosticos] = useState(false);
  const [showTratamientos, setShowTratamientos] = useState(false);
  const [diagnosticos, set_diagnosticos] = useState([]);
  const [tratamientos, set_tratamientos] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_pacientes()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_pacientes(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IitNaUY5VWpkbjlSWmIrUlBZSy9adFE9PSIsInZhbHVlIjoiVjE1YnJUZTV4WmhBK084ajdLeHpqdWhVcWx1WlFNeWVOQ2lvZy9pQTJybnRUSU0xbEROMEF2aWRUVVQ4UmVkRUJzSkt5VXltN2JhQ0JLTXlMKzJlV3RIN1JCMGRUeFFlUFZNZ21SWi9wOHJ0MHdtOUxTbDY2ajFuN2pka1NYV0wiLCJtYWMiOiJiNWVlZmJmZGM4ZTg4MDFmMTEyNDZhYzE2MGEwZWI0MDRiYjAwNzc1NzY0ZmM2MmNiOGY1ZjBmMjU1ZTY0YTUxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjgxOXZZcTJIZElMTWpzZk5GQ0RSaEE9PSIsInZhbHVlIjoiTjF0YVJJWVVybUUrYlpEamdxODBRcS80eGk0MW1iT2NYc3d5dDZvOVpnb2UrOUtienltWG5TcnRsbFBxODA1bjhmVnVjUlpQbE5qNE11VlVFVzNqaEhabWpKUWkydkJrVy93VG9Fd25jYVRCTUpHNGo3R3pPU0gyOTNmbEh4WjIiLCJtYWMiOiI3OWM2MGM5NWVkMTYxNDlkNzU1MjUxZDMxNDlkYjQ2MjY2ZDVjOGEwNzFkMWY5MWVkODdiNDM5MTI0ZGM2YjkzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_pacientes_segun_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_pacientes(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_diagnosticos_paciente(rut_paciente){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InFST1NLUFZjajZLTUVjdnE4Ym4wd0E9PSIsInZhbHVlIjoiaGs3L2Zxanl6Tll6RmJ2NG11Vm51eXc0R3ZlMXFnSHBCOWdrdHVORlVsemJubUdKdFk1a2duOC9xbnZSUDdZbkVKOW5hc0Vsa0lTdEF6SmlXcDBUZ2VSd0lxZ0RYZHN5eUp3ZzJzMUFPcHk3UlJnQWVCY0tqMHBwV1ExTHNBODkiLCJtYWMiOiI1YThkMjg2NTdmNjhhZjJkYjc4OWM1NzE4ODJiNjFjZjM3ODYwZTdjODdjOWZlODA3ZWU3MDFkZGI3ODk5ZGExIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Imh6K3FUb1NaTXJteGY1dUdiUmxYNXc9PSIsInZhbHVlIjoibGNaQk5la1JTN0hiNlgrbk1UYm1wRWZhVlVKc3NSY2FKejJCOVhpTVJlbTVUc1lKN2xsb2RNdUFDck5kbFpiNmhzU1RxT1ppQTBobzd3c3B0STdtUTZzVWtkSW5qMk9Helc0Z2RFQWdaVENEZVlzZUFlT2NPVzcxeGtrcXozNEciLCJtYWMiOiJlZWM5MjkyNjNmNTcyZmZhYWUxMDM0NjEyOGVhNDJhYmQxMjdjN2ZhNGU4ZWQ0NGZkMmJiYTM5ZjBiZmNmNDJjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/list_diagnosticos_paciente_especialista?rut_paciente="+rut_paciente, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_diagnosticos(result)
        handleShowDiagnosticos()
      })
      .catch(error => console.log('error', error));
  }

  function get_tratamientos_paciente(rut_paciente){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlpWa0hDR0pueXVHWjFaeng5aG1yaGc9PSIsInZhbHVlIjoiWkl0VzF2N3pKaVk0bk1oQmlsY284eU5ZT0ZSWlFDajFVcDlrYmFJaGZWcmVIOVZETG1ONVpDWTVLV1BSejY0SEhyeDlGaDdLZzJENmY1RWMyTThPUjJkbFF1RGNvWkpMckh5NTJ0akppVE41cHVoVmtzMmQ4TWl4Sm53TEhhaTgiLCJtYWMiOiI2YTk5ZjM5NmZkMDJkODk2NWQxOGFiNzU4OTZhNzE1MGZlZWYwZmU1YjdmNTgwYzdlMGIwNjNjMWY1YzU5NjU0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9ILzY1R3U0b1kyT1JwSFBzeHMzL0E9PSIsInZhbHVlIjoiQ3A0WHJSc2F0L0RzMVR1eERFMU1IeFk0eCtHTnBvMjNyM1lEREVVWUF2RTdNMFVCcFZsUlBYb092MEFvSEovUHNlaVpRSzlVNExNRU85dG00REpFSUozWG15SUxlTUx1VEg1Wk1xcVUrbnVxeXFtNGVtWEdCbkVZNlNta1RiSnYiLCJtYWMiOiIwYjY5MjJlNjFlYzE0YTk5N2U3ZTM3NTQyOGY3ZDk5YWQ2OTU3OTAxZTlhZTgzODQyZGE3MGRlY2RhOTlmY2JjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/list_tratamientos_paciente?rut_paciente="+rut_paciente, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos(result)
        handleShowTratamientos()
      })
      .catch(error => console.log('error', error));
  }

  function search_paciente(key_word){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlNPRjJOM2R0RU1OU2U0eXhoVVp1bGc9PSIsInZhbHVlIjoibFNwWjVTWEt1NzluQ094ZkQ3YnhBWHNWR1ozbmdaWmorWlJEcDBjWUtTWWY1eUt5NndtN1E0VDBjMUdrM1B4WEEycVk5Tm1uNTB4V1g5NXBacHU0NW03M2lLL0N3anllTi9icXRYNUVqZS9LVkdsbnY4QVVKUnhtWDA4T1IzbVEiLCJtYWMiOiJiOGFiNGFiMmU4MTNmOWYwM2Q4Y2QzNTM3Yjk5OTYyNTQ2YjNkYWQ2MzUyMTkzODUwZDFiNGVmZWJkOWI3OTNlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFhZ2YwMFdudHZhbzZhS3I4akZPRXc9PSIsInZhbHVlIjoiR1Fjb2lvdmQ4TFpLUEkrNXdWcHFpeGdHem5nNlBpYlVVMmVlUnBseVRQWDdBQXk0cDJuRWxlcWxlWkV0M3VmbWpSc1drY0crdTFrUGtWaTVEdE16c2VBTks4UEJlV0FuRFQycjNGZ3lwWFVMWm5scndJN290eitvaytmU09URXQiLCJtYWMiOiI2NzQ4ZWI1OTc4OTNlNjVkOGFhZjI4MDQ5OTU4ZmJiNTBkMjY4YWJmNzMwMmQyM2VmZWFjNzg3YjQ3MWNmOGUyIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/search_paciente?rut="+key_word+"&rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_pacientes(result)
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseDiagnosticos = () => setShowDiagnosticos(false);
  const handleShowDiagnosticos = () => setShowDiagnosticos(true);
  const handleCloseTratamientos = () => setShowTratamientos(false);
  const handleShowTratamientos = () => setShowTratamientos(true);

  function render_pacientes(){
    return pacientes.map((item) => {
      return (
        <tr>
          <td>{item.rut_paciente}</td>
          <td>{item.nombre_paciente}</td>
          <td>
            <Button variant="warning" onClick={() => get_diagnosticos_paciente(item.rut_paciente)}><FaFileMedical /></Button>
          </td>
          {/*<td>
            <Button variant="secondary" onClick={() => get_tratamientos_paciente(item.rut_paciente)}><FaClinicMedical /></Button>
          </td>*/}
        </tr>
      )
    })
  }

  function render_diagnosticos(){
    return diagnosticos.map((item) => {
      return (
        <tr>
          <td>{item.fecha_cita_agendada}</td>
          <td>{item.hora_cita_agendada}</td>
          <td>{item.especialista}</td>
          <td>{item.descripcion}</td>
          <td></td>
        </tr>
      )
    })
  }

  function render_tratamientos(){
    return tratamientos.map((item) => {
      return (
        <tr>
          <td>{item.id_tratamiento}</td>
          <td>{item.id_cita_agendada}</td>
          <td>{item.id_cita_agendada}</td>
          <td></td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Paciente</Form.Label>
          <Form.Control type="text" onChange={(e) =>search_paciente(e.target.value)} />
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el rut del paciente.
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
                    </tr>
                  </thead>
                  <tbody>
                    {render_pacientes()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL DIAGNOSTICOS */}
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showDiagnosticos} onHide={handleCloseDiagnosticos}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Diagnosticos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table responsive="sm">
            <thead>
              <tr>
                <th>Fecha Cita Agendada</th>
                <th>Fecha Hora</th>
                <th>Especialista</th>
                <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
              {render_diagnosticos()}
            </tbody>
          </Table>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDiagnosticos} >Close</Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL DIAGNOSTICOS */}

      {/** MODAL TRATAMIENTOS */}
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showTratamientos} onHide={handleCloseTratamientos}>
        <Modal.Header closeButton>
          <Modal.Title>Tratamientos agendados</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table responsive="sm">
            <thead>
              <tr>
                <th>Tratamiento</th>
                <th>Fecha Agendada</th>
                <th>Especialista</th>
                <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
              {render_tratamientos()}
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTratamientos}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL TRATAMIENTOS */}

    </>
  )
}

export default Diagnostico;