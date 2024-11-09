import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Note from '../components/Note';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

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
        <>
            <Stack spacing={2}>
                {notes.map((note) => (
                    <Note key={note._id} id={note._id} title={note.title} content={note.content} />
                ))}
            </Stack>
            <Fab color="primary" onClick={() => navigate(`/notes/create`)}>
                <AddIcon />
            </Fab>
        </>

    );
}

export default Home;
