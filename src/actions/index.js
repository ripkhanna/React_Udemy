import {SAVE_COMMENT} from '../actions/types';
import {CHANGE_AUTH} from '../actions/types';
import {FETCH_USERS} from '../actions/types';
import axios from 'axios';

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