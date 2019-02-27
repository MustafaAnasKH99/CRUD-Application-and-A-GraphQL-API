const graphql = require('graphql')
const _ = require('lodash')
const Product = require('../models/Product')
const Category = require('../models/Category')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql

const ProductObjectType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: {
            type: CategoryObjectType,
            resolve(parent, args){
                // return _.find(products, {id: parent.categoryId})
                return Category.findById(parent.parentCategoryId)
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
                // return _.filter(products, {categoryId: parent.id})
                return Product.find({parentCategoryId: parent.id})
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
            //  return _.find(products, {id: args.id})
                return Product.findById(args.id)
            }
        },

        category: {
            type: CategoryObjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              // code to get data from db
            //  return _.find(categories, {id: args.id})
                return Category.findById(args.id)
            }
        },

        products: {
            type: new GraphQLList(ProductObjectType),
            resolve(parent, args){
              // return products
              return Product.find({})
            }
          },

        categories: {
            type: new GraphQLList(CategoryObjectType),
            resolve(parent, args){
                // return categories
                return Category.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createCategory: {
          type: CategoryObjectType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) }
            },
          async resolve(parent, args){
              let category = await new Category({
                  name: args.name
                });
              return category.save();
            }
        },
        createProduct: {
            type: ProductObjectType,
            args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              parentCategoryId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args){
              let product = await new Product({
                name: args.name,
                parentCategoryId: args.parentCategoryId
              })
              return product.save()
            }
        },
        deleteProduct: {
            type: ProductObjectType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args){
              let deletedProduct = await Product.findByIdAndRemove(args.id)
              if (!deletedProduct) {
                throw new Error('Error')
                }
              return deletedProduct
            }
        },
        deleteCategory: {
            type: CategoryObjectType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args){
              let deletedCategory = await Category.findByIdAndRemove(args.id)
              if (!deletedCategory) {
                throw new Error('Error')
                }
              return deletedCategory
            }
        },
        updateProduct: {
            type: ProductObjectType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) },
              name: { type: GraphQLString },
              parentCategoryId: { type: GraphQLString }
            },
            async resolve(parent, args){
              let updatedProduct = await Product.findByIdAndUpdate(args.id, args)
              if (!updatedProduct) {
                throw new Error('Error')
                }
              return updatedProduct
            }
        },
        updateCategory: {
            type: CategoryObjectType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLID) },
              name: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args){
              let updatedCategory = await Category.findByIdAndUpdate(args.id, args)
              if (!updatedCategory) {
                throw new Error('Error')
                }
              return updatedCategory
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  })