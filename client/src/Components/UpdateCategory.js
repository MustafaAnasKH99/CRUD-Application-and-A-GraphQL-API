import React from 'react';
import { graphql } from 'react-apollo';
import { updateCategoryMutation , getCategoriesQuery} from '../Queries/Queries'

class UpdateCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            submitted: false
        }
    }

    async excuteUpdate(){
        await this.props.updateCategoryMutation({
            variables:{
                id: this.props.productId,
                name: this.state.name
            },
            refetchQueries:[{query: getCategoriesQuery}]
        })

        this.setState({submitted: true})
    }

    allowUpdate(){
        if(this.props.productId){
            return (
                <div>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})}></input>
                    <button onClick={() => this.excuteUpdate()}>Edit Category</button>
                </div>
            )
        }
        return <h4>click Edit next to a category to edit it</h4>
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

export default graphql(updateCategoryMutation, { name: "updateCategoryMutation" })(UpdateCategory) 