import React, { useEffect } from 'react';
//import './App.css';
import { Route, Switch} from 'react-router-dom'
import Layout from './Layouts/layout'
import Home from './Layouts/home'
import Homepage from './pages/Homepage'
import { useDispatch,} from 'react-redux';
import { checkUserSession } from './redux/User/user.actions';
import Register from './pages/Registration';
import Login from './pages/Login/login';
import Recovery from './pages/Recovery/recovery'
import Dashboard from './pages/Dashboard';
import WithAuth from './hoc/withAuth'
import './default.scss'


const App =props=> {
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkUserSession())
 }, []);
  
      
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