import React, { useState, useEffect, useReducer, useRef} from 'react';
import './App.css';
import Products from './Products';
import Footer from './Footer'

  const App=()=> {
    return(
    <div>
      <Products />
      <Footer />
    </div>
    )
  }
 export default App;