import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class ClienteSidebar extends Component{

  render(){
    return (
      <div className="cliente-sidebar">
        <ProSidebar>
          
        </ProSidebar>
      </div>
    );
  }
}

export default ClienteSidebar;