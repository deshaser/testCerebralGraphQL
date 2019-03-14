import { state } from 'cerebral'

import { REGISTRY_HISTORY_TYPE, USER_HISTORY_TYPE } from '../types/history'
import { GetRegistryHistoryQuery, GetUserHistoryQuery } from '../queries'

const getHistory = ({ graphQL, props, path }) => {
  const getErrors = (errors) => {
    if (errors && errors.length) {
      return errors[0]
    }
  }
  switch (props.type) {
    case REGISTRY_HISTORY_TYPE:
      return graphQL.query(GetRegistryHistoryQuery)
        .then((result) => {
          const error = getErrors(result.errors)
          if (error) {
            return path.error({ error })
          }
          if (!result.data || !result.data.registry || !result.data.registry.ownerships) {
            return path.error({error: 'No data available'})
          }
          return path.success({ result: result.data.registry.ownerships })
        })
    case USER_HISTORY_TYPE:
      return graphQL.query(GetUserHistoryQuery, props)
        .then((result) => {
          const error = getErrors(result.errors)
          if (error) {
            return path.error({ error })
          }
          if (!result.data || !result.data.users || !result.data.users.history) {
            return path.error({error: 'No data available'})
          }
          return path.success({ result: result.data.users.history })
        })
    default:
      break
  }
}

const setLoading = ({ store, props }) => {
  store.set(state.changeHistory.isLoading, true)
  store.set(state.changeHistory.type, props.type)
  store.set(state.changeHistory.error, null)
  store.set(state.changeHistory.history, [])
}

const get = (params) => {
  return getHistory(params)
    .catch((error) => {
      return params.path.error({error: error.message})
    })
}

const success = ({ store, props }) => {
  store.set(state.changeHistory.history, props.result)
}

const error = ({ store, props }) => {
  store.set(state.changeHistory.error, props.error.message)
}

const unsetLoading = ({ store }) => {
  store.set(state.changeHistory.isLoading, false)
}

export default [
  setLoading,
  get,
  {
    success,
    error,
  },
  unsetLoading,
]
