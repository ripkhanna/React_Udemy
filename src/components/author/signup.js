import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Field,reduxForm } from 'redux-form';

class Signup extends Component {
    
    handleFormSubmit(fromProps) {
        
        this.props.signupUser(fromProps);

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
        const { handleSubmit, pristine, reset, submitting } = this.props;
     
        const renderField = ({
                            input,
                            label,
                            type,
                            meta: { touched, error, warning }
                            }) => {
                                return (
                                    <div>
                                    <label> {label} </label>
                                    
                                    <div>
                                        <input {...input} placeholder={label} type={type} />
                                        {touched &&
                                        ((error && <div className="error">{error}</div>) ||
                                            (warning && <span>{warning}</span>))}
                                        {(!error && <div></div>  )}
                                    </div>
                                    </div>
                                    );
                                }
        return(
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field className="form-group" name="email" type="text"
                    component={renderField}
                    label="Email:" >
                </Field >
                <Field className="form-group" name="password" type="password" 
                    component={renderField}
                    label="Password:"  
                     >
                    
                </Field >
                <Field className="form-group" name="confirmpassword" type="password" 
                    component={renderField}
                    label="Confirm Password:" >
                </Field >
                {this.renderAlert()}

                <div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}> 
                        Submit  </button>
                    <button type="button" className="btn btn-primary"disabled={pristine || submitting} 
                        onClick={reset}>Clear Values
                        </button>
                </div>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    if(!formProps.email) {
        errors.email ='Required';
    } 
    if(!formProps.password) {
        errors.password ='Required';
    } 
    if(!formProps.confirmpassword) {
        errors.confirmpassword ='Required';
    } 
    /*if (formProps.password != formProps.passwordConfirm)
    {
        //alert(formProps.password);
        //alert(formProps.confirmpassword);
        errors.confirmpassword = 'Password must match';
    }*/
    
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error};
}

Signup = reduxForm( {form: 'signup',validate}
)(Signup);
export default connect(mapStateToProps,actions)(Signup);