import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Productos = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [producto, set_producto] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [nombre, set_nombre] = useState('');
  const [stock, set_stock] = useState('');
  const [costo, set_costo] = useState('');
  const [id_edit, set_id_edit] = useState('');
  const [nombre_edit, set_nombre_edit] = useState('');
  const [stock_edit, set_stock_edit] = useState('');
  const [costo_edit, set_costo_edit] = useState('');

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    list_productos()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function list_productos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImVJdjRSb2tUN1AzbVZIZmt5SjF6dnc9PSIsInZhbHVlIjoiNWtBTE5YcnlYMlhJVER0eVE1WWxUczZEWXN5NkZhdk1OMEFHU1VDWm9Ia284V1VoN25zUnZ4eEsyNkN0SXNuK29OZXdyemhBK2RRQVE2aWtIdk9vR2NrK1czSXM0UXFCdU1HNVlWZFF3ck9KUjZWVEIwUGxQMnU5dFd6UlNrVnAiLCJtYWMiOiI0YzJkZmFlOGUzMzA5OTNjNzZiMzJiOThkNWY0MGVjMmYzNTBhNTM4OGJlMmY3OTYwNjcxMDNiYWQzYTJmNTdiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjltK1Y5RU0zVGVkVnFBUWxqVFAxUVE9PSIsInZhbHVlIjoiVDJOTzhobnhHcVM2U3pheEl5OU5OaG9ESWpXdFozV05tWDBvMk13RXlaN252WWM0b0RhVGRiZjVWdlBMMWkzaU1XMEhpYzRtL3J1d244Zk9DZFVYaFJyL0svM0VZNnBObEExZ1IwK0ZudFJ5aFgwTWtDR2ZML282dmRHSk9kUVkiLCJtYWMiOiI0MWVmMjJhYjRiMzRmZTdiMzlmYjIxMDU3NjlmN2I4YWU0NWFjNDk5ZTFlYjgxYjZmZmRhNjYyM2ZhYjY5NTM1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/productos", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_producto(result)
      })
      .catch(error => console.log('error', error));
  }

  function create_productos(){
    var nombre_exist = true;
    var stock_exist = true;
    var costo_exist = true;
    if (!nombre) {
      nombre_exist = false
    }
    if (!stock) {
      stock_exist = false
    }
    if (!costo) {
      costo_exist = false
    }
    if (!nombre_exist || !stock_exist || !costo_exist) {
      alert("No pueden quedar campos vacios")
    }else{
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ii9XRzU0ZXZ6ak9Ja3BDL3UxcXRHbVE9PSIsInZhbHVlIjoiMnd4aTRtZEVNYzh5VUlqWEF4RlcrN3VOalRJV3VySkltU01QcTRsK3NNaEl6QzZoVGxDOUhCeW01bksyYnlkdVFaZXNKNEg5MXJRaGUxd3JZSEtwUUxRMkxDYjhCSElUWDV2eUFDK3gyN0RWc21rNjRSWFV1bExiTlplc1I5N0wiLCJtYWMiOiI1ZTFkNTNjMjJjZDcwNjMxYjk1M2E5Nzk1NGE1M2M4NDg4MWZiZDdmNWU5MTQ1NDAzNTk3Y2EzNzY5MWZiNDVjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlhyV0FNZkhpZ2ZnVUt5Y3kwYXZ2R2c9PSIsInZhbHVlIjoiTWVrUENRcjF1MnhyQTFFRHBHUWhNSHl6UkJCSFQ5VExsbUJMa1FGcmxBTVh4c3dmaC9uNDJmRVV4a1IrbVkva2czOEszaTRaY1FWZENJK1lCdGRlaTFQMnlPSTdUdGtkMFVWTWlwMHUrb3IzWUJGcTRNWVR3L1hwN3NNTmlNbWEiLCJtYWMiOiIwZGY0MWEzNDdiYzVhOTFlZWUzMzA1Mzg0ZjllOGE1ZjM3ZWEzNWU5YjQ0YTYwNDJmYTcwOTA5OWMxZDIwNjNkIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/create_productos?nombre="+nombre+"&stock="+stock+"&costo="+costo, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result === 'ok') {
            list_productos()
            clear_producto_create()
            handleCloseCreate()
          }else{
            alert("No se ha podido crear el producto")
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  function delete_productos(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImZJZFlyei9HY2hOMFBPTUZaaE94K3c9PSIsInZhbHVlIjoiVEhmZ096TWhDSzRwNGZuMnl3Z0trdVAvcFNveE12WlZXWlVYNmYxYjNGNU12MTMxVDlQWG9TRlRVTFlGbjFrdlhkSmc2OTNVOTJWSklKU0ZqNTZCUWNwSDRXOHBpOHplUURCcnZ6QXhrUjAya3RObG5kaU5kbTl3R1I3alpaWWIiLCJtYWMiOiJiMWU1MGQwZWI4YTNjOWFjN2Q2NjRhMGFiNzdlOGM2ZDNiZmYwNjRmNGVhNGYzOTExMTVmYWI0YzNiMWU0NTgxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IklDcElwZklRTzg4QzhyK3d2WnYzRUE9PSIsInZhbHVlIjoiajM0SUJlWGRLTnl0eFdwVW1NWllpWDA1SXJMejVjZ0V2Uk5KZHVLZUtLUnI3SFNyK0g3Nzh1LytsNUN6dElmdVQrTDRZT2E1U1NEaDFqRTkvb0FHN0h6WlFRMVhHS2RubWMrTTl1NDRsaXZqUjVRQlRjbXJEbGEyOHhaRkV5VkUiLCJtYWMiOiI2MmNlMDA4YTBjMGQ3YzM0OTg3ZTMxNGM2ZDhkMzZiYzdjZjViYWM5ODNmMmMwMWM1MGVmMDZiNjMwMzg0ODA1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_productos?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          list_productos()
        }else{
          alert("No se pudo eliminar el producto")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_single_productos(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ink4K3JYNmFiOHR2NkwwNWtEZG9ha3c9PSIsInZhbHVlIjoiMTlWL2VKZ0xDci9WT0NCTWJtZDd1azFRYXJtdG1OOVFTYWJQMWpxNVR5SjNGNk0wUEV4ajJDMXNtVEM4RmdJMVY5N2ltcHQ3UUFSTjMza0ozTFh0Y01mMXJ3UmJ2WWNyRlh0SnVVbE5rK015dWduL3lMeG1Ta3dzTzRUNWlpZ0kiLCJtYWMiOiI0NTgwOWU1NzllMTI5NTIwYThkNjEyZDdmOTc5OTA4ZmViNzgzMmMxMzQ0NTZlZDVmYzNkMTFlNmVhYzdkOTYzIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Inp1QTlTNDFub21Hb3c5UmZDNjVSV1E9PSIsInZhbHVlIjoiUFM1MVRFaEFkQ1o3VVpNNEtiWGpkSmFnN29WVzJDTW1xS2crZ1NVenhoaU80TEVEWXlkOFpSSmx6dXlrOFV2ZUxOK3BXVHhQam9uWVQxQlZWU0x5OUdZejZhSFpKMEl5NFNIamxvMTZ5Vm5MM2hTQlM1UC8vWVBlYVdIRmg3M3IiLCJtYWMiOiJmY2NjN2MzMTA5MTllMDczNjc0ZjcyOGFmZDc5OTUzM2NmZTA3OTViNTlmYzUxYTc3MjY5YzJhODc3MThjMDUzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_producto?id="+id, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_id_edit(result[0].id)
        set_nombre_edit(result[0].nombre)
        set_stock_edit(result[0].stock)
        set_costo_edit(result[0].costo)
        handleShowEdit()
      })
      .catch(error => console.log('error', error));
  }

  function edit_productos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ik9JYTdrRGtrckNiM1lDRmJWSUFId1E9PSIsInZhbHVlIjoidi9oQWpocTVhWDFpSFhZU3dTODNENVp6WC8wc0Z6ZEtsN1hjaTZPQkt0ODJqUGZpV0pQZkgyWmR5N0pMcXJ1c2pZaHo1d01JbE5TdXJNY2Nld01tb0hqc3Nnd0lzV2JSejVXa1Rnbmd3LzI4Y2Q5MW9NSjJvMnJIL1hneTdVUjkiLCJtYWMiOiI2YTE0MTY5YzVkOTM2ZWJkNzkwOTJiYjRiMDBmYmU5ZmM5Zjk3MjFhMDY4ZmU4YjgxZjNjZjc3ZGJiNTAxYzFlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InNTQU92WkFmcVlVUWswQlVZMEF5Nmc9PSIsInZhbHVlIjoiS2FuQVdpWEJtZTlqcUt4TVJEQmI2TVhWajRhZldsa3g4ZWhkMklRUnIyOXlsOWlyeXB4Vm9qbFMwcmxKQ251SFpYb1BpZk5Idzl3WEtJUW1QcHNNWjhObHJiOU9QM1poTG9aNng2SDdydEYrLzJVbU5zeUJtTys3MWVKOTk5SnIiLCJtYWMiOiIxMmZkNWY3M2RlY2RkZjFjMDZiMzIwOWE0MGY2Mjc3ZjJjMTdkZTM2MWI1MWY2YmVlYTg0Y2M1YzBjZjgyODkxIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/edit_producto?id="+id_edit+"&nombre="+nombre_edit+"&stock="+stock_edit+"&costo="+costo_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        list_productos()
        handleCloseEdit()
      })
      .catch(error => console.log('error', error));
  }

  function clear_producto_create(){
    set_nombre('')
    set_stock('')
    set_costo('')
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function render_productos(){
    return producto.map((item) => {
      var rut_proveedor = 'Proveedor no asignado'
      if (item.rut !== null) {
        rut_proveedor = item.rut_proveedor
      }
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>${item.costo}</td>
          <td>{rut_proveedor}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => delete_productos(item.id)}><FaTrash size={15} /></Button>
            <Button variant="info" onClick={() => get_single_productos(item.id)}><FaEdit size={20} /></Button>
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
              <FaPlus /> Crear Producto
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Stock</th>
                      <th>Costo</th>
                      <th>Proveedor</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_productos()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL CREAR PRODUCTO */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="nombre" 
            onChange={(e) => set_nombre(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Stock:</Form.Label>
          <Form.Control 
            type="text" 
            id="stock" 
            onChange={(e) => set_stock(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={stock}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Precio:</Form.Label>
          <Form.Control 
            type="text" 
            id="precio" 
            onChange={(e) => set_costo(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={costo}  
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_productos}>
            Crear Producto
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR PRODUCTO */}

      {/** MODAL EDITAR PRODUCTO */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="nombre" 
            onChange={(e) => set_nombre_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Stock:</Form.Label>
          <Form.Control 
            type="text" 
            id="stock" 
            onChange={(e) => set_stock_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={stock_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Precio:</Form.Label>
          <Form.Control 
            type="text" 
            id="precio" 
            onChange={(e) => set_costo_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={costo_edit}  
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_productos}>
            Crear Producto
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR PRODUCTO */}

    </>
  )
}

export default Productos;