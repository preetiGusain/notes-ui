import React, { useEffect, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Note from './components/Note';

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch("https://notes-api-y7g7.onrender.com/notes");
        const data = await response.json();
        console.log(data);
        if (data && data.notes && data.notes.length > 0) {
          setNotes(data.notes);
        }
      } catch (error) {
        console.log("Error retrieving notes");
      }
    };
    getNotes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }} >
            <Stack spacing={2}>
              {notes.map((note) => (
                <Note key={note._id} title={note.title} content={note.content} />
              ))}
            </Stack>
          </Box>
        </Container>
      </header>
    </div>
  );
}

export default App;
