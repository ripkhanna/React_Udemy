import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
     
  } from 'react-router-dom';
  import Home from './home';
  import requireAuthor from './require_authentication';
  import Resources from './resources';
  import App from '../components/app';
  import UserList from './user_list';
  import SignIn from '../components/author/signin';
  import Signout from '../components/author/signout';    
  import Signup from '../components/author/signup';    
  import Reducers from '../reducers/auth_reducer'; 
  import Feature from '../components/feature';    
  

class Header extends Component{
    constructor(props) {
        super(props);
    }
    /*authButton() {
        if(this.props.authenticated)
        {
            return <button onClick= {() => this.props.authenticate(false)} >Sign Out</button>    
        }
        return <button onClick= {() => this.props.authenticate(true)} >Sign In</button>    
    }*/
  

    
    
    renderLinks() {
        if(localStorage.getItem('token')) {
        //if(this.props.authenticated) {
            return (
            <li className="nav-item" >
                <Link className="nav-link" to="/signout">Sign Out</Link>
            </li>
            );
        }
        else {
            return [
                <li className="nav-item" key={1} >
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2} >
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];

        }
      
    }

    render(){
        return (

            <Router> 
                <div className="App">
                    <nav className="navbar navbar-light">
                        <Link  className="navbar-brand" to="/">Redux Auth</Link>
                        <ul className="nav navbar-nav">
                            <li className="nav-item" >
                                <Link  className="nav-link" to="/home">Home</Link> 
                            </li>
                            <li className="nav-item" >
                                <Link  className="nav-link" to="/resources">Resources</Link>
                            </li>
                            <li className="nav-item" >
                                <Link  className="nav-link" to="/users">Users</Link>
                            </li>
                            { this.renderLinks()}

                           
                        </ul>
                        
                    </nav>
                    <Switch>
                        <Route path="/resources" component={requireAuthor(Resources)} />
                        <Route path="/home" component={Home} />
                        <Route path="/users" component={UserList} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={Signup} />
                        
                        <Route path="/feature" component={requireAuthor(Feature)} />
                        <Route path="/signout" component={Signout} />
                        
                        <Route path="/" component={Home} />
                        
                        
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state)
{
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps,actions)(Header);