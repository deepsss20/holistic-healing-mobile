import axios from "axios";
import { API_DETAILS, API_LOAD } from "../types";

export const apiSlot = ()=>(dispatch)=>{
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"
    dispatch({
        type: API_LOAD,
        payload:true
    })

    axios.get(apiUrl).then(res=>{
        dispatch({
            type:API_DETAILS,
            payload:res.data
        })
    }).catch(err=>{
        console.log({err})
        dispatch({
            type: API_LOAD,
            payload:false
        })
    })
}