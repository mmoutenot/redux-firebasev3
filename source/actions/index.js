import * as authActions from './auth'
import * as connectionActions from './connection'
import * as queryActions from './query'

export { authActions, queryActions, connectionActions }
export default Object.assign({}, authActions, queryActions, connectionActions)
