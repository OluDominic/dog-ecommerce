import React from 'react';
import Header from './../components/header'
import Footer from './../components/footer/Footer'

const Home =(props)=> {
    return (
        <div className="lay">
            <Header {...props}/>
                {props.children}
            <Footer />
        </div>
    );
}

export default Home;