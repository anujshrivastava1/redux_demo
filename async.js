// import { createStore, applyMiddleware } from "redux";
//import thunk from "redux-thunk";
// import axios from "axios";
// const thunkMiddleware = thunk.default;
const redux = require('redux')
const axios = require('axios')
const { thunk } = require('redux-thunk')
const createStore = redux.legacy_createStore
// const colors = require('colors')

const initialState = {
    loading: false, 
    data:[], 
    error:''
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

const fetchUsersRequest = () => {
    return {
      type: FETCH_USERS_REQUEST,
    };
  };
  
  const fetchUsersSuccess = (users) => {
    return { type: FETCH_USERS_SUCCESS, payload: users };
  };
  
  const fetchUsersFailure = (error) => {
    return { type: FETCH_USERS_FAILURE, payload: error };
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return { ...state, loading: true };
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
      case FETCH_USERS_FAILURE:
        return { ...state, loading: false, error: action.payload };
    }
  };
  
  const fetchUsers = () => {
    return function (dispatch) {
      dispatch(fetchUsersRequest());
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const users = response.data.map(user => user.id) 
          dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
  
  const store = createStore(reducer, redux.applyMiddleware(thunk));
  
  store.subscribe(() => {
    console.log(store.getState());
  });
  
  store.dispatch(fetchUsers());

