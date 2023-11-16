const filterReducer = (state = '', action) => {
    
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