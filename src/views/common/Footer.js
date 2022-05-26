import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from 'react-bootstrap';
import { FaCheckCircle, FaFacebook, FaTwitter, FaInstagram, FaSmile, FaHome, FaInfo, FaPhone } from 'react-icons/fa';

const Footer = props => {
  return(
    <>
    <footer className="bg-dark text-center text-white">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

        <div className="me-5 d-none d-lg-block">
          <span>Mantente informado en nuestras redes sociales: </span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <FaFacebook size={20} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaTwitter size={20} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaInstagram size={20} />
          </a>
        </div>

      </section>
      <section>

        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">

            <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <FaSmile size={20} /> Linda sonrisa
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Portal de empleados
              </h6>
              <p>
                <a href="#!" className="text-reset">Profesional</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Administrativo</a>
              </p>
              <p>
                <a href="./login_admin" className="text-reset">Administrador</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Contactanos
              </h6>
              <p><FaHome size={20} /> New York, NY 10012, US</p>
              <p><FaInfo size={20} /> info@example.com</p>
              <p><FaPhone size={20} /> + 01 234 567 88</p>
            </div>

          </div>
        </div>

      </section>
    </footer>
    </>
  )
}

export default Footer;