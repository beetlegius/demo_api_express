import { NotFound } from 'http-errors'
import User from './model'

export class UsersController {

  profile(req, res, next) {
    User.findOne(req.user._id)
      .then(user => {
        req.ability.throwUnlessCan('profile', user)

        if (req.method === 'PATCH') user.set(req.body.user)

        return user.save()
      })
      .then(user => res.json(user))
      .catch(next)
  }

  index(req, res, next) {
    req.ability.throwUnlessCan('read', User)
    User.accessibleBy(req.ability)
      .then(users => res.json(users))
      .catch(next)
  }

  show(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (!user) throw new NotFound('User not found')

        req.ability.throwUnlessCan('read', user)
        res.json(user)
      })
      .catch(next)
  }

  create(req, res, next) {
    const user = new User(Object.assign({}, req.body.user, {}))

    req.ability.throwUnlessCan('create', user)
    user.save().catch(next).then( () => res.status(201).json(user) )
  }

  update(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (!user) throw new NotFound('User not found')

        user.set(req.body.user)
        req.ability.throwUnlessCan('update', user)

        return user.save().then( () => user )
      })
      .then(user => res.json(user))
      .catch(next)
  }

  destroy(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (user) {
          req.ability.throwUnlessCan('delete', user)
          return user.remove().then( () => user )
        }
      })
      .then(user => res.sendStatus(204))
      .catch(next)
  }

}
