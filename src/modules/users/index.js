import { UsersController } from './service'

const controller = new UsersController()

export function configure(app) {
  app.get('/users/profile', controller.profile)
  app.patch('/users/profile', controller.profile)

  app.get('/users', controller.index)
  app.post('/users', controller.create)

  app.get('/users/:id', controller.show)
  app.patch('/users/:id', controller.update)
  app.delete('/users/:id', controller.destroy)
}
