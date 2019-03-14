// This Transport is based on the original work of Kadirahq
// https://github.com/kadirahq/lokka-transport-http
// I Used this to learn about GraphQL - HTTP Transport

import fetch from 'isomorphic-fetch'

function handleErrors(errors, data) {
  const message = errors[0].message
  const error = new Error(`GraphQL Error: ${message}`)
  error.rawError = errors
  error.rawData = data
  throw error
}

export class GraphQLTransport {

  constructor(endpoint, options = {}) {
    if (!endpoint) {
      throw new Error('A graphQL endpoint is required!')
    }

    this._httpOptions = {
      auth: options.auth,
      headers: options.headers || {},
      credentials: options.credentials,
    }
    this.endpoint = endpoint
    this.handleErrors = options.handleErrors || handleErrors
  }

  _buildOptions(payload) {
    const options = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: this._httpOptions.credentials,
    }

    // use delete property for backward compatibility
    if (this._httpOptions.credentials === false) {
      delete options.credentials
    }

    Object.assign(options.headers, this._httpOptions.headers)
    return options
  }

  send(query, variables, operationName) {
    const payload = {query, variables, operationName}
    const options = this._buildOptions(payload)
    return fetch(this.endpoint, options).then(function (response) {
      return response.text()
    }).then(function (responseBody) {
      try {
        return JSON.parse(responseBody)
      } catch (error) {
        return responseBody
      }
    })
  }
}

export default GraphQLTransport
