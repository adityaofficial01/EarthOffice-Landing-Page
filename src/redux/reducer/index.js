import { combineReducers } from "redux";
import common from './common'

// Combine all reducers into a single root reducer.
const root = combineReducers({ common});

export default root;