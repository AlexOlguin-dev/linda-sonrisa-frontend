import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

const RegistroClienteSucess = props => {

  function goToLogin(){
    window.location.href="./login"
  }

  return (
    <div>
      <Container>
        
        <Row className="justify-content-md-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
          <Col xs="6">
            <Card>
              <Card.Header className="text-center">Registro completo</Card.Header>

              <Card.Body>

                Su registro se ha completado con exito.

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