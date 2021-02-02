import * as React from 'react';
import {Text} from 'react-native';
import {CardItem, Card, Content,Body} from 'native-base';

const Mensaje = (props) => {

    const {titulo, contenido , autor, fecha} = props

    return(
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text  style={{ color:"#0000FF", fontWeight:'bold' }} >{titulo}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {contenido}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={{ color:"#0000FF", fontWeight:'bold' }}>{autor}</Text>
              <Text style={{ marginLeft:'40%',color:"#0000FF", fontWeight:'bold' }}>{fecha}</Text>
            </CardItem>
          </Card>
        </Content>
    )
}

export default Mensaje;