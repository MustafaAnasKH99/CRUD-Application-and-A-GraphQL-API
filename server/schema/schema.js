const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql


// the dummies
const products = [
    {id: "1", name: "batata", categoryId: "3"},
    {id: "2", name: "pizza", categoryId: "3"},
    {id: "3", name: "makdoos", categoryId: "3"}
]
// the dummies
const categories = [
    {id: "1", name: "yummy"},
    {id: "2", name: "aargh"},
    {id: "3", name: "meh"}
]



const ProductObjectType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: {
            type: CategoryObjectType,
            resolve(parent, args){
                return _.find(products, {id: parent.categoryId})
            }
        }
    })
})

const CategoryObjectType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductObjectType),
            resolve(parent, args){
                return _.filter(products, {categoryId: parent.id})
            }
        }, 
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType', // this is a root query that you will export
    fields: {
        product:{
            type: ProductObjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              // code to get data from db
             return _.find(products, {id: args.id})
            }
        },

        category: {
            type: CategoryObjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              // code to get data from db
             return _.find(categories, {id: args.id})

            }
        },

        categories: {
            type: new GraphQLList(CategoryObjectType),
            resolve(parent, args){
                return categories
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
  })