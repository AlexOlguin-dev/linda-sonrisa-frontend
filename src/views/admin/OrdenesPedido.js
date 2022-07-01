import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const OrdenesPedido = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [ordenesPedido, setOrdenesPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tratamientos_agendados, set_tratamientos_agendados] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [cant, set_cant] = useState('');
  const [id_producto, set_id_producto] = useState('');
  const [id_tratamiento_agendado, set_id_tratamiento_agendado] = useState('');
  const [id_solicitud, set_id_solicitud] = useState('');
  const [cant_edit, set_cant_edit] = useState('');
  const [estado_edit, set_estado_edit] = useState('');

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    //search_tratamientos_agendados()
    get_ordenes_pedido()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_ordenes_pedido(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ik4vMFNyY3hCSkV1enh3cVUwTjJwRVE9PSIsInZhbHVlIjoiRWdodklna20rcFdpaGRYQXhheFdINzFsbmhvZkhtaVo4NmV5bklzRWVqV3FUdW8rWjNLVFNXOVV4bG5GWmhMWUYxbEdPTkFwM3dFL05DbUdLb200ZmV0TDMwZDNYWlcrTTQ4WDl6VCtUTXk5SUt1NGoyZG14ZU91dEVTY0Z4WGkiLCJtYWMiOiI4MDg1YmEyMDQ3YjViNjQxN2ZiMTVkYTE3YzllZTc0OGY0NzZkMzU2OWQ5MGMxOTA5NzM2YzI1ZTcxZGJjNTVjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImFTOXlPaWpIUW82ZHE5ZFdRUkNqdEE9PSIsInZhbHVlIjoiNnBWS3lld3M1UVZRa2t0TmVFR0x3ZTdXN05aWHBuK0lkTGg1WFFBS1AvU3RTbFphTGUxU043Mm5KSG4zV0hBL25haWxhUk9IUWdaZ25CenNLd0taU05IaE9PaTRuK3A0Uk56dWZla3ltODFDbE9yVFhDVWh3bUl6VnBJVVNWRXUiLCJtYWMiOiJjNzIxZjVkZGJmOGYxOWIzZjdiZWI5NGIzOGI2YTExYThkYWZhMTNjY2ZiODcxOTg4NzdjMmIxZDFhN2YzYmNiIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/list_ordenes_pedido", requestOptions)
      .then(response => response.json())
      .then(result => {
        setOrdenesPedido(result)
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

  function create_orden_pedido(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImpTUUU4MlZsYm9JVWp0bVB2N0ZUYnc9PSIsInZhbHVlIjoiMEhKQ01UdG9WT1EvZUcxVW1uTUpYeGg5QVFEZThod1hmVDJCN1RkaWV3VzZFRGlob05ZOWlLNnk4bEZ6ekREY3lxNVRXbmtZdG1nSWhNQldCUm1uUmhPalk5ejhwMlc2SjJCZ2RjZ0Y1ZTA4NGhsTHVoUExUUmdZM3UxdkVzblYiLCJtYWMiOiI2ZTY2ZDcxOWFkNzIyYmZkMDMxNzMzMmMxZDJmOTdkZjkwZTExYzFjMThjMDE2ODM1YWJmMDI3ZDkzM2ZkNTJhIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjE3TGpRSC9LcWp5azdIYmdOaXBFNkE9PSIsInZhbHVlIjoidjRRdkIwSjlyaGs2b0gzNE1oV2w2cWVqdytwdVplNXJNTGQ2M1Q5cWMvNUs5aDFZV05CQ0hKSlorRmx5RFNGWS9aYW1rdFJwZEZCZ2xURUdYTEFXcm10UWVta2IvS21JREwwMFltT2tCcVF1NUVwWUZiWWEweERtTTgzckpmNW0iLCJtYWMiOiI3NWI1ZWZlOGRjMTY4YWU3NGZhMmJhMmMyOTU1ZTNhMjE4N2U3OWRiZGFlNTMxZTYwYTY2NzVkMDk5NDdhNmQ0IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/crear_orden_pedido?cant="+cant+"&id_productos="+id_producto+"&id_tratamiento_agendado="+id_tratamiento_agendado, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          
        }else{
          alert('No se pudo crear la orden de pedido')
        }
      })
      .catch(error => console.log('error', error));
  }

  function search_tratamientos_agendados(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImwwYlUzbmlsZTYwZ0tWWkhqRi9BUXc9PSIsInZhbHVlIjoiZlBXKy9wUWVjUzBWOVB5QzIrUXlPMUJxS09yN1ZDbGMrK0RoWDZBOFdzYUNmUXhFTlFlTXltb2ZvdmVsNjREZ3RkUlZkRnRzS3QxUWxDakJnSXpNRFVpb21DTkROT3krYzhXRlVnWHNvcWhZQVN0dThmNmZNL3dTcktkcEJtOTgiLCJtYWMiOiJlYTdhZGRkMTYyMDliMGM1ZTdlYWIxZTE3ZDUyZDRkNDVkODJkMzViN2NjYjUxMjA3MDFkMDU0YTU4YWQyNzM0IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ii9vdWp4SnNJc0c1eTVUZFprTnh0bWc9PSIsInZhbHVlIjoic2J6Y3hsL1F4VWtzSG1kQ2U5THFKT29Vb1pqMnMyeUdPVU9pMmxPWjNCWnVFcFRVZWJOYy9VREVmQzZhY0FnRXFSL29maktmT3IyWWtpZW5aQmRhUXRJNE1iVWFyMVB2L3JtV3FDVjQ3TmdlOWtMbC9FaDN6NHhOWjV4MEZCODciLCJtYWMiOiIzN2RkNTk0ZGQ1M2VhMzdkNDg3ZGExYTM5ZDM5N2M3MTcwY2U3MDVkZmM0YmM3NzYxZTYyMzQ5MGIxMzMwZmJkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/listarTratamientosAgendados", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos_agendados(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_single_orden_pedido(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ik5zWU1hUHNNb0gybTArYzU3VE51Nnc9PSIsInZhbHVlIjoiSml6RWhBRTZnUTkrWFNpd0VCSmFXOC9MYW9lNmtFd0NUZTB6ME5vTUxNV3BJK2Q0S2xKU0lMZGoyaEpqR0RXVWhySUdlcUxKMHZTS2xFUEJ0Z3IwbUtndGhObEtRMkVRNytoY1VzL290dkRJZWJWbXBnYjFmVUdQbU9NMHZJSjkiLCJtYWMiOiJlYWM3ZjA1ZjVkZjJmM2EwODAwMTlhZTU1MzY1ZmFiZTI2ZGIwNWZlNzRlYzJhZjE3ZWU3ZThmNWIzNjBlODQ4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjVUWlFzekg5bkc2Q2pNWTlWLzNRYUE9PSIsInZhbHVlIjoiSXliVWxMUXRabFAwVXBWMCtLOGlCUm50bmh0a3Z5bHVyK0JWdGdvQm5IT1B0YnRWWFY5VXFxZzRUSlcyR3dJQmdUcHk1cXdMTlBzS0dnL21KM2NpWWYwUzJzaDdoQmVaNUxiaGdmbFd1R3RpNWJ3ajZsYXdEOHdpd0xwMDFkQS8iLCJtYWMiOiJhNDBiZWE5ODlmNDVlMjU3MDE5ZWE1NWVhMzFkZjllZjljMzEzMjI5M2QyYmQ3YzZmNTg5NDFjMjc1NTg2N2VlIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_orden_pedido?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_id_solicitud(id)
        set_cant_edit(result[0].cant)
        set_estado_edit(result[0].estado_solicitud)
        handleShowEdit()
      })
      .catch(error => console.log('error', error));
  }

  function edit_orden_pedido(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImtOKzRWVDE2SHBUNkZDeGpKaXVtRVE9PSIsInZhbHVlIjoiZUs2MUVYUkhrbXJoV0ZTT3BqWXZhYkYwaVdaV1pBdy9wYkxLZisvek9BbG5KY1NEekJ3N3hjcGJWeEFWN2xXWEN2aEtwL3pvczdndGtjTWNibGN0ck4yb3UrVUVZaVZnN3dhb3ZGdlMvQ2FNY2tMZTNMdHUyY0pBRjRuS0dybTgiLCJtYWMiOiJmY2Q5YjIxMDA1NzM5NGU3ZTQ2Yjg5YzAwZDQzZTM0NDc3ODQ2YTExMTA5NmYxZTE3YmVkYzExY2I0NzhiYzA2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9HK0I3TFVaY01XSC9yNDhRenN3MXc9PSIsInZhbHVlIjoiV09rQW5wN3U3NGVUaC83OFkxbkdMZHJyWUdlb1Y0Y05vSGNIWHhja1RxWkROdlFML2RoR3F5RSt3UTRjSFdIKzNSeGxwczBVMVB4SHhQQkh0QzJmRG05U1VlZSsvU3FseTdBME5BSUdWa29YbkcyWUljWm9vZDR1dU1QTVlyRTAiLCJtYWMiOiI1YWZmN2RkMGUwMTllNTI1NDcwNTUyMmE1Y2RmNTIyNTk0ZTdhMjc5NDNmNDBjN2QzZjVhMjNkMzJmMmE5ZjNlIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/editar_orden_pedido?id="+id_solicitud+"&cant="+cant_edit+"&estado="+estado_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_ordenes_pedido()
          handleCloseEdit()
        }else{
          alert('No se pudo crear la orden de pedido')
        }
      })
      .catch(error => console.log('error', error));
  }

  function eliminar_orden_pedido(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlBwREtsSDVSbnVjOS8vQW8wdDN1L2c9PSIsInZhbHVlIjoibEF5TVYxU091UjQrMThtQjUxS2Nhc2tGKzJvdXBIMVlIamJrY0FuN2IvcFNlZkhJcVRMMWpEelB6V0RmcTNlVi9zSzJzNzZ2bW9kZHlKQWI2dUIvNEE1NW1SV0w3bm1Ldit1aktSTWxwL2RTdDBLeGRpZEU2MjVIQ0dlYXpocVciLCJtYWMiOiJmMTYyZjRlMTBlMDA0YjlhM2Q2M2ViOWI2NjliYTA4Y2IzZGExNTA1ZDg1NmUwZjMyMjhjZjdiZjMyYzc0ZDM4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik1WbTBXeXZ5RlFJK0VVS21tdWgwclE9PSIsInZhbHVlIjoid0ZLTjJQQlBjWlV0UXp0RkM3ZG02KzFPOXVrd081RE9wcXBDaTBBOXFLbG9FSDFEazZnL080QnJDWUM1UkRiWUhteUtDNUM3bEFMekFTWHlCQ3orRlFVS1d0MnRJNWhMRFowSG55MlcrVHZsMUxZa2ltMFkwcEVhTms2Qy80bE0iLCJtYWMiOiJmZTA1Y2VhZGVlZGEzODgyN2ZiNTA3NWE4ZjA2NDkxMjE3MmI3MDQ1Y2Y1OWFiZGY0MjYwNzdkMzcyMWM4YWRhIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/eliminar_orden_pedido?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_ordenes_pedido()
        }else{
          alert('No se pudo crear la orden de pedido')
        }
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function select_estado_solicitud(e){
    set_estado_edit(e.target.value)
  }

  function render_solicitud_insumos(){
    return ordenesPedido.map((item) => {
      return (
        <tr>
          <td>{item.id_solicitud}</td>
          <td>{item.cant}</td>
          <td>{item.nombre_producto}</td>
          <td>{item.rut_especialista}</td>
          <td>{item.nombre_especialista}</td>
          <td>{item.estado_solicitud}</td>
          <td>
            <ButtonGroup size="sm">
              <Button variant="danger"><FaTrash size={15} onClick={() => eliminar_orden_pedido(item.id_solicitud)} /></Button>
              <Button variant="info"><FaEdit size={20} onClick={() => get_single_orden_pedido(item.id_solicitud)} /></Button>
            </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  function render_productos_encontrados(){
    return productos.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>{item.costo}</td>
          <td>
            <Button variant="success"><FaPlus size={15} onClick={() => set_id_producto(item.id)} /></Button>
          </td>
        </tr>
      )
    })
  }

  function render_tratamientos_agendados_encontrados(){
    return tratamientos_agendados.map((item) => {
      return (
        <tr>
          <td>{item.id_tratamiento}</td>
          <td>{item.id_cita_agendada}</td>
          <td>
            <Button variant="success"><FaPlus size={15} onClick={() => set_id_tratamiento_agendado(item.id)} /></Button>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      {/*<Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShowCreate}>
              <FaPlus /> Crear Orden Pedido
            </Button>
          </div>
        </Col>
      </Row>*/}
      <Row>
        <Col style={{ padding: '50px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Ordenes Pedido</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cantidad</th>
                      <th>Producto</th>
                      <th>Rut Especialista</th>
                      <th>Nombre Especialista</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_solicitud_insumos()}
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
              {render_productos_encontrados()}   
            </tbody>
          </Table>

          {/*<Form.Label htmlFor="username" className="fs-5 text">Buscar tratamiento agendado:</Form.Label>
          <Form.Control 
            type="text" 
            id="cant" 
            onChange={(e) => search_producto(e)} 
            aria-describedby="passwordHelpBlock" 
          />*/}

          <Table responsive="sm">
            <thead>
              <tr>
                <th>Tratamiento</th>
                <th>Cita Agendada</th>
              </tr>
            </thead>
            <tbody>
              {render_tratamientos_agendados_encontrados()}   
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_orden_pedido}>
            Crear Orden Pedido
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR ORDEN PEDIDO */}

      {/** MODAL EDITAR ORDEN PEDIDO */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Orden Pedido {id_solicitud}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Label htmlFor="username" className="fs-5 text">Cant:</Form.Label>
          <Form.Control 
            type="text" 
            id="cant" 
            onChange={(e) => set_cant_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={cant_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Estado:</Form.Label>
          <Form.Select aria-label="Default select example" value={estado_edit} onChange={select_estado_solicitud}>
            <option value="PENDIENTE">Pendiente</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="RECIBIDO">Recibido</option>
            <option value="ANULADO">Anulado</option>
          </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_orden_pedido}>
            Crear Orden Pedido
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR ORDEN PEDIDO */}

    </>
  )
}

export default OrdenesPedido;