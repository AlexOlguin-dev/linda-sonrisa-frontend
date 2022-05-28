import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

const cookies = new Cookies();

class LoginFormOdontologo extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    val = val.target.value;
    this.setState({
      [property]: val
    })
  }

  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  //ARRANQUE DEL LOGIN
  async doLogin(){
    if (this.state.username !== '' || this.state.password !== '') {
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImpDUjZVSXlaNlVCbTZHNHBncjU1OVE9PSIsInZhbHVlIjoiWU1pTFJESFdhc0tSQ2NRNU13ZnM2bW90R3pjU2tRS2k1dUJVdDlPWUh2L1BvNVh6b3RLRGQvVS9XZmdHNEE4UndRMWdYbzMzZ2JpQnVqUG5IVW9Dejl3aXFCeVFuN0ZBMEdTOWtZc1kxbTZzZUw0SDd6YlN2bDlJdnJUYjlwWFQiLCJtYWMiOiIyMzQyY2U2ZjM5MjczNjUxYmUxNjFlNmNhYTVmMjY5YmJmYjY0MWEwMDE2NDFiNDYyZTE3MDk3ZDhhNjQ5OWMxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InltK1A1WW84aHlTdXpMT0thblgwVWc9PSIsInZhbHVlIjoiNC9DL21SRXBjV3hlVWNuSTFWalc4cHY2Y2ptbk13ZE02THlIMHZJL280SzBCWC9UVzkwMFNUMlNNUDVtNzlaU0I4QUs3bTdITEt2bkRFT0ttYXdGNDErZmhkRSs4eVJLMGRiRWxoRzRYMXJpMkVFYnlVdWFLcjM3d3B6SzZWKzUiLCJtYWMiOiI4MzcwZDc2MTVhMmE5Njg0ZWMwNGM4N2I5ODIwYjY0OWYzZjg1NThmMWM0ZDJhNDM0OGUwNjM4YWUzOGViNjViIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/especialista_login?username="+this.state.username+"&password="+this.state.password, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.resp === 'autorizado') {
            cookies.set('rut_odontologo',this.state.username);
            cookies.set('isLoggedIn','logeado');
            window.location.href="./dashboard_odontologo";
          }else{
            alert("El usuario o la contraseña no son correctas")
          }
        })
        .catch(error => console.log('error', error));
    }else{
      alert("No pueden quedar campos vacios")
    }
  }

  render(){
    return (
      <div>
        <Container>

          <Row className="justify-content-md-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Col xs="6"> 
              <Card>
                <Card.Header className="text-center"><h3>Login Odontologo</h3></Card.Header>
                <Card.Body>
                  
                  <Form.Label htmlFor="username" className="fs-5 text">Nombre Usuario:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="username" 
                    onChange={(e) => this.setInputValue('username',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.username ? this.state.username : ''}  
                  />

                  <Form.Label htmlFor="password" className="fs-5 text">Contraseña:</Form.Label>
                  <Form.Control 
                    type="password" 
                    id="password" 
                    onChange={(e) => this.setInputValue('password',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.password ? this.state.password : ''}
                  />

                  <br />
                  <Row>
                    <Col className="text-center">
                      <Button variant="primary" type="submit" onClick={() => this.doLogin()}>
                        Ingresar
                      </Button>
                    </Col>
                  </Row>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default LoginFormOdontologo;