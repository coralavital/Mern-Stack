import { combineReducers } from "redux";

import stories from './stories';
import authenticationReducer from './authentication';

export default combineReducers({
    stories, authenticationReducer
})