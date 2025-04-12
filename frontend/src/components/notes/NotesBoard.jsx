import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import NoteCard from './NoteCard';
import styles from './NotesBoard.module.scss';

const NotesBoard = () => {
    const [notes, setNotes] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [contextMenu, setContextMenu] = useState(null);

    useEffect(() => {
        fetchNotes();
        fetchCurrentUser();

        const handleContextMenu = (e) => {
            const board = document.getElementById('notes-board');
            if (board && board.contains(e.target)) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
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
        <div id="notes-board"
            className={styles.board}
             onContextMenu={(e) => {
                 e.preventDefault();
                 setContextMenu({ x: e.clientX, y: e.clientY });
             }}
             onClick={() => setContextMenu(null)}>
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isOwner={note.user === userEmail}
                    onRefresh={fetchNotes}
                />
            ))}
            {contextMenu && (
                <div
                    className={styles.contextMenu}
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={async () => {
                        try {
                            await api.post('/notes', {
                                content: '',
                                color: '#4fc3f7',
                                positionX: contextMenu.x,
                                positionY: contextMenu.y,
                                depth: 0
                            });
                            fetchNotes();
                        } catch (e) {
                            console.error('Could not create note', e);
                        } finally {
                            setContextMenu(null);
                        }
                    }}
                >
                    ➕ Create Note
                </div>
            )}
        </div>
    );
};

export default NotesBoard;
