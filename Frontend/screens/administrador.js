import * as React from 'react';
import { StyleSheet,View,StatusBar, Alert } from 'react-native';
import { Container, Fab,Col,List, Icon,  Form, Grid,Textarea,Title,Tab,Tabs,ScrollableTab, Content } from 'native-base';
import {Overlay,Text,Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import * as firebase from 'firebase'
import Mensaje from './../components/mensaje'
import ListaUsuarios from '../components/listausuarios'
import ListaPartidos from '../components/listaPartidos'
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation, route }) {

  const {datos} = route.params

  const [visible, setvisible] = React.useState(false)
  const [visibleVentana, setvisibleVentana] = React.useState(false)
  const [visibleVentanaMensaje, setvisibleVentanaMensaje] = React.useState(false)
  const [emailregis, setemailregis] = React.useState("")
  const [contrasenaregis, setcontrasenaregis] = React.useState("")
  const [TodosUsuarios, setTodosUsuarios] = React.useState([])
  const [tituloMensaje, settituloMensaje] = React.useState("")
  const [contenidoMensaje, setcontenidoMensaje] = React.useState("")
  const [fechaMensaje, setfechaMensaje] = React.useState("")
  const [TodosMensajesClub, setTodosMensajesClub] = React.useState([])
  const [TodosPartidosClub, setTodosPartidosClub] = React.useState([])
  const [TodosPartidosClubProximos, setTodosPartidosClubProximos] = React.useState([])
  const [TodosPArtidosClubPasados, setTodosPArtidosClubPasados] = React.useState([])

    React.useEffect(() => {
      let timer = setInterval(() => cargarInfoClub(), 2000);
      return () => clearInterval(timer)
    }, [])

    React.useEffect(() => {
      cargarPartidosClubProximos()
      cargarPartidosClubPasados()
    }, [TodosPartidosClub])

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

    function crearUsuario(email,contrasena){
        firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then(function(result) {            
            axios.get('http://apptourguide.ddns.net/ichallengeyou/registrarUsuario.php?email='+email+'&tipo=usuario&primeravez=1')
            .then(function (response) {
                axios.get('http://apptourguide.ddns.net/ichallengeyou/agregarUsuarioClub.php?email='+email+'&club='+datos.idclub)
                .then(function (response) {
                    setvisibleVentana(false)
                    setvisible(false)
                })
                .catch(function (error) {
                    if (error.response) // error from server
                    console.log(error.response.data.message)
                    else
                    console.log("Error añadiendo al usuario!") // error from app side
                });
            })
            .catch(function (error) {
                if (error.response) // error from server
                console.log(error.response.data.message)
                else
                console.log("Error creando el usuario!") // error from app side
            });
            
        }).catch(function(error) {

        });
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

    function crearMensaje(titulo,contenido,fecha){
      axios.get('http://apptourguide.ddns.net/ichallengeyou/registrarMensaje.php?idclub='+datos.idclub+'&fecha='+fecha+'&contenido='+contenido+'&titulo='+ titulo)
        .then(function (response) {
            setvisibleVentanaMensaje(false)
            setvisible(false)
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error escribiendo el mensaje") // error from app side
        });
    }

    function cargarInfoClub(){
      cargarMensajesClub()
      cargarUsuarios()
      cargarPartidosClub()
      let f = new Date()
      setfechaMensaje(f.getDate() + "/" + (f.getMonth()+1) + "/" + f.getFullYear() + " " + f.getHours()+":"+((f.getMinutes()<10)?"0"+f.getMinutes():f.getMinutes()))
    }

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
      setTodosPArtidosClubPasados(componente.sort((a, b) => a.fecha < b.fecha))
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

    const styles = StyleSheet.create({
        AndroidSafeArea: {
          flex: 1,
          backgroundColor: "#81D8D0",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        pestanas:{
          color:'#81D8D0',
    
        }
    });

    return (
      <Container style={styles.AndroidSafeArea}>   
        <Tabs renderTabBar={()=> <ScrollableTab  />}>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}} 
          heading="Inicio">
            {pintarMensajesClub()}
            <Fab
              active={visible}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FFFF'}}
              position="bottomRight"
              onPress={() => setvisible(!visible)}>
              <Icon type="FontAwesome" name='comment' />
              <Button style={{ backgroundColor: '#34A34FFF'}} onPress={()=>setvisibleVentanaMensaje(!visibleVentanaMensaje)} >
                <Icon type="FontAwesome" name='plus' />
              </Button>
            </Fab>
            <Overlay overlayStyle={{ maxWidth:'90%',minWidth:'90%',minHeight:400, maxHeight:'60%' }} isVisible={visibleVentanaMensaje} onBackdropPress={()=>setvisibleVentanaMensaje(!visibleVentanaMensaje)}>
                <Content>
                  <Text h4 style={{ alignSelf:'center',marginBottom:15 }}>Publicar Mensaje</Text>
                  <Form style={{ marginBottom:20 }}>
                    <TextInput
                      style={{ margin:5, }}
                      label='Titulo'
                      onChangeText={text => settituloMensaje(text)}
                    />
                    <TextInput
                      style={{ margin:5, }}
                      multiline
                      label='Contenido'
                      onChangeText={text => setcontenidoMensaje(text)}
                    />
                    <TextInput
                      style={{ margin:5, }}
                      value={fechaMensaje}
                      label='Fecha'
                      disabled
                    />
                  </Form>
                  <Button
                    icon={{
                      type:'FontAwesome',
                      name: "home",
                      size: 20,
                      color: "white"
                    }}
                    title="Publicar anuncio"
                    onPress={()=>crearMensaje(tituloMensaje,contenidoMensaje,fechaMensaje)}
                  />
                </Content>                
              </Overlay>
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}} 
          heading="Jugadores"> 
          <Content>
            {pintarUsuariosClub()}
          </Content>            
          <Fab
            active={visible}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomLeft"
            onPress={() => setvisible(!visible)}>
            <Icon type="FontAwesome" name='cog' />
            <Button style={{ backgroundColor: '#34A34F'}} onPress={()=>setvisibleVentana(!visibleVentana)} >
              <Icon type="FontAwesome" name='plus' />
            </Button>
          </Fab> 
          <Overlay overlayStyle={{ minWidth:'80%',minHeight:300, maxHeight:'50%' }} isVisible={visibleVentana} onBackdropPress={()=>setvisibleVentana(!visibleVentana)}>
              <Content>
                <Text h4 style={{ alignSelf:'center',marginTop:10 }}>Registrar jugador</Text>
                <Form style={{ marginBottom:30,marginTop:15 }}>
                  <TextInput
                      style={{ margin:2, }}
                      multiline
                      label='Email'
                      onChangeText={text => setemailregis(text)}
                  />
                  <TextInput
                    style={{ margin:2, }}
                    multiline
                    label='Contraseña'
                    onChangeText={text => setcontrasenaregis(text)}
                  />
                </Form>
                <Button
                  icon={{
                    type:'FontAwesome',
                    name: "home",
                    size: 20,
                    color: "white"
                  }}
                  title="Registrar"
                  onPress={()=>crearUsuario(emailregis,contrasenaregis)}
                />
              </Content>                
            </Overlay>
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Próximos partidos"> 
          <Content>
            <Grid style={{ justifyContent:'center', marginTop:15 }}>
              <Col style={{ backgroundColor: 'red', height: 10,width:20,margin:5 }}></Col>
              <Text>Partidos hoy</Text>
              <Col style={{ backgroundColor: '#FF8000', height: 10,width:20,margin:5 }}></Col>
              <Text>Partidos mañana</Text>
            </Grid>
            <Grid style={{ justifyContent:'center' }}>
              <Col style={{ backgroundColor: '#E5BE01', height: 10,width:20,margin:5 }}></Col>
              <Text>Partidos pasado mañana</Text>
              <Col style={{ backgroundColor: '#3B83BD', height: 10,width:20,margin:5 }}></Col>
              <Text>Partidos proximos</Text>
            </Grid>
            {pintarPartidosClubProximos()}
          </Content>             
          <Fab
            active={visible}
            direction="up"
            style={{ backgroundColor: '#5067FFFF' }}
            position="bottomRight"
            onPress={() => setvisible(!visible)}>
            <Icon type="FontAwesome5" name='user-friends' />
            <Button style={{ backgroundColor: '#34A34FFF'}} onPress={()=>navigation.navigate('RegistrarPartido', {datos:datos,jugadores:TodosUsuarios})} >
              <Icon type="FontAwesome" name='plus' />
            </Button>
          </Fab>
          </Tab>
          <Tab  
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Partidos disputados">
            <Content>
            {pintarPartidosClubPasados()}            
            </Content>
          </Tab>
          <Tab   
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Perfil Club">
          <Text>Tab5</Text>
          </Tab>
          <Tab   
          tabStyle={{backgroundColor: '#81D8AF'}} 
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#81D8AF'}} 
          activeTextStyle={{color: '#fff'}}
          heading="Mi Perfil">
          <Text>Tab6</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }