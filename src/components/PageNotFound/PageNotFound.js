import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

class PageNotFound extends Component {
  render() {
    return (
      <Typography variant="h1">
        Page not found. Please start to search from {<Link to="/">main</Link>}
      </Typography>
    )
  }
}

export default PageNotFound
