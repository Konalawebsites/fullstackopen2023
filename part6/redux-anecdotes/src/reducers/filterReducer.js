const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      case 'SET_FILTER':
        return action.filterValue
      default:
        return state
    }
  }

export const filterChange = filterValue => {
    return {
      type: 'SET_FILTER',
      filterValue,
    }
}
  
export default filterReducer