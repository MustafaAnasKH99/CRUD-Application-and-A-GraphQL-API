import React from 'react';
import { graphql } from 'react-apollo';
import { getProductsQuery } from '../Queries/Queries'

// imported comps
import Categories from './Categories'

class Products extends React.Component{
    displayProducts(){
        const data = this.props.data
        if(data.loading){
            return (
                <tr>
                    <td>
                        <p>data loading</p>
                    </td>
                </tr>
            )

        } else {
            return data.products.map(product => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                    </tr>
                )
            })
        }
    }

    render(){
        console.log(this.props)
        // this won't work YET because graphql runs on a different server
        // so we need to install something on our express graphql server
        // to let it accept requests from another server (the client one)
        // console.log(this.props)
        return (
            <div className="products">
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
                <Categories />
            </div>
        )
    }
}

export default graphql(getProductsQuery)(Products)