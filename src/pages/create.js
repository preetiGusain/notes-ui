import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { backend_uri } from '../constants';

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const navigate = useNavigate();

    const titleChange = (event) => {
        setTitle(event.target.value);
    }

    const contentChange = (event) => {
        setContent(event.target.value);
    }

    const saveNotes = async () => {
        try {
            setSaveError(false);
            setSaveInProgress(true);
            const request = new Request(`${backend_uri}/save`, {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    content: content
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const response = await fetch(request);
            if (response.ok) {
                setSaveInProgress(false);
                navigate('/');
            }
        } catch (error) {
            setSaveInProgress(false);
            setSaveError(true);
            console.error("note not saved", error);
        }
    };

    return (
        <>
            <h2>Create Note</h2>
            <TextField
                id="title-input"
                label="Title"
                value={title}
                onChange={titleChange}
                variant="filled"
                fullWidth
                disabled={saveInProgress}
            />

            <TextField
                id="content-input"
                label="Content"
                value={content}
                onChange={contentChange}
                multiline
                placeholder="Enter your note content here"
                variant="filled"
                fullWidth
                margin="normal"
                disabled={saveInProgress}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => navigate(`/`)} disabled={saveInProgress}>
                    Delete
                </Button>
                <LoadingButton
                    endIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => saveNotes()}
                    loading={saveInProgress}
                    loadingPosition="end"
                >
                    Save
                </LoadingButton>
            </Stack>
            {saveError && <Alert severity="error">Failed to save note!</Alert>}
        </>
    );
}

export default Create;
