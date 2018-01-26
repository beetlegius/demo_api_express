import { NotFound } from 'http-errors'
import Product from './model'
import Category from '../categories/model'
import mongoose from 'mongoose'

export class ProductsController {

  index(req, res, next) {
    req.ability.throwUnlessCan('read', Product)

    Category.findOne(mongoose.Types.ObjectId.isValid(req.params.category_id) ? { _id: req.params.category_id } : { slug: req.params.category_id })
      .then(category => (category ? Product.find({ category_id: category._id }) : Product.find()).accessibleBy(req.ability))
      .then(products => res.json(products))
      .catch(next)

  }

  show(req, res, next) {
    const query = mongoose.Types.ObjectId.isValid(req.params.id) ? { _id: req.params.id } : { slug: req.params.id }
    Product.findOne(query)
      .then(product => {
        if (!product) throw new NotFound('Product not found')

        req.ability.throwUnlessCan('read', product)
        res.json(product)
      })
      .catch(next)
  }

  create(req, res, next) {
    const product = new Product(Object.assign({}, req.body.product, {}))

    req.ability.throwUnlessCan('create', product)
    product.save().catch(next).then( () => res.status(201).json(product) )
  }

  update(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then(product => {
        if (!product) throw new NotFound('Product not found')

        product.set(req.body.product)
        req.ability.throwUnlessCan('update', product)

        return product.save().then( () => product )
      })
      .then(product => res.json(product))
      .catch(next)
  }

  destroy(req, res, next) {
    Product.findOne({ _id: req.params.id })
      .then(product => {
        if (product) {
          req.ability.throwUnlessCan('delete', product)
          return product.remove().then( () => product )
        }
      })
      .then(product => res.sendStatus(204))
      .catch(next)
  }

}
