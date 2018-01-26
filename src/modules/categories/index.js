import { CategoriesController } from './service'

const controller = new CategoriesController()

export function configure(app) {
  app.get('/categories', controller.index)
  app.post('/categories', controller.create)

  app.get('/categories/:id', controller.show)
  app.patch('/categories/:id', controller.update)
  app.delete('/categories/:id', controller.destroy)
}
