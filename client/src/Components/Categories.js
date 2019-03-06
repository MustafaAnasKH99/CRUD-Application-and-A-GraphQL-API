import React from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteCategoryMutation, getCategoriesQuery, getProductsQuery } from '../Queries/Queries'

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
        if(window.confirm("Deleting this will delete all its products, sure?")){
            await this.props.deleteCategoryMutation({
                 variables:{
                     id: id
                 },
                 refetchQueries:[{query: getCategoriesQuery}, {query: getProductsQuery}]
             }) 
        }
     }

    displayCategories = () => {
        const data = this.props.getCategoriesQuery
        if(data.loading){
            return (
                <div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>
            )
        } else {
            return (
                data.categories.map(category => {
                    return(
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => {this.deleteCategory(category.id)}}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => { this.setState({selectedId: category.id, selectedName: category.name})}}>Edit</button>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }
    render(){
        return (
            <div className="categories grid-item2">
                <h3>Categories</h3>
                <table>
                    <tr>
                        <th>Category Name</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    {this.displayCategories()}
                </table>
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