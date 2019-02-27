import React from 'react';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo';
// imported comps
import Categories from './Categories'

const getProductsQuery = gql`
    {
        products{
            name, 
            id,
            category{
                name
            }
        }
    }
`

class Products extends React.Component{
    displayProducts(){
        const data = this.props.data
        if(data.loading){
            return <div>Data is loading ...</div>
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
                    <tr>
                        <th>Product Name</th>
                        <th>Category Name</th>
                    </tr>
                        {this.displayProducts()}
                </table>
                {/* <Categories /> */}
            </div>
        )
    }
}

export default graphql(getProductsQuery)(Products)