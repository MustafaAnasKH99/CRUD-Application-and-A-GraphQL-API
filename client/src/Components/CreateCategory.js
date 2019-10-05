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
            <div className="add-something grid-item3">
                <form id="add-something" onSubmit={this.handleCreation.bind(this)}>

                    <div className="field">
                        <label className="category-grid3-field1">Category Name:</label>
                        <input className="category-grid3-field2" type="text" onChange = {(e) => {this.setState({name: e.target.value})}}/>
                    </div>
                    <div className="field">
                        <button className="category-grid3-field3">Create Category</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default graphql(createCategoryMutation, { name: "createCategoryMutation" })(CreateCategory)