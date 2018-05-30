import {AUTH_USER, UAUTH_USER, AUTH_ERROR, FETCH_MSG} from '../actions/types';

export default function(state ={
    authenticated: false
} , action) {
    switch(action.type) {
      
        case AUTH_USER:
        {
           return { 
               ...state, error:'', authenticated: true};
        }
        case UAUTH_USER:
            return { ...state, authenticated: false};
        case AUTH_ERROR:
            return { ...state, error: action.payload};
        case FETCH_MSG:
            return { ...state, message: action.payload};
        default:
            return state;
    }
    
    
}