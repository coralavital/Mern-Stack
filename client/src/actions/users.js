import * as api from '../api';
import {
  FETCH_ALL_USERS,
  UPDATE_USER,
  DELETE_USER
} from '../constants/actionTypes';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    const action = { type: FETCH_ALL_USERS, payload: data };
    dispatch(action);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: DELETE_USER, payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePassword = (id, passwords) => async (dispatch) => {
   const { data } = await api.updatePassword(id, passwords);
  try {
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (err) {
    console.log(err.msg);
  }
};