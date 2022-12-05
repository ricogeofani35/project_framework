import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";  
import reducer from "../reducer";

// wadah untuk menyimpan
// redux-thunk untuk membuawat fungsi sincrohnus menjadi asincrohnus
export const store = createStore(reducer, applyMiddleware(thunk));