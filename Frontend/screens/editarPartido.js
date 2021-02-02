import * as React from 'react';
import {DatePicker, Content,Item, Picker,Form,Icon} from 'native-base'
import { TextInput,Appbar,Divider } from 'react-native-paper';
import {Text,Button } from 'react-native-elements';
import { Alert } from 'react-native';
import axios from "axios";


const EditarPartido = ({navigation,route}) => {

    const {datos,jugadores,activador} = route.params

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const [lugar, setlugar] = React.useState("")
    const [nombre, setnombre] = React.useState(datos.nombre)
    const [detalles, setdetalles] = React.useState(datos.detalles)
    const [horainicio, sethorainicio] = React.useState(datos.horainicio)
    const [fecha, setfecha] = React.useState(datos.fecha)
    const [jugador1, setjugador1] = React.useState(datos.jugador1)
    const [jugador2, setjugador2] = React.useState(datos.jugador2)
    const [jugador3, setjugador3] = React.useState(datos.jugador3)
    const [jugador4, setjugador4] = React.useState(datos.jugador4)
    const [horafin, sethorafin] = React.useState(datos.horafin)
    const [ganador, setganador] = React.useState(datos.ganador)
    const [puntosequipo1, setpuntosequipo1] = React.useState(datos.puntosequipo1)
    const [puntosequipo2, setpuntosequipo2] = React.useState(datos.puntosequipo2)
     
    function sacarfecha(fecha) {
        let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
        let f = new Date(fecha.substring(0,15))
        //return f.toLocaleDateString("es-ES", options)
        return(f.getDate()+"/"+((f.getMonth()+1)<10?"0"+(f.getMonth()+1):f.getMonth()+1)+"/"+f.getFullYear())
      }

    function editarPartido() {
        let fech = new Date(fecha)
        let fechahoraentiempo = new Date((fech.getMonth()+1)+"/"+fech.getDate()+"/"+fech.getFullYear() + " 23:59:00").getTime()
        axios.get('http://apptourguide.ddns.net/ichallengeyou/updatePartido.php?jugador1='+jugador1+"&jugador2="+jugador2+"&jugador3="+jugador3+"&jugador4="+jugador4+"&detalles="+detalles+"&lugar="+lugar+"&horainicio="+horainicio+"&fecha="+fechahoraentiempo+"&nombre="+nombre+"&secret="+datos.secret+"&id="+datos.id+"&ganador="+ganador+"&puntosequipo1="+puntosequipo1+"&puntosequipo2="+puntosequipo2+"&horafin="+horafin)
        .then(function (response) {
            if(response.data[0].mensaje === "OK"){
                navigation.navigate("Administrador")
            }
        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error escribiendo el mensaje") // error from app side
        });
      }

    function finalizar(){
        if(activador === true){
            return(
                <React.Fragment>
                    <TextInput
                    style={{ margin:5, }}
                    label='Hora de finalización'
                    placeholder={(datos.horafin==="")?"":datos.horafin}
                    onChangeText={text => sethorafin(text)}
                    />
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Ganador"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={ganador}
                            onValueChange={(itemValue, itemIndex) => setganador(itemValue)}
                        >
                            <Picker.Item label="Selecciona equipo ganador" value="Selecciona equipo ganador" />                            
                            <Picker.Item key={Math.random()} label="Equipo 1" value="Equipo 1" />
                            <Picker.Item key={Math.random()} label="Equipo 2" value="Equipo 2" />
                         
                        </Picker>
                    </Item>
                    <TextInput
                    style={{ margin:5, }}
                    label='Puntos equipo 1'
                    placeholder={(datos.puntosequipo1==="")?"":datos.puntosequipo1}
                    onChangeText={text => setpuntosequipo1(text)}
                    />
                    <TextInput
                    style={{ margin:5, }}
                    label='Puntos equipo 2'
                    placeholder={(datos.puntosequipo2==="")?"":datos.puntosequipo2}
                    onChangeText={text => setpuntosequipo2(text)}
                    />
                </React.Fragment>
                
            )
        }
    }

    return (
        <React.Fragment>
            <Appbar.Header style={{ position:'relative',backgroundColor:'#81D8D0' }}>
                <Appbar.BackAction
                    onPress={()=>navigation.goBack()}
                />
                <Appbar.Content            
                    title={datos.nombre}
                />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>

            <Content>            
                <TextInput
                    style={{ margin:5, }}
                    label="Nuevo nombre"
                    placeholder={(datos.nombre==="")?"":datos.nombre}
                    onChangeText={text => setnombre(text)}
                />
                <Divider/>
                <Text h4 style={{ alignSelf:'center',marginTop:10}}>Equipo 1</Text>
                <Form>              
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width:undefined }}
                            placeholder="Jugador 1"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={jugador1}
                            onValueChange={(itemValue, itemIndex) => setjugador1(itemValue)}
                        >
                            <Picker.Item label="Selecciona jugador 1" value="Selecciona jugador1" />
                            {jugadores.map((number,index) =>
                                <Picker.Item key={Math.random()} label={jugadores[index].nombre+ " " + jugadores[index].apellidos} value={jugadores[index].email} />
                            )}
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Jugador 2"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={jugador2}
                            onValueChange={(itemValue, itemIndex) => setjugador2(itemValue)}
                        >
                            <Picker.Item label="Selecciona jugador 2" value="Selecciona jugador 2" />
                            {jugadores.map((number,index) =>
                                <Picker.Item key={Math.random()} label={jugadores[index].nombre+ " " + jugadores[index].apellidos} value={jugadores[index].email} />
                            )}
                        </Picker>
                    </Item>
                    <Text h4 style={{ alignSelf:'center',marginTop:10 }}>Equipo 2</Text>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Jugador 3"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={jugador3}
                            onValueChange={(itemValue, itemIndex) => setjugador3(itemValue)}
                        >
                            <Picker.Item label="Selecciona jugador 3" value="Selecciona jugador 3" />
                            {jugadores.map((number,index) =>
                                <Picker.Item key={Math.random()} label={jugadores[index].nombre+ " " + jugadores[index].apellidos} value={jugadores[index].email} />
                            )}
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Jugador 4"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={jugador4}
                            onValueChange={(itemValue, itemIndex) => setjugador4(itemValue)}
                        >
                            <Picker.Item label="Selecciona jugador 4" value="Selecciona jugador 4" />
                            {jugadores.map((number,index) =>
                                <Picker.Item key={Math.random()} label={jugadores[index].nombre+ " " + jugadores[index].apellidos} value={jugadores[index].email} />
                            )}
                        </Picker>
                    </Item>
                </Form>
                <TextInput
                    style={{ margin:5, }}
                    label='Nuevos detalles'
                    multiline
                    placeholder={(datos.detalles==="")?"":datos.detalles}
                    onChangeText={text => setdetalles(text)}
                />
                <TextInput
                    style={{ margin:5, }}
                    label='Nuevo lugar'
                    placeholder={(datos.detalles==="")?"":datos.lugar}
                    onChangeText={text => setlugar(text)}
                />
                <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                maximumDate={new Date(9999, 12, 31)}
                locale={"es"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"calendar"}
                placeHolderText={sacarfecha(new Date(parseInt(datos.fecha)).toString())}
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={(itemValue, itemIndex) => setfecha(itemValue.getTime())}
                disabled={false}
                />
                <TextInput
                    style={{ margin:5, }}
                    label='Nueva hora de inicio'
                    placeholder={(datos.horainicio==="")?"":datos.horainicio}
                    onChangeText={text => sethorainicio(text)}
                />
                {finalizar()}
                <Button
                    icon={{
                    type:'FontAwesome',
                    name: "edit",
                    size: 20,
                    color: "white"
                    }}
                    title="Editar"
                    onPress={()=>editarPartido()}
                />
            </Content>    
        </React.Fragment>
      );
}

export default EditarPartido;