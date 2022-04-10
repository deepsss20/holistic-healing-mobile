/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
} from 'react-native';
import Router from './router';
import store from './store';
import { Provider } from 'react-redux';
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

axios.interceptors.request.use(async config=>{

  const token = await AsyncStorage.getItem("access_token")
      if(token && !config.headers['Authorization'] ){
        config.headers['Authorization'] =token
      }

      return config;

})






const App: () => Node = () => {


  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex:1, backgroundColor:"white"}}>
     <Router/>
    </SafeAreaView>
    </Provider>
  );
};



export default App;


/* 

useEffect-->

I) useEffect(callback, array)

1. useEffect(()=>{
    console.log('mount')
    return ()=>{
      console.log('unmount)
    }
}, [])

2. useEffect(()=>{
  console.log('here')
}, [params1, params2])
 
3. useEffect(()=>{
    console.log('here)
  })

II) State
1. What is state
Any change user does if it should reflect dom then it should be a state
2. State syntax and explaination
const [state, setState] = useState(initialState)
useState will return array, arrays first value will be initail state,
second value will be function to change the state
3. Changing state
    Method 1-> if your initial state is literal (String, number boolean, array)
    setState(value)
    Method 2 if initial state is an object
    setState((prev=>{
      return{
        ....prev,
        stateName:stateValue
      }
    }))
4. Props, Parent and Child relation

  const Child = ({value, value2, onChange})=>{
    return(
      <View>
      <Text>{value}</Text>
      <TextInput onChange={(e)=>onChange(e, value2)}/>
      </View>
    )
  }

  const Parent = ()=>{
    const val = '1234' //1234 is nothing but value
    return(
      <Child value={val} value2={val2} onChange={(e, val2)=> console.log(e, val)}/>
    )
  }

  5. Re-Rendering
      if props or state changes then only your component re-render




*/
