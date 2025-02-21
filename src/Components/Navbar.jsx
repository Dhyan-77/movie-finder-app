import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    
  return (
    <nav className='flex flex-col sm:flex-row justify-between items-center p-4 bg-neutral-900' style={{backgroundColor :  "rgba(0, 0, 0, 0.938)"}}>
        <div>
           <Link to="/"><h2 className='text-5xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent hover:from-red-500 hover:to-red-300 transition-all duration-300 tracking-tight hover:scale-105'>Movie Finder</h2></Link>
        </div>

        <div>
            <ul className='flex gap-8 text-white text-2xl'>
                <li>
                    <Link to='/' className='hover:text-red-500 transition-colors duration-300'>Home</Link>
                </li>
                <li>
                    <Link to='/fav' className='hover:text-red-500 transition-colors duration-300'>Favorites</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar