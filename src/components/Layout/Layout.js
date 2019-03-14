import React from 'react'
import PropTypes from 'prop-types'
import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import { REGISTRY_HISTORY_TYPE, USER_HISTORY_TYPE } from '../../types/history'
import ChangeHistory from '../ChangeHistory/ChangeHistory'

import styles from './Layout.styles'

const TABS = [
  {
    type: REGISTRY_HISTORY_TYPE,
    name: 'Registry History',
  },
  {
    type: USER_HISTORY_TYPE,
    name: 'User History',
  },
]

class Layout extends React.Component {
  handleChange = (event, type) => {
    this.props.getHistory({
      type,
      userId: 3182,
    })
  }

  render() {
    const { classes, historyType } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
            <Typography variant="h6" color="inherit" className={classes.title}>
              SQVR Test
            </Typography>
            <Tabs value={historyType} onChange={this.handleChange}>
              {TABS.map((tab) =>
                <Tab
                  key={tab.type}
                  value={tab.type}
                  label={tab.name}
                />
              )}
            </Tabs>
        </AppBar>
        <ChangeHistory />
      </div>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(
  {
    historyType: state`changeHistory.type`,
    getHistory: sequences`getHistory`,
  },
  withStyles(styles)(Layout)
)
