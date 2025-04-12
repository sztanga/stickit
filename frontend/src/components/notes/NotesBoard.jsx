import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import NoteCard from './NoteCard';
import styles from './NotesBoard.module.scss';

const NotesBoard = () => {
    const [notes, setNotes] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        fetchNotes();
        fetchCurrentUser();
    }, []);

    const fetchNotes = async () => {
        const res = await api.get('/notes');
        setNotes(res.data);
    };

    const fetchCurrentUser = async () => {
        try {
            const res = await api.get('/me');
            setUserEmail(res.data.email);
        } catch {
            setUserEmail('');
        }
    };

    return (
        <div className={styles.board}>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isOwner={note.user === userEmail}
                    onEdit={() => console.log('Edit', note.id)}
                    onDelete={() => console.log('Delete', note.id)}
                />
            ))}
        </div>
    );
};

export default NotesBoard;
