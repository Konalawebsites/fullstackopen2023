import { useState } from "react"

const FilterForm = ({newFilter, handleFilterChange}) => {
    return (
      <form>
          <div>
            find countries: <input 
            value={newFilter}
            onChange={handleFilterChange}
            />
          </div>
        </form>
    )
  }
export default FilterForm