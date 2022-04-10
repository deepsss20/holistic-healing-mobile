import { USER_DETAILS, USER_LOAD } from "../types";

const initialState = {
    user:{},
    userLoading:false
};


const userReducer=(state = initialState, action)=>{
    const {type, payload} = action
        switch (type) {
            case USER_DETAILS:
                return{
                    ...state,
                    user: payload,
                    userLoading:false
                }
            case USER_LOAD:
                return{
                    ...state,
                    userLoading:payload
                }
            default:
                return state
        }
}

export default userReducer

