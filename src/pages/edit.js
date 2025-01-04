import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { backend_uri } from '../constants'

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [saveError, setSaveError] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`${backend_uri}/notes/${id}`);
                const data = await response.json();
                if (data && data.note) {
                    setTitle(data.note.title);
                    setContent(data.note.content);
                }
            } catch (error) {
                console.error('Failed to load note for editing', error);
            }
        };

        fetchNote();
    }, [id]);

    const handleSave = async () => {
        try {
            setSaveError(false);
            setSaveInProgress(true);

            const request = new Request(`${backend_uri}/edit/${id}`, {
                method: "PUT",
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
                navigate(`/`);
            } else {
                setSaveInProgress(false);
                setSaveError(true);
            }
        } catch (error) {
            setSaveInProgress(false);
            setSaveError(true);
            console.error("Error saving note", error);
        }
    };

    return (
        <div>
            <h2>Edit Note</h2>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="filled"
                fullWidth
                disabled={saveInProgress}
                margin="normal"
            />

            <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="filled"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                disabled={saveInProgress}
            />

            <Stack direction="row" spacing={2} style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <LoadingButton
                        endIcon={<SaveIcon />}
                        variant="contained"
                        onClick={handleSave}
                        loading={saveInProgress}
                        loadingPosition="end"
                        disabled={saveInProgress}
                    >
                        Save
                    </LoadingButton>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/notes/${id}`)}
                        disabled={saveInProgress}
                    >
                        Cancel
                    </Button>
                </div>
            </Stack>

            {saveError && <Alert severity="error">Failed to save changes!</Alert>}
        </div>
    );
}

export default Edit;
