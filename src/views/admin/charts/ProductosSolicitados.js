import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

class ProductosSolicitados extends Component {
  render(){
    const {producto} = this.props;
    const labels = [];
    const datos = [];
    const colors = [
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA",
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA",
      "#01B8AA","#F2C80F","#FD625E","#A66999","#374649","#89D3EA"
    ]

    try {
      producto.forEach(element => {
        labels.push(element.producto)
        datos.push(element.total_solicitudes)
      });
    } catch (error) {
      
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Cant Ordenes Pedido',
          backgroundColor: colors,
          hoverBackgroundColor: "#3AA523",
          data: datos
        }
      ]
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
      },
    }

    return <Bar data={data} options={options} />
  }
}

export default ProductosSolicitados