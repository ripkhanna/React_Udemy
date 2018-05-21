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
  

class Header extends Component{
    authButton() {
        if(this.props.authenticated)
        {
            return <button onClick= {() => this.props.authenticate(false)} >Sign Out</button>    
        }
        return <button onClick= {() => this.props.authenticate(true)} >Sign In</button>    
    }
    render(){
        return (
            <Router> 
                <div className="App">
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li className="nav-item" >
                                <Link to="/home">Home</Link> 
                            </li>
                            <li className="nav-item" >
                                <Link to="/resources">Resources</Link>
                            </li>
                            <li className="nav-item" >
                                <Link to="/users">Users</Link>
                            </li>
                            <li className="nav-item" >
                                {this.authButton()}
                            </li>
                        </ul>
                        
                    </nav>
                    <Switch>
                        <Route path="/resources" component={requireAuthor(Resources)} />
                        <Route path="/home" component={Home} />
                        <Route path="/users" component={UserList} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state)
{
    return {authenticated:state.authenticated}
}

export default connect(mapStateToProps,actions)(Header);