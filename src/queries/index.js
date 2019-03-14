const GetRegistryHistoryQuery = `query {
  registry {
    ownerships {
      userId,
      firstName,
      lastName,
      avatarUrl,
      isRegistered,
      fullAddress
    }
  }
}
`

const GetUserHistoryQuery = `
  query History($userId: Int) {
    users {
      history(userId: $userId) {
        id,
        body,
        date,
        historyType,
        systemText,
        isRead
      }
     }
  }
`

export {
  GetRegistryHistoryQuery,
  GetUserHistoryQuery,
}

