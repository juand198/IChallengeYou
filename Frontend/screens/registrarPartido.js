import * as React from 'react';
import {DatePicker, Content,Item, Picker,Form,Icon} from 'native-base'
import { TextInput,Appbar,Divider } from 'react-native-paper';
import {Text,Button } from 'react-native-elements';
import { Alert } from 'react-native';
import axios from "axios";


const RegistrarPartido = ({navigation,route}) => {

    const {datos,jugadores} = route.params

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const [numerojugadores, setnumerojugadores] = React.useState(1)
    const [lugar, setlugar] = React.useState("")
    const [nombre, setnombre] = React.useState("")
    const [detalles, setdetalles] = React.useState("")
    const [horainicio, sethorainicio] = React.useState("")
    const [fecha, setfecha] = React.useState(new Date())
    const [jugador1, setjugador1] = React.useState("")
    const [jugador2, setjugador2] = React.useState("")
    const [jugador3, setjugador3] = React.useState("")
    const [jugador4, setjugador4] = React.useState("")
    const [secret, setsecret] = React.useState(Math.random())
     
    

    function crearPartido() {
        let fech = new Date(fecha.getTime())
        let fechahoraentiempo = new Date((fech.getMonth()+1)+"/"+fech.getDate()+"/"+fech.getFullYear() + " 23:59:00").getTime()
        axios.get('http://apptourguide.ddns.net/ichallengeyou/registrarPartido.php?jugador1='+jugador1+"&jugador2="+jugador2+"&jugador3="+jugador3+"&jugador4="+jugador4+"&detalles="+detalles+"&lugar="+lugar+"&horainicio="+horainicio+"&fecha="+fechahoraentiempo+"&nombre="+nombre+"&secret="+secret)
        .then(function (response) {

            axios.get('http://apptourguide.ddns.net/ichallengeyou/agregarPartidoClub.php?club='+datos.idclub+'&secret='+secret)
            .then(function (response) {
                navigation.navigate("Administrador")
            })
            .catch(function (error) {
                if (error.response) // error from server
                console.log(error.response.data.message)
                else
                console.log("Error escribiendo el mensaje") // error from app side
            });

        })
        .catch(function (error) {
            if (error.response) // error from server
            console.log(error.response.data.message)
            else
            console.log("Error escribiendo el mensaje") // error from app side
        });
      }

    return (
        <Content>
            <Appbar.Header style={{ backgroundColor:'#81D8D0' }}>
                <Appbar.BackAction
                    onPress={()=>navigation.goBack()}
                />
                <Appbar.Content            
                    title="Nuevo partido"
                />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <TextInput
                style={{ margin:5, }}
                label='Nombre'
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
                label='Detalles'
                multiline
                onChangeText={text => setdetalles(text)}
            />
            <TextInput
                style={{ margin:5, }}
                label='Lugar'
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
            placeHolderText="Fecha"
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={(itemValue, itemIndex) => setfecha(itemValue)}
            disabled={false}
            />
            <TextInput
                style={{ margin:5, }}
                label='Hora de inicio'
                onChangeText={text => sethorainicio(text)}
            />
            <Button
                  icon={{
                    type:'FontAwesome',
                    name: "add",
                    size: 20,
                    color: "white"
                  }}
                  title="Registrar"
                  onPress={()=>crearPartido()}
                />
        </Content>    
      );
}

export default RegistrarPartido;