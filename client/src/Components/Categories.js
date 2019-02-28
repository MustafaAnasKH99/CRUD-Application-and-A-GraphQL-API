import React from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteCategoryMutation, getCategoriesQuery } from '../Queries/Queries'

import UpdateCategory from './UpdateCategory'


class Categories extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedId: null,
            selectedName: null
        }
    }

    async deleteCategory(id){
        await this.props.deleteCategoryMutation({
             variables:{
                 id: id
             },
             refetchQueries:[{query: getCategoriesQuery}]
         }) 
     }

    displayCategories = () => {
        const data = this.props.getCategoriesQuery
        if(data.loading){
            return <p>Loading Categories..</p>
        } else {
            return (
                data.categories.map(category => {
                    return(
                        <li key={category.id}>
                            {category.name}
                            <button onClick={() => {this.deleteCategory(category.id)}}>Delete</button>
                            <button onClick={() => { this.setState({selectedId: category.id, selectedName: category.name})}}>Edit</button>
                        </li>
                    )
                })
            )
        }
    }
    render(){
        return (
            <div className="categories">
                <h2>Categories</h2>
                <ol>
                    {this.displayCategories()}
                </ol>
                <UpdateCategory
                    productId={this.state.selectedId}
                    productName={this.state.selectedName}
                />
            </div>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, { name: "getCategoriesQuery" }),
    graphql(deleteCategoryMutation, { name: "deleteCategoryMutation" }))(Categories)