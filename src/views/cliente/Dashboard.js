import React, { useEffect, useState, forwardRef } from 'react';
import { Col, Row, Form, Button, Badge, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import UserStore from '../stores/UserStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'universal-cookie';
import { FaQuestionCircle } from 'react-icons/fa';

const cookies = new Cookies();

const Dashboard = props => {

  const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control type="text" placeholder="Normal text" onClick={onClick} ref={ref} value={value}/>
  ));

  //VARIABLES-----------------------------------------------------------------------------------------------
  const [citas_agendadas_cliente,set_citas_agendadas_cliente] = useState([]);
  const horas_existentes = ["08:00 AM","08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","13:00 PM","13:30 PM","14:00 PM","14:30 PM","15:00 PM","15:30 PM","16:00 PM","16:30 PM","17:00 PM","17:30 PM","18:00 PM","18:30 PM","19:00 PM","19:30 PM","20:00 PM"]
  const [startDate, setStartDate] = useState(new Date());
  const [selected_date,set_selected_date] = useState('');
  const [especialidades,set_especialidades] = useState([]);
  const [selected_especialidad,set_selected_especialidad] = useState('');
  const [especialistas,set_especialistas] = useState([]);
  const [selected_especialista,set_selected_especialista] = useState('');
  const [horas_reserva,set_horas_reserva] = useState([]);

  //TOOLTIPS-----------------------------------------------------------------------------------------------
  const renderTooltipMisCitasAgendadas = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Aqui puedes ver tus citas agendadas
    </Tooltip>
  );

  const renderTooltipCitasDisponibles = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Las horas ya tomadas se encontraran marcadas, puedes tomar cualquiera de las otras horas.
    </Tooltip>
  );

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

  //LLAMADAS------------------------------------------------------------------------------------------------
  function get_especialidades(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlV4Y1FjQlN3Q0tOemRIUHYxTklxcHc9PSIsInZhbHVlIjoidUh0RW1MUUFYZ0hqSWpiTVdFd1MyMjJCYWVJRWp5Mm05VXc1VndVajdOcmJDZVYxSm9wdmJJTVFJVUpFOFJrMDI0SG93WDVYeDJMTnI3VnY2SERYWDZvRFZ6Z2dYeHA4RGpuNEh6ZXk3MkViZzY4OFM0ZlZGaTY5cSt6TEtYYmwiLCJtYWMiOiI1NzdjZTg5NWFjMGJlMDJkMGU1ODVhMWFlMWU1NjQxMzM0YjcxYmNmY2Y3MTk3NDVmZWQyNzgwMWFhOTk0OGE2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IldHM0UxUHFuOU5hZXhoekNLMkdjN1E9PSIsInZhbHVlIjoid2Z4bU5VV0FUdW8zSzltUDAxclZTaUQwVmJmR0hoaHhKbDhDRE5pVWc5Q1dFY0tVU1V1V3RiVUUxSmVJOWE0ekJiR3JCNVBNQ3NhUmxEcFBkbHY5TGQvZW1JbUEwY2lIYzMwN2tkVmJuVXVBQzNGRjI3Z0lFN2RDUVkvZytURG0iLCJtYWMiOiJmZjRjYjNjYTQwNzU2ODNlZTVkNjE1ZTExYjVkZWI4NDAwNmE1YmY5YTg4ZmJkM2Q2N2I3NzBhYThlYTgxZTgzIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/especialidades", requestOptions)
      .then(response => response.json())
      .then(result => {
        UserStore.especialidades = result
        set_especialidades(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_especialistas(id_especialidad){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkxhSWMrSWc2RWpOMlVVUVZFc1hIQ2c9PSIsInZhbHVlIjoiY3ZmYkhIRml4ZmhYUXpMTHlEMHVJdUlMZkFtMXJjV3JOcTlQaFVFejdVdWIzMzVpeTFQNS9UV1R2ZVE0Wm8yMGthZ0dVRmE4WHNyVHlqemdVS2Vhcy9ZNS9jUkJlMXBwUmdMOG5qZ3ZZSU9DSjU1d2xGR3BQNm1PTEo3WS9VdzAiLCJtYWMiOiJiY2EyMjViOTE3N2RiYjM4NTczODM4YjMzMmUxN2Y3ZmEzYTAzYzhiYTI4NjY1Zjk2NjZlNDFhZmU1NmU5YTUyIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Ii9FZ1M5bFBUYnNlR1ZjcjBWLzNVd2c9PSIsInZhbHVlIjoicU9ZeXFNVi9QcDhMeHVvZENtZ09KbnBvS0FXTE5QUDdsOGpqWXFrRFBWQzBEbThDL1JtMkZXUVJTWnpBRzJBc2Z5dERmakh3ZzhiSms5RUhZcWNNWWpKbmo4RmNuUlVoZWtNYkhvZnpPb2FNVkQyTUdJVnRlWjdhQzV2WjhUUG4iLCJtYWMiOiI4YzAzMzEyMmQ1YjU0MzhkM2Y0ODExNDk5ZjRjY2MwMmQyOTEzOWMyYzk2M2M5NDBmM2JkMGFmYjMwYjMyYjU4IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/especialistas_especialidades?id_especialidad="+id_especialidad, requestOptions)
      .then(response => response.json())
      .then(result => {
        set_especialistas(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_citas_agendadas_segun_cliente(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImVDM250YjBUc0dxK2R6OVNNUmFCS2c9PSIsInZhbHVlIjoiUGg2OG13cmRqN09oNHh0cDRVbE5UQ3d0U3A0d2lyczdEZmtXb1VKQWk5bkpYNElhRzJKT3o0eEU1azkxdXFXYlNicHlIbSsxbDk1bFRWYUFtMGhXSnNBTG8vL1oxOEdqZTVJaC9kZzNqd0hWUWhNMTA0WWwyMFdGdGtKRTQwWmgiLCJtYWMiOiJkYTc5M2E3NWNiNjNiMmI3NGM4Y2FhODJiYTBiOTAzY2ZhZTUzNDFjMzc5MWMwNDVkNzQyMjMwOWRjYzRlOGMyIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlZNaVBCbW9wR01SdW5hTjR5VE9xWlE9PSIsInZhbHVlIjoiSGF4dVRCUm9rbDFlaWdCOXJiMk5WM0ZyT2VRUWtDNzRNN2NDVElKRXVJb1JYNkpFUGRhL3A2S1lLZjNZb1FXMGE5ZjE2QmM0bEhQbWgwdmx0YmlxK3ZPSlkrWjIwVjZYcUFJZDBXb3h0eU9QNXlVSm1UWWZma3cxZnI3S1FGYnUiLCJtYWMiOiIwOTZkMTliNmM0MTNlMzI3MTViZmQ4OWRlNjE2ZTRkMmZhYjg5M2E0NmM3NmM2NmQ4NmEyZmY3NWRiOTk0ZmUwIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/citas_tomadas_segun_cliente?rut_paciente="+cookies.get('rut_cliente'), requestOptions)
      .then(response => response.json())
      .then(result => {
        set_citas_agendadas_cliente(result)
      })
      .catch(error => console.log('error', error));
  }

  function get_citas_agendadas(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkE3TXFRRGVhcTBMSUxFYzJCa0tQb3c9PSIsInZhbHVlIjoidktPaTA2MndwVVRlSTQwdnZ4VFJUblNTcGZBaXViOFllWWowV1lUU2pZSVZKTlR6bm9CUS9RdGFvQWdnbmRuckJsUndDZkJVTitESG9BeFhVbm5JUTVQVWpJakZ0QlkybitPTDdXSEswRzJXeWYvbG1VSmJ6ZCs1UDdoYUdrVnYiLCJtYWMiOiIxYmFjODE5MWJlMzlhNGExZmVmYTFkNGNjYmJhODBiNDllOTU0YjU1NzkwNDk4ODJhZGE2NTUxZjliYzU2M2RjIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6ImJ1bXBGWWlKTmxqamV3RDZPOXZQSEE9PSIsInZhbHVlIjoiN1IvVUtwMy8wNjlqWXNOUUIzRzFNdFpkRzZLSXZkL3I1Q0RxZkdhS2R1REk5eFUvY09GMjBUdlRWUldUdFA5d0dRd3NOVHZOOTZkTmhaVGRNTzJUc3huV2VRN08zekhmSHN1V0N4WDd2bFBKellsem1vSDVzd2l1TFdFdFJBbkoiLCJtYWMiOiJjYTI5NTc4OWRkMWU1NWZhNjdiN2EwM2RiN2NhZjc5MDcxMWZjYWQxYjI4YzI3Yzg3MjI4NDJlZjU4NTA4NjBmIiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/citas_tomadas?rut_especialista="+selected_especialista+"&fecha="+dateFormat(startDate), requestOptions)
      .then(response => response.json())
      .then(result => {
        var horas = [];
        var tomada = false;
        horas_existentes.forEach(hora_existente => {
          tomada = false
          result.forEach(hora_tomada => {
            if (hora_tomada.hora === hora_existente) {
              tomada = true
              horas.push({"hora": hora_existente,"reservada":true})
            }
          });
          if (!tomada) {
            horas.push({"hora": hora_existente,"reservada":false})
          }
        });
        set_horas_reserva(horas)
      })
      .catch(error => console.log('error', error));
  }

  function delete_cita_agendada(id){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkhOR1VuVXFjSlFkcjhjWFQ1YVZ5aWc9PSIsInZhbHVlIjoiOG1yL0NEMzJFbHBlM1JlVk9PM0pJc2REekx6b012TTNXS1ZxYVZXd1BjZHdsS05RYnJJYXVlSzI1SFRMMVBkWE1tbDhKSFJESFlLZXJYc2lxUzFqWW5UWFN3YldaRUplWjBWRkNRaGFJTEttZ1ptUUNtK3VueHFRallsNkMrc3AiLCJtYWMiOiI3NmM1NThiMTdlNjdkNjYyNmZiNGQ1NGJjNWE5NGRmNWFlYTc1ODcxNDhmOTY2MWExYTlmMjY2NDQ5MDkyYjlkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InpnU0hmV2xJRTdMdTJHRTJaSzIzVXc9PSIsInZhbHVlIjoiY05PU0E4YjVrVEhFOUQ5MjRZN3BBeFVxdjRYSUthWGZnL3pvVGJlQmRxRzhBVFpCdGo2Y004M1I0Ym9SL2VkL2xVZS9FOUpYeVVLdlYyQnJ2VSt0YXhWK3NPaEdJS280ZVNycURKOVVjWHFvRDhrVmk5NUZSQnlNLzRibnBWbzgiLCJtYWMiOiI5NTkwNDIxNzczODI4NDEwY2QyZGE4YWZjYjc4N2ViODJlMDc0Njk0MjVkMTQ2M2Y3OWQyZGZmYTZiZmFlNGQ4IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/delete_cita?id="+id, requestOptions)
      .then(response => response.text())
      .then(result => {
        get_citas_agendadas_segun_cliente()
      })
      .catch(error => console.log('error', error));
  }

  //LOADERS--------------------------------------------------------------------------------------------------
  useEffect(() => {
    get_citas_agendadas_segun_cliente()
    get_especialidades()
    //get_especialistas()
  },[]);

  useEffect(() => {
  },[especialidades]);

  useEffect(() => {
  },[especialistas]);

  //RENDERIZACION TABLA PRINCIPAL CITAS ---------------------------------------------------------------------
  function render_citas_agendadas(){
    return citas_agendadas_cliente.map((value) => {
      return(
      <tr>
        <td>{value.fecha}</td>
        <td>{value.hora}</td>
        <td>{value.rut_especialista.nombre_completo}</td>
        <td>
          <Button variant="danger" onClick={() => delete_cita_agendada(value.id)}>
            Anular
          </Button>
        </td>
      </tr>
      )
    })
  }
  
  //RENDERIZACION SELECT ------------------------------------------------------------------------------------
  function render_especialidades(){
    if (especialidades.length !== 0) {
      return especialidades.map((value) => {
        return <option value={value.id}>{value.nombre}</option> 
      })
    }
  }

  function render_especialistas(){
    if (especialistas.length !== 0) {
      return especialistas.map((value) => {
        return <option value={value.rut}>{value.nombre_completo}</option> 
      })
    }
  }

  //SELECCION SELECTS-----------------------------------------------------------------------------
  function select_especialidad(event){
    set_selected_especialidad(event.target.value)
    get_especialistas(event.target.value)
  }

  function select_especialista(event){
    set_selected_especialista(event.target.value)
  }

  //FUNCIONES RESERVA DE HORA---------------------------------------------------------------------
  function buscarHorasDisponibles(){
    if (selected_especialista === '') {
      alert("Por favor asegurece de seleccionar un especialista")
    }else{
      set_selected_date(dateFormat(startDate))
      get_citas_agendadas()
    }
  }

  function renderHorasDisponibles(){
    return horas_reserva.map((item) => {
      return <Row>
        <Col className="p-2">
          <Button variant="secondary" size="sm" onClick={() => reservarHora(item.hora)} disabled={item.reservada}>
            {item.hora}
          </Button>
        </Col>
      </Row>
    })
  }

  function reservarHora(item){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IlhmSFV2MDNZU2Z5SkE1SzdSU1Z4YkE9PSIsInZhbHVlIjoiMmwyclBLK3RKYUJPWW1uYTZoQmVIbDRrclB1eC9nazhNTWp1a08yVjRGSmQ0dTN3WXNkS203aUVLNWJOZmVIWGJRZ1RTdjhDSllRWjRPaTR4ZUVOZnBMMVlsbEJUdEd5VmJ0SnlKWEpTdU1Hcnh5YnI0OWZ5TWVGbmZsSWE3VFEiLCJtYWMiOiJiM2UxMjAzMjY2OTIzNzYwYzNhMzY2N2NhMjQ4YjQ2ZmFkNzNiOTAyMDllYjAzZTIyZTUxYWQwZGExYWM5YTI5IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlA3VWIxWTFydXdxT0d2bUlzeU5UZWc9PSIsInZhbHVlIjoiVnYyYnNpMFkvZmJhb3NTOEJPaU9LTURBVnpwQi8zVFU5TWFqN2pBSGJuOGJZWFIreFFWZG1OY0x0OWVyMzVKVzJQWVRBME9iL24ya2pZcUhBRkJTTjIwbVU0a3o5Snc3VXg2QUNJUTNXalVmZkdHZXNla2RtUldJN0o0SzdKWDMiLCJtYWMiOiIwMjhhM2I1NWUyZDY5OGE1MWYzMGM5NmVhNzQ2NzU1MGQ4MTE1MmEwM2U1OGU1MTBiMTM3NmYyNjhjODY5ZGE1IiwidGFnIjoiIn0%3D");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/agendar_cita?fecha="+selected_date+"&hora="+item+"&rut_cliente="+cookies.get('rut_cliente')+"&rut_especialista="+selected_especialista, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === 'ok') {
          //TE LLEVA AL RESUMEN
          cookies.set('CLIENTE_fecha_cita_agendada',selected_date)
          cookies.set('CLIENTE_hora',item)
          cookies.set('CLIENTE_id_especialidad',selected_especialidad)
          cookies.set('CLIENTE_rut_especialista',selected_especialista)
          window.location.href="./resumen"
        }else{
          alert("Se produjo un error al almacenar la hora")
        }
      })
      .catch(error => console.log('error', error));
  }

  return(
    <>
    <div className="dashboard-cliente">

    <Row>
      <Col className='p-5'>

        <h4>MIS CITAS AGENDADAS 
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipMisCitasAgendadas}
          >
            <Button variant="link"><FaQuestionCircle size={20}/></Button>
          </OverlayTrigger>
        </h4>
      
        <Table striped>
          <thead>
            <tr>
              <th>FECHA</th>
              <th>HORA</th>
              <th>ESPECIALISTA</th>
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {render_citas_agendadas()}
          </tbody>
        </Table>

      </Col>
    </Row>

    <Row>
      <Col xs="4" className="p-5">

        <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Especialidad:</Form.Label>
          <Form.Select aria-label="Default select example" onChange={select_especialidad}>
            <option>Seleccione una especialidad</option>
            {render_especialidades()}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Profesional:</Form.Label>
          <Form.Select aria-label="Default select example" onChange={select_especialista}>
            <option>Seleccione un profecional</option>
            {render_especialistas()}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fs-5 text">Fecha:</Form.Label>
          <DatePicker
            todayButton="Hoy"
            dateFormat="dd/MM/yyyy" 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            customInput={<DatePickerInput />}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-grid gap-2">
          <Button variant="info" onClick={() => buscarHorasDisponibles()}>BUSCAR</Button>
        </Form.Group>

        </Col>
        <Col className="p-5">

          <h1>
            Citas disponibles
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipCitasDisponibles}
            >
              <Button variant="link"><FaQuestionCircle size={20}/></Button>
            </OverlayTrigger>
          </h1>
          <h3>Fecha: {selected_date}</h3>

          {renderHorasDisponibles()}

        </Col>
      </Row>

    </div>
    </>
  )
}

export default Dashboard;