import React, { useState, useEffect, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Pacientes = props => {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control type="text" placeholder="Normal text" onClick={onClick} ref={ref} value={value}/>
  ));

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [administrativo, set_administrativos] = useState([]);
  const [rut, set_rut] = useState('');
  const [password, set_password] = useState('');
  const [password_confirm, set_password_confirm] = useState('');
  const [nombre_completo, set_nombre_completo] = useState('');
  const [cargo, set_cargo] = useState('');
  const [estado_contrato, set_estado_contrato] = useState('ACTIVO');
  const [rut_edit, set_rut_edit] = useState('');
  const [nombre_completo_edit, set_nombre_completo_edit] = useState('');
  const [cargo_edit, set_cargo_edit] = useState('');
  const [startDateEdit, setStartDateEdit] = useState(new Date());
  const [estado_contrato_edit, set_estado_contrato_edit] = useState('');

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
    get_administrativo()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_administrativo(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InlmQlRIWlRidDAySktXbmY3R0dUTmc9PSIsInZhbHVlIjoiYzFaQ2NpY2NjaldPZHMvUW9QblZrTzFtL2lKRHBGTzgzbTN2clE0c2M5REdmdnh3bGtORVZ2YmtjUStsRXdFZU8rYzVaVzB2QVBGZXNqd0V2cjJ2MWJvVzBaTC9hMWhqR1MwamVEK0VHQ3NQZHRwNWM3Wk1ZMzB0YU1ZNHhHSkwiLCJtYWMiOiI2ODYxNDc1YzI2ZWEyN2Q0ZTQ2NmMxZWI2MWI3YWE5MTI4YTFkOGU2M2Q2MTJmOWM0NGFmNzUyM2IwZGY5MTQxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IktXd21MVTRzTGxvRXExU3pMS0wza0E9PSIsInZhbHVlIjoiTyszZmNJb1ZJYWtUaWFqWHJwd2J5NFEySXMwWjlaS1gvdFQxYm84MTg5QnlKbi92OTY1d3NubEZmZUsyMzA1K05iY0pxa0sydDlNdys2bkEwaS9Qb3ZiaFRRdEQwa0pqV1o0WktwMTcwZXN1WldlWm1wcXQ5ckJtMVVXSllVeVQiLCJtYWMiOiJjNzZhYWVhMWZlZmNkNWQzMjQ5NDAwNTQzYjYwNjA3ODY5ZmM5NTFlZDI1NjZhODQ5YjY2NzA3Zjg2YjdmNzg1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/administrativos", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_administrativos(result)
      })
      .catch(error => console.log('error', error));
  }

  function create_administrativo(){
    var rut_exist = true;
    var nombre_completo_exist = true;
    var pass_exist = true;
    var pass_confirm = true;
    var cargo_exist = true;
    if (!rut_exist) {
      rut_exist = false
    }
    if (!nombre_completo) {
      nombre_completo_exist = false
    }
    if (!password) {
      pass_exist = false
    }
    if (!password_confirm) {
      pass_confirm = false
    }
    if (!cargo) {
      cargo_exist = false
    }
    if (!rut_exist || !nombre_completo_exist || !pass_exist || !pass_confirm || !cargo_exist) {
      alert("No pueden quedar campos vacios")
    }else{
      if (password !== password_confirm) {
        alert("Las contraseñas no concuerdan")
      }else{
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImM2WC9zb3hVRTlIcVpCNGxCbEtHRmc9PSIsInZhbHVlIjoiOHZ4Tk1hMG9DYlMyTmdSWURFVlZEaUh2anVuZkUwV0tLVUpUYmJJZUxaRUdRS1JlUUptUHBjOTBwNFh0SVMrUHRjejYyS0U1anZYL0Z1aURjOUhDbkxvTEVBTzJoWE02anVuOGJnWDgzRHZ3eWFVbDNBR0M3QmhOVXJHWnRzam8iLCJtYWMiOiI0ZjdhNzhiODAyYmMzOTQwN2NlZGNkY2U5YTJmODA1YTY5OTI3NTMwMWQ5MDAxMjBlMjFjZjkzOWM2ZDM0YjI0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImcyNnBueGJrcTdkWmJQQmQyWUpaNUE9PSIsInZhbHVlIjoiL1lEa1JOSkhXUUNkWllGVWp5MmlQQnduZUhGR0xXU2l2d29LZXB5ZEhoaWxFTklLdGwzT29ZUXNMcmttSDJneXYvNFdybGtHc04rMElpRnpVZ2VNWGVrQk9ocnhaU2pzRW9vbE0yOEUwVW1mckoyclpWeEVsRDQ5Z1hMUTBQMHoiLCJtYWMiOiI4YjY2NDA4NWE4NDdjYzc5M2MxMTFhNWZlN2UzNmZiOTA4MTQ0OTVmNzIxNzU0ODY2NzQwZDU2NGEyMmUwMTc0IiwidGFnIjoiIn0%3D");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/crear_administrativos?rut="+rut+"&nombre_completo="+nombre_completo+"&pass="+password+"&cargo="+cargo+"&fecha_contratacion="+dateFormat(startDate)+"&estado_contrato="+estado_contrato, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result === 'ok') {
              get_administrativo()
              clear_administrativo_edit()
              handleClose()
            }else{
              alert("No se pudo crear el Administrativo")
            }
          })
          .catch(error => console.log('error', error));
      }
    }
  }

  function delete_administrativo(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ilo4VERaaS9lbVJmVzBmbmh2c0plSXc9PSIsInZhbHVlIjoiMkl4ZWNFM05LdmtVcFJVTEo5dXdGS1lSNzRkdmRMM2tnanh0VFNjVExjaGxrbjA0dTRaOGNXRU9VVG1nZFRackozNU1iOGw3bFlhb2E4L0pjOTJCbUhDaWVuVFNPUXJhLzRPSGd5aXpFbXlxNnRpaDNja3ZBcUhZK3o4VnhWWFMiLCJtYWMiOiI0OGUzZDY5NTY5OTAwYmQ5Y2ZlMDIzZmJiYzQxM2YzNzY3NjI0NThkZmY2OWIxZTgwMzk4MzA4YjIzNzJlYTFjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkZrUThXK0tTc1FUZ09sMjA0eXVEN2c9PSIsInZhbHVlIjoid2o1bnI3cEl0NzhvaVFlTXhIWE9iTVU2enVYNFd1aGVtMU1uQUNUM0tKRXNDbEVJandoeC9lSFdBTmNDYk5LajhLWVVSL1RwSUlwajUvU1ZRM3Qrd2xFRHY3OFVYYXBhK2JPT1dpNnZEQThDMXRvZmxBK2N2TmViYnlaL3h5V1oiLCJtYWMiOiJmNzg5Y2JlMTY3MjRiY2NiMmM1Y2E2YmNhOGE2MTVjZjBhYTYxMTY1NGQ1NGY5MDlkZDZlYmM2OTc2ZmUwMzNkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_administrativos?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_administrativo()
        }else{
          alert("No se pudo eliminar el administrativo")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_single_administrativo(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkJHbUNkbXdSSVZINzJtSlZzajhramc9PSIsInZhbHVlIjoiSXE2ekE1QWNhWUNIelE4ajFBR3d3QTZxM21VRlIrbXI0NS9KaDBKejg2d0hLUTJ2cWZyQ0lxbEQwNUkzNTlyRHg1YW05cnU4NFVRUXozR3AzQno5T1BiM0syNGdEb1N0WXNpUEJ1QTQvQXQ0RExZVTRKV1JySWw0WkxMZSs4NEkiLCJtYWMiOiJkZDY3YzNjMzRkOGVmZTdjMWViOTc3ZTI1OGU0M2UyY2U0ZGYwZDdkMjk5YjEyZTVlNGYwNzdlOTQ1Y2RiZmI1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImluaEpaSXozcjJwTHczQkduQzhVR0E9PSIsInZhbHVlIjoiVDNjRzloNUtFY3hGcGxHRVJTUW5tcklYTW9iRzdmamhNTS9ZQnU0R2xxRFRhWFcrMmJzZWEzZWhYUjh1ZkE3SlJleHNGV3BubTM2QVVMdkpXZTdoYkpZOEg3VTkvWSt5OXVZT2RNMThJVHZzUkoyaUxTbGRRMS9xcm50UnhFbVUiLCJtYWMiOiJlZTdkYzU5YTM3NTZmYTgwNzcyOGQ3MGU1NDBkNDNlNTkxMzQwZGIzMzY4NjU5NmM2ZDhhZjBhN2I2NTVmMTJjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_administrativo?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_rut_edit(result[0].rut)
        set_nombre_completo_edit(result[0].nombre_completo)
        set_cargo_edit(result[0].cargo)
        setStartDateEdit(new Date(result[0].fecha_contratacion))
        set_estado_contrato_edit(result[0].estado_contrato)
        handleShowEdit()
      })
      .catch(error => console.log('error', error));
  }

  function edit_administrativo(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkQ4dE5tYkp2S3luZXRQZmttTTIvUkE9PSIsInZhbHVlIjoiMTJPdjFuWEp6QjF4WGlzVko4UU9Va25MZ09wNFVXRzlwMGI3MzZuUGtVQXg3cGswMXNZdm9SREtHVStCaTZhSEUzcUxoUFNsbGpIV215aDFUUWord1FOclAzcGt0OVNBaklXdFQrRkgyK1pBa25oTlVzeWtCc211MlJLMVVpMGUiLCJtYWMiOiI0OWE5MzNkNTA3ZjMyOTE0ODI3MmFmNDNmNGFlMTdkM2RjOWU2N2FkNjY1ZTg3YzFlMzM2YjY2ZmQ5NjE3MTY4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFLSkZjUGRBRzB4ZG5veXc2aGp0Q3c9PSIsInZhbHVlIjoiQkRQL21takpjOHh5OHliY0JhejZiRVFMUW5sM3NMRk9tWXl3NFB6Tk5oRFVKdm0yN3cvTE9tZjFRdUNMQXloc1ZIVW9nQjl1c1JPbnpsckEzcFBGRkR5elMrMmhJQnl0d1Z4SXF3cDNNSmxFWEU5Um1JRnVENEJNdHpUdjVFaWEiLCJtYWMiOiI0MzVkZWJjOGNlMjdhNWRiNmUwMGRkMzJmYTI4YTc4ZmMzNGE3NzdhZGM2NTAyMzcwYWQ3MDAxMTFmYjIxNTk2IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/edit_administrativo?rut="+rut_edit+"&nombre_completo="+nombre_completo_edit+"&cargo="+cargo_edit+"&fecha_contratacion="+dateFormat(startDateEdit)+"&estado_contrato="+estado_contrato_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_administrativo()
          handleCloseEdit()
        }else{
          alert('No se puedo editar el administrativo')
        }
      })
      .catch(error => console.log('error', error));
  }

  function clear_administrativo_edit(){
    set_rut('')
    set_password('')
    set_password_confirm('')
    set_nombre_completo('')
    set_cargo('')
    set_estado_contrato('ACTIVO')
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function select_estado_contrato(event){
    set_estado_contrato(event.target.value)
  }

  function select_estado_contrato_edit(event){
    set_estado_contrato_edit(event.target.value)
  }

  function render_administrativos(){
    return administrativo.map((item) => {
      return(
        <tr>
          <td>{item.rut}</td>
          <td>{item.nombre_completo}</td>
          <td>{item.cargo}</td>
          <td>{item.fecha_contratacion}</td>
          <td>{item.estado_contrato}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => delete_administrativo(item.rut)}><FaTrash size={15} /></Button>
            <Button variant="info" onClick={() => get_single_administrativo(item.rut)}><FaEdit size={20} /></Button>
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
            <Button variant="primary" size="lg" onClick={handleShow}>
              <FaPlus /> Crear Administrativo
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Administrativos</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Rut</th>
                      <th>Nombres</th>
                      <th>Cargo</th>
                      <th>Fecha Contratacion</th>
                      <th>Estado Contrato</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_administrativos()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL CREAR ODONTOLOGO */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Administrativo</Modal.Title>
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

          <Form.Label htmlFor="username" className="fs-5 text">Confirmar Contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            id="username" 
            onChange={(e) => set_password_confirm(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={password_confirm}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Cargo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_cargo(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={cargo}  
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_administrativo}>
            Crear Administrativo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR ODONTOLOGO */}

      {/** MODAL EDITAR ODONTOLOGO */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Administrativo - {rut_edit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre Completo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre_completo_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_completo_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Cargo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_cargo_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={cargo_edit}  
          />

          <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha Contratacion:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDateEdit} 
              onChange={(date) => setStartDateEdit(date)}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Especialidad:</Form.Label>
            <Form.Select aria-label="Default select example" value={estado_contrato_edit} onChange={select_estado_contrato_edit}>
              <option value='ACTIVO'>ACTIVO</option>
              <option value='TERMINADO'>TERMINADO</option>
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_administrativo}>
            Editar Administrativo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR ODONTOLOGO */}

    </>
  )
}

export default Pacientes;