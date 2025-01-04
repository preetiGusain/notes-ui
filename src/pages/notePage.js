import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { backend_uri } from '../constants';

function NotePage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [noteLoading, setNoteLoading] = useState(true);
    const [noteLoadingError, setNoteLoadingError] = useState(false);
    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            try {
                const response = await fetch(`${backend_uri}/notes/${id}`);
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
            const request = new Request(`${backend_uri}/delete/${id}`, {
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

    const handleEditClick = () => {
        setLoadingEdit(true);
        setTimeout(() => {
            navigate(`/edit/${id}`);
            setLoadingEdit(false);
        }, 2000);
    };


    return (
        <div>
            {noteLoading && <CircularProgress />}
            {noteLoadingError && <Alert severity="error">Failed to load note!</Alert>}
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {/* Edit Button */}
                <LoadingButton
                    startIcon={<EditIcon />}
                    variant="outlined"
                    onClick={handleEditClick}
                    loading={loadingEdit}
                    loadingPosition='start'
                >
                    Edit
                </LoadingButton>

                {/* Delete Button */}
                <LoadingButton
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    onClick={() => deleteNote()}
                    disabled={noteLoading || note == null}
                    loading={deleteInProgress}
                    loadingPosition="end"
                >
                    Delete
                </LoadingButton>
            </div>

            {deleteError && <Alert severity="error">Failed to delete note!</Alert>}
        </div>
    );
}
export default NotePage;