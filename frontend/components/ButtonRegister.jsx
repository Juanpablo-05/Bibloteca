import React from 'react'
import { Link } from 'react-router-dom'

function ButtonRegister( { link, name } ) {
  return (
    <Link to={link} className='btn-registrar'>
        Agregar {name}
    </Link>
  )
}

export default ButtonRegister