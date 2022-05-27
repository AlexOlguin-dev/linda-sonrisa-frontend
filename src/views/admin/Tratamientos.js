import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, Modal, ButtonGroup } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Tratamientos = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [tratamientos, set_tratamientos] = useState([]);
  const [show, setShow] = useState(false);
  const [nombre, set_nombre] = useState('');
  const [precio, set_precio] = useState('');
  const [descripcion, set_descripcion] = useState('');

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

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function render_tratamientos(){
    return tratamientos.map((item) => {
      return (
        <Col className='p-2' xs={3}>
          <Card style={{ minHeight: '400px' }}>
            <Card.Img variant="top" src={require("../Images/extraccion.jpg")} />
            <Card.Body>
              <Card.Title>{item.nombre}</Card.Title>
              <Card.Text>
                <h4>${item.precio}</h4>
                <p>{item.descripcion}</p>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              <ButtonGroup aria-label="Basic example">
                <Button variant="danger" onClick={() => {delete_tratamiento(item.id)}}>Eliminar</Button>
                <Button variant="info">Editar</Button>
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

      {/** MODAL CREAR ODONTOLOGO */}
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
            <Form.Control as="textarea" rows={3} onChange={(e) => set_descripcion(e.target.value)} value={descripcion} />
          </Form.Group>

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
      {/** MODAL CREAR ODONTOLOGO */}

              {/*<Row><Col xs="3">
                <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                  <Card.Img variant="top" src={require("../Images/extraccion.jpg")} />
                  <Card.Body>
                    <Card.Title>Extracción de pieza dental</Card.Title>
                    <Card.Text>
                      Este es uno de los tratamientos dentales más utilizados, ya que a medida que va pasando el tiempo,
                      muchas veces se necesita extraer algunas piezas bucales, ya sea por infección o porque genera molestia o malestar.

                      Lo que suele llevar a cabo este proceso de extracción suele ser dolores intensos en los terceros molares,
                      inflamación de encías, malocusión, surgimiento de quistes o infecciones bucales.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
                <Col xs="3">
                  <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                    <Card.Img variant="top" src={require("../Images/blanqueamiento.jpg")} />
                    <Card.Body>
                      <Card.Title>Blanqueamiento Dental</Card.Title>
                      <Card.Text>
                        Este es otro procedimiento para conseguir el blanco natural de tus dientes. Para ello utilizamos
                        una férula a medida que se ajustará a la  dentadura del paciente y aplicamos el agente blanqueador
                        (gel de peróxido de carbamida o de hidrógeno) a la dentadura.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col >
                  <Card style={{ width: '18rem', marginLeft: "10px", marginTop: "20px" }}>
                    <Card.Img variant="top" src={require("../Images/implante.jpg")} />
                    <Card.Body>
                      <Card.Title>Implante dental</Card.Title>
                      <Card.Text>
                        Se acude a este tipo de tratamiento dental cuando necesitamos sustituir piezas bucales a causa de infecciones o caída de las mismas.
                        Los implantes dentales se hacen con el fin de que sean a largo plazo, de tal forma que se intenta no crear
                        ningún malestar al paciente después de su colocación.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
  </Row>*/}
    </>
  )
}

export default Tratamientos;

