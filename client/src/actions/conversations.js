import * as api from '../api';
import {FETCH_ALL_CONVERSATIONS,
  NEW_CONVERSATION,
  FETCH_ALL_MESSAGES,
  NEW_MESSAGE,
  DELETE_CONVERSATION
} from '../constants/actionTypes';

export const getConversations = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchConversations(id);
    const action = { type: FETCH_ALL_CONVERSATIONS, payload: data };
    dispatch(action);
  } catch (err) {
    console.log(err.message);
  }
};
export const createConversation = (members) => async (dispatch) => {
  try {
    const { data } = await api.createConversation(members);
    dispatch({ type: NEW_CONVERSATION, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteConversation = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteConversation(id);
    dispatch({ type: DELETE_CONVERSATION, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const getMessages = (conversationId) => async (dispatch) => {
  try {
    const { data } = await api.fetchMessages(conversationId);
    const action = { type: FETCH_ALL_MESSAGES, payload: data };
    dispatch(action);
  } catch (err) {
    console.log(err.message);
  }
};
export const createMessage = (message) => async (dispatch) => {
  try {
    const { data } = await api.createMessage(message);
    dispatch({ type: NEW_MESSAGE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

