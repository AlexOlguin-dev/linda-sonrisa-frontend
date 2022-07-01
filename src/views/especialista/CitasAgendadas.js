import React, { useState, useEffect, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaFileMedical, FaClinicMedical } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CitasAgendadas = props => {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control type="text" placeholder="Normal text" onClick={onClick} ref={ref} value={value}/>
  ));

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [citas_agendadas, set_citas_agendadas] = useState([]);
  const [showDiagnosticos, setShowDiagnosticos] = useState(false);
  const [showTratamientos, setShowTratamientos] = useState(false);
  const [showCitaNueva, setShowCitaNueva] = useState(false);
  const [rut_paciente, set_rut_paciente] = useState('');
  const [id_cita, set_id_cita] = useState('');
  const [descripcion, set_descripcion] = useState('');
  const [tratamientos, set_tratamientos] = useState([]);
  const [id_tratamiento, set_id_tratamiento] = useState('');
  const horas_existentes = ["08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","13:00 PM","13:30 PM","14:00 PM","14:30 PM","15:00 PM","15:30 PM","16:00 PM","16:30 PM","17:00 PM","17:30 PM","18:00 PM","18:30 PM","19:00 PM","19:30 PM","20:00 PM"]
  const [startDate, setStartDate] = useState(new Date());
  const [horas_reserva,set_horas_reserva] = useState([]);
  const [selected_date,set_selected_date] = useState('');
  const [rut_paciente_cita, set_rut_paciente_cita] = useState(''); 

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    list_citas_agendadas()
    get_tratamientos()
  },[])

  //FORMATOS------------------------------------------------------------------------------------------------
  function dateFormat(d){
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) { 
      day = '0' + day;
    }
    return [year, month, day].join('-')
  }

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function list_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImZ3WHpqa295S25QbEVMQkFoSjR4SEE9PSIsInZhbHVlIjoiQ0EwZFJqVEJYQXdpL1lCQ0N1NEZIWU8zSlhKNkd4dmxheHNpUlMxcEJEdnVpREI2UERveFVFWWtsVTVBVUtYSEdJVXI4OHV4R1phRlJZVUxvTVBac1UvU21QcGx5S01WYUdUUWpSVnpUeEI4TFFoV2RRbk1obXlPWEhhbjFPcE4iLCJtYWMiOiI4Y2JjYWZhZWYyY2E4YzBjYmQ1NGU4NWNkMjMyNjk0ODVlMDEyOWE5YjgwMWFjZDFhYjAyODBjOWY3MGU2NGUxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlBIb1ZjS2dRb2pobDZ0Y2w2Zk9YUmc9PSIsInZhbHVlIjoiejlTUGRRc04yOEhXUGJMVVBWU0JGSytCM0pyUXpQRHhLUEdXR0FyRlFCVWdFRlBxZnd3WFpYTmMxeWtzYVZoU011dHgrTy9oZUovOXJUSDBXNXRQaGUwbzV2MkN1MkZLVW15OHlpdmZuU2NtRXRuckVaTmxCYjdlVnlUT2xJRWQiLCJtYWMiOiI4YzVmOGE0YmY5NjQwNjI0YWY2NzAwNGEzYTI3Nzk1Nzg1NmFkOGIzMWQ5OGNhM2U4ZTkyOGI3M2IwNmNkNTMwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_citas_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  function crear_diagnostico(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkZ2ZzdRdzZwcjlwN2ZpVFFEbHdWYXc9PSIsInZhbHVlIjoienhYWWhPcHdrTHVwSWJUVVNYNHk1RzNqVGNDK2JDWHdvYWtxa2FydGh3eURJcWtQeXY3Uy9wWDdXQ2I3NGVJQ2NuSTNzWG11a1kwU0xMUjRwYUp2Nk85MVU1Q2ZXdUVLS29sK0ZtUmVWcjVaNDAvcERmcFdkd3hBek5LVXNYcXgiLCJtYWMiOiJjYzYyMmQwM2EzYzZjZDA3NDAyOTQ5YTdhN2IwNDVmMDM5YjRhMGYwZGNhMmQ4YzI3NTMwM2IzNWI1ZjBlN2U5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkZQVTEyb0ZHbTJ5aUN0N29PSUptK3c9PSIsInZhbHVlIjoiUWZ6SkpFZGJHdGtJMGpNeWlqcHI5VU9WQ1J2cTNyT3c2MXByNkx6VGRaeWhkY1RKbGpHMjhsdjdUUXRQRTc3MDdiOG1GT05WelBVZHp0QWVwV29ZUU5CckhZVzJ4TkxpbjVxUXdVaytCQkp6dC91Z1ZHc0VmQ2hoSFhkeGJZTWMiLCJtYWMiOiI4NWYxMjVlZDc5MzExNTE5NjQzYTdkMjEzZmRkMGE0NmJkMjdiOTFiZTBlYmIwOGEzMGU5OGM5OTgwNWVlZWUyIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/create_diagnostico?id_cita="+id_cita+"&descripcion="+descripcion, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          alert("Se ha creado el diagnostico")
          set_descripcion('')
          handleCloseDiagnosticos()
        }else{
          alert("No se pudo crear el diagnostico")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_tratamientos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Im1WNCtnVVB5RkduWG9XeHN1YWVnbHc9PSIsInZhbHVlIjoib24wVHl6dW4yWWNqYWFKSm1VZG1qcnJyWkpOSCtrN1NQN1hkZXpESmZHT3RtYTJjclI3WjdEaVRKc3pzODVRL0VwM0dRY1Zac1RBaXRvb0xIdHJyYXl4L3RlK2tsb1pXMEVSN09SQjRBYm5RbUxrQWVlYlI0VE1Hd25mcXlxL3IiLCJtYWMiOiI0MzY2YjI5ZWFkMmFiNjUxNzY2OTQ0ZjFlMmYxYzliN2E2NWRiYmIyMGZmYjIzOTNlNDJmODg2ODUwZDg3ZGE0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkQ0MHpDS0RxdTArS0cxOWRuZGNUQmc9PSIsInZhbHVlIjoieFJZS1Urb3NXNHo4UHp3K3A4YjU0TktreVluQmpWeXd0TklsRDgyQTZSVXh4UzN2amp1RFlEWHRab2h1YXBvUlhlb0djUlByRFRCcnpObFd5MDhWWnZLemlOdzM4S3lDdWxpdGpDRHRPbUZOYU9QR2FudDVVT043ekUwK04rWGIiLCJtYWMiOiJmMDgxYjBjYWFlNWU5YjViZDE4YjMwMmM0MjI4ZGExMDNmNDUwOTI4MzVkNGVlNmE5MTU0OTczZDNmM2M2NjJjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/tratamientos", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos(result)
      })
      .catch(error => console.log('error', error));
  }

  function open_diagnostico(rut,id){
    set_rut_paciente(rut)
    set_id_cita(id)
    handleShowDiagnosticos()
  }

  function open_tratamiento_agendado(rut,id){
    set_rut_paciente(rut)
    set_id_cita(id)
    handleShowTratamientos()
  }

  function crear_tratamiento_agendado(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InY0WnQ1a2Z1azhiUkkxaTloNnNkbnc9PSIsInZhbHVlIjoialZuSnBMZDcrNVVDTkREblJiYzJJT25MQ0Q4Nmk1N1RteTF6YlR6dG1oUk1nd1pvbU1lRmxoZnlvWWNRdDE2NTUvNnhXS043ZDJUVW4rVGp5alFxRzRHSTZsSDZyWGs3QVloOXVrY2hnWE5NT3UrQ2hnNEZjbVhZeFNGNFA0QnciLCJtYWMiOiJlODQ4ODhkZTQ2YWMwMzc5MDhhZTI2YjI4MWQ4MzM5MDFkOWQ2ZTYzMGZlMDg2MDZhNTVlNTkyZjhjMDYwNDdlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InBhTjcyYmI3ZkM5NER0UFNtVVJrU0E9PSIsInZhbHVlIjoiMFRvbmlweXZOZ09KTGFaUU1JUFVoWVNwbTkzVi8yaFIyRlBkclVjSmZOaThGemJCd3VzbUIzeUZwM2Q3V0ZvZ0NRdklrU05DbTMwQU5kc1lzamdHbWw4d2hLV0ZLdGprV3Jralc0UkN0UGNYTFg3WHQ5OElFWmhFSkpvU01jbFQiLCJtYWMiOiI0NGIwNzlmMmRlM2MxNjMxNGViNjkyZWUwODY2ZTYwOGJlMzQwZTIzMDMwMWJhMTFjZmU3MjljM2VkZmNiZWVjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/create_tratamiento_agendado?id_tratamiento="+id_tratamiento+"&id_cita="+id_cita, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          alert("Se ha agendado el tratamiento")
          handleCloseTratamientos()
        }else{
          alert("No se pudo agendar el tratamiento")
        }
      })
      .catch(error => console.log('error', error));
  }

  function search_cita_agendada(key_word){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Imxvc0ZmWjkvUVFpZzRsZ2I0ay8ybkE9PSIsInZhbHVlIjoiK0QweDhqS2tSNllhMFpIWC9FTnE4cDQvdWlCMTBKRHZnNk43UWdpWXVzemFJWFREc3J1SkdhUWR5aW1ERXZ0SHNrQ3ZtczBweXQrUm5rL3RiV1J0cUYyUElIRmxTRk5mV29tWTlYaklodzYrempnRm1jbVBwMEVMN1JuUDFTREUiLCJtYWMiOiI4OGM2MjQ3NDA4NjliNzE1NjBkNjcxOWI0MmNjZGUxNjZmZDY4NzVkYjM0ODFhYzYxOWU1ZDMyM2MxMGFmYzI2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlhMYmVtZHZBZHR3bSs3Q2pwZkVjUnc9PSIsInZhbHVlIjoiMFY0MjI4dlVUb0VNRGtIRlZ6bzliYjVnT2xhaHFnL0FGVFhRVjY5N1VqMUNhYlVhTGMwTTZYRE1iQTR2YmltcyttRjN3dHdBY2lJa3hUSmY0ZVlwOEd0UlhzT1ZLaVYrTmp3RnZ5UWd5NVpWMzBqM3F1Zk5tdyt4VFJyNWowL2oiLCJtYWMiOiJkOTVhMDljZmM1NmIwYmY3ZjIzZDFjMTJkOTY5OTIyYzBlYmIxZjkyZjM5OTRlMjAzZmI3ZWYyMzc1NjFkNmYzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/search_cita_agendada?rut="+key_word+"&rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkE3TXFRRGVhcTBMSUxFYzJCa0tQb3c9PSIsInZhbHVlIjoidktPaTA2MndwVVRlSTQwdnZ4VFJUblNTcGZBaXViOFllWWowV1lUU2pZSVZKTlR6bm9CUS9RdGFvQWdnbmRuckJsUndDZkJVTitESG9BeFhVbm5JUTVQVWpJakZ0QlkybitPTDdXSEswRzJXeWYvbG1VSmJ6ZCs1UDdoYUdrVnYiLCJtYWMiOiIxYmFjODE5MWJlMzlhNGExZmVmYTFkNGNjYmJhODBiNDllOTU0YjU1NzkwNDk4ODJhZGE2NTUxZjliYzU2M2RjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImJ1bXBGWWlKTmxqamV3RDZPOXZQSEE9PSIsInZhbHVlIjoiN1IvVUtwMy8wNjlqWXNOUUIzRzFNdFpkRzZLSXZkL3I1Q0RxZkdhS2R1REk5eFUvY09GMjBUdlRWUldUdFA5d0dRd3NOVHZOOTZkTmhaVGRNTzJUc3huV2VRN08zekhmSHN1V0N4WDd2bFBKellsem1vSDVzd2l1TFdFdFJBbkoiLCJtYWMiOiJjYTI5NTc4OWRkMWU1NWZhNjdiN2EwM2RiN2NhZjc5MDcxMWZjYWQxYjI4YzI3Yzg3MjI4NDJlZjU4NTA4NjBmIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/citas_tomadas?rut_especialista="+cookies.get('rut_odontologo')+"&fecha="+dateFormat(startDate), requestOptions)
      .then(response => response.json())
      .then(result => {
        var horas = [];
        var tomada = false;
        horas_existentes.forEach(hora_existente => {
          tomada = false
          result.forEach(hora_tomada => {
            if (hora_tomada.hora === hora_existente) {
              tomada = true
              horas.push({"hora": hora_existente,"reservada":true})
            }
          });
          if (!tomada) {
            horas.push({"hora": hora_existente,"reservada":false})
          }
        });
        set_horas_reserva(horas)
      })
      .catch(error => console.log('error', error));
  }

  function reservarHora(item){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlhmSFV2MDNZU2Z5SkE1SzdSU1Z4YkE9PSIsInZhbHVlIjoiMmwyclBLK3RKYUJPWW1uYTZoQmVIbDRrclB1eC9nazhNTWp1a08yVjRGSmQ0dTN3WXNkS203aUVLNWJOZmVIWGJRZ1RTdjhDSllRWjRPaTR4ZUVOZnBMMVlsbEJUdEd5VmJ0SnlKWEpTdU1Hcnh5YnI0OWZ5TWVGbmZsSWE3VFEiLCJtYWMiOiJiM2UxMjAzMjY2OTIzNzYwYzNhMzY2N2NhMjQ4YjQ2ZmFkNzNiOTAyMDllYjAzZTIyZTUxYWQwZGExYWM5YTI5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlA3VWIxWTFydXdxT0d2bUlzeU5UZWc9PSIsInZhbHVlIjoiVnYyYnNpMFkvZmJhb3NTOEJPaU9LTURBVnpwQi8zVFU5TWFqN2pBSGJuOGJZWFIreFFWZG1OY0x0OWVyMzVKVzJQWVRBME9iL24ya2pZcUhBRkJTTjIwbVU0a3o5Snc3VXg2QUNJUTNXalVmZkdHZXNla2RtUldJN0o0SzdKWDMiLCJtYWMiOiIwMjhhM2I1NWUyZDY5OGE1MWYzMGM5NmVhNzQ2NzU1MGQ4MTE1MmEwM2U1OGU1MTBiMTM3NmYyNjhjODY5ZGE1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/agendar_cita?fecha="+selected_date+"&hora="+item+"&rut_cliente="+rut_paciente_cita+"&rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          set_horas_reserva([])
          set_selected_date('')
          set_rut_paciente_cita('')
          list_citas_agendadas()
          handleCloseCitaNueva()
        }else{
          alert("Se produjo un error al almacenar la hora")
        }
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseDiagnosticos = () => setShowDiagnosticos(false);
  const handleShowDiagnosticos = () => setShowDiagnosticos(true);
  const handleCloseTratamientos = () => setShowTratamientos(false);
  const handleShowTratamientos = () => setShowTratamientos(true);
  const handleCloseCitaNueva = () => setShowCitaNueva(false);
  const handleShowCitaNueva = () => setShowCitaNueva(true);

  function select_tratamiento(e){
    set_id_tratamiento(e.target.value)
  }

  function render_citas_agendadas(){
    return citas_agendadas.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.rut_paciente}</td>
          <td>{item.nombre_paciente}</td>
          <td>{item.fecha}</td>
          <td>{item.hora}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="warning" onClick={() => open_diagnostico(item.rut_paciente,item.id)}><FaPlus /> Nuevo Diagnostico</Button>
          </ButtonGroup>
          </td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="secondary" onClick={() => open_tratamiento_agendado(item.rut_paciente,item.id)}><FaPlus /> Agendar Tratamiento</Button>
          </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  function render_tratamientos(){
    return tratamientos.map((item) => {
      return <option value={item.id}>{item.nombre}</option>
    })
  }

  function buscarHorasDisponibles(){
    if (rut_paciente_cita === '') {
      alert('Porfavor ingrese un rut antes de seleccionar una cita')
    }else{
      set_selected_date(dateFormat(startDate))
      get_citas_agendadas()
    }
  }

  function renderHorasDisponibles(){
    return horas_reserva.map((item) => {
      return <Row>
        <Col className="p-2">
          <Button variant="secondary" size="sm" onClick={() => reservarHora(item.hora)} disabled={item.reservada}>
            {item.hora}
          </Button>
        </Col>
      </Row>
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Paciente</Form.Label>
          <Form.Control type="text" onChange={(e) => search_cita_agendada(e.target.value)}/>
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el rut del paciente.
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '20px 50px 0px 50px' }}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShowCitaNueva}>
              <FaPlus /> Agendar Cita para Paciente
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '20px 50px 10px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Citas Agendadas</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Rut Paciente</th>
                      <th>Nombre Paciente</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Diagnosticos</th>
                      <th>Tratamientos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_citas_agendadas()}
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
            Diagnostico - {rut_paciente}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Diagnostico:</Form.Label>
              <Form.Control as="textarea" rows={6} onChange={(e) => set_descripcion(e.target.value)} value={descripcion} />
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDiagnosticos} >Close</Button>
          <Button variant="primary" onClick={crear_diagnostico}>
            Guardar Diagnostico
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL DIAGNOSTICOS */}

      {/** MODAL TRATAMIENTOS */}
      <Modal show={showTratamientos} onHide={handleCloseTratamientos}>
        <Modal.Header closeButton>
          <Modal.Title>Agendar Tratamiento - {rut_paciente}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Label>Selecciona un tratamiento</Form.Label>
          <Form.Select aria-label="Default select example" onChange={select_tratamiento} value={id_tratamiento}>
            <option>Selecciona un tratamiento</option>
            {render_tratamientos()}
          </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTratamientos}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={crear_tratamiento_agendado}>
            Agendar Tratamiento
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL TRATAMIENTOS */}

      {/** MODAL NUEVA CITA */}
      <Modal show={showCitaNueva} onHide={handleCloseCitaNueva}>
        <Modal.Header closeButton>
          <Modal.Title>Agendar una nueva cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rut Paciente</Form.Label>
            <Form.Control type="text" onChange={(e) => set_rut_paciente_cita(e.target.value)} value={rut_paciente_cita}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Fecha:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

          <Form.Group className="mb-3 d-grid gap-2">
            <Button variant="info" onClick={() => buscarHorasDisponibles()}>BUSCAR</Button>
          </Form.Group>

          {renderHorasDisponibles()}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCitaNueva}>
            Cancelar
          </Button>
          <Button variant="primary">
            Agendar Cita
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL NUEVA CITA */}
    </>
  )
}

export default CitasAgendadas;