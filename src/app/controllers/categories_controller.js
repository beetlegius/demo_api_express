import { NotFound } from 'http-errors'
import Category from '../models/category'
import mongoose from 'mongoose'

export class CategoriesController {

  static index(req, res, next) {
    req.ability.throwUnlessCan('read', Category)
    Category.accessibleBy(req.ability)
      .then(categories => res.json(categories))
      .catch(next)
  }

  static show(req, res, next) {
    const query = mongoose.Types.ObjectId.isValid(req.params.id) ? { _id: req.params.id } : { slug: req.params.id }
    Category.findOne(query)
      .then(category => {
        if (!category) throw new NotFound('Category not found')

        req.ability.throwUnlessCan('read', category)
        res.json(category)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const category = new Category(Object.assign({}, req.body.category, { user_id: req.user._id }))

    req.ability.throwUnlessCan('create', category)
    category.save().catch(next).then(category => res.status(201).json(category))
  }

  static update(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .then(category => {
        if (!category) throw new NotFound('Category not found')

        category.set(req.body.category)
        req.ability.throwUnlessCan('update', category)

        return category.save().then( () => category )
      })
      .then(category => res.json(category))
      .catch(next)
  }

  static destroy(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .then(category => {
        if (category) {
          req.ability.throwUnlessCan('delete', category)
          return category.remove().then( () => category )
        }
      })
      .then(category => res.sendStatus(204))
      .catch(next)
  }

}
