import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

const RemoteDashboard = React.lazy(() => import('microfrontend/Dashboard'));



const App = () => {
  const isUserLoggedIn = true; 

  return(
    <div>
    <h1>Container Application</h1>
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <RemoteDashboard isUserLoggedIn={isUserLoggedIn} /> 
    </Suspense>
  </div>
);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
