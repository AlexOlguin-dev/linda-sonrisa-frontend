import React from 'react';
import { Card, Row, Col} from 'react-bootstrap';



const Servicios = () => {
    return (
        
        <div style={{ padding: "20px 0px 0px 50px" }}>
          <Row>
             <Col>
          
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
          </Row>
          <Row>
             <Col>
             
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
          </Row>
        </div>
    );
};

export default Servicios;