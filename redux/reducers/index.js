import userReducer from "./user.reducer";
import homeReducer from "./home.reducer";
import { combineReducers } from "redux";
import eventReducer from "./event.reducer";

const rootReducer=combineReducers({
    userReducer,
    homeReducer,
    eventReducer
})


export default rootReducer