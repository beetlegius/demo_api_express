import User from '../models/user'
import { BadRequest, Unauthorized } from 'http-errors'
import jwt from 'jsonwebtoken'
import { config } from '../../config'

export class SessionsController {

  static create(req, res, next) {
    const { email, password } = req.body.user || {}

    if (!email || !password) throw new BadRequest('Please specify "email" and "password" fields is "user" object')
    User.findOne({ email: email })
      .then(user => {
        user.isValidPassword(password).then(result => {
          if (!result) throw new Unauthorized('Unauthorized')

          const accessToken = jwt.sign({ id: user.id }, config.jwt.secret, config.jwt.options)
          res.status(201).json({ auth_token: accessToken })
        })
        .catch(next)
      })
      .catch(next)
  }

}
