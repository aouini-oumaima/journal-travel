import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar({ setTitle }) {
  const [toggle, setToggle] = useState(true);

  return (
    <Fragment>
      <nav className={toggle ? '' : 'navBarColor'}>
        <div className='nav-options'>
          <h1 id={toggle ? '' : 'heading'}>Tunisian Escapes</h1>
          <NavLink
            to='/shared'
            style={({ isActive }) => {
              return { color: isActive ? '#fff' : '#EE9B00' };
            }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>inspirations</span>
          </NavLink>
          <NavLink
            to='/profile' 
            style={({ isActive }) => {
              return { color: isActive ? '#fff' : '#EE9B00' };
            }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Profile</span> 
          </NavLink>
          <NavLink
            to='/categories'
            style={({ isActive }) => {
              return { color: isActive ? '#fff' : '#EE9B00' };
            }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Categories</span>
          </NavLink>
          <NavLink
            to='/saved'
            style={({ isActive }) => {
              return { color: isActive ? '#fff' : '#EE9B00' };
            }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>favorites</span>
          </NavLink>
        </div>
        <div className='input-group'>
          <div className='form-outline'>
            <input
              type='search'
              id='form1'
              className='form-control'
              placeholder='Search'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
            <div
              id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}
            ></div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
