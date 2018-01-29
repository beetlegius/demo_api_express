// llamada a los módulos base
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { mongoosePlugin as abilitiesPlugin } from 'casl'

// llamada a los módulos propios generales
import { config } from './config'
import { errorHandler } from './lib/error-handler'

export default () => {
  // declaración de la app y del router
  const app = express()
  const router = express.Router()

  // abilities
  mongoose.plugin(abilitiesPlugin)
  // parser form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))
  // parser json
  app.use(bodyParser.json())
  // morgan logs
  app.use(morgan('dev'))

  const routes = require('./routes')
  routes.configure(app)

  // manejo de errores
  app.use(errorHandler)

  // configuración de promises para mongoose
  mongoose.Promise = global.Promise
  // conexión a la base de datos y launch de la app
  return mongoose.connect(config.database.url, config.database.options).then( () => app )
}
