import React, { useState, useEffect, forwardRef, useSyncExternalStore } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col, Form, Button, ButtonGroup, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Odontologos = props => {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control type="text" placeholder="Normal text" onClick={onClick} ref={ref} value={value}/>
  ));

  //VARIABLES------------------------------------------------------------------------------------------------------
  const [odontologos, set_odontologos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [rut, set_rut] = useState('');
  const [nombre_completo, set_nombre_completo] = useState('');
  const [password, set_password] = useState('');
  const [password_confirm, set_password_confirm] = useState('');
  const [estado_contrato, set_estado_contrato] = useState('ACTIVO');
  const [id_especialidad, set_id_especialidad] = useState(1);
  const [especialidades, set_especialidades] = useState([]);
  const [rut_edit, set_rut_edit] = useState('');
  const [nombre_completo_edit, set_nombre_completo_edit] = useState('');
  const [startDateEdit, set_startDateEdit] = useState(new Date());
  const [estado_contrato_edit, set_estado_contrato_edit] = useState('');
  const [especialidades_especialista, set_especialidades_especialista] = useState([]);
  const [id_especialidad_edit, set_id_especialidad_edit] = useState(1);

  //FORMATOS------------------------------------------------------------------------------------------------
  function dateFormat(d){
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) { 
      day = '0' + day;
    }
    return [year, month, day].join('-')
  }

  //LOADERS--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_odontologos()
    get_especialidades()
  },[])

  //LLAMADAS-------------------------------------------------------------------------------------------------------
  function get_odontologos(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImFCNU1TUE80ZXE5MmtjZFN6K2I3TWc9PSIsInZhbHVlIjoicXJoeUVEM3FEamI0MWZBcWkxd0gyS3lFaldWVUZPQVhjdjJWa1huTW9DcXVBZmprYUhQN1FxVXVScWhjVzNEYkVEU2Z0TUp5ZXpFTW5SSFAyS08xVHZ3M1RzR0JSdkduOVlyMzdURTZ5RjZSMXRXYnQvZUFBdFh5c2thVy93Y3IiLCJtYWMiOiJjYTIzMGQ5YjY3ZTgwNzM5YjVhNGIxYmJkNWE2Y2EzNzkzNzYzNzI0NGVjZGYzZmI2Y2JkOWVmNGQwMGUxYjNiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InplVFltL1FPYkh5MGNKdjZZNVBMK0E9PSIsInZhbHVlIjoiaUFaUjBBNDRjOSsvUzVWdDJLSldCbHVBcWNvSjJENzc1em4wU3FNZWZRdFZ3TU1SUTVsVzRHbk1MaEgrNmZGK0RmdEc4Uys1bGVqUkkzbmdZQi9FRDFQa3U2YmFDTGlxOXByYUhoNldBRDJscnNZTE8ydmw5cmZ2dzkybXExRlIiLCJtYWMiOiI4NjBmZTJiOTI2N2ZmNWU2YmRmOGE3ZDY1ZDJjZGU3ODRjMmMwNWE1NWE4N2JiMzBhODNjNjUzNjFlODM1MjIzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/especialistas", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_odontologos(result)
      })
      .catch(error => console.log('error', error));
  }

  function crear_odontologo(){
    var rut_exist = true;
    var nombre_exist = true;
    var pass_exist = true;
    var pass_confirm_exist = true;
    if (!rut){
      rut_exist = false;
    }
    if (!nombre_completo) {
      nombre_exist = false;
    }
    if (!password) {
      pass_exist = false;
    }
    if (!password_confirm) {
      pass_confirm_exist = false;
    }
    if (!rut_exist || !nombre_exist || !pass_exist || !pass_confirm_exist) {
      alert("No pueden quedar campos vacios")
    }else{
      if (password !== password_confirm) {
        alert("Las contraseñas no concuerdan")
      }else{
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Im01VHZRR2RKTVJnVlBsYVNIa001T0E9PSIsInZhbHVlIjoieVg5WGNxb1o0ZEcxQUVKcGVJNnFrSUtpR3h5T2VoMXhnZWpYU3dIVHI4K3FHMWZTaHVmbU9CMWt2cWc4OFc5QUtpTGlYVTM1OVZ4SkFLdk90YlBkWDd4VGYxU1hNNVpLZnVkVDMyUEZqM2Q4d3ptT3BNSUdUbWh5cUxCRjFQeWsiLCJtYWMiOiJhZGM2MTU0MTBlZTBjYmVmYjY0Nzk1NGIxYzRmOWE2YjNiOWIyYTNmNDg2N2UyZTZiZDA4MThmZWMzZThjYmJiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkgvVDNHN01nYkQwS1lxdGl0WGUvaHc9PSIsInZhbHVlIjoia2tERlpkd0dJQVBkRnkwUEJWejVWMldtSmIvZFFaeVpLYzJuVnVaUjVuNVN5bzlXdStmM3ZyMTJQTC9BTFl4L0sxQU9iWnFOTWlTbksrRG1Na3hyVDE3NUZuVks2ODJyYUNQZVM2bCtydEt5WTQva2FSY0JyN0hBSms1YVovaVciLCJtYWMiOiJhNDkzYTU0NjhmNzhlYzYxN2QzMzAwNTZlYzNiMmFlYzAyZWU0MTA3NTMzZDA3YWM3ZjM0YWY0M2M0YzlkMTI5IiwidGFnIjoiIn0%3D");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/crear_especialista?rut="+rut+"&nombre_completo="+nombre_completo+"&fecha_contratacion="+dateFormat(startDate)+"&estado_contrato="+estado_contrato+"&pass="+password, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result === 'ok') {
              get_odontologos()
              clear_form_create()
              handleCloseCreate()
            }else{
              alert('No se pudo guardar el odontologo')
            }
          })
          .catch(error => console.log('error', error));
        crear_especialidad_especialista()
      }
    }
  }

  function eliminar_odontologo(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlozQmJORWJBcGRlUE00M3pybWt3bXc9PSIsInZhbHVlIjoiUktFMy9WQjRZU1JTM0FPREt3clpOODRqUlNpSzdsVk1GZjB6WlVrNEg2b2d3alYyMHhMOHhMaUw4V2lNbXM3SXFEOFhXMEl4WWpwZGdWOVh0UCtWTEpKT1JPVUUvL0VnSVRJcDB2MXNGYXNYblFmaDFoVStDbUtDOTJad0dQWksiLCJtYWMiOiJjNWRhMWQyMTBmZjk0ODQxYTkyMDgzZmRmNDIwZDFjMjJlZGY4OWZiNzY1YzRjOGY4NzZiYTBkMGYzMzBlZDJmIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlZCQjNzWExBays0bHljekczbUg1dGc9PSIsInZhbHVlIjoiaElyd3RhZjdpbUt4Ky8zc2tJZkYwZWlJVGNhR1BPY3cvNXdZSkRoMjQ2YWNPbnIrdVNCR2RxajVuWjlkYTBlMXo1QS9NZWhwTmhaMm95VUdiaFZWTjlWampLWW8zUWZTemZuTEo3Q29VS3c4SjFtbDZLUDQyQUlKNWtBR2N6TnciLCJtYWMiOiI2OTVhYWUwNjZkNWFhN2YyZjRjZDVkODk0Y2M3NGE0YThmYzQ0ZTEyYzkxZjJhZmY4ZjU5MWM2ZGZjYjZjOTYxIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/eliminar_especialista?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_odontologos()
        }else{
          alert("Se produjo un error al eliminar el odontologo")
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_especialidades(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Imc1WEFCMFcxUW41Y2p6S1NTY2NIMEE9PSIsInZhbHVlIjoiM3FpeC84TFkvaFIzSjZCbDc5VGRBa1JqdXV6NjNidFV2Nkh6K1dkYTNzb1dBaHlaRTE0eDhBV1JKSmg3TGExZnE1ZC9YbFdzc2JNWFAxQ0sxUFhGM3p5dzJGaEtWVEsyd3VuQTZBdWZnT0h6RFpqUFNYU1JoelQrOTNSQjlvaEQiLCJtYWMiOiJmMDg1OWU2NTZkZTRlOGJlYzA3ZmI0MGZmZTRkZjc4ZjkyYjY2NmVmNDE2OTQ1NjAzOGU2Y2FkZDU5YzFmZjZlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ik41Mm1HVDBXVnpOM1QzdkN3RTdBQ2c9PSIsInZhbHVlIjoiQW4wMXBpZG8xTUtLbmZoMmNXZGN6bzJaQUpWOTl2RVBZOWFuOHI0aFk2M3VrK2IwM2JiOTBiQ2s3QjViMCttZG9tNWNyQjJ4NjFrQndHWG0vMlExOG94VWZrVGtETVlNeE5LZkxHVldkcC96cDM4UmpJajQ4cU85K1JHRkE1NHciLCJtYWMiOiJkN2NkNmY1MjVjYmYzZTNkYjlmNGU3YTg0ZmYxODdjZjFkNGJkMTYyNDMxNjA0Y2FjNjU0Y2NmOTI1NzY5ZTJlIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/especialidades", requestOptions)
      .then(response => response.json())
      .then(result => {
        set_especialidades(result)
      })
      .catch(error => console.log('error', error));
  }

  function crear_especialidad_especialista(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjQ0eUhpdHMxL2dBcUpFY1Bvb0dZL1E9PSIsInZhbHVlIjoiUW9vSFJPY0RSZ0x5a1VhN3pjbVZyRnZNSWd6bGt6NDkyZ2VqZGxIUmpHelFjREtRMll5V1FheDVtaHlyRHpaMWg1NWJjL28xd3o1VkE2Y0FXSzFCVVpEeDJ2a2RSWXhQTkxjQi94Wll3ejVJVUEzNFRRcE5LNzh6TDBReU1LcEciLCJtYWMiOiJmYmFlYTg5ZDg3NzJkODNiOThhNTJiNjljNTA3NGFhODE0ZDg3YTRkZjNhZjAwODllNWFlMzgyMDRmMTJjNWQwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlNOSkU4V0FreG9YKzJZdGJLeXZNZkE9PSIsInZhbHVlIjoiZUdBTDhlNnNTbjlyMnhYWFN3enptbk5ucEtiRmZyRmZoM21xR1dIanp4SVJEeFh3Z0plOWdKN013b3d2aE9pM2JxZ2RoWEV0RVN3T2xkcmpmYTBtT1cvOGMveHF4SkYydTFWc2NyOXRVWVYwY3YzWUlnZGJ0NkZLbmljeUg4Mm0iLCJtYWMiOiJlODNhMmI5NTNmYjNlNzQ4OTFlMmU1MWY3M2QwODc4OWY1Y2VjYjU3NzBjNDhkNmViOWI2OWEzMzZkY2RlNTEwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/create_especialidad_especialista?rut="+rut+"&especialidad="+id_especialidad, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  function get_single_especialidades(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlVXaml1MFJLa3N3b3gzUFhNZk1qWXc9PSIsInZhbHVlIjoiek8xZjY1cllFVlNpWXF1QUFtVUdVbDVHbzA4YnJvc1IxYVNEUk84NFhTNVVleGVuN0d2MTJkMWZHK0ZzeVRWdjlFWUo5aG11UmtkYUE0MmkrTThack81N21MZXJ2YVNnR3pQTUVlcHBpMGlRbVBaM3R2ajlBaXl4TnMvbXpQdFkiLCJtYWMiOiI3ZTkzYmYzYzRhZThlZTBmZDc5ZDI5ODc5MWM4MmE1NTQ2NzY3Zjc2NzczMTI3NWYwMzcyZTJjYzkxN2NiMDcxIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InZqK1NaNitOUEh0blJoeFdtME5LQ2c9PSIsInZhbHVlIjoiTU5XUmU2clYwVVlZT1phZ3BqUFM4ZzA0QzZNcC9MSFhLQVphVGhMUm1HSWxOd2c0S2ROc3F5WmxWdC93SEpUM1EvWklTbVJTRFdZNVovZDBCVFJnYmo2eWR0S2dmbnpGTUhCVm1qZHJjR3paQm9QQk9RU2QzakNYNEwvY1ZVdGsiLCJtYWMiOiI4OTU1NjQ0MTVhNmI2NTY0NTJmM2VkMjRlZjcyMTc0MDlhODA1MmEyMGM3MDFjY2NmZjBkNTAyYjM1NTQzNjFlIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_single_especialista?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_rut_edit(result[0].rut)
        set_nombre_completo_edit(result[0].nombre_completo)
        set_startDateEdit(new Date(result[0].fecha_contratacion))
        set_estado_contrato_edit(result[0].estado_contrato)
        get_especialidades_especialista(result[0].rut)
        handleShowEdit()
      })
      .catch(error => console.log('error', error));
  }

  function edit_especialista(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjlnNW9EMURpYjd3a2ZIVnEvdU03aWc9PSIsInZhbHVlIjoiS2w4TTRjUzBUSGZRNTZwSDR3bGY0bEdxc1JRSmEyQjZYYUtVRlc0Q0tlMnh0OVpPMDI1U3U4Z3J5cnA4THBuT2hOTGpaY0lna0ZRWk04RVl1T2dGdVFHbXoxcDR3eWpnRitFZ2ZzQnVtQ2Fid1FUeW9QdHd3UXVULzlqeUkxYjUiLCJtYWMiOiI3NTg2NzJlYzZhMjMxZDdkYTgxMmE5NjM2NDViMDUyOGFmN2VmZDExMDNhYTZkMTk3YWE2MWUwM2YwOGEwMTBlIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlQyem5INnNTUTdkRFVJQzdxVzNMaEE9PSIsInZhbHVlIjoiS3p4NTJ6T0NVVHFqOWttK0NCb2JkUk5hWmY1WTMyOU9zZWtyN1ZPRzZPMDRhd0VaeENmNjAzQTcyMlAzNUgxb05GeTBFdzh4UUoxMmF2d2R0L1JmcDQ4ejB5OGpCS01XWkJwZ2xzWHEvdVRrWUg2T0RRYzN6dE5HRzllZEkwQkEiLCJtYWMiOiJiYjhjOGM0MTQ3YmNlZGQ3M2I4NDk2MTMxYTcxNDFiMTYyZTUwNjhlZTI4NGU4NDYwMjk2YzBlNWU1NGM1ZWU0IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/editar_especialista?rut="+rut_edit+"&nombre_completo="+nombre_completo_edit+"&fecha_contratacion="+dateFormat(startDateEdit)+"&estado_contrato="+estado_contrato_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_odontologos()
          handleCloseEdit()
        }else{
          alert('No se pudo guardar el odontologo')
        }
      })
      .catch(error => console.log('error', error));
  }

  function get_especialidades_especialista(rut){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkJJaVp3OGtTRjV5ck9kYkh2UllKZnc9PSIsInZhbHVlIjoibEZaeUNtWUQvMnpHV2d3V2hzMllZZjVUUjNQLzdsLzVxVVplTmNPcjU0OUFXanNiY2xtYWM0QXBaU3JqdjlxVWF4ajlkaXYvVHRTMU1UOUw4UFo5Q00rdDRmWS9rQ1owR2ZKMEZpbWppN2VYYjBMZ3ZCMjl1TElROUVQN05STzQiLCJtYWMiOiJjMjEzMmNhNTM3ZTgyNmEwMmZjNDUwZmFiOWVlZTdiNmQ3MjU1MjdhYjdiNDI2MTVlMzhhZWUzMjU4MzYwNTYyIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InN5QUdYdWtlaTM0RXQ2NjY2NTh0TEE9PSIsInZhbHVlIjoiQ3lqT2kvTUhDSE81OHBITHNkL2F5Q1pkRXk1SE83ZTRXSXVOWGpkcFE1cFIxQ3pWOUdwaXZtVmw5UTQ1NCt2VXpZWklCUlYvMHJUVXNIb3Z3MWQzeTdLaGU1bmZaTGQrRnFYNjFiNURFRE02YllWdm1pY3NNZXRMQ1JGMlE4OXkiLCJtYWMiOiIyOWM3MWNlYzY0YTI0NmMyMGNlNzE3YjI0ODM0OTQyNjg5NGRhZmFlMjMzMmU5ZmU3OWU0YjE4MWUxY2VlYWNiIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/get_especialidades_especialista?rut="+rut, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_especialidades_especialista(result)
      })
      .catch(error => console.log('error', error));
  }

  function crear_especialidad_especialista_edit(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjQ0eUhpdHMxL2dBcUpFY1Bvb0dZL1E9PSIsInZhbHVlIjoiUW9vSFJPY0RSZ0x5a1VhN3pjbVZyRnZNSWd6bGt6NDkyZ2VqZGxIUmpHelFjREtRMll5V1FheDVtaHlyRHpaMWg1NWJjL28xd3o1VkE2Y0FXSzFCVVpEeDJ2a2RSWXhQTkxjQi94Wll3ejVJVUEzNFRRcE5LNzh6TDBReU1LcEciLCJtYWMiOiJmYmFlYTg5ZDg3NzJkODNiOThhNTJiNjljNTA3NGFhODE0ZDg3YTRkZjNhZjAwODllNWFlMzgyMDRmMTJjNWQwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlNOSkU4V0FreG9YKzJZdGJLeXZNZkE9PSIsInZhbHVlIjoiZUdBTDhlNnNTbjlyMnhYWFN3enptbk5ucEtiRmZyRmZoM21xR1dIanp4SVJEeFh3Z0plOWdKN013b3d2aE9pM2JxZ2RoWEV0RVN3T2xkcmpmYTBtT1cvOGMveHF4SkYydTFWc2NyOXRVWVYwY3YzWUlnZGJ0NkZLbmljeUg4Mm0iLCJtYWMiOiJlODNhMmI5NTNmYjNlNzQ4OTFlMmU1MWY3M2QwODc4OWY1Y2VjYjU3NzBjNDhkNmViOWI2OWEzMzZkY2RlNTEwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/create_especialidad_especialista?rut="+rut_edit+"&especialidad="+id_especialidad_edit, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_especialidades_especialista(rut_edit)
        }else{
          alert('No se pudo guardar el odontologo')
        }
      })
      .catch(error => console.log('error', error));
  }

  function delete_especialidad_especialista(id_especialidad){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ino3dHBYUW91dUpPNDVWOTRQeWdDZ2c9PSIsInZhbHVlIjoicDNPczI4N2o2T3lteGZmZTdKUjA0emhCN2g1MDBWeDRSRzdtUHVaVGhyWXZTWEhIZ2FkeWtKOXJudkZDUytOWmJYYW9acUM0Yi9oaFFCRUw4cXNBOXN4VlJPalNKTnhZcThMa0hneTA1OXBldllBTkdoSFk1d2xuOHhBZnhFS0siLCJtYWMiOiI1ZWM2YWIyOGYwNzQ5OTcxOTIzOGM2NWM2YTNlNGFjMDcwMjVkNzUwZjBlN2U4ZGJkMGFiNmQ4OThkYjgyNDRmIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im5CUllvT0htVWo0WTFiNTFuTnZSYXc9PSIsInZhbHVlIjoiSmxNVVl3Q052K1FHTXhRbXpWWFlQdllSRkR3aUdMODNuMFJmQStEQkNUeVYrSGNxWWZQTXEwUUcza0RGbVJkS1lVeWp1RkpLeDFyYVJ2QWNTd3A0MEh3UFhhTko4bG1IUnE3UGY2M1Z0dnd1akw1RmpBeSt6UldnN0Z3Mm5vN0giLCJtYWMiOiIxYWRmZjBhMTBiODJjOTI0YWI5MTlmMTgxMDkyNmM0OGU2ZmNiNGRlYjQ1OTEzYThiZDFjMjFjNzA3ZjY4YjdkIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_especialidad_especialista?rut="+rut_edit+"&especialidad="+id_especialidad, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          get_especialidades_especialista(rut_edit)
        }else{
          alert('No se pudo guardar el odontologo')
        }
      })
      .catch(error => console.log('error', error));
  }

  function clear_form_create(){
    set_rut('')
    set_nombre_completo('')
    set_password('')
    set_password_confirm('')
    set_estado_contrato('ACTIVO')
  }

  //RENDERISADO DE TABLAS-------------------------------------------------------------------------------------------
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  function select_estado_contrato(event){
    set_estado_contrato(event.target.value)
  }

  function select_especialdad(event){
    set_id_especialidad(event.target.value)
  }

  function select_especialidad_edit(event){
    set_id_especialidad_edit(event.target.value)
  }

  function select_estado_contrato_edit(event){
    set_estado_contrato_edit(event.target.value);
  }

  function render_especialidades(){
    return especialidades.map((item) => {
      return <option value={item.id}>{item.nombre}</option>
    })
  }

  function render_odontologos(){
    return odontologos.map((item) => {
      return(
        <tr>
          <td>{item.rut}</td>
          <td>{item.nombre_completo}</td>
          <td>{item.fecha_contratacion}</td>
          <td>{item.estado_contrato}</td>
          <td>
          <ButtonGroup size="sm">
            <Button variant="danger" onClick={() => eliminar_odontologo(item.rut)}><FaTrash size={15} /></Button>
            <Button variant="info" onClick={() => get_single_especialidades(item.rut)}><FaEdit size={20} /></Button>
          </ButtonGroup>
          </td>
        </tr>
      )
    })
  }

  function render_especialidades_especialista(){
    return especialidades_especialista.map((item) => {
      return(
        <tr>
          <td>{item.nombre}</td>
          <td><Button variant="danger" onClick={() => delete_especialidad_especialista(item.id)}><FaTrash size={15} /></Button></td>
        </tr>
      )
    })
  }

  return(
    <>
      <Row>
        <Col style={{ padding: '50px 50px 10px 50px' }}>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleShowCreate}>
              <FaPlus /> Crear odontologo
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ padding: '0px 50px 50px 50px' }}>
          <Card>
            <Card.Body>
              <Card.Title>Odontologos</Card.Title>
              <Card.Text>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th>Rut</th>
                      <th>Nombre</th>
                      <th>Fecha contratacion</th>
                      <th>Estado contrato</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {render_odontologos()}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/** MODAL CREAR ODONTOLOGO */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Odontologo</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Rut:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_rut(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={rut}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Nombre Completo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre_completo(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_completo}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            id="username" 
            onChange={(e) => set_password(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={password}  
          />

          <Form.Label htmlFor="username" className="fs-5 text">Confirmar contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            id="username" 
            onChange={(e) => set_password_confirm(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={password_confirm}  
          />

          <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha Contratacion:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Estado contrato:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={select_estado_contrato}>
              <option value='ACTIVO'>ACTIVO</option>
              <option value='TERMINADO'>TERMINADO</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Especialidad:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={select_especialdad}>
              {render_especialidades()}
            </Form.Select>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={crear_odontologo}>
            Crear Odontologo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL CREAR ODONTOLOGO */}

      {/** MODAL EDITAR ODONTOLOGO */}
      <Modal show={showEdit} onHide={handleShowEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Odontologo - {rut_edit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Label htmlFor="username" className="fs-5 text">Nombre Completo:</Form.Label>
          <Form.Control 
            type="text" 
            id="username" 
            onChange={(e) => set_nombre_completo_edit(e.target.value)} 
            aria-describedby="passwordHelpBlock" 
            value={nombre_completo_edit}  
          />

          <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha Contratacion:</Form.Label>
            <DatePicker
              todayButton="Hoy"
              dateFormat="dd/MM/yyyy" 
              selected={startDateEdit} 
              onChange={(date) => set_startDateEdit(date)}
              customInput={<DatePickerInput />}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Estado contrato:</Form.Label>
            <Form.Select aria-label="Default select example" value={estado_contrato_edit} onChange={select_estado_contrato_edit}>
              <option selected value='ACTIVO'>ACTIVO</option>
              <option value='TERMINADO'>TERMINADO</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-5 text">Especialidad:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={select_especialidad_edit}>
              {render_especialidades()}
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => crear_especialidad_especialista_edit()}>
              Añadir especialidad
            </Button>
          </div>

          <Table responsive="sm">
            <thead>
              <tr>
                <th>Especialidades</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {render_especialidades_especialista()}
            </tbody>
            </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={edit_especialista} >
            Editar Odontologo
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL EDITAR ODONTOLOGO */}

    </>
  )
}

export default Odontologos;