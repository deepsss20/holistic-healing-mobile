import { API_DETAILS, API_LOAD } from "../types";

const initialState = {
    api: [],
    apiLoading: false
}

const apiReducer = (state = initialState, action)=>{
    const {type, payload} = action

    switch (type) {
        case API_DETAILS:
            return{
                ...state,
                api:payload,
                apiLoading: false
            }

            case API_LOAD:
                return{
                    ...state,
                    apiLoading:payload
                }
    
        default:
            return state;
    }

}

export default apiReducer