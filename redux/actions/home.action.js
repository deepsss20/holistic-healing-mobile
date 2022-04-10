import { API_URL } from "../../config.dev"
import axios from "axios"
import { SERVICE_DETAILS, SERVICE_LOAD } from "../types"

const url = API_URL

export const getServices = ()=>((dispatch)=>{
    const apiUrl = `${url}/get/service`
    dispatch({
        type: SERVICE_LOAD,
        payload:true
    })
    axios.get(apiUrl).then(res=>{
        dispatch({
            type:SERVICE_DETAILS,
            payload:res.data
        })
    }).catch((err)=>{
        console.log({err})
        dispatch({
            type:SERVICE_LOAD,
            payload:false
        })
    })
})
