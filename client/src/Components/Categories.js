import React from 'react';
import { graphql } from 'react-apollo';

export default class Categories extends React.Component{
    render(){
        // this won't work YET because graphql runs on a different server
        // so we need to install something on our express graphql server
        // to let it accept requests from another server (the client one)
        // console.log(this.props)
        return (
            <div className="categories">
                <h2>Categories</h2>
            </div>
        )
    }
}