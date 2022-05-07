import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';
import UserStore from '../stores/UserStore';

const cookies = new Cookies();

class LoginForm extends Component{

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

  async doLogin(){
    if (this.state.username !== '' || this.state.password !== '') {
      var formdata = new FormData();
      formdata.append("username", this.state.username);
      formdata.append("pass", this.state.password);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/login", requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result === '"autorizado"') {
            cookies.set('username','alex',{path:'/'});
            cookies.set('isLoggedIn','logeado',{path:'/'});
            window.location.href="./dashboard"
          }else{
            alert("El usuario o contraseña con incorrectos")
          }
        })
        .catch(error => console.log('error', error));
    }else{
      alert("No pueden quedar campos vacios")
    }
  }

  render(){
    return (
      <div className="loginForm">
        <Container>

          <Row className="justify-content-md-center" style={{ marginTop: '100px' }}>
            <Col xs="6"> 
              <Card>
                <Card.Header className="text-center">Login</Card.Header>
                <Card.Body>
                  
                  <Form.Label htmlFor="username">Nombre Usuario:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="username" 
                    onChange={(e) => this.setInputValue('username',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.username ? this.state.username : ''}  
                  />

                  <Form.Label htmlFor="password">Contraseña:</Form.Label>
                  <Form.Control 
                    type="password" 
                    id="password" 
                    onChange={(e) => this.setInputValue('password',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.password ? this.state.password : ''}
                  />

                  <br />
                  <Button variant="primary" type="submit" onClick={() => this.doLogin()}>
                    Ingresar
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default LoginForm;