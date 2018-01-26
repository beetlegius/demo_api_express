import createApp from './app'
import { config } from './config'

createApp().then(app => app.listen(config.port))
