import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../../config.dev"
import { USER_DETAILS, USER_LOAD } from "../types"

const url = API_URL
export const registerUser = ({name, phoneNumber,email,password,navigation})=>(dispatch)=>{
    const apiUrl = `${url}/create/user`
    const payload = {
        name,
        phoneNumber,
        email,
        password,
        role: "user"
    }
    dispatch({
        type:USER_LOAD,
        payload:true
    })
    axios.post(apiUrl, payload).then(async res=>{
        console.log(res.data)
        await AsyncStorage.setItem("access_token", res.data.token) 
        navigation.navigate("app")
        dispatch({
            type: USER_DETAILS,
            payload:res.data
        })

    }).catch(err=>{
        console.log({err})
        dispatch({
            type:USER_LOAD,
            payload:false
        })
    })
    // dispatch({
    //     type: "user",
    //     payload:{name,phoneNumber,email,password}
    // })

}

export const loginUser = ({phoneNumber, password,navigation})=>(dispatch)=>{
    const apiUrl = `${url}/signIn/user`
    const payload={
        phoneNumber,
        password
    } 
    dispatch({
        type:USER_LOAD,
        payload:true
    })
    axios.post(apiUrl, payload).then(async res=>{
        console.log(res.data)
        await AsyncStorage.setItem("access_token",res.data.token)
        navigation.navigate("app")
        dispatch({
            type: USER_DETAILS,
            payload:res.data
        })
    }).catch(err=>{
        console.log({err})
        dispatch({
            type:USER_LOAD,
            payload:false
        })
    })
}

export const getUser = ()=>(dispatch)=>{
    const apiUrl = `${url}/user`

    axios.get(apiUrl).then(async res=>{
        console.log(res.data)
        dispatch({
            type:USER_DETAILS,
            payload:res.data
        })
    })
}