import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import { isArray } from 'util';


class UserList extends Component {
    constructor(props, context) {
        super(props, context);
        /*this.state = 
        {
            users:{}
        }*/
    }

    componentWillMount(){
        //this.setState({users: this.props.fetchUsers() });
        this.props.fetchUsers(); 
        console.log('4',this.props.users);
    }
    
    renderUser(user) {
        if(isArray(user)    )
            console.log('IsArray',user.name);
       
        return( 
        <div key={user.id} className="card card-block">
            <h4 className="card-title">{user.name} </h4>
            <p className="card-text">{user.company.name} </p>
            <a className="btn btn-primary" href={user.website} >website</a>

        </div>
        );
    }

    render() {
        console.log('2',this.props.users);
        if(this.props.users.length === 0 )
            return(<div>NoData</div>);
        else
        {
            console.log(this.props.users[0].length)
        }
        return (
            
            <div className="user-list">
                {this.props.users[0].map(this.renderUser)}
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {users: state.users};
}

export default connect(mapStateToProps,actions)(UserList);