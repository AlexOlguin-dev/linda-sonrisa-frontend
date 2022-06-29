import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col, Carousel, CardGroup, Form } from 'react-bootstrap';

const Main = props => {
  //VARIABLES-----------------------------------------------
  const [index, setIndex] = useState(0);
  const [tratamientos,set_tratamientos] = useState([]);

  //LOADER--------------------------------------------------
  useEffect(() => {
    get_tratamientos()
  },[])

  //FUNCIONES-----------------------------------------------
  function get_tratamientos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjlXcDBHNTMwclZzaG41a0tNZEtJWkE9PSIsInZhbHVlIjoiMjM1QW5jV2hEcTNkL0RSNGV4OVVaK3pqaHBXMUZBL0ZiQTI0eWNpUUxML2hzU2hBYU1Wd2F6alhEU1pCTjVpUVpsbDRSK2RIc28xU2dYVExHN2xYSWxqb3RNWCt5dk9sTzZzUGJ6cFdhYzlhb0d1ZHBQaHAyaHN3eitVeTl5cGYiLCJtYWMiOiI5MzE5NGM2OWI0NTU5ODA5YTNjYjM0YTM5ZjAxYzJjYjMxZjg3NDY0YWQ2OTdiOWFmNGVmZDUxM2U0MDRjOTc4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im9FeFRVc1F4bEdicmI2QTg0eU1GdEE9PSIsInZhbHVlIjoiaWF1eU50STdwby92T2ZqOE16eWlyYW5oWGNMVXB4MVVQVlNHaUx6QWpMMmRhZFFNRWRMNGxOWEZNMWw4OU94TEF0K01CU1FxM1poaE90cEZRaE5ISm1wRUl0dU5wSVBHTUNnbVNGUUVPWHhMd0FVbG1CQS9iN04yOVlaSTZEbHQiLCJtYWMiOiIyNmFkNzlhNDI5YmEwMzAyNzI2MmEzOTAxNmU1ZjRlODZlZmJiZmZlZDZlYjZjZmZmOTBjOTZjOTdmMmQ4ZjZlIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/tratamientos_main_page", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_tratamientos(result)
      })
      .catch(error => console.log('error', error));
  }
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  //RENDERS-------------------------------------------------
  function render_tratamientos(){
    return tratamientos.map((item) => {
      return(
        <Card className='m-5'>
          <Card.Img variant="top" src={require("../../assets/img/tratamientos/"+item.imagen)} />
          <Card.Body>
            <Card.Title>{item.nombre}</Card.Title>
            <Card.Text>{item.descripcion}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <h4>${item.precio} CLP</h4>
          </Card.Footer>
        </Card>
      )
    })
  }

  return (
    <div className="main">
      
      {/** -----------------SLIDER--------------- */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812520.jpg")}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812561.jpg")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-polina-zimmerman-4687360.jpg")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/** -----------------SLIDER--------------- */}

      {/** -----------------SERVICIOS--------------- */}
      <div className='p-5 text-center'>

        <h1 class="display-1">NUESTROS TRATAMIENTOS</h1>
        <hr/>
        <div style={{ paddingLeft: '200px', paddingRight: '200px' }}>
          <span style={{ fontSize: '25px'}}>
            Nuestros tratamientos son efectuados por los especialistas mejor entrenados de 
            la industria. Ofrecemos multiples servicios que cubren las necesidades de los pacientes, 
            siempre garantizando una calidad excepcional en el maneja de las herramientas y el bienestar 
            de nuestros pacientes. Tu bienestar es nuestra primera prioridad.
          </span>
        </div>

        <CardGroup>
          {render_tratamientos()}
        </CardGroup>

      </div>
      {/** -----------------SERVICIOS--------------- */}

      {/** -----------------CONTACTANOS--------------- */}
      <Row style={{ backgroundColor: '#D8D8D8', boxShadow: '0px 2px 23px 2px rgba(0,0,0,0.55)' }}>
        <Col xs='6'>
          
          <Row>
            <Col className='m-5 text-center'>

              <h1 class="display-1">CONTACTANOS</h1>

              <Form>
                <Form.Group className="mb-5 mt-5">
                  <Form.Control size="lg" type="text" placeholder="Tu Nombre" />
                </Form.Group>
                <Form.Group className="mb-5 mt-5">
                  <Form.Control size="lg" type="text" placeholder="Tu Correo" />
                </Form.Group>
                <Form.Group className="mb-5 mt-5">
                  <Form.Control size="lg" type="text" placeholder="Tu Telefono" />
                </Form.Group>
                <Form.Group className="mb-5 mt-5">
                  <Form.Control as="textarea" size="lg" placeholder='Escribe aqui tu comentario' rows={12} />
                </Form.Group>
                <Form.Group className="mb-5 mt-5">
                <div className="d-grid gap-2">
                  <Button variant="secondary" size="lg">
                    Enviar mensaje
                  </Button>
                </div>
                </Form.Group>

              </Form>

            </Col>
          </Row>

        </Col>
        <Col xs='6'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/bg/pexels-polina-zimmerman-4687254.jpg")}
            alt="First slide"
          />
        </Col>
      </Row>
      {/** -----------------CONTACTANOS--------------- */}

      {/** -----------------NOSOTROS--------------- */}
      <Row>
        <Col className='m-5 text-center'>

          <hr />
          <h1 class="display-1">NUESTRA MISION</h1>

          <p className='m-2' style={{ fontSize: '20PX', paddingBottom: '50px', paddingTop: '50px' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a 
            type specimen book. It has survived not only five centuries, but also the 
            leap into electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release of Letraset sheets containing Lorem 
            Ipsum passages, and more recently with desktop publishing software like Aldus 
            PageMaker including versions of Lorem Ipsum.
          </p>

          <p className='m-2' style={{ fontSize: '20PX', paddingBottom: '50px' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a 
            type specimen book. It has survived not only five centuries, but also the 
            leap into electronic typesetting, remaining essentially unchanged. It was 
            popularised in the 1960s with the release of Letraset sheets containing Lorem 
            Ipsum passages, and more recently with desktop publishing software like Aldus 
            PageMaker including versions of Lorem Ipsum.
          </p>

          <hr />

        </Col>
      </Row>
      {/** -----------------NOSOTROS--------------- */}

      {/** -----------------FOTOS--------------- */}
      <Row>
        <Col className='text-center'>
          <h1 class="display-1">CONOCENOS</h1>
        </Col>
      </Row>
      <Row>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
      </Row>
      <Row>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
        <Col xs='4' className='p-5'>
          <img
            className="d-block w-100"
            src={require("../../assets/img/carousel/pexels-pavel-danilyuk-6812456.jpg")}
            alt="First slide"
          />
        </Col>
      </Row>
      {/** -----------------FOTOS--------------- */}

    </div>
  );
}

export default Main;