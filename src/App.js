import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import NotePage from './pages/notePage';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Create from './pages/create';
import  Edit  from './pages/edit';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/create" element={<Create />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Box>
    </Container>

  );
}

export default App;
