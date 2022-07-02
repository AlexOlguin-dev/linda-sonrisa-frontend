import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

const cookies = new Cookies();

class LoginAdministrativo extends Component{

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
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InJ4a0RHYlBNMGRBcENMZ2FoZ3k4R3c9PSIsInZhbHVlIjoianVzeS9jbktoQS9icEViRDJyWDZ5VE1GNUQyZUxVQUJmSUJnSVRwNWt6WmxtVWNoZzJmb1hlMWhUNC9BbE1wN1E2YnlXWlhRblRjRE9NTGJnbTRRdFoyWW1PZUN1Ym00ZHUxUENzQzdVOUtIVUZlY0lTVHNDWFFLQXFMWEhwWTkiLCJtYWMiOiIzNmFjZDM3OGJmYWZjMWEwOTg1NjFlYzlhNWZlOWIxYTgzYzgzZDlkN2FlZmUxNDcyZWY5YzdkNWEyNTE3YTFkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlNNNjcvblMwZVlEOW9Fa2s1eWVwdFE9PSIsInZhbHVlIjoiSUp6RGFRZ3plcWtReEI3dUxCNlZCL2J1RFFYaGU0M2hwYWprdWxMeFAxVGgxMDMwRXgzT1VjS3dkQlpsRTdJQUgxVloybkZkRVEvd3NkRkYvT212Y0d4d3owSTFmZjN2VkZrdDF0UVp4d0tFOG5vSlBGR1ppN205MTNRcTRFcVUiLCJtYWMiOiJiN2M5MzgyNGM5MTVmYTkyMzg5YjUzMDZmMmZmNWMwOWNjYWUwNjMxZTkyM2IyZGY2MGQ1YjI4Y2YzOGE4N2I2IiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/administrativo_login?username="+this.state.username+"&pass="+this.state.password, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.resp === 'autorizado') {
            cookies.set('username',result.user[0].nombre_completo,{path:'/'});
            cookies.set('nombre',result.user[0].nombre_completo,{path:'/'});
            cookies.set('isLoggedIn','logeado',{path:'/'});
            window.location.href="/dashboard_administrativo";
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
                <Card.Header className="text-center"><h3>Login Administrativo</h3></Card.Header>
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

export default LoginAdministrativo;