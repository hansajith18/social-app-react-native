import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import PostReducer from "./postReducer";
import SweetAlertReducer from "./sweetAlertReducer";
import AuthReducer from "./authReducer";

// Add firebase to reducers
const rootReducer = combineReducers({
  Posts: PostReducer,
  Auth: AuthReducer,
  Toast: SweetAlertReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export default rootReducer;
