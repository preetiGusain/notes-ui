import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function NotePage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [noteLoading, setNoteLoading] = useState(true);
    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch(`https://notes-api-y7g7.onrender.com/notes/${id}`);
                const data = await response.json();
                if (data && data.note) {
                    setNote(data.note);
                    setNoteLoading(false);
                }
            } catch (error) {

            }
        };
        getNotes();
    }, []);

    const deleteNote = async () => {
        try {
            setDeleteInProgress(true);
            const request = new Request(`https://notes-api-y7g7.onrender.com/delete/${id}`, {
                method: "DELETE",
            });

            const response = await fetch(request);
            if (response.ok) {
                setDeleteInProgress(false);
                navigate('/');
            }
        } catch (error) {
            console.error("note not deleted", error);
        }
    };


    return (
        <div>
            {noteLoading && <CircularProgress />}
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
            <LoadingButton
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={() => deleteNote()}
                disabled={noteLoading}
                loading={deleteInProgress}
                loadingPosition="start"
            >
                Delete
            </LoadingButton>
        </div>
    );
}
export default NotePage;