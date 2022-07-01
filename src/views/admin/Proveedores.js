import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus, FaLink, FaUnlink } from 'react-icons/fa';

const Proveedores = props => {

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [proveedores, set_proveedores] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showAsignProduct, setShowAsignProduct] = useState(false);
  const [showEditProveedor, setShowEditProveedor] = useState(false);
  const [rut, set_rut] = useState('');
  const [nombre, set_nombre] = useState('');
  const [telefono, set_telefono] = useState('');
  const [mail, set_mail] = useState('');
  const [direccion, set_direccion] = useState('');
  const [selected_proveedor, set_selected_proveedor] = useState('');
  const [productos_asignados, set_productos_asignados] = useState([]);
  const [found_products, set_found_products] = useState([]);
  const [rut_proveedor_edit, set_rut_proveedor_edit] = useState('');
  const [nombre_proveedor_edit, set_nombre_proveedor_edit] = useState('');
  const [telefono_edit, set_telefono_edit] = useState('');
  const [mail_edit, set_mail_edit] = useState('');
  const [direccion_edit, set_direccion_edit] = useState('');
  const [searched_product, set_searched_product] = useState('');

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    list_proveedores()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function list_proveedores(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IktCaCtLcDFOazEyaHd2b2JuVSt0QVE9PSIsInZhbHVlIjoiei9mc290dUdQK1JmZWJrZUZlWnNZSGNLUUxsSitzd29nV1EyS0xHeVh0ZG45UmN1RGxZbUlkYUpHRVlHVkx3Y2hnNnQyR1BiaXdNZ0swMG5uNU5yb0M5dm1HaTRERXY0Nmp6OWpkcWt5cGdrSXhVZU9UVG13QXI0YTRKTDRwcXQiLCJtYWMiOiI0NGNlMTQyOTU5NDg4MGQxZWQ0ZDVmOWEyZTA5ODVjMDM5NDA4MmQwNDc2NTVhZjYzMmE1NTA4ZmU1MjY5MjZkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImN1MFhTT1JnNHhhcC9oSWt3aVVseUE9PSIsInZhbHVlIjoiZjl5dnpSVTc5QXdXbGRZb25rOG9XVHd1RUZLUVp3WGg0V0FxNGNFWnJISlJCRjlaZFpWMkFxZFNBTXBGY2w5TENSeDg3M0RkaThUbkcxcVU5Y1cwRlZTemJpSGZ6OHBCQUFrLzNHUmZ5NFFDcmYxT21JdVp3L2dqZVJTaW9sZjMiLCJtYWMiOiI3ZTlmYmM2Mzc4OGQ0YWYyNzNlODA5ZjljMTEzZDVjZWI0MDc1M2M5NjA2Yzc0ZTQ4NDk4OWEwNDkyMDE3YTg3IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/proveedores", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_proveedores(result)
      })
      .catch(error => console.log('error', error));
  }

  function create_proveedores(){
    var rut_exist = true;
    var nombre_exist = true;
    var telefono_exist = true;
    var mail_exist = true;
    var direccion_exist = true;
    if (!rut) {
      rut_exist = false
    }
    if (!nombre) {
      nombre_exist = false
    }
    if (!telefono) {
      telefono_exist = false
    }
    if (!mail) {
      mail_exist = false
    }
    if (!direccion) {
      direccion_exist = false
    }
    if (!rut_exist || !nombre_exist || !telefono_exist || !mail_exist || !direccion_exist) {
      alert("No pueden quedar datos vacios")
    }else{
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImZJZFlyei9HY2hOMFBPTUZaaE94K3c9PSIsInZhbHVlIjoiVEhmZ096TWhDSzRwNGZuMnl3Z0trdVAvcFNveE12WlZXWlVYNmYxYjNGNU12MTMxVDlQWG9TRlRVTFlGbjFrdlhkSmc2OTNVOTJWSklKU0ZqNTZCUWNwSDRXOHBpOHplUURCcnZ6QXhrUjAya3RObG5kaU5kbTl3R1I3alpaWWIiLCJtYWMiOiJiMWU1MGQwZWI4YTNjOWFjN2Q2NjRhMGFiNzdlOGM2ZDNiZmYwNjRmNGVhNGYzOTExMTVmYWI0YzNiMWU0NTgxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IklDcElwZklRTzg4QzhyK3d2WnYzRUE9PSIsInZhbHVlIjoiajM0SUJlWGRLTnl0eFdwVW1NWllpWDA1SXJMejVjZ0V2Uk5KZHVLZUtLUnI3SFNyK0g3Nzh1LytsNUN6dElmdVQrTDRZT2E1U1NEaDFqRTkvb0FHN0h6WlFRMVhHS2RubWMrTTl1NDRsaXZqUjVRQlRjbXJEbGEyOHhaRkV5VkUiLCJtYWMiOiI2MmNlMDA4YTBjMGQ3YzM0OTg3ZTMxNGM2ZDhkMzZiYzdjZjViYWM5ODNmMmMwMWM1MGVmMDZiNjMwMzg0ODA1IiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/crear_proveedor?rut="+rut+"&nombre="+nombre+"&telefono="+telefono+"&mail="+mail+"&direccion="+direccion, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result === 'ok') {
            list_proveedores()
            clear_proveedor_create()
            handleCloseCreate()
          }else{
            alert("No se pudo crear un proveedor")
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  function delete_proveedores(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImZJZFlyei9HY2hOMFBPTUZaaE94K3c9PSIsInZhbHVlIjoiVEhmZ096TWhDSzRwNGZuMnl3Z0trdVAvcFNveE12WlZXWlVYNmYxYjNGNU12MTMxVDlQWG9TRlRVTFlGbjFrdlhkSmc2OTNVOTJWSklKU0ZqNTZCUWNwSDRXOHBpOHplUURCcnZ6QXhrUjAya3RObG5kaU5kbTl3R1I3alpaWWIiLCJtYWMiOiJiMWU1MGQwZWI4YTNjOWFjN2Q2NjRhMGFiNzdlOGM2ZDNiZmYwNjRmNGVhNGYzOTExMTVmYWI0YzNiMWU0NTgxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IklDcElwZklRTzg4QzhyK3d2WnYzRUE9PSIsInZhbHVlIjoiajM0SUJlWGRLTnl0eFdwVW1NWllpWDA1SXJMejVjZ0V2Uk5KZHVLZUtLUnI3SFNyK0g3Nzh1LytsNUN6dElmdVQrTDRZT2E1U1NEaDFqRTkvb0FHN0h6WlFRMVhHS2RubWMrTTl1NDRsaXZqUjVRQlRjbXJEbGEyOHhaRkV5VkUiLCJtYWMiOiI2MmNlMDA4YTBjMGQ3YzM0OTg3ZTMxNGM2ZDhkMzZiYzdjZjViYWM5ODNmMmMwMWM1MGVmMDZiNjMwMzg0ODA1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/eliminar_proveedor?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          list_proveedores()
        }else{
          alert("No se pudo eliminar el proveedor")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_productos_asignados(){
    if (selected_proveedor === '') {
      alert("Por favor escoje un Proveedor antes de continuar")
    }else{
      var myHeaders = new Headers();
      myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InBobUx1clRPc1dmVDNyUXFSTnUyQXc9PSIsInZhbHVlIjoiZ09MZ21aNzdoTFBpMmRPTCtQNkxON0E2Rjc1NmdoYzJyODBMdW9LdDJDRk0ya2pZeHBWYTliNThuYVoxQk5CMVRrRkJZc1VpNnBZMWxnSjZlSFdwWkVjZGhSRjUxdkQveHFQK1hjRk92NHgrNXl1RndzNDJKRjYybkdkVzk1QW0iLCJtYWMiOiJkZTdhYTEzZTA2NGJhOWI5YjY0NTljZTU3Y2ZmMjFjNjMwM2Y4MTc1MDhlMmFmMWQ1YTdkMzkwNjk2NzhhN2RiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImJFMzFIZGlxSkJhUTRaUHhmQVo4bGc9PSIsInZhbHVlIjoid3AzczZmWks1Zy9tSzNxYXFObE4rZDcxNmRQbllQOVRRVkd0TXdHL1FhUnZoT2xrbUxJL1ZrTWJmaFZmTUxpNHhLR0pLUThkb3VXOUQ4L0hPWkY3Uk5SSjM2NDNheTRRdndJYjFGUFZ0ZW91RjRwTlZaSDBoRGQyQ3kwTDY5RFEiLCJtYWMiOiIzZjRiMjhlODM4Nzk3N2IzYzcwZjE1NGY1MmFkMGVmZDBiNjkxZDAwYjg5ZDk5ZDE5YjNiYzlkZjRlYTg2YjRjIiwidGFnIjoiIn0%3D");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch("http://127.0.0.1:8000/get_productos_asignados?rut_proveedor="+selected_proveedor, requestOptions)
        .then(response => response.json())
        .then(result => {
          set_productos_asignados(result)
        })
        .catch(error => console.log('error', error));
    }
  }

  function search_producto(e){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjJ1N1pPMHpNSDkzeUEyZU1KWTBORHc9PSIsInZhbHVlIjoiYS9PWFkzSW50SjlYSHB2anJWQ0tJRkZ3dkIzeDNPbEk3RHVRd213enpPbWFMWFp4K1ROZU5rYjVIRTE4N3RrdEh6TkhLNktYMnlDTm5vVy84cEVmSEF5MHhSaG4yUjdIYjkvR29tR0NLQS9tek1yRzZCWHIvL0dIUFVKdFBxL1AiLCJtYWMiOiIyYjc0Y2M3YTBkNDdmMDNkMTYzZjZjMTFkOTliZDQ1YjBiNjUxZTk0N2QwOGFiYWJhYjU2NTVhODNhMzYzYWI4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IndlZDJMdU1oZ1BPQUJHN1NCTExyaUE9PSIsInZhbHVlIjoidHJWdFdyVndac09qNnVLc005N2U5SFdGdzhRcDczOHkwY3l4UE9zRG5vM1VtcENYZmxCZTN3d05sMW54TTJEcy8rY0ZmODlJTFB4L2Zya1dhenJCQVcyUk9RZHdWM3d5YWY2WGdhMjNoZFNOUE91YWMzL0NwM1VQcmwrK1F5V1QiLCJtYWMiOiIwOWIzMjYxYjZiZTczMzViODNmYTk2ZjI4NjFjMmU1OTQxOWUzYmE3YzFlODE5MmRmYzc3YjNjMjQ3MjEyMzQzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/find_producto_by_name?nombre="+e.target.value, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_found_products(result)
        set_searched_product(e)
      })
      .catch(error => console.log('error', error));
  }

  function asign_producto_proveedor(id_producto){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjJ1N1pPMHpNSDkzeUEyZU1KWTBORHc9PSIsInZhbHVlIjoiYS9PWFkzSW50SjlYSHB2anJWQ0tJRkZ3dkIzeDNPbEk3RHVRd213enpPbWFMWFp4K1ROZU5rYjVIRTE4N3RrdEh6TkhLNktYMnlDTm5vVy84cEVmSEF5MHhSaG4yUjdIYjkvR29tR0NLQS9tek1yRzZCWHIvL0dIUFVKdFBxL1AiLCJtYWMiOiIyYjc0Y2M3YTBkNDdmMDNkMTYzZjZjMTFkOTliZDQ1YjBiNjUxZTk0N2QwOGFiYWJhYjU2NTVhODNhMzYzYWI4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IndlZDJMdU1oZ1BPQUJHN1NCTExyaUE9PSIsInZhbHVlIjoidHJWdFdyVndac09qNnVLc005N2U5SFdGdzhRcDczOHkwY3l4UE9zRG5vM1VtcENYZmxCZTN3d05sMW54TTJEcy8rY0ZmODlJTFB4L2Zya1dhenJCQVcyUk9RZHdWM3d5YWY2WGdhMjNoZFNOUE91YWMzL0NwM1VQcmwrK1F5V1QiLCJtYWMiOiIwOWIzMjYxYjZiZTczMzViODNmYTk2ZjI4NjFjMmU1OTQxOWUzYmE3YzFlODE5MmRmYzc3YjNjMjQ3MjEyMzQzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/asign_productos_proveedores?id_producto="+id_producto+"&rut_proveedor="+selected_proveedor, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_productos_asignados()
          search_producto(searched_product)
        }else{
          alert("No se pudo asignar el producto")
        }
      })
      .catch(error => console.log('error', error));
  }

  function unasign_producto_proveedor(id_producto){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjJ1N1pPMHpNSDkzeUEyZU1KWTBORHc9PSIsInZhbHVlIjoiYS9PWFkzSW50SjlYSHB2anJWQ0tJRkZ3dkIzeDNPbEk3RHVRd213enpPbWFMWFp4K1ROZU5rYjVIRTE4N3RrdEh6TkhLNktYMnlDTm5vVy84cEVmSEF5MHhSaG4yUjdIYjkvR29tR0NLQS9tek1yRzZCWHIvL0dIUFVKdFBxL1AiLCJtYWMiOiIyYjc0Y2M3YTBkNDdmMDNkMTYzZjZjMTFkOTliZDQ1YjBiNjUxZTk0N2QwOGFiYWJhYjU2NTVhODNhMzYzYWI4IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IndlZDJMdU1oZ1BPQUJHN1NCTExyaUE9PSIsInZhbHVlIjoidHJWdFdyVndac09qNnVLc005N2U5SFdGdzhRcDczOHkwY3l4UE9zRG5vM1VtcENYZmxCZTN3d05sMW54TTJEcy8rY0ZmODlJTFB4L2Zya1dhenJCQVcyUk9RZHdWM3d5YWY2WGdhMjNoZFNOUE91YWMzL0NwM1VQcmwrK1F5V1QiLCJtYWMiOiIwOWIzMjYxYjZiZTczMzViODNmYTk2ZjI4NjFjMmU1OTQxOWUzYmE3YzFlODE5MmRmYzc3YjNjMjQ3MjEyMzQzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/asign_productos_proveedores?id_producto="+id_producto+"&rut_proveedor=", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_productos_asignados()
        }else{
          alert("No se pudo asignar el producto")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_single_proveedor(rut_proveedor){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ijlja3hYRDZqdTVXQytFL3VLeFlzQXc9PSIsInZhbHVlIjoicnR2MDdhMDUyRTdlZUJFNE91M1VQM1QvSnBmMXlySjV2ZlE4Z2x3TFlmeE4wNURNaWdVaURLV0l1RHAySVNWZm56QjZTOEcxMVpxbHdja2tQYjNKQW93V1pZQmppUnNNN1ZWR2hCdHNVTGJwZHJzVktsc21BQVhsT1RrYnVRTk8iLCJtYWMiOiIyNzM0NDJjZmYzMjM1YTRkZWEwMmU4MGM0OGQwNjNmOWU3MzI2OGRlM2U2OWEyNDMwNGE0MzQ0N2UxODlhN2FiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImMrdUZsRmtsMVdlbXJSS1craWJPNWc9PSIsInZhbHVlIjoia0ZpaXZ6R3JxcFJuMnBMQS9pVzhMbFBEaXR0dlRiL1I2NnJNWDNWNFBCbEZQSXp1VTlKNnppU1RUY1pwd3Z2bXNzaVBaMVZXeG04OHRJdnB5T3NUY2xLaUpWNmlMTVQvSFY0OEVqSjhUL1kvMDNvYnNiY1JXa3JSdGwvblBqOVciLCJtYWMiOiIxOWE4N2JmMTdjYWQ1YWY1MjEwNDdiNGE3YzY3ZTdkMjc4YTAyMTc5ZjM2MzAwMzE3N2Q0ODQ4NDFhYTRjM2QwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_proveedor?rut="+rut_proveedor, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_rut_proveedor_edit(result[0].rut)
        set_nombre_proveedor_edit(result[0].nombre)
        set_telefono_edit(result[0].telefono)
        set_mail_edit(result[0].mail)
        set_direccion_edit(result[0].direccion)
        handleShowEditProveedor()
      })
      .catch(error => console.log('error', error));
  }

  function edit_proveedor(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6InIwYk8wQ1BocGRwQStkajRhQ0d3NHc9PSIsInZhbHVlIjoiLytOZU1RZHRTbytYTDk3eTByWXRjR0NHOW8rU1Fham5YeXpFMThlNFQ3aFR4M3dscUsxeFNudWlTSXdHR3Q4Q2xSNndBOC93UGxKWXFVcDNWdENoYTREQ1JzalhjelZCWTJlb2dQOVkrZ3BOamE1aU41Vi9TMlI3UC9iT2YwVnIiLCJtYWMiOiI0YzIzN2IxMDNiMWRlYjE2ZDk1ZWNlY2Q0NjQ4ZTgxNjdhMmQ3ZDEzMmVhZTY1NzcyNjljODUwZjIzNDdkMmRmIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InI5LzhoYXpXd1Jjd3RxV1FwcVUrZFE9PSIsInZhbHVlIjoiUGFVTmFRb1BPcVNSS3hzaTJkeXM1YWprZXEydGJiY0NGaTFDZjh3TVZHb1FWQlNXT2d5dk9XUDNQdVRWOXhMYVZJWVJ2dUE5TExzZWZqaW1hR0hWOHdxQlRod2I3N0IxaThWa1NBSndSZTFNa0xtMEFQOExSNENLb1U5V1YwUUYiLCJtYWMiOiIwZGMzYThjNDAzMzllZGU0OTQ3ZTk4MTNhZjg2MmE4ZTU3MmUwMTc2OTNlZjRlOTllYWVmZDc2YTI4MTZhOWZkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/edit_proveedor?rut="+rut_proveedor_edit+"&nombre="+nombre_proveedor_edit+"&telefono="+telefono_edit+"&direccion="+direccion_edit+"&mail="+mail_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          list_proveedores()
          handleCloseEditProveedor()
        }else{
          alert("No se pudo editar el proveedor")
        }
      })
      .catch(error => console.log('error', error));
  }

  function clear_proveedor_create(){
    set_rut('')
    set_nombre('')
    set_telefono('')
    set_mail('')
    set_direccion('')
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseAsignProduct = () => setShowAsignProduct(false);
  const handleShowAsignProduct = () => setShowAsignProduct(true);
  const handleShowEditProveedor = () => setShowEditProveedor(true);
  const handleCloseEditProveedor = () => setShowEditProveedor(false);

  function ender_select_proveedor(){
    return proveedores.map((item) => {
      return <option value={item.rut}>{item.nombre}</option>
    })
  }

  function openAddProductosProveedor(){
    if (selected_proveedor !== '') {
      handleShowAsignProduct()
    }else{
      alert("Por favor seleccione un proveedor antes de proceder")
    }
  }

  function render_proveedores_tabla(){
    return proveedores.map((item) => {
      return (
        <tr>
          <td>{item.rut}</td>
          <td>{item.nombre}</td>
          <td>{item.telefono}</td>
          <td>{item.mail}</td>
          <td>{item.direccion}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => delete_proveedores(item.rut)}><FaTrash size={15} /></Button>
            <Button variant="info" onClick={() => get_single_proveedor(item.rut)}><FaEdit size={15} /></Button>
          </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  function render_productos_asignados(){
    return productos_asignados.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>{item.costo}</td>
          <td>
            <Button variant="danger" onClick={() => unasign_producto_proveedor(item.id)}><FaUnlink size={15} /></Button>
          </td>
        </tr>
      )
    })
  }

  function render_found_products(){
    return found_products.map((item) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.stock}</td>
          <td>{item.costo}</td>
          <td>
            <Button variant="success" onClick={() => asign_producto_proveedor(item.id)}><FaLink size={15} /></Button>
          </td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col className='text-center pt-3'>
          <h3>Asignar productos</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={4} className='p-3'>

          <Form.Label>Proveedores: </Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => set_selected_proveedor(e.target.value)}>
            <option>Selecciona un Proveedor</option>
            {ender_select_proveedor()}
          </Form.Select>

          <div className="d-grid gap-2 pt-3">
            <Button variant="primary" onClick={get_productos_asignados}>
              Ver productos asignados
            </Button>
          </div>

        </Col>
        <Col xs={8} className='p-3'>
        
          <Card>
            <Card.Body>
              <Card.Title>Nombre del proveedor</Card.Title>
              <Card.Text>
              <div className="d-grid gap-2 pt-3">
                <Button variant="primary" onClick={openAddProductosProveedor}>
                  Agregar producto
                </Button>
              </div>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Stock</th>
                      <th>Costo</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_productos_asignados()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>

        </Col>
      </Row>
      <hr/>
      <Row>
        <Col className='text-center pt-3'>
          <h3>CREAR PROVEEDOR</h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShowCreate}>
              <FaPlus /> Crear Proveedor
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Proveedores</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>rut</th>
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>Mail</th>
                      <th>Direccion</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_proveedores_tabla()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL ASIGNAS PRODUCTOS */}
      <Modal show={showAsignProduct} onHide={handleShowAsignProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Label htmlFor="inputPassword5">Nombre Producto</Form.Label>
        <Form.Control
          type="text"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => search_producto(e)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Escribe el nombre del producto que estas buscando
        </Form.Text>

        <Table responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Costo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {render_found_products()}   
          </tbody>
        </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAsignProduct}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL ASIGNAS PRODUCTOS */}

      {/** MODAL CREAR PROVEEDOR */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Rut:</Form.Label>
          <Form.Control 
            type="text" 
            id="rut" 
            onChange={(e) => set_rut(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={rut}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="nombre" 
            onChange={(e) => set_nombre(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Telefono:</Form.Label>
          <Form.Control 
            type="text" 
            id="telefono" 
            onChange={(e) => set_telefono(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={telefono}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Mail:</Form.Label>
          <Form.Control 
            type="mail" 
            id="mail" 
            onChange={(e) => set_mail(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={mail}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Direccion:</Form.Label>
          <Form.Control 
            type="text" 
            id="direccion" 
            onChange={(e) => set_direccion(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={direccion}  
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={create_proveedores}>
            Crear Proveedor
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR PROVEEDOR */}

      {/** MODAL EDITAR PROVEEDOR */}
      <Modal show={showEditProveedor} onHide={handleCloseEditProveedor}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proveedor - {rut_proveedor_edit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre:</Form.Label>
          <Form.Control 
            type="text" 
            id="nombre" 
            onChange={(e) => set_nombre_proveedor_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_proveedor_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Telefono:</Form.Label>
          <Form.Control 
            type="text" 
            id="telefono" 
            onChange={(e) => set_telefono_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={telefono_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Mail:</Form.Label>
          <Form.Control 
            type="mail" 
            id="mail" 
            onChange={(e) => set_mail_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={mail_edit}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Direccion:</Form.Label>
          <Form.Control 
            type="text" 
            id="direccion" 
            onChange={(e) => set_direccion_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={direccion_edit}  
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditProveedor}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_proveedor}>
            Editar Proveedor
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR PROVEEDOR */}

    </>
  )
}

export default Proveedores;