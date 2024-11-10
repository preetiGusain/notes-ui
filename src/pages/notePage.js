import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function NotePage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch(`https://notes-api-y7g7.onrender.com/notes/${id}`);
                const data = await response.json();
                if (data && data.note) {
                    setNote(data.note);
                }
            } catch (error) {

            }
        };
        getNotes();
    }, []);

    const deleteNote = async () => {
        try {
            const request = new Request(`https://notes-api-y7g7.onrender.com/delete/${id}`, {
                method: "DELETE",
            });

            const response = await fetch(request);
            if(response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.error("note not deleted", error);
        }
    };


    return (
        <div>
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteNote()}>
                Delete
            </Button>
        </div>
    );
}
export default NotePage;