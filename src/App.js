import React from 'react';
//import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './Layouts/layout'
import Home from './Layouts/home'
import Homepage from './pages/Homepage'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
import Register from './pages/Registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery'
import { auth, handleUserProfile } from './firebase/utility'
import './default.scss'


  class App extends React.Component {
    authListener = null;

    componentDidMount() {
      const { setCurrentUser } = this.props
      this.authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            })
          })
        }

        setCurrentUser(userAuth)
      });
    }

    componentWillUnmount() {
      this.authListener();
    }
    render() {
      const { currentUser } = this.props;
      
      return(
        <div className="App">
          <Switch>
              <Route exact path="/" render={()=> (
                <Home>
                  <Homepage />
                </Home>
              )} />
              <Route path="/signup" render={()=> currentUser ? <Redirect to="/" /> : (
                <Layout>
                  <Register />
                </Layout>
              )} />
              <Route path="/login" 
              render={()=> currentUser ? <Redirect to="/"/> : (
                <Layout>
                  <Login />
                </Layout>
              )} />
              <Route path="/recovery"
                  render={()=> (
                  <Layout>
                  <Recovery />
                </Layout>
              )}
              />
          </Switch>
        </div>
        )
      }
    }

    const mapStateToProps = ({ user }) => ({
      currentUser: user.currentUser
    })

    const mapDispatchToProps = dispatch => ({
      setCurrentUser: user => dispatch(setCurrentUser(user))
    })
    
 export default connect(mapStateToProps, mapDispatchToProps)(App);