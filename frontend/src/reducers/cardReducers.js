const {
    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL,
    CARD_DETAILS_REQUEST,
    CARD_DETAILS_SUCCESS,
    CARD_DETAILS_FAIL,
    CARD_CREATE_REQUEST,
    CARD_CREATE_SUCCESS,
    CARD_CREATE_FAIL,
    CARD_CREATE_RESET,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAIL,
    CARD_UPDATE_RESET,
    CARD_DELETE_REQUEST,
    CARD_DELETE_SUCCESS,
    CARD_DELETE_FAIL,
    CARD_DELETE_RESET,
  } = require('../constants/cardConstants');
  
  export const cardListReducer = (
    state = { loading: true, cards: [] },
    action
  ) => {
    switch (action.type) {
      case CARD_LIST_REQUEST:
        return { loading: true };
      case CARD_LIST_SUCCESS:
        return {
          loading: false,
          cards: action.payload.cards,
          pages: action.payload.pages,
          page: action.payload.page,
        };
      case CARD_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
    
  export const cardDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case CARD_DETAILS_REQUEST:
        return { loading: true };
      case CARD_DETAILS_SUCCESS:
        return { loading: false, card: action.payload };
      case CARD_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const cardCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_CREATE_REQUEST:
        return { loading: true };
      case CARD_CREATE_SUCCESS:
        return { loading: false, success: true, card: action.payload };
      case CARD_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CARD_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const cardUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_UPDATE_REQUEST:
        return { loading: true };
      case CARD_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case CARD_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case CARD_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const cardDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_DELETE_REQUEST:
        return { loading: true };
      case CARD_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CARD_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case CARD_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
