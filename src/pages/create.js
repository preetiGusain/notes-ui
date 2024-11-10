import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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
        </>
    );
}

export default Create;
