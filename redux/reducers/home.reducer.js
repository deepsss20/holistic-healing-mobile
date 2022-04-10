import {SERVICE_DETAILS, SERVICE_LOAD} from "../types"

const initialState={
    service:[],
    serviceLoading:false
}

const homeReducer = (state=initialState, action)=>{
    const {type, payload} = action
    switch (type) {
        case SERVICE_DETAILS:
            return{
                ...state,
                service:payload,
                serviceLoading:false
            }
        case SERVICE_LOAD:
            return{
                ...state,
                serviceLoading:payload
            }
    
        default:
            return state
    }
}

export default homeReducer