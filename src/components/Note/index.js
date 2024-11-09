import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function Note({id, title, content}) {
    const navigate = useNavigate();
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }} onClick={() => navigate(`/notes/${id}`)}>
            <h1>{title}</h1>
            <p>{content}</p>
        </Box>
    );
}

export default Note;
