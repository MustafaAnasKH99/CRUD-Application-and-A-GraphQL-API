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
            <form id="add-product" onSubmit={this.handleSubmission.bind(this)}>

                <div className="field">
                    <label>Product name:</label>
                    <input type="text" onChange = {(e) => {this.setState({name: e.target.value})}}/>
                </div>

                <div className="field">
                    <label>Category:</label>
                    <select onChange = {(e) => {this.setState({parentCategoryId: e.target.value})}}>
                        <option>Select Category</option>
                        { this.displayCategories() }
                    </select>
                </div>

                <button>Create Product</button>
            </form>
        )
    }
}

export default compose(
    graphql(getCategoriesQuery, { name: "getCategoriesQuery" }),
    graphql(createProductMutation, { name: "createProductMutation" }))(CreateProducts)