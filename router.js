import React from "react"
import {View, Text} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, HomeScreen,SplashScreen,EventScreen } from "./pages";

const Stack = createNativeStackNavigator();
const Router = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="splash">
                <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
                <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name="register" component={RegisterScreen} options={{headerShown:false}}/>
                <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="event" component={EventScreen} options={{headerShown:false}}/>
            </Stack.Navigator>

        </NavigationContainer>

    )
}


export default Router