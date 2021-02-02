import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home'
import Login from './screens/login'
import Registro from './screens/registro'
import Administrador from './screens/administrador'
import * as firebase from 'firebase';
import PantallaUsuario from './screens/pantallausuario';
import MostrarPartido from './screens/mostrarPartido';
import RegistrarPartido from './screens/registrarPartido';
import EditarPartido from './screens/editarPartido'


const firebaseConfig = {
    apiKey: "AIzaSyAdTYryXdySfoHmAyx_yr9_2qbQn2KcB1M",
    authDomain: "ichallengeyou-c9de4.firebaseapp.com",
    databaseURL: "https://ichallengeyou-c9de4.firebaseio.com",
    projectId: "ichallengeyou-c9de4",
    storageBucket: "ichallengeyou-c9de4.appspot.com",
    messagingSenderId: "469947016624",
    appId: "1:469947016624:web:e2b55f0ee284e7bae5e275",
    measurementId: "G-S0DRK43RXT"
};  
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  screenOptions={{
    headerShown: false
  }}>      
        <Stack.Screen name="Login" component={Login} options={{ title: "IChallengeYou" }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Administrador" component={Administrador} />
        <Stack.Screen name="PantallaUsuario" component={PantallaUsuario} />
        <Stack.Screen name="MostrarPartido" component={MostrarPartido} />
        <Stack.Screen name="RegistrarPartido" component={RegistrarPartido} />
        <Stack.Screen name="EditarPartido" component={EditarPartido} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
