import React, { useState, useEffect, forwardRef, useSyncExternalStore } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Odontologos = props => {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control type="text" placeholder="Normal text" onClick={onClick} ref={ref} value={value}/>
  ));

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [odontologos, set_odontologos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [rut, set_rut] = useState('');
  const [rut_confirm, set_rut_confirm] = useState('');
  const [nombre_completo, set_nombre_completo] = useState('');
  const [password, set_password] = useState('');
  const [password_confirm, set_password_confirm] = useState('');
  const [estado_contrato, set_estado_contrato] = useState('ACTIVO');

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

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_odontologos()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_odontologos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImFCNU1TUE80ZXE5MmtjZFN6K2I3TWc9PSIsInZhbHVlIjoicXJoeUVEM3FEamI0MWZBcWkxd0gyS3lFaldWVUZPQVhjdjJWa1huTW9DcXVBZmprYUhQN1FxVXVScWhjVzNEYkVEU2Z0TUp5ZXpFTW5SSFAyS08xVHZ3M1RzR0JSdkduOVlyMzdURTZ5RjZSMXRXYnQvZUFBdFh5c2thVy93Y3IiLCJtYWMiOiJjYTIzMGQ5YjY3ZTgwNzM5YjVhNGIxYmJkNWE2Y2EzNzkzNzYzNzI0NGVjZGYzZmI2Y2JkOWVmNGQwMGUxYjNiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InplVFltL1FPYkh5MGNKdjZZNVBMK0E9PSIsInZhbHVlIjoiaUFaUjBBNDRjOSsvUzVWdDJLSldCbHVBcWNvSjJENzc1em4wU3FNZWZRdFZ3TU1SUTVsVzRHbk1MaEgrNmZGK0RmdEc4Uys1bGVqUkkzbmdZQi9FRDFQa3U2YmFDTGlxOXByYUhoNldBRDJscnNZTE8ydmw5cmZ2dzkybXExRlIiLCJtYWMiOiI4NjBmZTJiOTI2N2ZmNWU2YmRmOGE3ZDY1ZDJjZGU3ODRjMmMwNWE1NWE4N2JiMzBhODNjNjUzNjFlODM1MjIzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/especialistas", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_odontologos(result)
      })
      .catch(error => console.log('error', error));
  }

  function crear_odontologo(){
    var rut_exist = true;
    var nombre_exist = true;
    var pass_exist = true;
    var pass_confirm_exist = true;
    if (!rut){
      rut_exist = false;
    }
    if (!nombre_completo) {
      nombre_exist = false;
    }
    if (!password) {
      pass_exist = false;
    }
    if (!password_confirm) {
      pass_confirm_exist = false;
    }
    if (!rut_exist || !nombre_exist || !pass_exist || !pass_confirm_exist) {
      alert("No pueden quedar campos vacios")
    }else{
      if (password !== password_confirm) {
        alert("Las contraseñas no concuerdan")
      }else{
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Im01VHZRR2RKTVJnVlBsYVNIa001T0E9PSIsInZhbHVlIjoieVg5WGNxb1o0ZEcxQUVKcGVJNnFrSUtpR3h5T2VoMXhnZWpYU3dIVHI4K3FHMWZTaHVmbU9CMWt2cWc4OFc5QUtpTGlYVTM1OVZ4SkFLdk90YlBkWDd4VGYxU1hNNVpLZnVkVDMyUEZqM2Q4d3ptT3BNSUdUbWh5cUxCRjFQeWsiLCJtYWMiOiJhZGM2MTU0MTBlZTBjYmVmYjY0Nzk1NGIxYzRmOWE2YjNiOWIyYTNmNDg2N2UyZTZiZDA4MThmZWMzZThjYmJiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkgvVDNHN01nYkQwS1lxdGl0WGUvaHc9PSIsInZhbHVlIjoia2tERlpkd0dJQVBkRnkwUEJWejVWMldtSmIvZFFaeVpLYzJuVnVaUjVuNVN5bzlXdStmM3ZyMTJQTC9BTFl4L0sxQU9iWnFOTWlTbksrRG1Na3hyVDE3NUZuVks2ODJyYUNQZVM2bCtydEt5WTQva2FSY0JyN0hBSms1YVovaVciLCJtYWMiOiJhNDkzYTU0NjhmNzhlYzYxN2QzMzAwNTZlYzNiMmFlYzAyZWU0MTA3NTMzZDA3YWM3ZjM0YWY0M2M0YzlkMTI5IiwidGFnIjoiIn0%3D");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/crear_especialista?rut="+rut+"&nombre_completo="+nombre_completo+"&fecha_contratacion="+dateFormat(startDate)+"&estado_contrato="+estado_contrato+"&pass="+password, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result === 'ok') {
              get_odontologos()
            }else{
              alert('No se pudo guardar el odontologo')
            }
          })
          .catch(error => console.log('error', error));
      }
    }
  }

  function eliminar_odontologo(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlozQmJORWJBcGRlUE00M3pybWt3bXc9PSIsInZhbHVlIjoiUktFMy9WQjRZU1JTM0FPREt3clpOODRqUlNpSzdsVk1GZjB6WlVrNEg2b2d3alYyMHhMOHhMaUw4V2lNbXM3SXFEOFhXMEl4WWpwZGdWOVh0UCtWTEpKT1JPVUUvL0VnSVRJcDB2MXNGYXNYblFmaDFoVStDbUtDOTJad0dQWksiLCJtYWMiOiJjNWRhMWQyMTBmZjk0ODQxYTkyMDgzZmRmNDIwZDFjMjJlZGY4OWZiNzY1YzRjOGY4NzZiYTBkMGYzMzBlZDJmIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlZCQjNzWExBays0bHljekczbUg1dGc9PSIsInZhbHVlIjoiaElyd3RhZjdpbUt4Ky8zc2tJZkYwZWlJVGNhR1BPY3cvNXdZSkRoMjQ2YWNPbnIrdVNCR2RxajVuWjlkYTBlMXo1QS9NZWhwTmhaMm95VUdiaFZWTjlWampLWW8zUWZTemZuTEo3Q29VS3c4SjFtbDZLUDQyQUlKNWtBR2N6TnciLCJtYWMiOiI2OTVhYWUwNjZkNWFhN2YyZjRjZDVkODk0Y2M3NGE0YThmYzQ0ZTEyYzkxZjJhZmY4ZjU5MWM2ZGZjYjZjOTYxIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/eliminar_especialista?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_odontologos()
        }else{
          if (result === 'DATOS') {
            set_rut_confirm(rut)
            handleShowConfirmDelete()
          }else{
            alert("Se produjo un error al eliminar el odontologo")
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  function full_eliminar_odontologo(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ind0d1grUGJRempTSFZiWkR3VE9YWGc9PSIsInZhbHVlIjoiNmE3Y3VYT3ZGc2VMN2t5Ujl3eVZHMEh5cmFrQlBOVVZtL0sydEUrYno2UlVUYkVwbzZRWjFpQ1YrTUY5RzNGS3h3eUxISUg2MU4yQ3pFemNEWlNRQ0d0Zkw2amtLV3VraDhLRVN2N1MwaW84NjhWRm9PNlBMMkJVYWt5TlYxb2oiLCJtYWMiOiI0NDIzMDBmYjFmMjY3MDI0YWQ1ZTJlNDRlNTE2YmYzYTNhY2YxMjE5MGZhMjU0YTNmMGY1NDQ0Y2ZmZTMyZmRlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjJtbkZ0TnVkRVBsbVpDUVpmMkZoUXc9PSIsInZhbHVlIjoiR2pJNEhiNW9DU0ZTTkg3TjJwRUdVcy84emlQODNVM29YR2NhOHVOODBQYXE0SWFSMUJWc0JuNHhFdEltczROVy8zancrelZCOWFhUHRqeEkxdEJuVlN1aExBN2s4UUEwRFNBYng1UFl0M1lxYiszTWlmVG8zMTAvU3JuK0tuWDAiLCJtYWMiOiIxNjJjNmRkMGUzN2FjMTRhNDFiMWM1NjlmOGY5MzdjOTg2ZDIxYmU2YjFlYzBhYzlkZDM5OTUxZDFkY2EwZGQ4IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/full_eliminar_especialista?rut="+rut_confirm, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          alert("Se ha eliminado el odontologo y todos los datos relacionados")
          get_odontologos()
          handleCloseConfirmDelete()
        }else{
          alert("No se ha podido eliminar el odontologo ni ninguno de los datos relacionados")
        }
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  function select_estado_contrato(event){
    set_estado_contrato(event.target.value)
  }

  function render_odontologos(){
    return odontologos.map((item) => {
      return(
        <tr>
          <td>{item.rut}</td>
          <td>{item.nombre_completo}</td>
          <td>{item.fecha_contratacion}</td>
          <td>{item.estado_contrato}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => eliminar_odontologo(item.rut)}><FaTrash size={15} /></Button>
            <Button variant="info"><FaEdit size={20} /></Button>
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
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShowCreate}>
              <FaPlus /> Crear odontologo
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Odontologos</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Rut</th>
                      <th>Nombre</th>
                      <th>Fecha contratacion</th>
                      <th>Estado contrato</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_odontologos()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL DELETE CONFIRM */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Body>
          <p>
            Se han detectado datos relacionados con esta cuenta, al eliminar la cuenta
            se eliminaran todos los datos relacionados ¿Esta seguro de que desea eliminar esta cuenta?
          </p>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmDelete}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={full_eliminar_odontologo}>
              Si, elimina los datos
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      {/** MODAL DELETE CONFIRM */}

      {/** MODAL CREAR ODONTOLOGO */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Odontologo</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Rut:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_rut(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={rut}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Nombre Completo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre_completo(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_completo}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            id="username" 
            onChange={(e) => set_password(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={password}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Confirmar contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            id="username" 
            onChange={(e) => set_password_confirm(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={password_confirm}  
          />

          <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha Contratacion:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Especialidad:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={select_estado_contrato}>
              <option value='ACTIVO'>ACTIVO</option>
              <option value='TERMINADO'>TERMINADO</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={crear_odontologo}>
            Crear Odontologo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR ODONTOLOGO */}

    </>
  )
}

export default Odontologos;