import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Table, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';

const RecepcionPedido = () => {

    //VARIABLES------------------------------------------------------------------------------------------------------
    const [solicitud_pedido, set_solicitud_pedido] = useState([]);
    const [show, setShow] = useState(false);
    const [estado, set_estado] = useState('');
    const [id_solicitud, set_id_solicitud] = useState('');
    const [cant, set_cant] = useState('');
    const [id_producto, set_id_producto] = useState('');

    //FORMATOS------------------------------------------------------------------------------------------------

    //LOADERS--------------------------------------------------------------------------------------------------------
    useEffect(() => {
      get_solicitudes()
    },[])

    //LLAMADAS-------------------------------------------------------------------------------------------------------
    function get_solicitudes(){
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IktRS3RlTmtUSy9UVTY2YmhBbWxORlE9PSIsInZhbHVlIjoiK2RvNUNuL3AxSXRtcDJKUUNqejZTc1QwU01CYy9SdEhxTXg3MlNQNDBha0VYZitmcUYwVmRsMmMvK3diTS9HenNlRktpcHFPc2xJclhNZTJXa3crdTV5TDBZcDZXbTJpNzVrOVQvYzNDbnJWVWxWcFFPNC9mai9ac0F1VFNOZGwiLCJtYWMiOiIwNzE1ZGFiNzY4OTgwNWU2OGQzZjZmNWYxNzk0YzM2NjQ5YmI5NDIzMTc3NmY5NmNlZGFiMGY3ZGIxNGNlMjhjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik5KR1BVRzJTWXlrS0hxUU1KMjFMN1E9PSIsInZhbHVlIjoiUDBRVHdacHl5c1AzWFZKSUVaRnp6eElkYktFOEZVUlJTMUdQMnNxbFZEQnUzWlRncFpHU2lIWGZKMmYzYzJGZC8yZW1Ka0M2L3ZPU29TUzJlVk5qOUorbnIwQ2M4QUlVcHBMZ1VGWUcwNVNTRlA2RnpoUFd1MTVORDVOVkVrazciLCJtYWMiOiIzMWFlYTdlOWM1MmY5Mzk2Y2ZhNTdjNjliOTQ3NWQ0YTgzZTI0OGM2ODkyNTFiZGQ2NzhhMmMxODVlZjU5NDg2IiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/list_ordenes_pedido", requestOptions)
        .then(response => response.json())
        .then(result => {
          set_solicitud_pedido(result)
        })
        .catch(error => console.log('error', error));
    }

    function get_status(id,estado,cant,id_productos){
      set_id_solicitud(id)
      set_estado(estado)
      set_cant(cant)
      set_id_producto(id_productos)
      handleShow()
    }

    function change_status(){
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ikh6WUZjb3dQQVVSVUJ0MFViYWo4elE9PSIsInZhbHVlIjoiSGxVdnY2cy9CeDNpczd5SFZTc2VQRTZvQ01yaUQvVjRwTzNMS3luSWx3aitkUVZOZlBjYnFOMkpBQVNrVkU5MnNFTWEreWJ3d0hDbFZicllyV2l2bzhoVjMwcUxkMnFYU00xcElwaHNnb2pScXZrbzB2WEFPclBWVXl4RTl5WFIiLCJtYWMiOiI1MmM4N2Q2MzQ4MmUzNzViOTFjYTgwZGIxNTA2MzVjNzg0ZDMxODFlYmJjMDVmN2YyOTBkYWEyNmRiZTNkOWE3IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkVaanZWaHpnNEdzZU0ySGFnWTNEeEE9PSIsInZhbHVlIjoiSXl2N2pmZ0dJRW5XeW1TMFRIdFI4bEpURzd1Z0dNc0hSNFVPTVNtanlYaTIvTUFjR2VVZDk1Qk1lYlpzZjJJVndHWmY4Y2xSZ2VuNDdPMmFrdlhheURVdjg4T2xTOFNRR2JGZHRlY0NtWVdVZFZ3WEwvanRhWEhxRlp3Q0xJeXgiLCJtYWMiOiJlOGNhYjNiMDRhOTFjZmE4NmM1NWY1MTMxNjJmOTgyZjBhOWZhYmRlMzY3M2M2MmQxZDJjMWVjMDExNjRkZDY1IiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/change_estado?id_solicitud="+id_solicitud+"&estado="+estado+"&cant="+cant+"&id_producto="+id_producto, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result === 'ok') {
            get_solicitudes()
            handleClose()
          }else{
            alert("No se ha podido modificar la solicitud")
          }
        })
        .catch(error => console.log('error', error));
    }

    //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function selectEstado(e){
      set_estado(e.target.value)
    }

    function render_solicitudes(){
      return solicitud_pedido.map((item) => {
        return (
          <tr>
            <td>{item.id_solicitud}</td>
            <td>{item.nombre_producto}</td>
            <td>{item.cant}</td>
            <td>{item.estado_solicitud}</td>
            <td>{item.rut_especialista}</td>
            <td>{item.nombre_especialista}</td>
            <td>
              <Button variant="success" onClick={() => get_status(item.id_solicitud,item.estado_solicitud,item.cant,item.id_productos)}>Cambiar Estado</Button>
            </td>
          </tr>
        )
      })
    }

    return (
      <div>
        <Row>
          <Col style={{ padding: '50px 50px 50px 50px' }}>
            <Card>
              <Card.Body>
                <Card.Title>Solicitudes Pedido</Card.Title>
                <Card.Text>
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cant</th>
                        <th>Estado</th>
                        <th>Rut Especialista</th>
                        <th>Nombre Especialista</th>
                      </tr>
                    </thead>
                    <tbody>
                      {render_solicitudes()}
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/** MODAL EDIT ESTADO */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar estado solicitud - {id_solicitud}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Select aria-label="Default select example" value={estado} onChange={selectEstado}>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="EN ESPERA">EN ESPERA</option>
              <option value="RECIBIDO">RECIBIDO</option>
              <option value="ANULADO">ANULADO</option>
            </Form.Select>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={change_status}>
              Modificar estado
            </Button>
          </Modal.Footer>
        </Modal>
        {/** MODAL EDIT ESTADO */}

      </div>
    );
};

export default RecepcionPedido;