import React from "react"
import {View, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, HomeScreen,SplashScreen,EventScreen } from "./pages";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()



const EvenNavigation = ()=>{
        return(
            <Stack.Navigator initialRouteName="home">
                 <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="event" component={EventScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        )
}  

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator initialRouteName="events">
        <Drawer.Screen name="events" component={EvenNavigation} options={{headerShown:true, headerTitle:''}}/>
      </Drawer.Navigator>
    );
  }

const Router = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="splash">
                <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="register" component={RegisterScreen} options={{headerShown:false}}/>
                <Stack.Screen name="app" component={DrawerNavigator} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}


export default Router