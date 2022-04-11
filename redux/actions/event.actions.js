import { API_URL } from "../../config.dev";
import axios from "axios";
import { BOOKING_DETAILS, BOOKING_LOAD } from "../types";

const url = API_URL

export const bookSlot = (payload)=>((dispatch)=>{
    const apiUrl = `${url}/create/booking`
    dispatch({
        type:BOOKING_LOAD,
        payload: true
    })
    axios.post(apiUrl, payload).then(res=>{
        console.log(res)
        dispatch({
            type:BOOKING_DETAILS,
            payload:true
        })
        setTimeout(()=>{
            dispatch({
                type:BOOKING_DETAILS,
                payload:false
            })
        },5*1000)
    }).catch(err=>{
        console.log({err})
        dispatch({
            type:BOOKING_LOAD,
            payload:false
        })
    })

})