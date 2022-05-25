import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from 'react-bootstrap';

class Main extends Component{

  render(){
    return (
      <div className="main">
        <Row>
          <Col xs="3">
          
        <Card style={{ width: '18rem', marginLeft: "100px", marginTop:"20px" }}>
        <Card.Img variant="top" src= {require ("../Images/smile.jpg")} />
         <Card.Body>
         <Card.Title>Misión</Card.Title>
          <Card.Text>
          Prestigiosa empresa cuya misión es poder darles una mejor sonrisa
          </Card.Text>
           </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card style={{ width: '18rem', marginTop: "20px" }}>
          <Card.Img variant="top" src= {require ("../Images/Mail.jpg")} />
          <Card.Body>
          <Card.Title>contacto</Card.Title>
          <Card.Text>
            Si tienes alguna consulta puedes enviarnos un Email
          </Card.Text>
          <Button variant="primary">Envíar Correo</Button>
        </Card.Body>
      </Card>
      </Col>
        </Row>
        
      </div>
    );
  }
}

export default Main;