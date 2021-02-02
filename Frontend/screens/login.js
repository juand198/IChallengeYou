import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert } from 'react-native';
import {Content, Item, Input, Icon, Label, Form, Button} from 'native-base';
import * as firebase from 'firebase';
import axios from "axios";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:'30%',
      marginHorizontal: 16
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    botones:{
        marginTop:20,
    },
    botonera:{
        flex:1,
        marginTop:50,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
    },
    botones:{
        margin:10,
    },
    boton_regis:{
        flex:1,
        width:'70%',
        backgroundColor:'transparent',
        justifyContent:'center',
    },
    botones_textos:{
        color:'#FFFFFfff',
        marginLeft:15
    }
});

function obtenerDatos(navigation, email){
    axios.get('http://apptourguide.ddns.net/ichallengeyou/obtenerUsuario.php?email='+ email)
    .then(function (response) {
        if(response.data[0].estado === 1){
            navigation.navigate('Registro', {datos:response.data[0].mensaje[0]}) 
        }        
    })
    .catch(function (error) {
        console.log(error);
    });
}


export default function Login({ navigation }) {

    const [usuario, setusuario] = React.useState("");
    const [contasena, setcontasena] = React.useState("")

    function credenciales(){
        firebase.auth().signInWithEmailAndPassword(usuario, contasena)
        .then(function(result) {
            obtenerDatos(navigation, usuario);          
        }).catch(function(error) {
            // Handle error.
        });
    }

    return (        
        <SafeAreaView style={styles.container}>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Usuario</Label>
                        <Input onChangeText={text => setusuario(text)}/>
                    </Item>

                    <Item floatingLabel last>
                        <Label>Contraseña</Label>
                        <Input onChangeText={text => setcontasena(text)} />
                    </Item>
                </Form>
                <View style={styles.botonera}>
                    <Button style={styles.botones} full primary iconLeft onPress={() => credenciales() }>
                        <Icon name='home' />
                        <Text style={styles.botones_textos}>Iniciar Sesión</Text>
                    </Button>

                    <Button transparent info style={styles.boton_regis}  >
                        <Text style={{ color:'#00AAE4' }}>Registrar Club</Text>
                    </Button>
                </View>            
            </Content>
        </SafeAreaView>
      
    );
}


  