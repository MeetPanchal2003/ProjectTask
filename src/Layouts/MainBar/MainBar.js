import React from 'react'
import './MainBar.css'
import DisplayVendors from '../../Module/DisplayVendors/DisplayVendors'
function MainBar() {
  return (
    <div className='MainBarArea px-2'>
      <DisplayVendors/>
    </div>
  )
}

export default MainBar
