import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button } from 'react-bootstrap';
import UserStore from '../stores/UserStore';
//LOGIN
import LoginFormCliente from "../login/LoginCliente";
import RegistroCliente from "../login/RegistroCliente";
import RegistroClienteSucess from "../login/RegistroClienteSuccess";
//MAIN
import Main from "../main/Main";
//CLIENTE
import Dashboard from "../cliente/Dashboard";
import Resumen from "../cliente/Resumen";
import Admin from "../main/Admin";
import Servicios from "../main/Servicios";

const NavBar = props => {

  const cookies = new Cookies();
  const pathname = window.location.pathname;
  const [main,setmain] = useState(pathname);

  function setMain(name){
    setmain(name)
  }

  function doLogout(){
    cookies.remove('username',{path:'/'})
    cookies.set('isLoggedIn','no_logeado',{path:'/'});
    window.location.href="./"
  }

  return(
    <>
      <BrowserRouter>

        <Navbar bg="primary">
          <Container>
            <Navbar.Brand>
              <img src={require("../../assets/img/MainIcon.png")} width="100" className="d-inline-block align-top" alt="React Bootstrap logo"/>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                { cookies.get('isLoggedIn') === 'logeado' ? (
                  <>
                  <button onClick={() => doLogout()}>Salir</button>
                  </>
                ):(
                  <>
                    { main === '/login' ? (
                      <>
                        <NavLink to="/" onClick={() => setMain('/')}><Button variant="primary">Página principal</Button>{' '}</NavLink>
                      </>
                    ):(
                      <>
                        <NavLink to="/admin" onClick={() => setMain('/login')}><Button variant="primary">VistaAdmin</Button></NavLink>
                        <NavLink to="/login" onClick={() => setMain('/login')}><Button variant="primary">Ingresar a cuenta</Button></NavLink>
                        <NavLink to="/registro_cliente" onClick={() => setMain('/login')}><Button variant="primary">No tengo cuenta</Button></NavLink>
                      </>
                    ) }
                  </>
                )}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginFormCliente />} />
          <Route path="/registro_cliente" element={<RegistroCliente />} />
          <Route path="/registro_cliente_success" element={<RegistroClienteSucess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        </BrowserRouter>
    </>
  )
}

export default NavBar;