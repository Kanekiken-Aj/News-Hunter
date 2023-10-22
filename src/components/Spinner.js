// import React, { Component } from 'react'
import loading from '../loading.gif'

const Spinner = ()=>  {
  
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{ maxWidth: '50px', maxHeight: '50px' }} />
      </div>
    )
}

export default Spinner
