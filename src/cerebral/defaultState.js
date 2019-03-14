export default (store) => ({
  ...store,
  changeHistory: {
    type: false,
    isLoading: false,
    history: [],
  },
})
