import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

class UserHistory extends React.Component {
  render() {
    return (
      <List>
        {this.props.list.map((item) =>
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.historyType}
                secondary={item.systemText}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        )}
      </List>
    )
  }
}

UserHistory.propTypes = {
  list: PropTypes.array,
}

export default UserHistory
