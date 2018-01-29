import { SessionsController, CategoriesController, ProductsController, UsersController } from './app/controllers'
import passport from 'passport'
import { configurePassport } from './lib/jwt'
import { createAbilities } from './lib/abilities'
import { config } from './config'

export function configure(app) {

  app.post('/authenticate', SessionsController.create)

  configurePassport(passport, { secretOrKey: config.jwt.secret })
  app.use(passport.initialize())
  app.use(passport.authenticate('jwt', { session: false }), createAbilities)

  app.get('/users/profile', UsersController.profile)
  app.patch('/users/profile', UsersController.profile)
  app.get('/users', UsersController.index)
  app.post('/users', UsersController.create)
  app.get('/users/:id', UsersController.show)
  app.patch('/users/:id', UsersController.update)
  app.delete('/users/:id', UsersController.destroy)

  app.get('/categories/:category_id/products', ProductsController.index)
  app.get('/products', ProductsController.index)
  app.post('/products', ProductsController.create)
  app.get('/products/:id', ProductsController.show)
  app.patch('/products/:id', ProductsController.update)
  app.delete('/products/:id', ProductsController.destroy)

  app.get('/categories', CategoriesController.index)
  app.post('/categories', CategoriesController.create)
  app.get('/categories/:id', CategoriesController.show)
  app.patch('/categories/:id', CategoriesController.update)
  app.delete('/categories/:id', CategoriesController.destroy)

}
