import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Note from './components/Note';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }} >
            <Stack spacing={2}>
              <Note title={'Hello World'} content={'Random note content'} />
              <Note title={'Hello World'} content={'Random note content'} />
              <Note title={'Hello World'} content={'Random note content'} />
            </Stack>
          </Box>
        </Container>
      </header>
    </div>
  );
}

export default App;
