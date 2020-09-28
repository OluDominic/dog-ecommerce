import React, { useEffect } from 'react';
//import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './Layouts/layout'
import Home from './Layouts/home'
import Homepage from './pages/Homepage'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
import Register from './pages/Registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery'
import Dashboard from './pages/Dashboard';
import WithAuth from './hoc/withAuth'
import { auth, handleUserProfile } from './firebase/utility'
import './default.scss'


const App =(props)=> {
  
  const dispatch = useDispatch();

  useEffect(()=> {

      const authListener = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
           dispatch(setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            }))
          })
        }

        dispatch(setCurrentUser(userAuth));
      });
    return ()=> {
      authListener();
    }
  }, [])
  
      
      return(
        <div className="App">
          <Switch>
              <Route exact path="/" render={()=> (
                <Home>
                  <Homepage />
                </Home>
              )} />
              <Route path="/signup" render={()=> (
                <Layout>
                  <Register />
                </Layout>
              )} />
              <Route path="/login" 
              render={()=> (
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
              <Route path="/dashboard"
                  render={()=> (
                <WithAuth>
                  <Layout>
                  <Dashboard />
                  </Layout>
                </WithAuth>
              )}
              />
          </Switch>
        </div>
        )
    }
  
    
 export default App;