import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Inventario = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [productos, set_productos] = useState([]);

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function search_products(e){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImNyN2RwbVlUZlJoRFZSMnpWY3pxY0E9PSIsInZhbHVlIjoicExxc3pHUk40TkMxMW0vKzExU0xRek1BY2RMNTFoQWcydC9PWVo0dHlJVTQwZWwwZWhmM25oN01iZ0pCaENucmNtSVlyOU1ZQWtabUtvR3h5a3p3UDI1MjRjMEhZbmNXZkFmakJ6MzlYRW9icWp4NGNLVVViYVlYVkpyVlc5VWIiLCJtYWMiOiI4NmRkM2RhOTEzZWZmNmQ3MjBjNDMyOGZkYzNhNTBkZGU2YWUzMjZhZjViYzNiZGEzYmFhMzYyZjhkMTM3Mjc5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IndLY25ybjRCWUpEdFNjUWx5UCtJcnc9PSIsInZhbHVlIjoia0RjT2hYMWlrV0gzRlVYMWRiQUVlWEg3dEk5Ri9MODZCaSt3SHFibUVwZlVYeDhjZTh5bzM4NitScjMxNm9CbVRVQVE3a05mUHpEWGYzRkxSaElUQytWK1BCZmx6SjYvZWcxYUVRMmZBR2N3ZCtybWpiV0NDbHJIKzZaUWlQK1EiLCJtYWMiOiI2OTY1ODRlOGVhNGMwMGI2ZTA1YmJjNDcyMjY1NmI3MmU1ODI2NDA0NGUxODhkOTdiNWUyY2E0NmNkOWFmMGMxIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/find_all_producto_by_name?nombre="+e.target.value, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_productos(result)
      })
      .catch(error => console.log('error', error));
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  function render_productos(){
    return productos.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>${item.costo}</td>
          <td>{item.rut_proveedor}</td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <Form.Label htmlFor="inputPassword5">Producto</Form.Label>
          <Form.Control
            type="text"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => search_products(e)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Escribe el nombre de un producto, el sistema autocompletara la busqueda.
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Productos encontrados</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Stock</th>
                      <th>Costo</th>
                      <th>Proveedor</th>
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
    </>
  )
}

export default Inventario;