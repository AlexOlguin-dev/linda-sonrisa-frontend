import React, { useState, useEffect, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto';

class OdontologosPopulares extends Component {
  render(){
    const {especialista} = this.props;
    const labels = [];
    const datos = [];
    const colors = [
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA",
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA",
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA"
    ]

    try {
      especialista.forEach(element => {
        labels.push(element.especialista)
        datos.push(element.total_citas_agendadas)
      });
    } catch (error) {
      
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Cant de Citas Agendadas",
          backgroundColor: colors,
          hoverBackgroundColor: "#3AA523",
          data: datos
        }
      ]
    }

    const options = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
    }

    return <Bar data={data} options={options} />
  }
}

export default OdontologosPopulares;