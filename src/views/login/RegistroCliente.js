import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Col, Row, Form } from 'react-bootstrap';

class RegistroCliente extends Component{

  constructor(props) {
    super(props);
    this.state = {
      rut: '',
      password: '',
      password_confirm: '',
      mail: '',
      telefono: '',
      nombres: '',
      apellidos: ''
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
      rut: '',
      password: '',
      password_confirm: '',
      mail: '',
      telefono: '',
      nombres: '',
      apellidos: ''
    })
  }

  doRegistro(){
    //VALIDACIONES INICIALES
    var rut_exist = true;
    var pass_exist = true;
    var pass_confirm_exist = true;
    var mail_exist = true;
    var telefono_exist = true;
    var nombres_exist = true;
    var apellidos_exist = true;
    if (!this.state.rut) {
      rut_exist = false
    }
    if (!this.state.password) {
      pass_exist = false
    }
    if (!this.state.password_confirm) {
      pass_confirm_exist = false
    }
    if (!this.state.mail) {
      mail_exist = false
    }
    if (!this.state.telefono) {
      telefono_exist = false
    }
    if (!this.state.nombres) {
      nombres_exist = false
    }
    if (!this.state.apellidos) {
      apellidos_exist = false
    }
    //EMPTY VALIDATION FINAL
    if (!rut_exist || !pass_exist || !pass_confirm_exist || !mail_exist || !telefono_exist || !nombres_exist || !apellidos_exist) {
      alert("Hay campos que estan vacios")
    }else{
      //VALIDACION PASSWORD
      if (this.state.password !== this.state.password_confirm) {
        alert("Las contraseñas ingresadas no concuerdan")
      }else{
        //REGISTRAR USUARIO
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImdtZFRZcUpLY0RXd2d5Y3EvZ2FxRXc9PSIsInZhbHVlIjoiZHNOMEVPVGR6bXRoalAyQ2dlR1FtWis3bzJGRGVmSFhXQWdadHdmTDBUQXAvNmk4UU05dGs5UEZRTytLYWR5R3JIeFJSVEV5RVZPdGpXaDZWS1hwTUxuQllXSzNnejZ3OG52UWpScmQ4M3E3Rnhqa3lSY1RUbVRScWp2WlY1TnkiLCJtYWMiOiIyY2ZjZjUxZjY4MTM1ZjIzMTYwMmNhMzJhYzBmMjkyM2MwMDk4MjU1N2E5ZmViNzI2YTJmNGU4NmQxYTM2MjBlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Inl4YTRtakhYSGlGVjRZZUtLRjU1WkE9PSIsInZhbHVlIjoiYkZiUEdJc05EOVJoTWxmN0dTWU15SS9YTWdWSG5UOHRJK2J1Vkl4RVZVQmdaS2l5dzFOMEc5cXM4QnBzVDZTZThyeWxDSy96RGlwTTJqR0M0am5UbUljS08yTWdHRFlqbGMvQW84V21aaU1kdW9VT2FMV29NbDQ5Y01BQ3hRekgiLCJtYWMiOiIyMzMwNjkwZTNhMGY4NjkxMWI0ZjJmMGRkMTBjY2FmY2M1ZGQxNDZmMzM2MzM0NjI4YTE1Njg2Y2JiNzdmMDJkIiwidGFnIjoiIn0%3D");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/reg_paciente?rut="+this.state.rut+"&password="+this.state.password+"&mail="+this.state.mail+"&telefono="+this.state.telefono+"&nombres="+this.state.nombres+"&apellidos="+this.state.apellidos, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result === 'not_ok') {
              alert("El usuario no fue registrado")
            }else{
              window.location.href="./registro_cliente_success"
            }
          })
          .catch(error => console.log('error', error));
      }
    }
  }

  render(){
    return (
      <div>
        <Container>
          
          <Row className="justify-content-md-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Col xs="6">
              <Card>
                <Card.Header className="text-center">Ingrese sus datos</Card.Header>

                <Card.Body>

                  <Form.Label htmlFor="username">Rut:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="rut" 
                    onChange={(e) => this.setInputValue('rut',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.rut ? this.state.rut : ''}  
                  />

                  <Form.Label htmlFor="username">Contraseña:</Form.Label>
                  <Form.Control 
                    type="password" 
                    id="pass" 
                    onChange={(e) => this.setInputValue('password',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.password ? this.state.password : ''}  
                  />

                  <Form.Label htmlFor="username">Confirmar Contraseña:</Form.Label>
                  <Form.Control 
                    type="password" 
                    id="pass_confirm" 
                    onChange={(e) => this.setInputValue('password_confirm',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.password_confirm ? this.state.password_confirm : ''}  
                  />

                  <Form.Label htmlFor="username">Email:</Form.Label>
                  <Form.Control 
                    type="email" 
                    id="mail" 
                    onChange={(e) => this.setInputValue('mail',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.mail ? this.state.mail : ''}  
                  />
                  
                  <Form.Label htmlFor="username">Telefono:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="telefono" 
                    onChange={(e) => this.setInputValue('telefono',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.telefono ? this.state.telefono : ''}  
                  />
                  
                  <Form.Label htmlFor="username">Nombres:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="nombres" 
                    onChange={(e) => this.setInputValue('nombres',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.nombres ? this.state.nombres : ''}  
                  />
                  
                  <Form.Label htmlFor="username">Apellidos:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="apellidos" 
                    onChange={(e) => this.setInputValue('apellidos',e)} 
                    aria-describedby="passwordHelpBlock" 
                    value={this.state.apellidos ? this.state.apellidos : ''}  
                  />

                  <br />
                  <Button variant="primary" type="submit" onClick={() => this.doRegistro()}>
                    Registrar
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

export default RegistroCliente;