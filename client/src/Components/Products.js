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
                <tr>
                    <td>
                        <p>Loading Products ..</p>
                    </td>
                </tr>
            )

        } else {
            return data.products.map(product => {
                return (
                    <div>
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
                        {this.updateProduct}
                    </div>
                )
            })
        }
    }

    render(){
        return (
            <div className="products">
                <Categories />
                <h2>Products:</h2>
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