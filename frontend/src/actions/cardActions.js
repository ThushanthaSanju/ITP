import Axios from "axios";
import {
  CARD_CREATE_FAIL,
  CARD_CREATE_REQUEST,
  CARD_CREATE_SUCCESS,
  CARD_DETAILS_FAIL,
  CARD_DETAILS_REQUEST,
  CARD_DETAILS_SUCCESS,
  CARD_LIST_FAIL,
  CARD_LIST_REQUEST,
  CARD_LIST_SUCCESS,
  CARD_UPDATE_REQUEST,
  CARD_UPDATE_SUCCESS,
  CARD_UPDATE_FAIL,
  CARD_DELETE_REQUEST,
  CARD_DELETE_FAIL,
  CARD_DELETE_SUCCESS,
} from "../constants/cardConstants";

export const listCards = ({
    cardNumber = '',
    expDate = '',
    cvCode = '',
    cardOwner = '',
}) => async (dispatch) => {
    dispatch({
      type: CARD_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/card?cardNumber=${cardNumber}&expDate=${expDate}&cvCode=${cvCode}&cardOwner=${cardOwner}`
      );
      dispatch({ type: CARD_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CARD_LIST_FAIL, payload: error.message });
    }
  };
  
export const detailsCard = (_id) => async (dispatch) => {
  dispatch({ type: CARD_DETAILS_REQUEST, payload: _id });
  try {
    const { data } = await Axios.get(`/api/card/${_id}`);
    dispatch({ type: CARD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CARD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createCard = () => async (dispatch, getState) => {
  dispatch({ type: CARD_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      "/api/card",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CARD_CREATE_SUCCESS,
      payload: data.card,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CARD_CREATE_FAIL, payload: message });
  }
};
export const updateCard = (card) => async (dispatch, getState) => {
  dispatch({ type: CARD_UPDATE_REQUEST, payload: card });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/card/${card._id}`, card, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CARD_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CARD_UPDATE_FAIL, error: message });
  }
};
export const deleteCard = (_id) => async (dispatch, getState) => {
  dispatch({ type: CARD_DELETE_REQUEST, payload: _id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/card/${_id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CARD_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CARD_DELETE_FAIL, payload: message });
  }
};
