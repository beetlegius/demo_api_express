import { config } from '../../config'
import passport from 'passport'
import { configurePassport } from './jwt'
import { SessionsController } from './service'
import { createAbilities } from './abilities'

const controller = new SessionsController()

export function configure(app) {
  app.post('/authenticate', controller.create)

  configurePassport(passport, { secretOrKey: config.jwt.secret })
  app.use(passport.initialize())
  app.use(passport.authenticate('jwt', { session: false }), createAbilities)
}
