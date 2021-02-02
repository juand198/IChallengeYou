import * as React from 'react';
import {Alert} from 'react-native';
import {List as ListPaper, Appbar } from 'react-native-paper';
import {Button,Text,Card, CardItem,Body, Content,Container} from 'native-base'
import axios from "axios";

const MostrarPartidos = ({navigation,route}) => {

    const {datos} = route.params

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const [jugador1, setjugador1] = React.useState([])
    const [jugador2, setjugador2] = React.useState([])
    const [jugador3, setjugador3] = React.useState([])
    const [jugador4, setjugador4] = React.useState([])

    function sacarfecha(fecha) {
        let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
        let f = new Date(fecha.substring(0,15))
        //return f.toLocaleDateString("es-ES", options)
        return(f.getDate()+"/"+((f.getMonth()+1)<10?"0"+(f.getMonth()+1):f.getMonth()+1)+"/"+f.getFullYear())
    }    
    function sacarDatosJugador1(email){
        axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuario.php?email='+email)
        .then(function (response) {
            setjugador1(response.data[0].mensaje[0])
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error obteniendo los usuarios") // error from app side
        });
    }
    function sacarDatosJugador2(email){
        axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuario.php?email='+email)
        .then(function (response) {
            setjugador2(response.data[0].mensaje[0])
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error obteniendo los usuarios") // error from app side
        });
    }
    function sacarDatosJugador3(email){
        axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuario.php?email='+email)
        .then(function (response) {
            setjugador3(response.data[0].mensaje[0])
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error obteniendo los usuarios") // error from app side
        });
    }
    function sacarDatosJugador4(email){
        axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuario.php?email='+email)
        .then(function (response) {
            setjugador4(response.data[0].mensaje[0])
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error obteniendo los usuarios") // error from app side
        });
    }
    function obtenerinformacion(){
        sacarDatosJugador1(datos.jugador1)
        sacarDatosJugador2(datos.jugador2)
        sacarDatosJugador3(datos.jugador3)
        sacarDatosJugador4(datos.jugador4)
    }

    function mostrarDatosExtra(){
        return(
            <Content>
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Ganador</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.ganador=== "" || datos.ganador === null)?"No se ha establecido un ganador aun":datos.ganador}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Puntos equipo 1</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.puntosequipo1=== "" || datos.puntosequipo1 === null)?"No se han establecido los puntos aun":datos.puntosequipo1}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Puntos equipo 2</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.puntosequipo2=== "" || datos.puntosequipo2 === null)?"No se han establecido los puntos aun":datos.puntosequipo2}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Hora de finalización</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.horafin=== "" || datos.horafin === null)?"No se han establecido la finalización aun":datos.horafin}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        )
    }

    React.useEffect(() => {
        obtenerinformacion()
      }, [])
    

    return (
        <React.Fragment>
            <Appbar.Header style={{ backgroundColor:'#81D8D0' }}>
                <Appbar.BackAction
                    onPress={()=>navigation.goBack()}
                />
                <Appbar.Content            
                    title={datos.nombre}
                    subtitle={sacarfecha(new Date(parseInt(datos.fecha)).toString())}
                />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header> 
            <Content padder>
                <ListPaper.Section title="Equipos">
                <ListPaper.Accordion
                title="Equipo 1"
                left={props => <ListPaper.Icon {...props} icon="tennis-ball" />}
                >
                    <ListPaper.Item 
                    style={{ marginLeft:'15%' }}
                    left={props => <ListPaper.Icon {...props} icon="account" />}
                    title={jugador1.nombre} 
                    right={
                        props => 
                        <Button transparent onPress={()=> navigation.navigate('PantallaUsuario', {datos:jugador1}) } >
                            <ListPaper.Icon {...props} icon="eye" />
                        </Button>}
                    />
                    <ListPaper.Item 
                    style={{ marginLeft:'15%' }}
                    left={props => <ListPaper.Icon {...props} icon="account" />}
                    title={jugador2.nombre} 
                    right={
                        props => 
                        <Button transparent onPress={()=> navigation.navigate('PantallaUsuario', {datos:jugador2}) } >
                            <ListPaper.Icon {...props} icon="eye" />
                        </Button>}
                    />
                </ListPaper.Accordion>
                
                <ListPaper.Accordion
                title="Equipo 2"
                left={props => <ListPaper.Icon {...props} icon="tennis-ball" />}
                >
                    <ListPaper.Item 
                    style={{ marginLeft:'15%' }}
                    left={props => <ListPaper.Icon {...props} icon="account" />}
                    title={jugador3.nombre}
                    right={
                        props => 
                        <Button transparent onPress={()=> navigation.navigate('PantallaUsuario', {datos:jugador3}) } >
                            <ListPaper.Icon {...props} icon="eye" />
                        </Button>} />
                    <ListPaper.Item 
                    style={{ marginLeft:'15%' }}
                    left={props => <ListPaper.Icon {...props} icon="account" />}
                    title={jugador4.nombre} 
                    right={
                        props => 
                        <Button transparent onPress={()=> navigation.navigate('PantallaUsuario', {datos:jugador4}) } >
                            <ListPaper.Icon {...props} icon="eye" />
                        </Button>}/>
                </ListPaper.Accordion>
                </ListPaper.Section>   
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Detalles</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.detalles=== "" || datos.detalles === null)?"No hay detalles":datos.detalles}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>     
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Lugar</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.lugar=== "" || datos.lugar === null)?"No hay un lugar establecido":datos.lugar}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>   
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Hora de inicio</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.horainicio=== "" || datos.horainicio === null)?"No hay una hora de inicio establecida":datos.horainicio}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>  
                <Card transparent>
                    <CardItem header style={{ justifyContent:'center' }}>
                        <Text  style={{ color:"#000000", fontWeight:'bold' }} >Fecha</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                            {(datos.fecha=== "" || datos.fecha === null)?"No hay una fecha establecida":sacarfecha(new Date(parseInt(datos.fecha)).toString())}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                {/** Determina si el partido ya ha pasado o no mediante la comparación de la fecha del partido con la fecha actual
                pero con las horas puestas en 23:58 para que cuente el día entero, de ser asi mostrará nuevos datos ya que 
                deberian de haber metido los datos complementarios */}    

                {(datos.fecha < new Date((new Date().getMonth()+1)+"/"+new Date().getDate() + "/" + new Date().getFullYear()+" 23:58:0").getTime())?mostrarDatosExtra():null } 
            </Content>
        </React.Fragment>
        
      );
}

export default MostrarPartidos;