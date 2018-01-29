import { ExtractJwt, Strategy } from 'passport-jwt'
import { Unauthorized } from 'http-errors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../app/models/user'

let BLANK_JWT

const findUser = (payload, done) => {
  if (payload.anonymous) throw new Unauthorized('Unauthorized')

  User.findOne({ _id: payload.id })
    .then(user => user ? done(null, user) : done(null, false))
    .catch(error => done(error, false))
}

export const configurePassport = (passport, options) => {
  const params = Object.assign({}, options)

  BLANK_JWT = BLANK_JWT || generateJwt(options.secretOrKey, { issuer: options.issuer, audience: options.audience })
  params.jwtFromRequest = req => req.headers.authorization || BLANK_JWT
  passport.use(new Strategy(params, findUser))
}

export const generateJwt = (secret, options) => {
  return jwt.sign(
    { anonymous: true },
    secret,
    Object.assign({ expiresIn: '1365d' }, options)
  )
}
