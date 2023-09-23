import { createStore } from "redux";
import rootReducer  from './Reducers/aboutMeReducer'

const store = createStore(rootReducer)

export default store;