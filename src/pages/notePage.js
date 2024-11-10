import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function NotePage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [noteLoading, setNoteLoading] = useState(true);
    const [noteLoadingError, setNoteLoadingError] = useState(false);
    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await fetch(`https://notes-api-y7g7.onrender.com/notes/${id}`);
                const data = await response.json();
                if (data && data.note) {
                    setNote(data.note);
                    setNoteLoading(false);
                }
            } catch (error) {
                setNoteLoading(false);
                setNoteLoadingError(true);
            }
        };
        getNote();
    }, []);

    const deleteNote = async () => {
        try {
            setDeleteInProgress(true);
            setDeleteError(false);
            const request = new Request(`https://notes-api-y7g7.onrender.com/delete/${id}`, {
                method: "DELETE",
            });

            const response = await fetch(request);
            if (response.ok) {
                setDeleteInProgress(false);
                navigate('/');
            }
        } catch (error) {
            setDeleteInProgress(false);
            setDeleteError(true);
            console.error("note not deleted", error);
        }
    };


    return (
        <div>
            {noteLoading && <CircularProgress />}
            {noteLoadingError && <Alert severity="error">Failed to load note!</Alert>}
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
            <LoadingButton
                startIcon={<DeleteIcon />}
                variant="outlined"
                onClick={() => deleteNote()}
                disabled={noteLoading || note == null}
                loading={deleteInProgress}
                loadingPosition="start"
            >
                Delete
            </LoadingButton>
            {deleteError && <Alert severity="error">Failed to delete note!</Alert>}
        </div>
    );
}
export default NotePage;