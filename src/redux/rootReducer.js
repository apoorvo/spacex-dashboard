import { combineReducers } from "redux";
import launchReducer from "./launches/LaunchReducer";

const rootReducer = combineReducers({
    launches : launchReducer
})

export default rootReducer