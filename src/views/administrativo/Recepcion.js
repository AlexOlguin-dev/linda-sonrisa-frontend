import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Table, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import PdfComponent from './PDF/PdfComponent';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Recepcion = () => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [show, setShow] = useState(false);
  const [showEmicionBoleta, setShowEmicionBoleta] = useState(false);
  const [citas_agendadas, set_citas_agendadas] = useState([]);
  const [tratamiento, set_tratamiento] = useState([]);
  const [id_cita_agendada, set_id_cita_agendada] = useState('');
  const [rut, set_rut] = useState('');
  const costo_consulta_base = 20000;
  const [total, set_total] = useState(costo_consulta_base);
  const [prevision, set_prevision] = useState('');
  const [medio_pago, set_medio_pago] = useState('');
  const [monto_pagado, set_monto_pagado] = useState('');
  const [vuelto, set_vuelto] = useState(costo_consulta_base);
  const [nombre_paciente, set_nombre_paciente] = useState('');
  const [nombre_tratamiento, set_nombre_tratamiento] = useState('');
  const [costo_tratamiento, set_costo_tratamiento] = useState('');
  const [valor_prevision, set_valor_prevision] = useState('');

  //FORMATOS------------------------------------------------------------------------------------------------

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    list_citas_agendadas()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function list_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkNoTHIybG9FblNiNG4rYlFXL1NMZ3c9PSIsInZhbHVlIjoiK0wzN0lwREJ0OWlsQzdZUStyNGh4SjdveEtKMVpBOEY1UTEvN0JjSGNWV0VVc1FsYXFudGloMGg5R083UFpFd2wvSFBTeVBlUnlYdGVUYXZGZ0EzVWtRaGQ2K3d2bnc4K1d6dVU1TzFRRWJEZklLVnVOa1BLZ3dmdWxheHJWZU0iLCJtYWMiOiIzZDUwZWM1ODc2YTE0MjFlMTliMzY2OTNiNDI5ZTQ4MmYxZGVmYmNlYjQ5YTEwMTZhYjZjYmYyNzY3ZTE3ZTVlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImRzL1pSOG9rYTFZeUxCQTFvOWlPY0E9PSIsInZhbHVlIjoiR2gydUhHUDRESzNPVDhNbTB2WmJmTjRMVmxNeUxYN3h4eUlwQmg0NEVyeFIzRFNJRXFlTFBrRDQ0azF1czlNUXc3NWtHczZmcVQ1REYwUkwxV09iNjA1bGU3TU12Tnc1MWs3d2l4WnFCU1ZITEVtT01DRkpUdi9oeWkrSzk4aWEiLCJtYWMiOiI5NmQ3ZTY5NWI4M2VkMWRhYzRiZDc0ZmUzMmVlZjQ4MDgwZDk4NDI5ZTgyOTQxMWNmZDRjZmE5MTEyN2VhNWZiIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_citas_agendadas_sin_boleta", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  function search_cita_agendada(key_word){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ik9NYnJ3WVkwVUc4NGRXRXlTNnlVQ3c9PSIsInZhbHVlIjoiYzk5cWxSSTdYMlFwQUhnemw0b2VBcllJbGdxR25HeXZLazlabTFyYjAwRzVUc3RGck5ieWZyNkkrdk1YK0NwNnlzVFlMaXZqVXhGaTRZcHJza0MrRkYxSUlHaGh3aXJXZHQ2bkNZREpKb0hmNnpST011Z0JpU2xYRjJtVE80YmUiLCJtYWMiOiI2OWYzOTU0MTYxZDkyNDc1YmVhN2VjYmRjOTQ2ODJiYTY4MDUzZjI4NmJiMjZiMGJlMTRjMjllMDE1Yzg0MGE5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InNjSU5zVXc0UXovL1pva2IyZ3lndlE9PSIsInZhbHVlIjoickU5MjBHTUFKd1pmeXQvMHZrSURlOHNYL1QwWFg1MFdtUkxFSHRGVTFramM1Sk9ZWGZCR29DdmxQdXlnTU1MR1liQVpOTGJURTBmek5qSDRuazVGRkhhS0JYMWxiM1lFTEkySk1UR1hiMHFhbzJ3TjU1dm12eEFqSk1jcm9oRkQiLCJtYWMiOiJhOTk0YWZhZWY5ZjFhY2ViMTQ1YzNjZWRjN2M2OTVmOTVkZWRiZTMzOGJiM2RlNzVkM2Y3OGQwMjMwNTNhZjE1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/search_cita_agendada_administrativo?rut="+key_word, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas(result)
      })
      .catch(error => console.log('error', error));
  }

  function open_completar_registro(rut,id,nombre_paciente){
    set_rut(rut)
    set_total(parseFloat(costo_consulta_base))
    set_id_cita_agendada(id)
    set_nombre_paciente(nombre_paciente)
    get_tratamiento_agendado(id)
    handleShow()
  }

  function get_tratamiento_agendado(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlA5eUIwbi9Md1lndC91b1pKSyt3ZkE9PSIsInZhbHVlIjoiMFRTT216S1h0SmxMVk1oeU9ZT3RBcFhNR3hDZUtOUDJYME9IZzhxUEVrem1kYmZhUXZOVEpvR3M4a2xWbGZQa3hPbFFiR05xczkvSHh6MTlRQ1I5OEJqUWp2aU1MdXdKOElrWEhaUnNkbDFDdjR0UTJ3ZUdESytIYmI5ZjY4dTQiLCJtYWMiOiJkOTliMGExYWJhMjU2NDBjMzAyOGE0ZWE1ZTI1NTlmNmJlOTJmNmVmNzc5YmU2YTIxY2M0N2YxM2U3NzBjZTgyIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IklMUGdEODhHZThjM0hZTjcveFBhR1E9PSIsInZhbHVlIjoiYlluTVZzRDRrdzNvTkgxWklkaEdXZWUwZjNKb0dqaU1FRmlzeVZHb2k0T3lKMU1kQVhYc2hVNmxYaXhoYStkN3lDUVJaVXJUTlJvLzJITHpkd3M0aTVTTTlOUFhTSWpLL1VrN0tIb1lxbDZDTjEwTjFaNlk3cldRNlRBWXBZVjgiLCJtYWMiOiIwZDU4YTA3MWQ4YTFkZmM1YmM2OTNiZjFiOGFmMTFjYmI3MDljMWFhYzc1NmI4ODBmOTJlMjY4NWU1YjM4YWFkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_tratamiento_agendado_cita_agendada?id_cita_agendada="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamiento(result)
        set_total(parseFloat(costo_consulta_base)+parseFloat(result[0].costo))
        set_nombre_tratamiento(result[0].nombre_tratamiento)
        set_costo_tratamiento(result[0].costo)
      })
      .catch(error => console.log('error', error));
  }

  function create_boleta(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkVSZUJoS09ZbDZFVmo1d3dNaEpvMWc9PSIsInZhbHVlIjoiNUZqeVJGbkJQVno3WHNEUS95UWllNCsvU1lSTmhjdE16NmEya3RqVjNEQ0piK1FqS1dhaFFKSDh4UDIvMTA2ZmFqVDBYVmV1MkRjZXU1WE9xZld1SkpMN0tKWGNtU1luUGVWNFdQN3V4ZTNVeHRJUGZLR3Y2R2FVUzEwS2I0a2siLCJtYWMiOiI3NmY5NGI3YmIxM2FkZDg5NTFjNTYzYmIzNmRjNGRkMzBiN2I0ZDAzNDhkZDYyZDM3ODdhNTlkMzE4MzMzNjY1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjRzSGF3RGxYbUFHd3BpUGgvSGNtdlE9PSIsInZhbHVlIjoiK0hSY0JSYkJtajl1Qll3WUJsUWl5NmVqOHQ3ZE4zVUQ1bFFscCtvUUV3dUhFbExvL2JQZSttUlJHZm93b3Q0Ym9sMVpIOEdiRUR6eEFZUExraTNUdkpaSHlha1JJcjZwRks1VzVuOGZITzRlM3Q0VlhudVVBa1F4eWZjWFZCTTEiLCJtYWMiOiJlODFiY2QyMTE5YjVhMTY1M2FhN2M3NTc5ZjNmODM1NmMzNzZkOTYwNDI0ZjE2Mzg4Mjg2NzFiY2I5MmY2YjE2IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/emitir_boleta?id_cita_agendada="+id_cita_agendada+"&total_pago="+total+"&medio_pago="+medio_pago+"&monto_pagado="+monto_pagado+"&prevision="+prevision, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          cookies.set('nombre_paciente',nombre_paciente)
          cookies.set('nombre_tratamiento',nombre_tratamiento)
          cookies.set('costo_tratamiento',costo_tratamiento)
          cookies.set('prevision',prevision)
          cookies.set('valor_prevision',valor_prevision)
          cookies.set('total_final',total)
          cookies.set('vuelto',vuelto)
          handleShowEmicionBoleta()
          handleClose()
          clear_variables()
        }else{
          alert('No se ha podido crear la boleta por favor consulte con el tecnico encargado')
          handleClose()
        }
      })
      .catch(error => console.log('error', error));
  }

  function clear_variables(){
    set_total(costo_consulta_base)
    set_prevision('')
    set_medio_pago('')
    set_monto_pagado('')
    set_vuelto('')
  }

  function clear_cookies(){
    /*cookies.remove('nombre_paciente')
    cookies.remove('nombre_tratamiento')
    cookies.remove('costo_tratamiento')
    cookies.remove('prevision')
    cookies.remove('valor_prevision')
    cookies.remove('total_final')
    cookies.remove('vuelto')*/
    handleCloseEmicionBoleta()
    list_citas_agendadas()
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEmicionBoleta = () => setShowEmicionBoleta(false);
  const handleShowEmicionBoleta = () => setShowEmicionBoleta(true);

  function change_monto_pagado(e){
    set_monto_pagado(e.target.value)
    if (e.target.value === '') {
      set_vuelto('')
    }else{
      if (prevision === '' || medio_pago === '') {
        alert("Por favor seleccione una prevision y un medio de pago antes de continuar.")
      }else{
        var t = parseFloat(e.target.value)-parseFloat(total)
        set_vuelto(t)
      }
    }
  }

  function proceder_pago(){
    if (prevision === '' || medio_pago === '' || monto_pagado === '') {
      alert('No pueden quedar datos vacio')
    }else{
      create_boleta()
    }
  }

  function select_previcion(e){
    set_prevision(e.target.value)
    if (e.target.value === 'CruzBlanca') {
      set_valor_prevision('4.0%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.0)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Colmena') {
      set_valor_prevision('4.9%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.9)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Vidatres') {
      set_valor_prevision('4.9%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.9)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Banmedica') {
      set_valor_prevision('4.9%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.9)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Masvida') {
      set_valor_prevision('4.7%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.7)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Consalud') {
      set_valor_prevision('4.0%')
      var t = Math.round(parseFloat(total)-(parseFloat(4.0)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Isalud') {
      set_valor_prevision('3.0%')
      var t = Math.round(parseFloat(total)-(parseFloat(3.0)*parseFloat(total)/100))
      set_total(t)
    }
    if (e.target.value === 'Fonasa') {
      set_valor_prevision('10.0%')
      var t = Math.round(parseFloat(total)-(parseFloat(10.0)*parseFloat(total)/100))
      set_total(t)
    }
  }

  function select_medio_pago(e){
    set_medio_pago(e.target.value)
  }

  function render_citas_agendadas(){
    return citas_agendadas.map((item) => {
      return(
        <tr>
          <td>{item.id}</td>
          <td>{item.rut_paciente}</td>
          <td>{item.nombre_paciente}</td>
          <td>{item.fecha}</td>
          <td>{item.hora}</td>
          <td>{item.nombre_especialista}</td>
          <td>
            <Button variant="primary" onClick={() => open_completar_registro(item.rut_paciente,item.id,item.nombre_paciente)}>
              Completar Registro
            </Button>
          </td>
        </tr>
      )
    })
  }

  function render_tratamiento(){
    return tratamiento.map((item) => {
      return (
        <tr>
          <td>{item.nombre_tratamiento}</td>
          <td>${item.costo}</td>
        </tr>
      )
    })
  }

  return (
    <div>
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
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Pacientes</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Rut Paciente</th>
                      <th>Nombre Paciente</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Nombre Profesional</th>
                      <th>Opciones</th>
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

      {/** MODAL PAGO BOLETA */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generar Boleta - {rut}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <h6>Tratamientos agendados</h6>
          <hr/>

          <Table responsive="sm">
            <thead>
              <tr>
                <th>Tratamiento</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {render_tratamiento()}
            </tbody>
          </Table>

          <h6>Pago</h6>
          <hr/>

          <br/>

          <Form.Select aria-label="Default select example" onChange={select_previcion}>
            <option>Previcion</option>
            <option value="CruzBlanca">Cruz Blanca</option>
            <option value="Colmena">Colmena</option>
            <option value="Vidatres">Vidatres</option>
            <option value="Banmedica">Banmedica</option>
            <option value="Masvida">Masvida</option>
            <option value="Consalud">Consalud</option>
            <option value="Isalud">Isalud</option>
            <option value="Fonasa">Fonasa</option>
          </Form.Select>

          <br/>

          <Form.Select aria-label="Default select example" onChange={select_medio_pago}>
            <option>Medio de Pago</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Debito">Debito</option>
            <option value="Credito">Credito</option>
          </Form.Select>

          <hr/>
          <h4>TOTAL FINAL</h4>
          <Form.Control 
            type="text" 
            id="nombre" 
            aria-describedby="passwordHelpBlock" 
            disabled
            value={total}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Monto Pagado:</Form.Label>
          <Form.Control 
            type="text" 
            id="stock" 
            onChange={(e) => change_monto_pagado(e)} 
            aria-describedby="passwordHelpBlock" 
            value={monto_pagado}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Vuelto:</Form.Label>
          <Form.Control 
            type="text" 
            id="nombre" 
            aria-describedby="passwordHelpBlock" 
            disabled
            value={vuelto}  
          />

          <br/>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={proceder_pago}>
              PAGAR
            </Button>
          </div>

        </Modal.Body>
      </Modal>
      {/** MODAL PAGO BOLETA */}

      {/** MODAL PAGO BOLETA2 */}
      <Modal size="lg" show={showEmicionBoleta} onHide={handleCloseEmicionBoleta}>
        <Modal.Header closeButton>
          <Modal.Title>Pago Boleta - {rut}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <PdfComponent />

          <br/>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={clear_cookies}>
              Terminar
            </Button>
          </div>

        </Modal.Body>
      </Modal>
      {/** MODAL PAGO BOLETA2 */}
    </div>
  );
};

export default Recepcion;