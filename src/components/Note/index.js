import React from 'react';
import Box from '@mui/material/Box';

function Note({title, content}) {
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <h1>{title}</h1>
            <p>{content}</p>
        </Box>
    );
}

export default Note;
