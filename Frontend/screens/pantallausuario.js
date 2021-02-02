import * as React from 'react';
import { Appbar,Avatar } from 'react-native-paper';
import {Container,Text, List,ListItem,Separator, Content} from 'native-base'

const PantallaUsuario = ({navigation,route}) => {

    const {datos} = route.params

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');


    return (
        <Container>
            <Appbar.Header style={{ backgroundColor:'#81D8D0' }}>
                    <Appbar.BackAction
                        onPress={()=>navigation.goBack()}
                    />
                    {console.log(datos.nombre)}
                    <Appbar.Content            
                        title={datos.nombre}
                        subtitle={datos.apellidos}
                    />
                    <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>            
            <Content>
                <Avatar.Image 
                    style={{ marginTop:10,alignSelf:'center',marginBottom:10 }}
                    size={100} 
                    source={{ uri: 'http://apptourguide.ddns.net/ichallengeyou/fotos/defecto.PNG'}} 
                />
                <Separator bordered>
                    <Text>Datos personales</Text>
                </Separator>
                <ListItem>
                    <Text style={{ fontWeight:'bold' }}>Nombre:</Text>
                    <Text >{" " + datos.nombre}</Text> 
                </ListItem>
                <ListItem last >
                    <Text style={{ fontWeight:'bold' }}>Apellidos:</Text>
                    <Text >{" " + datos.apellidos}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Ciudad:</Text>
                    <Text >{" " + datos.ciudad}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Provincia:</Text>
                    <Text >{" " + datos.provincia}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Peso:</Text>
                    <Text >{" " + datos.peso}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Altura:</Text>
                    <Text >{" " + datos.altura}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Edad:</Text>
                    <Text >{" " + datos.edad}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Mano dominante:</Text>
                    <Text >{" " + datos.manodominante}</Text>
                </ListItem>
                <Separator bordered>
                    <Text>Puntuación</Text>
                </Separator>
                <ListItem>
                    <Text style={{ fontWeight:'bold' }}>Derecha:</Text>
                    <Text >{" " + datos.derecha}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Reves:</Text>
                    <Text >{" " + datos.reves}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Servicio:</Text>
                    <Text >{" " + datos.servicio}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Bolea:</Text>
                    <Text >{" " + datos.bolea}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Remate:</Text>
                    <Text >{" " + datos.remate}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Dejada:</Text>
                    <Text >{" " + datos.dejada}</Text>
                </ListItem>
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Globo:</Text>
                    <Text >{" " + datos.globo}</Text>
                </ListItem>                
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Velocidad:</Text>
                    <Text >{" " + datos.velocidad}</Text>
                </ListItem>                
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Resistencia:</Text>
                    <Text >{" " + datos.resistencia}</Text>
                </ListItem>                
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Potencia:</Text>
                    <Text >{" " + datos.potencia}</Text>
                </ListItem>                
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Efecto:</Text>
                    <Text >{" " + datos.efecto}</Text>
                </ListItem>                
                <ListItem last>
                    <Text style={{ fontWeight:'bold' }}>Colocación en pista:</Text>
                    <Text >{" " + datos.colocacionpista}</Text>
                </ListItem>                
            </Content>
        </Container>
        
      );
}

export default PantallaUsuario;