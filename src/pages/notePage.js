import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NotePage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);

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

    return (
        <div>
            <h1>{note?.title}</h1>
            <p>{note?.content}</p>
        </div>
    );
}
export default NotePage;