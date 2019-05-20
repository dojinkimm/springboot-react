import {combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import todoReducer from "./todoReducer";

export default combineReducers ({
    //모든 reducer 여기서 만나야 한다
    errors: errorsReducer,
    todo: todoReducer
});