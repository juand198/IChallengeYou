import React, { Component } from "react";
import { Container, Form, Content, Card, CardItem, Text, Body,Icon,Button, Right, Left } from "native-base";
import {Overlay } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

const ListaPartidos = (props) => {

    const {datos,editar,activador,estilo,nombre,contenido,fecha,lugar,tipo, navigation} = props

    const [editarPartidoVentana, seteditarPartidoVentana] = React.useState(false)

    function borrarPartido(){
        if(tipo==="administrador"){
            return(
                <Button style={{ margin:4, backgroundColor:'green' }} small onPress={()=>alert('delete ' + datos.id)}>
                    <Icon style={{ color:'#8b0000' }} type="FontAwesome5" name="trash-alt"/>
                </Button>
            )
        }
    }

    function editarPartido(){
        if(tipo==="administrador"){
            return(
                <Button style={{ margin:4, backgroundColor:'green' }} small onPress={()=>editar(datos,activador)}>
                    <Icon type="FontAwesome" name="edit"/>
                </Button>
            )
        }
    }

    return (
        <Content padder >
            <Card style={estilo}>
                <CardItem header>
                    <Text>{nombre}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                        {contenido}
                        </Text>
                    </Body>
                    <Right>
                        <Button style={{ margin:4, backgroundColor:'green' }} small onPress={()=>navigation.navigate('MostrarPartido', {datos:datos})}>
                            <Icon type="FontAwesome" name="eye"/>
                        </Button>
                        {editarPartido()}
                        {borrarPartido()}
                    </Right>
                </CardItem>
                <CardItem footer>
                    <Text>{fecha}</Text>
                    <Text>{lugar}</Text>
                </CardItem>
            </Card>
        </Content>
    );
}

export default ListaPartidos