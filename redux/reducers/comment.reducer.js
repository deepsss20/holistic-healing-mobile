import { COMMENT_DETAILS, COMMENT_LOAD } from "../types";

const initialState = {
    commentApi: [],
    commentLoading: false
}

const commentReducer = (state = initialState, action)=>{
    const {type, payload} = action

    switch (type) {
        case COMMENT_DETAILS:
            return{
                ...state,
                commentApi:payload,
                commentLoading: false
            }

            case COMMENT_LOAD:
                return{
                    ...state,
                    commentLoading:payload
                }
    
        default:
            return state
    }
}

export default commentReducer