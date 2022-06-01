import React, { useState, useEffect, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Pacientes = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [showEdit, setShowEdit] = useState(false);
  const [pacientes,set_pacientes] = useState([]);
  const [rut_full_delete, set_rut_full_delete] = useState('');

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
    get_pacientes()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_pacientes(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlNubmNOTzJRbWZhdm5HZHFaTzVLcFE9PSIsInZhbHVlIjoiNllrZkFJdXVJcitGTno1b3UvMFlraW92bDdhdlVyZ055SDZ4NWxzeGZzZXdNQ0lJUEZKM0h0WGMyUk10b1I2bitQbGp6UmZaanZ2VWxDMGdmZGcvVnlpbmhOdWtVSDR0YmIrWW9jR2s1TEg3S2N3ZHVtejc5bm4vYSt5N1Y0eXAiLCJtYWMiOiIxNTA5OWUxNGUyOGUwOTU5YWNhMWMxYzI5MDAxZjU5NjJhYTlmMDZmY2RkNmQyYzUwZWZjNDkwMmZlNzFmMjNlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik5vVUtiQUpXUUxKY1Nqd0VnTTE0a0E9PSIsInZhbHVlIjoiL0Fjek8yRDYvekkxcEtUME40NHZkS0lISG5UWTZ1YVFXTFdmVG1ZdXphR0JuZUhHMjRSRGVML3AveTlOWnRteXFSZDZKeGcxZzlnWEl0UjhRVzV2Mmcwd0puWm1mWlFLN3JiSmF6L2kzdmo2TnB2Y25yWkdvWXUyVFBoL1VjRTkiLCJtYWMiOiJmY2M0M2NiNTlkZGY0YmYxNWRkMmJhNmFkZTU1OGY1NjVjYmEwMDk2YzYxMWMwMmIxNzc2NTJiZmVmYWE5ODliIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/list_paciente", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_pacientes(result)
      })
      .catch(error => console.log('error', error));
  }

  function delete_paciente(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjBaL2VOR2ZISy84d1pEcmZ0V1BqNFE9PSIsInZhbHVlIjoiUm9DRERaTXNBQzNaSTBEUEtCbHlnUjYxWWVSazJHNitOZWNRNTlzNzZGekM3WFA5VjgyWS9iMkNPWDd5Nk5LOW81TGJYdXpwR1FBOTFydHkzY0VKYlloMjgvcXY1azQ2MFhNeGdJSUNkcUJyK1UxL0VsWTZYZCtTSDNiM3hTV3oiLCJtYWMiOiI3OWQ1YTEzNmJkODhhNWRkNGQxMjNlODcyMDQyYWQ2ZTk1MTA5MjQ3N2QwOWIzZDQ4NDQ5ODZlNjE5NWEyMzQ2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjVBa3lWN3RYcVR3NWpQTFBWeTBubUE9PSIsInZhbHVlIjoiUzdoelV3ZldLQmpaaUJlQ0lWSjlYQlBTZmUwMGxyRUdBTHdPc0ZubkVKR3krdEc0QkZVU2ZDWlA1MGdXcTlva09JbkdqMUU5K2pVbUpnZ3Y1WVQrWmxIcWRBc1hQWERUTXRDbDkvRWlFVGtMbG13UEd3Vm8wNDZVSVRIVjdBNmEiLCJtYWMiOiI5YTczYWRlMWE4YzEwYmIwMmYwZTAwNTU3Yjg5Mjg4MGEwZDUwM2FhODJlNTc3ZDg5MjM2OWRmMTBiM2YzODU4IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_paciente?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_pacientes()
        }else{
          alert("Se produjo un error al eliminar el paciente")
          /*if (result === 'DATOS') {
            set_rut_full_delete(rut)
            handleShowConfirmDelete()
          }else{
            alert("Se produjo un error al eliminar el paciente")
          }*/
        }
      })
      .catch(error => console.log('error', error));
  }
  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function render_pacientes(){
    return pacientes.map((item) =>{
      return (
        <tr>
          <td>{item.rut}</td>
          <td>{item.nombres} {item.apellidos}</td>
          <td>{item.mail}</td>
          <td>{item.telefono}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => delete_paciente(item.rut)}><FaTrash size={15} /></Button>
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
            {/*<Button variant="primary" size="lg" onClick={handleShow}>
              Crear Paciente
            </Button>*/}
          </div>
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
                      <th>Rut</th>
                      <th>Nombres</th>
                      <th>Mail</th>
                      <th>Telefono</th>
                      <th>Opciones</th>
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

      {/** MODAL EDITAR PACIENTE */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Paciente - "nombre paciente"</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" >
            Crear Odontologo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR PACIENTE */}

    </>
  )
}

export default Pacientes;