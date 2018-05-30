import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signout extends Component {
    componentDidMount() {
        this.props.signoutUser();
    }
    render() {
        return (
            <div> Sorry to go </div>
        );
    }

}

export default connect(null,actions) (Signout);

