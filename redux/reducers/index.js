import userReducer from "./user.reducer";
import homeReducer from "./home.reducer";
import { combineReducers } from "redux";
import eventReducer from "./event.reducer";
import apiReducer from "./api.reducer";

const rootReducer=combineReducers({
    userReducer,
    homeReducer,
    eventReducer,
    apiReducer
})


export default rootReducer