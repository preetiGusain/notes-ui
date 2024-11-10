import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const titleChange = (event) => {
        setTitle(event.target.value);
    }

    const contentChange = (event) => {
        setContent(event.target.value);
    }

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
            />
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => navigate(`/`)}>
                    Delete
                </Button>
                <Button variant="contained" endIcon={<SaveIcon />} >
                    Save
                </Button>
            </Stack>
        </>
    );
}

export default Create;
