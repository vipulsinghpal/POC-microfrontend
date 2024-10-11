import React from 'react';

const Header = ({ isUserLoggedIn }) => {
  return (
    <header>
      <h2>{isUserLoggedIn ? 'Welcome, Vipul singh' : 'Please login first'}</h2>
    </header>
  );
};

export default Header;