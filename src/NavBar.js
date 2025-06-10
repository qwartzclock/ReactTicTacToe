import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function NavBar(){
    return (
        <>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="tictactoe">Tic-Tac-Toe</Link></li>
            </ul>

            <Outlet/>
        </>
    )
}

export default NavBar