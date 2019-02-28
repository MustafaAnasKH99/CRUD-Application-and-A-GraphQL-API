import React from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteCategoryMutation, getCategoriesQuery } from '../Queries/Queries'


class Categories extends React.Component{
    deleteCategory(id){
        this.props.deleteCategoryMutation({
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
            </div>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, { name: "getCategoriesQuery" }),
    graphql(deleteCategoryMutation, { name: "deleteCategoryMutation" }) 
)(Categories)