import React from 'react';
//import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './Layouts/layout'
import Home from './Layouts/home'
import Homepage from './pages/Homepage'
import Register from './pages/Registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery'
import { auth, handleUserProfile } from './firebase/utility'
import './default.scss'

const initialState = {
  currentUser: null
}

  class App extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        ...initialState
      };
    }


    authListener = null;

    componentDidMount() {
      this.authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            this.setState({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            })
          })
        }

        this.setState({
          ...initialState
        })
      });
    }

    componentWillUnmount() {
      this.authListener();
    }
    render() {
      const { currentUser } = this.state;
      
      return(
        <div className="App">
          <Switch>
              <Route exact path="/" render={()=> (
                <Home currentUser={currentUser}>
                  <Homepage />
                </Home>
              )} />
              <Route path="/signup" render={()=> currentUser ? <Redirect to="/" /> : (
                <Layout currentUser={currentUser}>
                  <Register />
                </Layout>
              )} />
              <Route path="/login" 
              render={()=> currentUser ? <Redirect to="/"/> : (
                <Layout currentUser={currentUser}>
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
    
 export default App;