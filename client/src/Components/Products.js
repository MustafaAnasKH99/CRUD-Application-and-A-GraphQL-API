import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getProductsQuery, deleteProductMutation, deleteCategoryMutation } from '../Queries/Queries'

// imported comps
import Categories from './Categories'
import UpdateProduct from './UpdateProduct'

class Products extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedId: null,
            selectedName: null
        }
    }

    async deleteProduct(id){
        await this.props.deleteProductMutation({
            variables:{
                id: id
            },
            refetchQueries:[{query: getProductsQuery}]
        }) 
    }

    updateProduct = async (id, name) => {
        this.setState({selectedId: id, selectedName: name})
    }

    displayProducts=()=>{
        const data = this.props.getProductsQuery
        if(data.loading){
            return (
                <div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">loading</div>
                </div>
            )

        } else {
            return data.products.map(product => {
                return (
                        <tr key={product.id}>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.category.name}
                            </td>
                            <td>
                                <button onClick={() => this.deleteProduct(product.id)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={(e) => { this.setState({ selectedId: product.id, selectedName: product.name })}}>Edit</button>
                            </td>
                        </tr>
                        
                )
            })
        }
    }

    render(){
        return (
            <div className="products grid-item1">
                <Categories />
                <h3>Products:</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Delete Product</th>
                            <th>Edit Product</th>
                        </tr>
                        {this.displayProducts()}
                    </tbody>
                </table>
                {this.updateProduct}
                <UpdateProduct 
                    productId={this.state.selectedId} 
                    productName={this.state.selectedName}
                />
            </div>
        )
    }
}

export default compose(
    graphql(getProductsQuery, { name: "getProductsQuery" }),
    graphql(deleteProductMutation, { name: "deleteProductMutation" }),
    graphql(deleteCategoryMutation, { name: "deleteCategoryMutation" }))(Products)