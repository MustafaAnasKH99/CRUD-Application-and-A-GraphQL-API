import React from 'react';
import { graphql } from 'react-apollo';
import { getProductsQuery, updateProductMutation } from '../Queries/Queries'

class UpdateProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            submitted: false
        }
    }

    async excuteUpdate(){
        await this.props.updateProductMutation({
            variables:{
                id: this.props.productId,
                name: this.state.name
            },
            refetchQueries:[{query: getProductsQuery}]
        })

        this.setState({submitted: true})
    }

    allowUpdate(){
        if(this.props.productId){
            return (
                <div>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})}></input>
                    <button onClick={() => this.excuteUpdate()}>Edit Product</button>
                </div>
            )
        }
        return <h4>click Edit next to a product to edit it</h4>
    }
    render(){
        console.log(this.props)
        return (
            <div className="update-product">
                {this.allowUpdate()}
            </div>
        )
    }   
}

export default graphql(updateProductMutation, { name: "updateProductMutation" })(UpdateProduct) 