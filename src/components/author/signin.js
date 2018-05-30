import React, {Component} from 'react';
import { Field,reduxForm } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email,password);
        this.props.signinUser({email, password});

    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger" >
                    <strong> Oops ! </strong> { this.props.errorMessage}
                </div>
            );
        }
    }
    
    render() {
        const { handleSubmit} = this.props;
     
        const renderInput = (field) =>  { // Define stateless component to render input and errors
            return (
            <div>
                <input {...field.input} type={field.type}/>  
                {field.meta.touched &&
                field.meta.error &&
                <span className="error">{field.meta.error}</span>
                }
            </div>
            );
        };
        return(
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                
                <Field className="form-group" name="email" type="text"
                component={renderInput}
                label="Email:">
                </Field >
                
                
                <Field className="form-group" name="password" type="password" 
                component={renderInput}
                label="Password:" >
                </Field >
                { this.renderAlert()}
                <button type="submit" className="btn btn-primary">Sign in </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error};
}

Signin = reduxForm( {form: 'signin',})(Signin);
export default connect(mapStateToProps,actions)(Signin);