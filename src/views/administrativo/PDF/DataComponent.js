import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal"
};
  
class DataComponent extends React.Component {
    render() {
      return (
        <>
          <Row>
            <Col xs={3}>
              <img src={require("../../../assets/img/MainIcon.png")} width="100"/>
            </Col>
            <Col xs={9}>
              <h5>BOLETA - {cookies.get('nombre_paciente')}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              
              <table style={thStyle} className="table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th></th>
                    <th>Valor Base</th>
                    <th>Prevision</th>
                    <th>Total Final</th>
                    <th>Vuelto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>{cookies.get('nombre_tratamiento')}</td>
                    <td>
                      {cookies.get('costo_tratamiento') === '' ? (<></>):(<>${cookies.get('costo_tratamiento')}</>)}
                    </td>
                    <td>{cookies.get('prevision')}</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Consulta</td>
                    <td>$20000</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><b>TOTAL</b></td>
                    <td>
                      <b>${cookies.get('costo_tratamiento') === '' ? (<>20000</>):(<>{parseInt(cookies.get('costo_tratamiento'))+20000}</>)}
                      </b>
                    </td>
                    <td><b>-{cookies.get('valor_prevision')}</b></td>
                    <td><b>${cookies.get('total_final')}</b></td>
                    <td><b>${cookies.get('vuelto')}</b></td>
                  </tr>
                </tbody>
              </table>
              
            </Col>
          </Row>
        </>
      );
    }
  }
  export default DataComponent;