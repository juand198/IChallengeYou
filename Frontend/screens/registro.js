import * as React from 'react';
import { StyleSheet, View,StatusBar, SafeAreaView, Text, Alert } from 'react-native';
import { Container, Header, Toast, Item, Input, Icon, Label, Form, Button, Left,Body,Right,Title,Tab,Tabs,ScrollableTab } from 'native-base';
import * as firebase from 'firebase';
import axios from "axios";

const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    botones:{
        marginTop:20,
    },
    botones_textos:{
        color:'#FFFFFfff',
        marginLeft:15
    }
});

export default function Login({ navigation, route }) {

    const [usuario, setusuario] = React.useState(firebase.auth().currentUser)
    const [nombre, setnombre] = React.useState("")
    const [apellidos, setapellidos] = React.useState("")
    const [ciudad, setciudad] = React.useState("")
    const [provincia, setprovincia] = React.useState("")
    const [contrasena1, setcontrasena1] = React.useState()
    const [contrasena2, setcontrasena2] = React.useState()

    

    const {datos} = route.params

    function comprobarRegistro(){     
        if(datos.primeravez == 0){
            if(datos.tipo === 'administrador'){
                navigation.navigate('Administrador', {datos:datos}) 
            }else{
                navigation.navigate('Home',{datos:datos})  
            } 
        }
    }

    function comprobartDatos(){
        if(contrasena1 !== contrasena2){
            Alert.alert(
                'Error',
                'Las contraseñas deben de ser iguales',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
        }else if (nombre === "",apellidos=== "",ciudad=== "",provincia=== ""){
            Alert.alert(
                'Error',
                'Por favor, debes rellenar todos los campos',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
        }else{
            axios.get('http://apptourguide.ddns.net/ichallengeyou/updateUsuario.php?email='+ datos.email +'&primeravez=0&nombre='+nombre+'&apellidos='+apellidos+'&provincia='+provincia+'&ciudad='+ciudad+'&urlfoto='+datos.urlfoto+'&tipo='+datos.tipo)
            .then(function (response) {
                usuario.updatePassword(contrasena2).then(function() {
                    if(datos.tipo === 'administrador'){
                        navigation.navigate('Administrador', {datos:datos}) 
                    }else{
                        navigation.navigate('Home',{datos:datos})  
                    } 
                  }).catch(function(error) {
                    console.log(error)
                  });
                 
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
    }

    return (        
        <SafeAreaView style={styles.AndroidSafeArea}>
        {comprobarRegistro()}
            <Form>
                    <Item floatingLabel>
                        <Label>{(datos.nombre === null)?"Introduce tú nombre":datos.nombre}</Label>
                        <Input onChangeText={text => setnombre(text)}/>
                    </Item>

                    <Item floatingLabel last>
                        <Label>{(datos.apellidos === null)?"Introduce tus apellidos":datos.apellidos}</Label>
                        <Input onChangeText={text => setapellidos(text)} />
                    </Item>

                    <Item floatingLabel last>
                        <Label>{(datos.ciudad === null)?"Introduce tu ciudad":datos.ciudad}</Label>
                        <Input onChangeText={text => setciudad(text)} />
                    </Item>

                    <Item floatingLabel last>
                        <Label>{(datos.provincia === null)?"Introduce tu provincia":datos.provincia}</Label>
                        <Input onChangeText={text => setprovincia(text)} />
                    </Item>

                    <Item floatingLabel last>
                        <Label>Introduce tu contraseña</Label>
                        <Input onChangeText={text => setcontrasena1(text)} />
                    </Item>

                    <Item floatingLabel last>
                        <Label>Confirma tu contraseña</Label>
                        <Input onChangeText={text => setcontrasena2(text)} />
                    </Item>

                    <Button style={styles.botones} full primary iconLeft onPress={() => comprobartDatos() }>
                        <Icon type="FontAwesome" name='sign-in' />
                        <Text style={styles.botones_textos}>Registrarte</Text>
                    </Button>
                </Form>
        </SafeAreaView>
      
    );
}