import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

const cookies = new Cookies();

class LoginFormAdmin extends Component{

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
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjhnbTRHWWlKYldyZkNFMVJDY2FZblE9PSIsInZhbHVlIjoiNW95NXNIa2NZRkVNbVczRW50NzllWGo0ZXBUNzRmTFQ2MzNmSytEamhkQU03OFdYdXFDZHhLMUozS2Q2enR2endZbVM4clcxd0ZCanNheXhQWVo4K2pWSUpRRGhTaHUya1NTK0o1VjBneCtKdm5wTW9ITWpUMnVWVFppRjlHNmEiLCJtYWMiOiIxNTAzN2U2ZWUwMTBjMWZlZDQxZWM5MWI2NzRlN2RjMDk1ZDBmZGRlZmZmMzM0OGQ5M2Y3NjE3NmE5NThkNGEzIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFkbjBCVlluWCtyUVhUYXRoejRMVnc9PSIsInZhbHVlIjoiS0U3cXZHUHZ5TU5CZ0xHaVFlU041UXAydE5pWGlKd3ZMMlVDWUhLTVZONXpsVjFUaWJzTGZJSkY1RGhPckoySHA1LzhxYTZ5LzY5Y2FFSWRXVElJUEdwTkVZUmVlUlRsWlJkM2c1NkVBTnBsTjlGUW9XMVdLQ0s0NTVpL29yd0kiLCJtYWMiOiI4OWVjMDcxOGE0OTFhN2Q0YjIxNmI0MzNmYzA0N2M3MGRlYjJmN2VkOTcwYmRhZDA2MTk5OGRlZWQyMTJkOGIzIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/admin_login?username="+this.state.username+"&password="+this.state.password, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.resp === 'autorizado') {
            cookies.set('username',result.user[0].username,{path:'/'});
            cookies.set('isLoggedIn','logeado',{path:'/'});
            window.location.href="./admin";
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
        <Container style={{ minHeight: '500px' }}>

          <Row className="justify-content-md-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Col xs="6"> 
              <Card>
                <Card.Header className="text-center"><h3>Login Admin</h3></Card.Header>
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

export default LoginFormAdmin;