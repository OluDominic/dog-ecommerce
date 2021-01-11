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
import WithAuth from './hoc/withAuth';
import Cart from './pages/Cart/cart'
import Admin from './pages/Admin/admin';
import WithAdminAuth from './hoc/withAdminAuth';
import AdminToolbar from './components/AdminToolbar';
import AdminLay from './Layouts/admin'
import DashboardLay from './Layouts/dashboard'
import ProductDetails from './pages/ProductDetails';
import './default.scss'
import Search from './pages/Search/search';
import Payment from './pages/Payment'
import Order from './pages/Order'


const App =props=> {
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkUserSession())
 }, []);
  
      
      return(
        <div className="App">
          <AdminToolbar/>
          <Switch>
              <Route exact path="/" render={()=> (
                <Home>
                  <Homepage />
                </Home>
              )} />
              <Route exact path="/search" render={()=> (
                <Layout>
                  <Search />
                </Layout>
              )} />
              <Route path="/search/:filterType" render={()=> (
                <Layout>
                  <Search />
                </Layout>
              )} />
              <Route path="/product/:productID" render={()=> (
                <Layout>
                  <ProductDetails />
                </Layout>
              )} />
              <Route path="/cart" render={()=> (
                <Layout>
                  <Cart />
                </Layout>
              )} />
              <Route path="/payment" render={() => (
                <WithAuth>
                  <Layout>
                    <Payment />
                  </Layout>
                </WithAuth>
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
              <Route path="/dashboard" render={()=> (
                <WithAuth>
                  <DashboardLay>
                  <Dashboard />
                  </DashboardLay>
                </WithAuth>
              )}
              />
              <Route path="/order/:orderID" render={() => (
                <WithAuth>
                  <DashboardLay>
                    <Order />
                  </DashboardLay>
                </WithAuth>
              )}
              />
              <Route path="/admin" render={()=> (
                <WithAdminAuth>
                  <AdminLay>
                  <Admin />
                  </AdminLay>
                </WithAdminAuth> 
              )}
              />
          </Switch>
        </div>
        )
    }
  
    
 export default App;