import uuid from 'uuid'
import GraphQLTransport from './graphQLTransport'

export {default as query} from './query';

export default function GraphQLProviderFactory (options = { payload: {} }) {
  if(!options.graphURL){
    throw new Error('A valid GraphQL endoint is required')
  }

  const gqlTransport = new GraphQLTransport(options.graphURL, options.options)
  const fragments = {}

  const createFragment = (fragment) => {
    if (!fragment) {
      throw new Error('fragment is required!')
    }

    const name = 'f' + uuid.v4().replace(/-/g, '')
    const fragmentWithName = fragment.replace('fragment', `fragment ${name}`)
    fragments[name] = fragmentWithName
    return name
  }

  const findFragments =(queryOrFragment, fragmentsMap = {}) => {
    const matched = queryOrFragment.match(/\.\.\.[A-Za-z0-9]+/g)
    if (matched) {
      const fragmentNames = matched.map(name => name.replace('...', ''))
      fragmentNames.forEach(name => {
        const fragment = fragments[name]
        if (!fragment) {
          throw new Error(`There is no such fragment: ${name}`)
        }

        fragmentsMap[name] = fragment
        findFragments(fragment, fragmentsMap)
      })
    }

    const fragmentsArray = Object.keys(fragmentsMap).map(key => {
      return fragmentsMap[key]
    })
    return fragmentsArray
  }

  const query = (query, vars = {}) => {
    const fragments = findFragments(query)
    const queryWithFragments = `${query}\n${fragments.join('\n')}`

    return gqlTransport.send(queryWithFragments, vars)
      .then(result => result )
  }

  const mutate = (query, vars = {}) => {
    return gqlTransport.send(query, vars)
      .then(result => result )
  }

  let cachedProvider = null

  function GraphQLProvider (context) {
    if (cachedProvider) {
      context.graphQL = cachedProvider
    } else {
      context.graphQL = cachedProvider = {
        query,
        mutate,
        createFragment,
      }
    }

    if (context.debugger) {
      context.debugger.wrapProvider('graphQL')
    }

    return context
  }

  return GraphQLProvider
}
