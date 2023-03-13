import { setUserReducer } from "./userReducers";
import { combineReducers } from "redux";
export const reducer=combineReducers({
   allusers:setUserReducer
});