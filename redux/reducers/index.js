import userReducer from "./user.reducer";
import homeReducer from "./home.reducer";
import { combineReducers } from "redux";

const rootReducer=combineReducers({
    userReducer,
    homeReducer
})


export default rootReducer