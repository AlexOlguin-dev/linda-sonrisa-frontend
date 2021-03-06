import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button, Row, Col } from 'react-bootstrap';
import UserStore from '../stores/UserStore';
//LOGIN
import LoginFormCliente from "../login/LoginCliente";
import RegistroCliente from "../login/RegistroCliente";
import RegistroClienteSucess from "../login/RegistroClienteSuccess";
//MAIN
import Main from "../main/Main";
import Footer from "../common/Footer";
//CLIENTE
import Dashboard from "../cliente/Dashboard";
import Resumen from "../cliente/Resumen";
//ADMIN
import LoginFormAdmin from "../login/LoginAdmin";
import Admin from "../admin/Admin";
import Servicios from "../main/Servicios";
//ODONTOLOGO
import LoginFormOdontologo from "../login/LoginOdontologo";
import DashboardEspecialista from "../especialista/Dashboard";
//ADMINISTRATIVO
import LoginAdministrativo from "../login/LoginAdministrativo";
import DashboardAdministrativo from "../administrativo/DashboardAdministrativo";

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
              <NavLink to="/" onClick={() => setMain('/')}>
                <img src={require("../../assets/img/MainIcon.png")} width="100" className="d-inline-block align-top" alt="React Bootstrap logo"/>
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                { cookies.get('isLoggedIn') === 'logeado' ? (
                  <>
                  <Button variant="secondary" onClick={() => doLogout()}>Cerrar Sesion</Button>
                  </>
                ):(
                  <>
                    { main === '/login' ? (
                      <>
                        <NavLink to="/" onClick={() => setMain('/')}><Button variant="primary">P??gina principal</Button></NavLink>
                      </>
                    ):(
                      <>
                        {/*<NavLink to="/admin" onClick={() => setMain('/login')}><Button variant="primary">VistaAdmin</Button></NavLink>*/}
                        <NavLink to="/login_cliente" onClick={() => setMain('/login')}><Button variant="primary">Ingresar a cuenta</Button></NavLink>
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
          <Route path="/login_cliente" element={<LoginFormCliente />} />
          <Route path="/registro_cliente" element={<RegistroCliente />} />
          <Route path="/registro_cliente_success" element={<RegistroClienteSucess />} />
          <Route path="/dashboard_cliente" element={<Dashboard />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/login_admin" element={<LoginFormAdmin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login_odontologo" element={<LoginFormOdontologo />} />
          <Route path="/dashboard_odontologo" element={<DashboardEspecialista />} />
          <Route path="/login_administrativo" element={<LoginAdministrativo />} />
          <Route path="/dashboard_administrativo" element={<DashboardAdministrativo />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default NavBar;