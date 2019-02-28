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
                name,
                id
            }
        }
    }
`

const getProductQuery = gql`
query($id: ID){
    product(id: $id){
        id,
        name
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

const deleteProductMutation = gql`
mutation($id: ID!){
    deleteProduct(id: $id){
        name
        id
    }
}
`
const deleteCategoryMutation = gql`
mutation($id: ID!){
    deleteCategory(id: $id){
        name
        id
    }
}
`

const updateCategoryMutation = gql`
mutation($id: ID!, $name: String!){
    updateCategory(id: $id, name: $name){
        name
        id
    }
}
`

const updateProductMutation = gql`
mutation($id: ID!, $name: String!){
    updateProduct(id: $id, name: $name){
        name
        id
    }
}
`

export { getProductsQuery, 
        getCategoriesQuery, 
        createProductMutation, 
        createCategoryMutation, 
        deleteProductMutation, 
        deleteCategoryMutation,
        updateProductMutation,
        updateCategoryMutation,
        getProductQuery } 
    