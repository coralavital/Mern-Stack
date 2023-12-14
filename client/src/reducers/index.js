import { combineReducers } from "redux";

import stories from './stories';
import authenticationReducer from './authentication';
import users from './users';
import messages from './messages';
import conversations from "./conversations";

export default combineReducers({
    stories, authenticationReducer, users, messages, conversations
})