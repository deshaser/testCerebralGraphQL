import React from 'react'
import PropTypes from 'prop-types'
import { state } from 'cerebral'
import { connect } from '@cerebral/react/index'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import { REGISTRY_HISTORY_TYPE, USER_HISTORY_TYPE } from '../../types/history'
import UserHistory from '../UserHistory/UserHistory'
import RegistryHistory from '../RegistryHistory/RegistryHistory'

import styles from './ChangeHistory.styles'

class ChangeHistory extends React.Component {
  render() {
    const { classes, changeHistory: { isLoading, error, type, history } } = this.props
    return (
      <div>
        { !isLoading && !error && !type && !history.length &&
          <Typography className={classes.title} variant="h5">
            To start click to menu buttons ↑
          </Typography>
        }
        {isLoading &&
          <CircularProgress className={classes.progress} />
        }
        {error &&
          <div>
            <SnackbarContent
              className={classes.snackbar}
              message={
                <div>
                  {error}
                  <br />
                  Login&nbsp;
                  <Link href="https://devsqvr.ru/auth" target="_blank" color="secondary">
                    here
                  </Link>
                  &nbsp;to start to use SQVR GraphQL server in your local development
                </div>
              }
            />
          </div>
        }
        {type === REGISTRY_HISTORY_TYPE &&
          <RegistryHistory list={history} />
        }
        {type === USER_HISTORY_TYPE &&
         <UserHistory list={history} />
        }
      </div>
    )
  }
}

ChangeHistory.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  {
    changeHistory: state`changeHistory`,
  },
  withStyles(styles)(ChangeHistory)
)
