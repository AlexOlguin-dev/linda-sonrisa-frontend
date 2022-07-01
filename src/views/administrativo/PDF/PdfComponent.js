import React from 'react';
import ReactToPrint from 'react-to-print';
import DataComponent from './DataComponent';
import { Col, Row, Form, Button, Card } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';

class PdfComponent extends React.Component {
    
    render() {
      return (
        <div>
          <DataComponent ref={(response) => (this.componentRef = response)} />
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <Button variant="outline-primary"><FaPrint /></Button>}
          />
        </div>
      );
    }
}
export default PdfComponent;