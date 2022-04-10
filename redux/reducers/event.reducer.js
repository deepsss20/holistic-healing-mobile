import { BOOKING_LOAD, BOOKING_DETAILS } from "../types";

const initialState = {
    booking:'',
    bookLoading:false
}

const eventReducer = (state = initialState, action)=>{
    const {type, payload} = action
    switch (type) {
        case BOOKING_DETAILS:
          return{
              ...state,
              booking:payload,
              bookLoading:false
          }

          case BOOKING_LOAD:
              return{
                  ...state,
                  bookLoading:payload
              }
    
        default:
            return state;
    }
}

export default eventReducer