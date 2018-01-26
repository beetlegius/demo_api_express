import { NotFound } from 'http-errors'
import Category from './model'

export class CategoriesController {

  index(req, res, next) {
    req.ability.throwUnlessCan('read', Category)
    Category.accessibleBy(req.ability)
      .then(categories => res.json(categories))
      .catch(next)
  }

  show(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .then(category => {
        if (!category) throw new NotFound('Category not found')

        req.ability.throwUnlessCan('read', category)
        res.json(category)
      })
      .catch(next)
  }

  create(req, res, next) {
    const category = new Category(Object.assign({}, req.body.category, { user_id: req.user._id }))

    req.ability.throwUnlessCan('create', category)
    category.save().catch(next).then( () => res.status(201).json(category) )
  }

  update(req, res, next) {
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

  destroy(req, res, next) {
    Category.findOne({ _id: req.params.id })
      .then(category => {
        if (category) {
          req.ability.throwUnlessCan('delete', category)
          return category.remove().then( () => category )
        }
      })
      .then(category => res.status(204).send())
      .catch(next)
  }

}
