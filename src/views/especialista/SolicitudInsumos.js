import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal, Accordion } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaMinusSquare } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SolicitudInsumos = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [ordenesPedido, setOrdenesPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [cant, set_cant] = useState('');
  const [id_producto, set_id_producto] = useState('');
  const [nombre_producto, set_nombre_producto] = useState('');
  const [stock, set_stock] = useState('');
  const [costo, set_costo] = useState('');

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_ordenes_pedidos()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function create_orden_pedido(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlY3c0thQXBiV3lTak0vZFUxM3pEQVE9PSIsInZhbHVlIjoiUEpSb096UnpUb3E5WFdYSmhsd3N2RXZIQmI1Rko3QmZzUFp1OXFjcTdtK1VjNTFZeWJBZjY1dDlCRDN3Rm9IWXBTbFZKTjJDQlV1clpYQy9iYjkvRFk3VXZpQ3hXUGgzckozZWNzS25RdVMrL3YydmdJSHEvVUY2WFZkeDZ3YVUiLCJtYWMiOiJjNjViMTUzMTRjZTQyNGE5NzExYTU2NjZmNTYxMTNkYjM3YzBiZTQ5Y2E4YTViYWUzMjU4YzIyMDkzMzU0YTFkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjZxWmw4aTIzbHVodGlDOGlwTnRqVUE9PSIsInZhbHVlIjoiYWxMazd3RmlWK3ZRakM1U3NVUXQrREFUTHIvYytDOWNsdWUrT1NhMXdlMTR4ay9nMjBvK3luek1TK3lta1RxTjYzZytEMlFTamlCNkRZSHJIYk5PZlptdUZJZUEydDllcnMzVHJPanBmOG1lTks0ekdlSXVubG56SkZWL0QzYXEiLCJtYWMiOiI2NGIyZmIyYWQ2NTc2ZGVkZmY5YmQ4N2I1NzBlMzZjYTM4OTRmZDdiY2I0YzI1NjE4N2RlYWM4YjlhNmU1ZDU0IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/crear_orden_pedido?cant="+cant+"&id_productos="+id_producto+"&rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_ordenes_pedidos()
          handleCloseCreate()
          clear_productos_selected()
          set_cant('')
          setProductos([])
        }else{
          alert('No se pudo crear la orden de pedido')
        }
      })
      .catch(error => console.log('error', error));
  }

  function search_producto(e){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjJ1N1pPMHpNSDkzeUEyZU1KWTBORHc9PSIsInZhbHVlIjoiYS9PWFkzSW50SjlYSHB2anJWQ0tJRkZ3dkIzeDNPbEk3RHVRd213enpPbWFMWFp4K1ROZU5rYjVIRTE4N3RrdEh6TkhLNktYMnlDTm5vVy84cEVmSEF5MHhSaG4yUjdIYjkvR29tR0NLQS9tek1yRzZCWHIvL0dIUFVKdFBxL1AiLCJtYWMiOiIyYjc0Y2M3YTBkNDdmMDNkMTYzZjZjMTFkOTliZDQ1YjBiNjUxZTk0N2QwOGFiYWJhYjU2NTVhODNhMzYzYWI4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IndlZDJMdU1oZ1BPQUJHN1NCTExyaUE9PSIsInZhbHVlIjoidHJWdFdyVndac09qNnVLc005N2U5SFdGdzhRcDczOHkwY3l4UE9zRG5vM1VtcENYZmxCZTN3d05sMW54TTJEcy8rY0ZmODlJTFB4L2Zya1dhenJCQVcyUk9RZHdWM3d5YWY2WGdhMjNoZFNOUE91YWMzL0NwM1VQcmwrK1F5V1QiLCJtYWMiOiIwOWIzMjYxYjZiZTczMzViODNmYTk2ZjI4NjFjMmU1OTQxOWUzYmE3YzFlODE5MmRmYzc3YjNjMjQ3MjEyMzQzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/find_producto_by_name?nombre="+e.target.value, requestOptions)
      .then(response => response.json())
      .then(result => {
        setProductos(result)
      })
      .catch(error => console.log('error', error));
  }

  function select_producto(id,nombre,stock,costo){
    set_id_producto(id)
    set_nombre_producto(nombre)
    set_stock(stock)
    set_costo(costo)
  }

  function clear_productos_selected(){
    set_id_producto('')
    set_nombre_producto('')
    set_stock('')
    set_costo('')
  }

  function get_ordenes_pedidos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlBzU2ZSMHFPdUdRaFdKcEYvNzhvcWc9PSIsInZhbHVlIjoibTdHa3lVSWRBclQ4ZG83eGlJYWpLcnlkMUp4aHhsMmJSZjVvM0Q3K1FLRktyQmFSbjMrWmxSL1Q1MG5LWXhJTDhmVWRlT2ZqZDlOcTJKeGFmSU1mcVRsL3JaQ2FrSUJ0ODlWYkFHM2VXQmZ5bDBJNXE4SlNHRmpGcEQ4djdpa3YiLCJtYWMiOiI1YmIzYWRhZTMxZjgxYjU3N2ZlN2ZhMzcxMGUyMzkxMzNjZDJlNzJkNjE5MDQ1N2ExZThhZjgzOGYwZmRiMGVlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InhZVmhabjcxSUVyemNjRE1BcDE0Ymc9PSIsInZhbHVlIjoiWWhxbHZZR1ZPdStIMmlhcDVhbzUxVkJmWWQ5dzd3dmhWWXR4WThBL1kvSlBsYk9GWHEyNHB0UndiT3VCYnRPdlJNeEcvTnZUenEydHhDeXBwc3Zya3hOT2IvTjVqZG1GUTNkaEk0ZzVHR3RQTFd6OFBvMENsV1lRMmMxVU02NW8iLCJtYWMiOiJjNzU1MzgxYzVkMmQxOWM0NWVkN2VjNDkwMGYwZDQ3MWI2YjYxNzFiNGRkOWJhZjZiMzNjYjdlMDQxZTlkYTJmIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_orden_pedido_segun_especialista?rut_especialista="+cookies.get('rut_odontologo'), requestOptions)
      .then(response => response.json())
      .then(result => {
        setOrdenesPedido(result)
      })
      .catch(error => console.log('error', error));
  }

  function anular_orden_pedido(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Imc4blBrenQvWG9IWWZMVjBJcWI2ZkE9PSIsInZhbHVlIjoibEhPcEs1SHdOYVZJUnJqSTJvVmNFSHM4TWR6T0VVRzBnMHZseGFlYndqRTVyYkpxQXVRWk1nTlFoTThobE9CVUU2WW1tdU1MSnF1UUE3d25IVDF0U1diYmlhWURmVGZSdEhvUEo1YTR4ekgxRHZiQk5VMCtWNzdWdmR5RHhXZXoiLCJtYWMiOiI0ZDIxODg3MmE3OGYxY2FmZWQ2NDY2ODE5Njg1YzBmYmEwMmFhNDFiZjk2ZGUxYzQyYjRmMmJiZGNiZDM2YzFjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImQ4WE1BUDk3c0JkbElQM1pjVHNqM1E9PSIsInZhbHVlIjoiQUFhN2xUZXBDNFB2QmNtUmowK3FoL0ExbUJDejdoSVVza1RyeXJMS015RDhmQmQwc2wvRlEzeUlZd3BUL1NqN0pUUDROSCt4anovQWpLeDVYN0xnakJid09uTTErSnRFS2FMaEdGb3J1SkgxQU9iQ0hNUXZ6N0RDTkZIYXowY2oiLCJtYWMiOiI2OGJkNTBiMzg5OTkxMzBjZGMwYTIxMDM5MmNkOTA0ODg3YmI4NjNiNTczZWViYWFmNWY1YzJjYTdjNzcwYTg3IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/anular_solicitud?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        get_ordenes_pedidos()
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  function render_productos_encontrados(){
    return productos.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>{item.costo}</td>
          <td>
            <Button variant="success"><FaPlus size={15} onClick={() => select_producto(item.id,item.nombre,item.stock,item.costo)} /></Button>
          </td>
        </tr>
      )
    })
  }

  function render_ordenes_pedido(){
    return ordenesPedido.map((item) => {
      return (
        <tr>
          <td>{item.id_solicitud}</td>
          <td>{item.cant}</td>
          <td>{item.estado_solicitud}</td>
          <td>{item.id_productos}</td>
          <td>
            <Button variant="danger" onClick={() => anular_orden_pedido(item.id_solicitud)}>ANULAR</Button>
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
              <FaPlus /> Crear Orden Pedido
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '50px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Solicitudes</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cantidad</th>
                      <th>Estado Solicitud</th>
                      <th>Productos Solicitados</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_ordenes_pedido()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL CREAR ORDEN PEDIDO */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Ordenes Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Label htmlFor="username" className="fs-5 text">Cant:</Form.Label>
          <Form.Control 
            type="text" 
            id="cant" 
            onChange={(e) => set_cant(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={cant}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Buscar producto:</Form.Label>
          <Form.Control 
            type="text" 
            id="cant" 
            onChange={(e) => search_producto(e)} 
            aria-describedby="passwordHelpBlock" 
          />
          <Form.Text id="passwordHelpBlock" muted>
            Solo puedes seleccionar un producto
          </Form.Text>

          <Table responsive="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Costo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {id_producto !== '' ?(
                <>
                <tr>
                  <td>{id_producto}</td>
                  <td>{nombre_producto}</td>
                  <td>{stock}</td>
                  <td>{costo}</td>
                  <td>
                    <Button variant="success" onClick={() => clear_productos_selected()}><FaMinusSquare size={15}/></Button>
                  </td>
                </tr>
                </>
              ):(
                <>
                {render_productos_encontrados()}
                </>
              )}  
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_orden_pedido}>
            Crear Solicitud
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR ORDEN PEDIDO */}

    </>
  )
}

export default SolicitudInsumos;