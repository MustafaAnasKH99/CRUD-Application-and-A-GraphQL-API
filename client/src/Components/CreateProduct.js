import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getProductsQuery, getCategoriesQuery , createProductMutation} from '../Queries/Queries'

class CreateProducts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            parentCategoryId: ""
        }
    }

    async handleSubmission(e){
        e.preventDefault()
        await this.props.createProductMutation({
            variables:{
                name: this.state.name,
                parentCategoryId: this.state.parentCategoryId
            },
            refetchQueries:[{query: getProductsQuery}]
        })
    }

    displayCategories(){
        const data = this.props.getCategoriesQuery
        if(data.loading){
           return <h1>still fetching ..</h1> 
        } else {
            return (
                data.categories.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })
            )
        }
    }
    render(){
        return(
            <form className="add-something grid-item4" onSubmit={this.handleSubmission.bind(this)}>

                <div className="field">
                    <label className="category-grid4-field1">Product name:</label>
                    <input className="category-grid4-field2" type="text" onChange = {(e) => {this.setState({name: e.target.value})}}/>
                </div>

                <div className="field">
                    <label className="category-grid4-field1">Category:</label>
                    <select className="category-grid4-field2" onChange = {(e) => {this.setState({parentCategoryId: e.target.value})}}>
                        <option>Select Category</option>
                        { this.displayCategories() }
                    </select>
                </div>
                <div className="field">
                    <button className="category-grid4-field3">Create Product</button>
                </div>
            </form>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, { name: "getCategoriesQuery" }),
    graphql(createProductMutation, { name: "createProductMutation" }))(CreateProducts)