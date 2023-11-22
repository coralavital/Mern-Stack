import * as api from "../api";
import {
    AUTHENTICATION
} from "../constants/actionTypes";

const signup = (formValues, navigate, showError) => async dispatch => {
    try {
        const { data } = await api.signup(formValues);
        dispatch({
            type: AUTHENTICATION,
            data: data
        });
        navigate("/");
    } catch (error) {
        showError(error.response.data.msg);
    }
};

const login = (formValues, navigate, showError) => async dispatch => {
    try {
        const { data } = await api.login(formValues);
        dispatch({
            type: AUTHENTICATION,
            data: data
        });
        navigate("/");
    } catch (error) {
        showError(error.response.data.msg);
    }
};

export { signup, login };