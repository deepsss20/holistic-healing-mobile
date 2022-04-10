import { API_URL } from "../../config.dev";
import axios from "axios";

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
            payload:res.data
        })
    })
})