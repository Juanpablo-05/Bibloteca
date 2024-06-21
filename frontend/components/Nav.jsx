import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className="nav-home">
          <ul className="nav__ul">
            <li>
              <Link to={"/home/usuarios"} className="li-items">
                Usuarios
              </Link>
              <span className="barra"></span>
            </li>
            <li>
              <Link to={"/home/libros"} className="li-items">
                Libros
              </Link>
              <span className="barra"></span>
            </li>
            <li>
              <Link to={"/home/prestamos"} className="li-items">
                prestamos
              </Link>
              <span className="barra"></span>
            </li>
          </ul>
        </nav>
  )
}

export default Nav