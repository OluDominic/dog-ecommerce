import React from 'react';
import Button from './../forms/Buttons'

const LoadMore =({
    
    onLoadMore =()=> { },
})=> {

    return(
        <Button onClick={()=> onLoadMore()}>
            Load More
        </Button>
    );
};

export default LoadMore