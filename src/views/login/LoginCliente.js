import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

const cookies = new Cookies();

class LoginFormCliente extends Component{

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
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IitDWTJDdjFvYlAwWnE0WkxDNWkwOVE9PSIsInZhbHVlIjoibWl1bEVRcXRpc1lOTHBHaWN5TmhPM2RTRTZYVE5FTHRFQUFTektiRWRvdXYzWGJTc1dza1o1NGpoZStNNGZadkFUUVJoNzhZQlNwb2xHMFZ3UnIwZEZDbkRTbVJNM25zemNVSjV1NUFXeXppWjdmRFlDVlVCK0I5K3NscVp2aDQiLCJtYWMiOiI5MjljOTI4OWM1NzI0MjlkNzFiMGE2OWNlOWE5NDY1MWMxNjBmMTU2N2Y3OWZmYTZjYWYyOGRjZDE3ODcwNTgwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InFTZUIwZE5CVGRHblp4dkYvL0c5ZGc9PSIsInZhbHVlIjoiRE85Ym5tUFRGNmJLd3NtN2MvN3RTYUM1Z3ZmSjdlc0MyeVFicjl2SGZ2cGNkRnRPZU9NUGF3emEvajQrL0xjdjJHOVVpKzdjU1RPU0V2SURXY1gzekNDbyt6U2RoTDN4NDR4R3Z4WHJDZ0EwdmxZS1ppMlZxcTdUYnFIQTZQVnIiLCJtYWMiOiIxZDcwOTE1NWM5Y2EwYTU1YTU1N2IyN2Y0NThhZjMwOGQxZmFiZjkyMDhkZmExNGJjYTE3MTQ2ZTBjZDllMTJjIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/login?rut=" + this.state.username + "&password=" + this.state.password, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.resp === 'autorizado') {
            cookies.set('rut_cliente',this.state.username,{path:'/'});
            cookies.set('nombre_paciente',result.user[0].nombres,{path:'/'});
            cookies.set('apellido_paciente',result.user[0].apellidos,{path:'/'});
            cookies.set('isLoggedIn','logeado',{path:'/'});
            console.log(JSON.stringify(result.user[0].nombres))
            window.location.href="./dashboard_cliente"
          }else{
            alert("El usuario o la contraseña no son correctas")
          }
        })
        .catch(error => console.log('error', error))
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
                <Card.Header className="text-center"><h3>Login</h3></Card.Header>
                <Card.Body>
                  
                  <Form.Label htmlFor="username" className="fs-5 text">Rut Usuario:</Form.Label>
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

export default LoginFormCliente;