import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaClinicMedical } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Tratamientos = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [pacientes, set_pacientes] = useState([]);
  const [tratamientos, set_tratamientos] = useState([]);
  const [showTratamientos, setShowTratamientos] = useState(false);
  const [rut_paciente, set_rut_paciente] = useState('');

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
        set_rut_paciente(rut_paciente)
        set_tratamientos(result)
        handleShowTratamientos()
      })
      .catch(error => console.log('error', error));
  }

  function get_tratamientos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlNNZVNjbzIwL2FOK0NlUVlRQ2xZMWc9PSIsInZhbHVlIjoiTXAybG1Sb0ZMQngrQmJGY1MxVmZsLzBiQlVvWGpCUHZ3bDB3YlM4eWNaK1JnRitNSnZpMUxBNFowaTYvUjlNRlgyUkkyNHJIQ1hpMmNpdW1NZjRrNUxmR1RSMnlWSm5FRE03UkZQcGpXNEVHY1ZsSUhFT0p4U0ZDTWdvOFlzZC8iLCJtYWMiOiJlYmVmZWVlZTFiYzI4M2FmZmExZDEwMmNlMWY4YTA5OTIxZjNlMDljOTVlNjM1MDIwY2U3NGM1NDc1OWIxNGMxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im5NdlAzUC9QS21JRWlZc1ZNVzVMd3c9PSIsInZhbHVlIjoic2ZDU1VIb2NVY1RGdENlM2paOVJUSW8yZ1h1czcvb3FFRG9FUUhuMVM0WkZmS3UwQ0FJdUcrOEVtUDBCTytjTnFKNEQxdHRVcTdVdGlmL1E1blVDOFE2YlRMTjFDbFQ3MVRkVDJmdnpqN2d1RUJYQURKS3c2UjZNUk5CWUZhT1YiLCJtYWMiOiI5ZTA0NjJmN2I3OTFhNDc2NTdiMWFjNDIwMjllZDgyYWRhZDZhNzk3ZjkwYjllNDNkYzkzMTZjMmM1NWNhYWUwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/tratamientos_agendados_segun_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos(result)
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

  function anular_tratamiento(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ikx6bkcrbit2QS9NTk5KZ2l6Ny9GMHc9PSIsInZhbHVlIjoia1pxK1VydjJ4L0RqWFN3ZGxjRGtCVU5OZWtVUFJuekxDblRiaTd4RHhndUhHWndOdmxINmJmVkRUWmpZRlF4c3V6dTc3TEo5bkE4bXRYSUo2NGRjM2w3eENsUkdoVkFKczdoY0xQbStLK2Q1elA3c0ljUXpSMlQwUUNzQVN6TkkiLCJtYWMiOiIyNmE1MGI0NTA5ZDM4NWVlMTBkYTA4YzY0ZTk2MmE5M2Q0NmVjZTAzYjc2OTVmMjFmYjhiMGJlOGRlZDRmODUzIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik1Pc2xVaUdPWG5yNitrNEZaOXpPU1E9PSIsInZhbHVlIjoiUURVb0xUd3NNd1NxQklrbmR0cFBxS1lkQTlZd0JLU05EYWxQU2dDa1g1aS9DQ25jUStJZFVUbHlVSGdNZkhpalVQSG5ZTkVkNXlYZkJ0VVQ3Z1ZNcitVTnBsNTY1YUhuZ0hSR1p2YVZ2dUdleWdGNHVGd0gzbGtBS2lnbGF2RkMiLCJtYWMiOiJhOWRkZDk0MjUxNmQyZDIxMGRiZmYzYjVjNzc3ZGJlM2ExMDIwNzc3OTAwMTllOGY2MTU5NzM3ZTc1YmY4NzdmIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/anular_tratamiento_agendado?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_tratamientos_paciente(rut_paciente)
        }else{
          alert("No se pudo anular el Tratamiento")
        }
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseTratamientos = () => setShowTratamientos(false);
  const handleShowTratamientos = () => setShowTratamientos(true);

  function render_pacientes(){
    return pacientes.map((item) => {
      return (
        <tr>
          <td>{item.rut_paciente}</td>
          <td>{item.nombre_paciente}</td>
          <td>
            <Button variant="secondary" onClick={() => get_tratamientos_paciente(item.rut_paciente)}><FaClinicMedical /></Button>
          </td>
        </tr>
      )
    })
  }

  function render_tratamientos(){
    return tratamientos.map((item) => {
      return (
        <tr>
          <td>{item.nombre_tratamiento}</td>
          <td>{item.fecha_cita_agendada}</td>
          <td>{item.hora_cita_agendada}</td>
          <td>{item.especialista}</td>
          <td>
            <Button variant="danger" onClick={() => anular_tratamiento(item.id)}>
              Anular
            </Button>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Tratamientos</Form.Label>
          <Form.Control type="text" onChange={(e) =>search_paciente(e.target.value)} />
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el nombre del tratamiento.
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '50px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Tratamientos</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Rut</th>
                      <th>Nombre Paciente</th>
                      <th>Tratamientos</th>
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
                <th>Hora Agendada</th>
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

export default Tratamientos;