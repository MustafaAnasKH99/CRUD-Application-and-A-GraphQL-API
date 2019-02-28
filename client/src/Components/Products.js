import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getProductsQuery, deleteProductMutation, deleteCategoryMutation } from '../Queries/Queries'

// imported comps
import Categories from './Categories'

class Products extends React.Component{
    deleteProduct(id){
        this.props.deleteProductMutation({
            variables:{
                id: id
            },
            refetchQueries:[{query: getProductsQuery}]
        }) 
    }

    updateProduct(id){
        console.log(id)
    }

    displayProducts=()=>{
        const data = this.props.getProductsQuery
        if(data.loading){
            return (
                <tr>
                    <td>
                        <p>Data Loading ..</p>
                    </td>
                </tr>
            )

        } else {
            return data.products.map(product => {
                return (
                    <tr key={product.id}>
                        <td>
                            {product.name}
                            <button onClick={() => this.deleteProduct(product.id)}>Delete</button>
                            <button onClick={() => this.updateProduct(product.id)}>Edit</button>
                        </td>
                        <td>
                            {product.category.name}
                        </td>
                    </tr>
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
                        </tr>
                        {this.displayProducts()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default compose(
    graphql(getProductsQuery, { name: "getProductsQuery" }),
    graphql(deleteProductMutation, { name: "deleteProductMutation" }),
    graphql(deleteCategoryMutation, { name: "deleteCategoryMutation" }) 
)(Products)