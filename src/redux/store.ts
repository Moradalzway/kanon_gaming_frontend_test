import { createStore } from "redux";
import auth from "./reducers/main_reducer";

// create store
const store = createStore(auth);

// this sucscripe to save data in localstorage
store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

export default store;
