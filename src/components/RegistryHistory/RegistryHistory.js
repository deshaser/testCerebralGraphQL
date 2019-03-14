import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'

class RegistryHistory extends React.Component {
  render() {
    return (
      <List>
        {this.props.list.map((item) =>
          <React.Fragment key={item.userId}>
            <ListItem>
              <Avatar>
                <img src={item.avatarUrl} alt="" />
              </Avatar>
              <ListItemText
                primary={`${item.firstName} ${item.lastName}`}
                secondary={item.fullAddress}
              />
            </ListItem>
            <Divider variant="inset" />
          </React.Fragment>
        )}
      </List>
    )
  }
}

RegistryHistory.propTypes = {
  list: PropTypes.array,
}

export default RegistryHistory
