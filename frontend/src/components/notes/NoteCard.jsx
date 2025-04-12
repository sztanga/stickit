import React from 'react';
import styles from './NoteCard.module.scss';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const NoteCard = ({ note, isOwner, onEdit, onDelete, onRefresh }) => {
    const [color, setColor] = useState(note.color || '#fff176');
    const [depth, setDepth] = useState(note.depth || 0);
    const [content, setContent] = useState(note.content || '');
    const [initial, setInitial] = useState({ color, depth, content });
    const [statusMsg, setStatusMsg] = useState(null);
    const [statusType, setStatusType] = useState('success');
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: note.positionX, y: note.positionY });

    const [saving, setSaving] = useState(false);

    const isChanged =
        color !== initial.color || depth !== initial.depth || content !== initial.content;

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.put(`/notes/${note.id}`, {
                content,
                color,
                depth,
                positionX: note.positionX,
                positionY: note.positionY,
            });
            setInitial({ color, depth, content });
            setStatusType('success');
            setStatusMsg('Note saved!');
        } catch (e) {
            setStatusType('error');
            setStatusMsg('Error saving note');
        } finally {
            setSaving(false);
            setTimeout(() => setStatusMsg(null), 2000);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await api.delete(`/notes/${note.id}`);
            onRefresh?.();
        } catch (e) {
            alert('Could not delete note.');
        }
    };

    const isEditable = isOwner;

    return (
        <div
            className={styles.note}
            style={{
                backgroundColor: color,
                transform: `scale(${depth === -1 ? 0.9 : depth === 1 ? 1.1 : 1})`,
                zIndex: 10 + depth,
            }}
        >
            {isEditable && (
                <>
                    <button className={styles.deleteBtn} onClick={handleDelete} title="Delete">
                        🗑️
                    </button>

                    <div className={styles.colorRow}>
                        {['#fff176', '#aed581', '#4fc3f7', '#ff8a65', '#ce93d8'].map((c) => (
                            <div
                                key={c}
                                className={styles.colorCircle}
                                style={{ backgroundColor: c, border: c === color ? '1px solid #000' : '1px solid ' + c }}
                                onClick={() => setColor(c)}
                            >
                                {color === c && <div className={styles.innerDot} />}
                            </div>
                        ))}
                    </div>

                    <div className={styles.depthRow}>
                        {[-1, 0, 1].map((d) => (
                            <div
                                key={d}
                                className={`${styles.depthCircle} ${depth === d ? styles.active : ''}`}
                                onClick={() => setDepth(d)}
                            >
                                {d}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 140))}
                readOnly={!isEditable}
                placeholder="Type here..."
            />

            {isChanged && isEditable && (
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    💾 Save
                </button>
            )}

            <div className={styles.user}>Author: {note.user}</div>

            {statusMsg && (
                <div
                    className={`${styles.toast} ${statusType === 'success' ? styles.success : styles.error}`}
                >
                    {statusMsg}
                </div>
            )}
        </div>
    );
};

export default NoteCard;
