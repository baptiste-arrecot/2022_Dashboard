import React, { useContext } from 'react';
import Login from './Components/Routes/Login';
import Home from './Components/Routes/Home';
import AuthCallback from './Components/Routes/AuthCallback';
import ServicesProvider from './Components/Context/ServicesContext';
import { UserContext } from './Components/Context/UserContext';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  const { token } = useContext(UserContext);

  if (!token) {
    return (
        <Login />
    )
  } else {
    return (
        <div className="App">
        <ServicesProvider>
          <BrowserRouter>
              <Routes>
                  <Route index element={<Home />} />
                  <Route path="/auth_callback" element={<AuthCallback />} />
              </Routes>
          </BrowserRouter>
        </ServicesProvider>
        </div>
    );
  }
}

export default App;
