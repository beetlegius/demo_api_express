import { ProductsController } from './service'

const controller = new ProductsController()

export function configure(app) {
  app.get('/categories/:category_id/products', controller.index)
  app.get('/products', controller.index)
  app.post('/products', controller.create)

  app.get('/products/:id', controller.show)
  app.patch('/products/:id', controller.update)
  app.delete('/products/:id', controller.destroy)
}
