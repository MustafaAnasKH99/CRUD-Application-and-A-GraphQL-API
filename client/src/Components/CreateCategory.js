import React from 'react';
import { graphql } from 'react-apollo';
import { createCategoryMutation, getCategoriesQuery } from '../Queries/Queries'

class CreateCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: ""
        }
    }

    handleCreation(e){
        e.preventDefault()
        this.props.createCategoryMutation({
            variables:{
                name: this.state.name
            },
            refetchQueries:[{query: getCategoriesQuery}]
        })
    }

    render(){
        return(
            <form id="add-product" onSubmit={this.handleCreation.bind(this)}>

                <div className="field">
                    <label>Category Name:</label>
                    <input type="text" onChange = {(e) => {this.setState({name: e.target.value})}}/>
                </div>

                <button>Create Category</button>
            </form>
        )
    }
}

export default graphql(createCategoryMutation, { name: "createCategoryMutation" })(CreateCategory)