import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Layout from './pages/Layout';
import Match from './pages/Match';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="seatch" replace  />} />
        <Route path="login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="search" element={<Search />} />
          <Route path="match" element={<Match />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
