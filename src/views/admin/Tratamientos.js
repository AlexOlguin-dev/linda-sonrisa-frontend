import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Form, Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { FileUploader } from "react-drag-drop-files";

const Tratamientos = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const [tratamientos, set_tratamientos] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [nombre, set_nombre] = useState('');
  const [precio, set_precio] = useState('');
  const [descripcion, set_descripcion] = useState('');
  const [id_edit, set_id_edit] = useState('');
  const [nombre_edit, set_nombre_edit] = useState('');
  const [precio_edit, set_precio_edit] = useState('');
  const [descripcion_edit, set_descripcion_edit] = useState('');

  const handleChange = (file) => {
    setFile(file);
  };

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_tratamientos()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_tratamientos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlBjanB5ZEQwdGJvVzA1bDkzWmtGTXc9PSIsInZhbHVlIjoiNjU2VFc0dyt2SUs2Y0UxR213QU1wc0IvMitPSndGU1hMcW5CRG1UOFFhdXhva2pMTXhUVHBuejBTUWUzYlJzdmJRd2IyREsrS28xcVlIeUNmdE0rOG9VVVpTdlRPSFNLZEN3K0NwSkIxa2R4bWtMUkZoZUdlK2d2bmlhemtMK3QiLCJtYWMiOiJlYzNhOTEzOGRlYTZlMDE4OTcwYjkyZWYyZjRjNzZhODgxNDdhZDBjMTRkZTdiNjgwYTRjZDMwNmNiYWE5YjVlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFoU0xKWU9XMi84eVlNK29MNlpNVlE9PSIsInZhbHVlIjoidkZyNUwrNGhwc0ZOVVo4VXdGaGdKYmpzcnNUTHo1K243SEQyRzV0Z1hoQThteWtXMG5zUWd6N0QyKzh4Vk5KY0dHRHlsZVdVa2tvRGhPQklTeWZEY2VqckFHcFprLzd5RTE1Qkg2QVRKUjMzeTlNYThlQnM4VFJJOHZlcHV3Y0MiLCJtYWMiOiJiZWE1ZjczZmIzZjBlNmE0NGVjNTk2ZThkYThiNDk4YzdmMWY2MDg3NGVkYmIwZTI5NDdmMjNhOGNhMmI2ZWJmIiwidGFnIjoiIn0%3D");
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

  function create_tratamiento(){
    var nombre_exist = true;
    var precio_exist = true;
    var descripcion_exist = true;
    if (!nombre) {
      nombre_exist = false;
    }
    if (!precio) {
      precio_exist = false;
    }
    if (!descripcion) {
      descripcion_exist = false;
    }
    if (!nombre_exist || !precio_exist || !descripcion_exist) {
      alert("No pueden quedar campos vacio ")
    }else{
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImFtV2pLaE83TWFwU240T1BCMmt2Y3c9PSIsInZhbHVlIjoiaGJUNm9oRmJSR2ZYMU5hVElVOExKRW5TVzMzZHVyektxSlpKVnpMK1ZZaGpNY2lsOVlBbDRBdnNySmtwKzR5VUl5TWEzNXB0bnUvTUVmQ29oeWd2bGJ6elRWVU95L1FJTUxad2pqWmxndm51enhOQ3VxWHBleFVOS3U5cjBpOVMiLCJtYWMiOiI1MzQwNTM3ZTFiNDY5OTk3M2QwYTBhYmIzMDc1NjkxOTg5ZWIwYWEyZGY1OWE1OTdlZWZkZTU3M2NmNWI1YTI1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjM5T1BhR1c3ak9FTTUzSzk4ZzlObEE9PSIsInZhbHVlIjoieC95Q1B0MWZYdU1IZW9uUm9yNlJNeXRDaHRzYXBITm5EeE81WHo5UUR6dSt0YVVvNWxEaW5xUHdmM0M5ZS83UGRYUnFrR3QyTTRNUFZEU1R5NS8xMHF2cS91dWljZG0zdGQ3Tm5JTlRlckgvb1p1MUpRM2pBQ2g3MzJGSHR0VGsiLCJtYWMiOiI5ZGY0ODlmMjJlODk3YTk3YmFmNzUyMGYyYzMxM2NlMmNjYzBhZThkMWZhY2ZlOGI5ZTQwYzdlYTE2YmE4MDY5IiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/crear_tratamientos?nombre="+nombre+"&precio="+precio+"&descripcion="+descripcion, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result === 'ok') {
            get_tratamientos()
            clear_tratamiento_create()
            handleClose()
          }else{
            alert("No se pudo crear el servicio")
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  function delete_tratamiento(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Iko0RHk2WGxWN0YyYjAxd0xQLzQxYXc9PSIsInZhbHVlIjoiWW5XSGpiOW9naTBZTENaS3BybmpYSWVLdmI5alpIM0puZHZTNDdFaUI2MkpURzVFSzVCZXBKVjB2b2FGYUFXWkkvMVNLWHRlT1lTcFY2L0tRY3ZEZjcyU25zMUozQ3hPbUt0MVF3NXFJQ1VFbTZQSjFlYW8xLytkWkxtOHFQSkoiLCJtYWMiOiI2YTBmNTdmOTZjYTdjOWRiZmIwZWRiNzczMjBiY2QxYjU0ODcwMzA5ZjI4YWIyZGIzYWFlZTgzM2NmZjgxMTRlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkJlNzJ6VTVIRzNac0Fib1Zvb2dUYkE9PSIsInZhbHVlIjoicVo1eG0yekhGdVRQWG85dkZWY2hmSXdhbUNRUy9qNEZHNndNV0Q3OE1SUlFwSk0wTkM0aTFZTGF2UUpzbkp6TDFoUHJ4emJVdCt6Qk8wbk9KRHAxNWVaVFVZY3A5R2FhcDFRR3hxWDJpb3ZwTmsxbXRRNnZNbWxIZHJXVE5hd0YiLCJtYWMiOiIwZGVjYmQyM2Q3NTMzYzRiNjQyNDlmYWU4ZjE1ODQ4N2RiMDNlMTk1NTA4M2Y0ZWY3MWEwNmU1Mzk0NWYwMjNhIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_tratamientos?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_tratamientos()
        }else{
          alert("No se pudo eliminar el tratamiento")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_single_tratamiento(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IndtQlRzZG05cHM3aHBMSTRUUmltYUE9PSIsInZhbHVlIjoicENweDlMSGo5VjJMTGV1eXl5T2NNaDc2ZWRZZzZSUG4zNTFsTTlCRVgxVW5ncU40SmVwekxpY2lyOGRkSXIva01aNHA3RDNibmlPRWFYeC94QlJad2dmSjlPSVlFUWlRcWo0SHl3Yk5ndFRGUzZNbmFLVmpGNUJQdklyblplZ20iLCJtYWMiOiJkYjJkZDkyNDZjM2E4ZmViNmVlNzg3MTNiN2IxOTViNGNmZThjNGQ5NDAwZWMzYmM0ODBjZjljNTQ5MDE2MDJjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlBJN0tHSmllNHIzODhTaFN3RXlOZWc9PSIsInZhbHVlIjoiblcyalEvS3h0Nm1KQ1VsZkhxRTNwZE5zWHVRS2ZQa3gwT1Jqd3JibUM0U2JIUXBSRy9lUXNsSEUwOGdWZlZ0Z2xmVVQ1WStFNS9NS09vRWVhaXpXRFFSZ1M3dzVZWC9PMFFlcEpyT0FCTG9UUmZETHJuNGZEYUlDT2ZQTWQrN0kiLCJtYWMiOiIyM2YwNzJlZDBlOTQxNGVlNjRkZGM2ODM5YjQxOTdmMGZkYzQ1NTNlYjM1MjY1MDUwMDg1MWRmZmM5MDJkMDhjIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_tratamiento?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_id_edit(id)
        set_nombre_edit(result[0].nombre)
        set_precio_edit(result[0].precio)
        set_descripcion_edit(result[0].descripcion)
        handleShowEdit()
      })
      .catch(error => console.log('error', error));
  }

  function edit_tratamiento(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Im9vMjFHKzFsaGxjM3ZsVXRZZ2xKSXc9PSIsInZhbHVlIjoiby93dWRINy9McTg3dmZObnZXNXlGOHIzSzRyUzJYS3Yxbk4rUWF1K1VWbzdnNHI4MG9XSkxLQlZ3bmdRMVlZZmp6MDhVdFZncjcwVXlhdks0WTJrSHkvL0hFQ093WGZBdTFubUdFd3duM1JuMGJmVFk3ZHEvM3Y4YUdvWFBKMXgiLCJtYWMiOiI5MTk2OWFlOWMwZmE4ZGE5Nzc4YjI1NDY2ODQzMTE3ZGJlNDk2YmVkZTViNWYwZTIzZTE0YzMwNTM3NGJiYmM5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlRCZkJJdElqSkpRZUhweEpLWlgwelE9PSIsInZhbHVlIjoiQzR3ZUkrOGhCN2xFUUdma3M1UUw1VVNudGc1OFd1UDY3L09hVEpvR1VXMjlHTk5jbFFZZTFDeHdyODdYMkYrOVYxajN2MXdRbURkaldnZ0dLT1VYRGM2VWlzNysva1YzVmx5bXNWdlpmbm9HczRPWnRKSVF5ZytSaWtjS1ZUY1IiLCJtYWMiOiJkNTE0MDZjOGY5Yjc5MjFkYmI3M2Q0YTk3NWI4NDBhOGMyYWEyZjdiZWY3MGNjZWQ0Y2MwNWZiNzk5YjM0MjQ2IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/edit_tratamiento?id="+id_edit+"&nombre="+nombre_edit+"&precio="+precio_edit+"&descripcion="+descripcion_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        get_tratamientos()
        handleCloseEdit()
      })
      .catch(error => console.log('error', error));
  }

  function clear_tratamiento_create(){
    set_nombre('')
    set_precio('')
    set_descripcion('')
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function handleDescription(e){
    if (e.target.value.length <= 200) {
      set_descripcion(e.target.value)
    }
  }

  function handleDescriptionEdit(e){
    if (e.target.value.length <= 200) {
      set_descripcion_edit(e.target.value)
    }
  }

  function render_tratamientos(){
    return tratamientos.map((item) => {
      return (
        <Col className='p-2' xs={3}>
          <Card style={{ minHeight: '350px' }}>
            {/*<Card.Img variant="top" src={require("../../assets/img/tratamientos/"+item.imagen)} />*/}
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Text>
                <h4>${item.precio}</h4>
                <p>{item.descripcion}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              <ButtonGroup aria-label="Basic example">
                <Button variant="danger" onClick={() => delete_tratamiento(item.id)}>Eliminar</Button>
                <Button variant="info" onClick={() => get_single_tratamiento(item.id)}>Editar</Button>
              </ButtonGroup>
            </Card.Footer>
          </Card>
        </Col>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShow}>
              <FaPlus /> Crear Servicio
            </Button>
          </div>
        </Col>
      </Row>
      <Row style={{ padding: '0px 50px 50px 50px' }}>
        {render_tratamientos()}
      </Row>

      {/** MODAL CREAR SERVICIO */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Precio:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_precio(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={precio}  
          />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fs-5 text">Descripcion</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => handleDescription(e)} value={descripcion} />
          </Form.Group>

          {/*<FileUploader handleChange={handleChange} name="file" types={fileTypes} />*/}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_tratamiento}>
            Crear Servicio
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR SERVICIO */}

      {/** MODAL EDITAR SERVICIO */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Precio:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_precio_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={precio_edit}  
          />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fs-5 text">Descripcion</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => handleDescriptionEdit(e)} value={descripcion_edit}/>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_tratamiento}>
            Editar Servicio
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR SERVICIO */}
    </>
  )
}

export default Tratamientos;

