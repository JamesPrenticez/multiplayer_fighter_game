import React from 'react'
import { Link } from "react-router-dom";

function Layout({children}) {
  return (
  <div className='flex justify-center min-w-[445px] p-6'>
    <div className='w-full max-w-7xl'>
    <header>
      <nav className='border-b-2'>
        {/* Left */}
        <h1 className="text-yellow-400 hover:text-yellow-300 text-4xl font-bold w-full text-center">
          <Link to="/">
            Sand Casino
          </Link>
        </h1>

        {/* Right */}
        <div className='font-bold text-xl flex justify-center items-center space-x-8 w-full bg-orange-600 text-white p-2'>
          <p className='border-b-4 border-transparent hover:border-white'>
            <Link to="/">Home</Link>
          </p>
          <p className='border-b-4 border-transparent hover:border-white'>
            <Link to="/login">Login</Link>
          </p>
          <p className='border-b-4 border-transparent hover:border-white'>
            <Link to="/game">Game</Link>
          </p>
          <p className='border-b-4 border-transparent hover:border-white'>
            <Link to="/char">Char</Link>
          </p>
          <p className='border-b-4 border-transparent hover:border-white'>
            <Link to="/chat-room-list">Chat Room</Link>
          </p>
        </div>
      </nav>

    </header>

    <main className='pt-4'>
      {children}
    </main>
    
    <footer></footer>

    </div>
  </div>
  )
}

export default Layout