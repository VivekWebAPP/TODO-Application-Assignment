import React from 'react';
import GlobalStyle from './global'
import ContextProviders from './contextProviders';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CategoriePage from './Pages/Categorie';
import ProtectedRoute from './Routes/Route';
import Sigin from './Pages/Sigin';
import Task from './Pages/Task';

function App() {
  return (
    <ContextProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute priv={true}><Home /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute priv={false}><Login /></ProtectedRoute>} />
          <Route path="/sigin" element={<ProtectedRoute priv={false}><Sigin /></ProtectedRoute>} />
          <Route path='/categorie/:name' element={<ProtectedRoute priv={true}><CategoriePage /></ProtectedRoute>}></Route>
          <Route path='/project/:projectId' element={<ProtectedRoute priv={true}><Task /></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </ContextProviders>

  );
}

export default App;
