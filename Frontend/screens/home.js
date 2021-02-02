import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert,StatusBar } from 'react-native';
import { Container, Header, Content, List, Input, Icon, Label, Form, Button, Left,Body,Right,Title,Tab,Tabs,ScrollableTab } from 'native-base';
import * as firebase from 'firebase'
import axios from "axios";
import Mensaje from './../components/mensaje'
import ListaUsuarios from '../components/listausuarios'
import ListaPartidos from '../components/listaPartidos'

const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "#81D8D0",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    pestanas:{
      color:'#81D8D0',

    }
});



export default function HomeScreen({  navigation, route  }) {
  
  
  const {datos} = route.params
  
  const [usuario, setusuario] = React.useState(firebase.auth().currentUser)
  const [TodosMensajesClub, setTodosMensajesClub] = React.useState([])
  const [fechaMensaje, setfechaMensaje] = React.useState("")
  const [TodosUsuarios, setTodosUsuarios] = React.useState([])
  const [TodosPartidosClub, setTodosPartidosClub] = React.useState([])


  React.useEffect(() => {
    let timer = setInterval(() => cargarInfoClub(), 2000);
    return () => clearInterval(timer)
  }, [])
  
  function cargarMensajesClub(){
    axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerMensajesClub.php?club='+datos.idclub)
      .then(function (response) {
          setTodosMensajesClub(response.data[0].mensaje.sort((a, b) => new Date(a.fecha) > new Date(b.fecha)))
      })
      .catch(function (error) {
          if (error.response) // error from server
          console.log(error.response.data.message)
          else
          console.log("Error obteniendo los mensajes") // error from app side
      });
  }
  
  function cargarUsuarios(){
    axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuarioClub.php?club='+ datos.idclub)
      .then(function (response) {
          setTodosUsuarios(response.data[0].mensaje)
      })
      .catch(function (error) {
          if (error.response) // error from server
          console.log(error.response.data.message)
          else
          console.log("Error obteniendo los usuarios") // error from app side
      });
  }
  
  function cargarPartidosClub(){
    axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerPartidosClub.php?club='+ datos.idclub)
      .then(function (response) {     
        setTodosPartidosClub(response.data[0].mensaje.sort((a, b) =>new Date(a.fecha) > new Date(b.fecha))) 
      })
      .catch(function (error) {
          if (error.response) // error from server
          console.log(error.response.data.message)
          else
          console.log("Error obteniendo los usuarios") // error from app side
      });
  }

  function pintarMensajesClub() { 
    return (
      <Content>    
        {
          TodosMensajesClub.map((number,index) =>
          <Mensaje 
            key={Math.random()} 
            titulo = {TodosMensajesClub[index].titulo} 
            contenido= {TodosMensajesClub[index].contenido} autor={datos.nombre} 
            fecha={TodosMensajesClub[index].fecha}/>
        )
        }
      </Content>
    );
   }

  function cargarInfoClub(){
    cargarMensajesClub()
    cargarUsuarios()
    cargarPartidosClub()
  }

  function sacarNombres(email){
    for (let i = 0; i < TodosUsuarios.length; i++) {
      if(TodosUsuarios[i].email === email){
        return(TodosUsuarios[i].nombre+" "+TodosUsuarios[i].apellidos)
      }
    }
  }

  function sacarfecha(fecha) {
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    let f = new Date(fecha.substring(0,15))
    //return f.toLocaleDateString("es-ES", options)
    return(f.getDate()+"/"+((f.getMonth()+1)<10?"0"+(f.getMonth()+1):f.getMonth()+1)+"/"+f.getFullYear())
  }

  function pintarMensajesClub() { 
    return (
      <Content>    
        {
          TodosMensajesClub.map((number,index) =>
          <Mensaje 
            key={Math.random()} 
            titulo = {TodosMensajesClub[index].titulo} 
            contenido= {TodosMensajesClub[index].contenido} autor={datos.nombre} 
            fecha={TodosMensajesClub[index].fecha}/>
        )
        }
      </Content>
    );
  }

  function cargarPartidosClub(){
    axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerPartidosClub.php?club='+ datos.idclub)
      .then(function (response) {     
        setTodosPartidosClub(response.data[0].mensaje.sort((a, b) =>new Date(a.fecha) > new Date(b.fecha))) 
      })
      .catch(function (error) {
          if (error.response) // error from server
          console.log(error.response.data.message)
          else
          console.log("Error obteniendo los usuarios") // error from app side
      });
  }

  function cargarPartidosClubProximos(){
    let componente = []
    for (let index = 0; index < TodosPartidosClub.length; index++) {
      if(TodosPartidosClub[index].fecha >= new Date().getTime()){
        componente.push(TodosPartidosClub[index])
      }
    }
    setTodosPartidosClubProximos(componente.sort((a, b) => a.fecha > b.fecha))
  }

  function cargarPartidosClubPasados(){
    let componente = []
    for (let index = 0; index < TodosPartidosClub.length; index++) {
      if(TodosPartidosClub[index].fecha < new Date().getTime()){
        componente.push(TodosPartidosClub[index])
      }
    }
    setTodosPArtidosClubPasados(componente.sort((a, b) => a.fecha > b.fecha))
  }

  function decoradoTarjetaFecha(fpart){
    let hoy = new Date()
    let hoy2 = new Date()
    let hoy3 = new Date()
    let manana = sacarfecha(new Date(hoy2.setDate(hoy2.getDate()+ 1)).toString())
    let pasadomanana = sacarfecha(new Date(hoy3.setDate(hoy3.getDate()+ 2)).toString())
    let estilo = {with:'none'}
    if(sacarfecha(hoy.toString()) === sacarfecha(new Date(parseInt(fpart)).toString())){
      estilo ={borderTopColor: 'red' ,borderTopWidth:20}
    }else if(manana === sacarfecha(new Date(parseInt(fpart)).toString())){
      estilo ={borderTopColor: '#FF8000' ,borderTopWidth:20}
    }else if (pasadomanana === sacarfecha(new Date(parseInt(fpart)).toString())){
      estilo ={borderTopColor: '#E5BE01' ,borderTopWidth:20}
    }else{
      estilo ={borderTopColor: '#3B83BD' ,borderTopWidth:20}
    }
    return estilo;
  }

  function editando(datos,activador) {
    navigation.navigate('EditarPartido', {datos:datos,jugadores:TodosUsuarios,activador:activador})
  }

  function pintarPartidosClubProximos(){
    return(
      <List>    
        {
          TodosPartidosClubProximos.map((number,index) =>
          <ListaPartidos            
            navigation= {navigation}
            tipo = {datos.tipo}
            activador = {false}
            editar ={editando}
            datos = {TodosPartidosClubProximos[index]}
            estilo={decoradoTarjetaFecha(TodosPartidosClubProximos[index].fecha)}
            key={Math.random()}
            nombre={TodosPartidosClubProximos[index].nombre} 
            contenido={"Equipo 1\n" + sacarNombres(TodosPartidosClubProximos[index].jugador1) +"\n"+ sacarNombres(TodosPartidosClubProximos[index].jugador2) + "\n\nEquipo 2\n" + sacarNombres(TodosPartidosClubProximos[index].jugador3)+"\n" + sacarNombres(TodosPartidosClubProximos[index].jugador4)}
            fecha={sacarfecha(new Date(parseInt(TodosPartidosClubProximos[index].fecha)).toString())}
            datos={TodosPartidosClubProximos[index]}
            lugar={TodosPartidosClubProximos[index].lugar}
          />
        )
        }
      </List>
    )    
  }

  function pintarPartidosClubPasados(){
    return(
      <List>    
        {
          TodosPArtidosClubPasados.map((number,index) =>
          <ListaPartidos            
            navigation= {navigation}
            datos = {TodosPArtidosClubPasados[index]}
            tipo = {datos.tipo}  
            activador = {true}            
            editar ={editando}
            estilo={{borderTopColor: '#9c9c9c' ,borderTopWidth:20}}
            key={Math.random()}
            nombre={TodosPArtidosClubPasados[index].nombre} 
            contenido={"Equipo 1\n" + sacarNombres(TodosPArtidosClubPasados[index].jugador1) +"\n"+ sacarNombres(TodosPArtidosClubPasados[index].jugador2) + "\n\nEquipo 2\n" + sacarNombres(TodosPArtidosClubPasados[index].jugador3)+"\n" + sacarNombres(TodosPArtidosClubPasados[index].jugador4)}
            fecha={sacarfecha(new Date(parseInt(TodosPArtidosClubPasados[index].fecha)).toString())}
            datos={TodosPArtidosClubPasados[index]}
            lugar={TodosPArtidosClubPasados[index].lugar}
          />
        )
        }
      </List>
    )    
  }

  function pintarUsuariosClub () {
    return (
      <List>    
        {
          TodosUsuarios.map((number,index) =>
          <ListaUsuarios
            navigation= {navigation}
            datos = {TodosUsuarios[index]}
            key={Math.random()} 
            nlineas={3}
            foto= {(datos.urlfoto==='null')?'http://apptourguide.ddns.net/ichallengeyou/fotos/defecto.PNG':datos.urlfoto}
            nombre={((TodosUsuarios[index].nombre===null)?"Nombre":TodosUsuarios[index].nombre )+" "+ ((TodosUsuarios[index].apellidos===null)?"Apellidos":TodosUsuarios[index].apellidos)} 
            contenido={(TodosUsuarios[index].email) + "\n" +(( TodosUsuarios[index].ciudad=== null?"Ciudad":TodosUsuarios[index].ciudad))+ "\n" + ((TodosUsuarios[index].provincia===null)?"Provincia":TodosUsuarios[index].provincia)}/>
        )
        }
      </List>
    );
    
  }


    return (
      <Container style={styles.AndroidSafeArea}>
        <Tabs renderTabBar={()=> <ScrollableTab  />}>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}} 
          heading="Información">
          {pintarMensajesClub()}
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}} 
          heading="Proximos partidos">
          <Content>
            {pintarUsuariosClub()}
          </Content>
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Partidos disputados">
          <Text>Tab3</Text>
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Liga">
          <Text>Tab4</Text>
          </Tab>
          <Tab   
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Jugadores">
          <Text>Tab5</Text>
          </Tab>
          <Tab   
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Perfil">
          <Text>Tab6</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }