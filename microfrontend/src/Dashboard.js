import React from 'react';
import Header from './Header';
import Button from './Button';

const Dashboard = ({ isUserLoggedIn }) => {
  return (
    <div>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <Button />
    </div>
  );
};

export default Dashboard;