import { ForbiddenError } from 'casl'
import { HttpError, Unauthorized } from 'http-errors'

const toJSON = (err, options = {}) => {
  const object = typeof err.toJSON === 'function'
    ? err.toJSON()
    : { error: err.message, stack: err.stack }

  if (!options.withStack) object.stack = undefined

  return object
}

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ForbiddenError) return res.status(403).json({ error: error.message })

  let statusCode = error instanceof HttpError ? error.statusCode : 500

  if (error.errors) statusCode = 400

  res.status(statusCode).send(toJSON(error, { withStack: req.app.get('env') === 'development' }))
}
