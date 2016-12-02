import {fromJS} from 'immutable'
import {
  SET,
  SET_PROFILE,
  SET_CONNECTED,
  LOGIN,
  LOGOUT,
  LOGIN_ERROR,
  NO_VALUE,
  AUTHENTICATION_INIT_STARTED,
  AUTHENTICATION_INIT_FINISHED,
  UNAUTHORIZED_ERROR
} from './constants'

const emptyState = {
  auth: undefined,
  authError: undefined,
  profile: undefined,
  isConnected: undefined,
  isInitializing: undefined,
  isEmailVerified: undefined,
  data: {}
}

const initialState = fromJS(emptyState)

const pathToArr = path => path.split(/\//).filter(p => !!p)

export default (state = initialState, action = {}) => {
  const { path } = action
  let pathArr
  let retVal

  switch (action.type) {

    case SET:
      const { data } = action
      pathArr = pathToArr(path)

      retVal = (data !== undefined)
        ? state.setIn(['data', ...pathArr], fromJS(data))
        : state.deleteIn(['data', ...pathArr])

      return retVal

    case NO_VALUE:
      pathArr = pathToArr(path)
      retVal = state.setIn(['data', ...pathArr], fromJS({}))
      return retVal

    case SET_CONNECTED:
      const {isConnected} = action;
      return state.setIn(['isConnected'], isConnected)

    case SET_PROFILE:
      const {profile} = action
      return (profile !== undefined)
        ? state.setIn(['profile'], fromJS(profile))
        : state.deleteIn(['profile'])

    case LOGOUT:
      return fromJS({
        auth: null,
        authError: null,
        profile: null,
        isEmailVerified: null,
        isLoading: false,
        data: {}
      })

    case LOGIN:
      return state.setIn(['auth'], fromJS(action.auth))
        .setIn(['authError'], null)
        .setIn(['isEmailVerified'], action.auth.emailVerified)

    case 'auth/set-is-email-verified':
      return state.setIn(['isEmailVerified'], action.isEmailVerified)

    case LOGIN_ERROR:
      return state
        .setIn(['authError'], action.authError)
        .setIn(['auth'], null)
        .setIn(['profile'], null)

    case AUTHENTICATION_INIT_STARTED:
      return initialState.setIn(['isInitializing'], true)
    // return state.setIn(['isInitializing'], true) // throws state.setIn not a function error

    case AUTHENTICATION_INIT_FINISHED:
      return state.setIn(['isInitializing'], false)

    case UNAUTHORIZED_ERROR:
      return state.setIn(['authError'], action.authError)

    default:
      return state

  }
}
