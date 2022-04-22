import axios from "axios";
import { API_DETAILS, API_LOAD, COMMENT_DETAILS, COMMENT_LOAD } from "../types";

export const commentApi = ()=>{
    const apiUrl = "https://jsonplaceholder.typicode.com/posts/1/comments"

    dispatch({
        type: COMMENT_LOAD,
        payload: true
    })

    axios.get(apiUrl).then((res)=>{
        dispatch({
            type: API_DETAILS,
            payload:res.data
        })
        console.log(res)
    }).catch((err)=>{
        console.log({err})
        dispatch({
            type: API_LOAD,
            payload: false
        })
    })
}