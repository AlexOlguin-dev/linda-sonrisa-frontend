import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const RegistroClienteSucess = props => {

  function goToLogin(){
    window.location.href="./login_cliente"
  }

  return (
    <div>
      <Container style={{ minHeight: '500px' }}>
        
        <Row className="justify-content-md-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
          <Col xs="6">
            <Card>
              <Card.Header className="text-center"><h3>Registro completo</h3></Card.Header>

              <Card.Body className="text-center">
                <FaCheckCircle size={30}/>
                <p className="fs-5 text">Su registro se ha completado con exito.</p>

                <br />
                <Button variant="primary" onClick={() => goToLogin()}>
                  Ir a Login
                </Button>

              </Card.Body>

            </Card>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default RegistroClienteSucess;