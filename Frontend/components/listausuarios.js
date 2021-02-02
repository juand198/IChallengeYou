import * as React from 'react';
import {Text, Alert} from 'react-native';
import { Thumbnail,ListItem, Left,Body,Right,Button,Icon} from 'native-base';

const ListaUsuarios = (props) => {

    const {datos,foto,nombre,contenido,fecha, navigation,nlineas} = props
    return(
        <ListItem thumbnail >
            <Left>
                <Thumbnail square source={{ uri: foto}}/>
            </Left>
            <Body >
                <Text style={{ fontWeight:'bold' }}>{nombre}</Text>
                <Text note numberOfLines={nlineas}>{contenido}</Text>
            </Body>
            <Right>
                <Button style={{ margin:4, backgroundColor:'green' }} small onPress={()=> navigation.navigate('PantallaUsuario', {datos:datos}) }  >
                    <Icon type='FontAwesome' name='eye' />
                </Button>
                <Button style={{ margin:4, backgroundColor:'green' }} small onPress={()=> alert('hola') }>
                    <Icon type='FontAwesome' name='comments' />
                </Button>
            </Right>
        </ListItem>        
    )
}

export default ListaUsuarios;