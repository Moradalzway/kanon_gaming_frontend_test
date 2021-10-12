import { combineReducers } from "redux";
import auth from "./main_reducer";


// here will active if we have mult reducers
export default combineReducers({
  auth,
});