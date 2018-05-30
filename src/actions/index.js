import {SAVE_COMMENT, AUTH_USER,UAUTH_USER,AUTH_ERROR, FETCH_MSG} from '../actions/types';
import {CHANGE_AUTH} from '../actions/types';
import {FETCH_USERS} from '../actions/types';
import axios from 'axios';
import React,{Component} from 'react';
import PropTypes from "prop-types";
import { Route, Redirect, } from 'react-router-dom';
import Resources from '../components/resources';

export function saveComment(comment) {
    return {
        type:SAVE_COMMENT,
        payload:comment    
    };

}

export function authenticate(isLoggedIn) {
    return {
        type:CHANGE_AUTH,
        payload:isLoggedIn
    };
}

export function fetchUsers() {
    console.log('willmount1');
    const request =axios.get('https://jsonplaceholder.typicode.com/users');
    return {
        
        type:FETCH_USERS,
        payload:request
    };
}

const ROOT_URL ='http://localhost:3090';

export function signinUser({ email, password }) {
    
    return function(dispatch) {
        //redux-thunk gives acess to dispatch -middleware
        //submit to server
        
        axios.post(`${ROOT_URL}/signin`,{email, password})
            .then(response => {
                
                //if good update state and save jwt
                //update state -redux thunk call
                dispatch({ type: AUTH_USER });
                //save JWT token -local storage(user browser-user hdd)
                localStorage.setItem('token', response.data.token);
                //redirect                
               window.location = "/feature";
               
            })
            .catch( () => {
                //if request bad show error
                dispatch(authError('Bad login Info'));
            });
        

    }
  
}

export function authError(error) {
    return  {
            type: AUTH_ERROR,
            payload: error
            };

}

export function signoutUser() {
    localStorage.removeItem('token');
    return  {
            type: UAUTH_USER
            
            };

}

export function signupUser({ email, password }) {
    
    return function(dispatch) {
        //redux-thunk gives acess to dispatch -middleware
        //submit to server
        
        axios.post(`${ROOT_URL}/signup`,{email, password})
            .then(response => {
                
                //if good update state and save jwt
                //update state -redux thunk call
                dispatch({ type: AUTH_USER });
                //save JWT token -local storage(user browser-user hdd)
                localStorage.setItem('token', response.data.token);
                //redirect                
               window.location = "/feature";
               
            })
            .catch( response => {
                //if request bad show error
                console.log('error',response.data); 
                dispatch(authError(response.data.error));
            });
        

    }
  
}

export function fetchMessage() {
    return  function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization : localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_MSG,
                payload: response.data.message
            });
        });
    }

}