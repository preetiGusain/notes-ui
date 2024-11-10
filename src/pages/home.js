import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';

function Home() {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [notesLoading, setNotesloading] = useState(true);
    const [notesLoadingError, setNotesLoadingError] = useState(false);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch("https://notes-api-y7g7.onrender.com/notes");
                if(!response.ok) {
                    throw new Error("Server error");
                }
                const data = await response.json();
                if (data && data.notes) {
                    setNotes(data.notes);
                    setNotesloading(false);
                }
            } catch (error) {
                console.log("Error retrieving notes", error);
                setNotesloading(false);
                setNotesLoadingError(true);
            }
        };
        getNotes();
    }, []);

    return (
        <>
            {notesLoading && <CircularProgress/>}
            <Stack spacing={2}>
                {notes.map((note) => (
                    <Note key={note._id} id={note._id} title={note.title} content={note.content} />
                ))}
                {!notesLoading && !notesLoadingError && notes?.length === 0 && <Alert severity="info">There are no notes. Create some!</Alert>}
                {notesLoadingError && <Alert severity="error">Unable to load notes. Oops!</Alert>}
            </Stack>
            <Fab color="primary" onClick={() => navigate(`/notes/create`)}>
                <AddIcon />
            </Fab>
        </>

    );
}

export default Home;
