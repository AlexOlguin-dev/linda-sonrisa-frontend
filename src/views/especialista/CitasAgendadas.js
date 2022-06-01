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
  const [startDate, setStartDate] = useState(new Date());

  //LOADERS---------------------------------FaPlus-----------------------------------------------------------------------
  useEffect(() => {
    list_citas_agendadas()
  },[])

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

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseDiagnosticos = () => setShowDiagnosticos(false);
  const handleShowDiagnosticos = () => setShowDiagnosticos(true);
  const handleCloseTratamientos = () => setShowTratamientos(false);
  const handleShowTratamientos = () => setShowTratamientos(true);

  function render_citas_agendadas(){
    return citas_agendadas.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.rut_paciente}</td>
          <td>{item.rut_especialista}</td>
          <td>{item.fecha}</td>
          <td>{item.hora}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="warning" onClick={handleShowDiagnosticos}><FaPlus /> Nuevo Diagnostico</Button>
          </ButtonGroup>
          </td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="secondary" onClick={handleShowTratamientos}><FaPlus /> Agendar Tratamiento</Button>
          </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Paciente</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el nombre del paciente.
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Citas Agendadas</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Paciente</th>
                      <th>Profesional</th>
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
            Diagnostico - "Nombre del usuario"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Diagnostico:</Form.Label>
              <Form.Control as="textarea" rows={6} />
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDiagnosticos} >Close</Button>
          <Button variant="primary">
            Guardar Diagnostico
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL DIAGNOSTICOS */}

      {/** MODAL TRATAMIENTOS */}
      <Modal show={showTratamientos} onHide={handleCloseTratamientos}>
        <Modal.Header closeButton>
          <Modal.Title>Agendar Tratamiento - "Nombre Paciente"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Label>Selecciona un tratamiento</Form.Label>
          <Form.Select aria-label="Default select example">
            <option></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>

          <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTratamientos}>
            Cancelar
          </Button>
          <Button variant="primary">
            Agendar Tratamiento
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL TRATAMIENTOS */}
    </>
  )
}

export default CitasAgendadas;