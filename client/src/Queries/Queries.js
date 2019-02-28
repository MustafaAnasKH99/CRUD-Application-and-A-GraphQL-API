import { gql } from 'apollo-boost'

const getCategoriesQuery = gql`
    {
        categories{
            name,
            id
        }
    }
`

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

const createProductMutation = gql`
mutation($name: String!, $parentCategoryId: ID!){
    createProduct(name: $name, parentCategoryId: $parentCategoryId){
        name
        id
    }
}
`

const createCategoryMutation = gql`
mutation($name: String!){
    createCategory(name: $name){
        name
        id
    }
}
`

export { getProductsQuery, getCategoriesQuery, createProductMutation, createCategoryMutation } 