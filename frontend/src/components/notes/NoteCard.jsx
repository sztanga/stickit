import React from 'react';
import styles from './NoteCard.module.scss';
import { useEffect, useState, useRef } from 'react';
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
    const finalPos = useRef({ x: note.positionX, y: note.positionY });

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
            className={styles.draggableWrapper}
            style={{
                left: position.x,
                top: position.y,
                position: 'absolute',
                cursor: isOwner ? 'grab' : 'default',
            }}
            onMouseDown={(e) => {
                if (!isOwner) return;

                const startX = e.clientX;
                const startY = e.clientY;
                const startPos = {...position};

                setDragging(true);

                const handleMove = (moveEvent) => {
                    const dx = moveEvent.clientX - startX;
                    const dy = moveEvent.clientY - startY;
                    const board = document.getElementById('notes-board');
                    const boardRect = board.getBoundingClientRect();

                    let newX = startPos.x + dx;
                    let newY = startPos.y + dy;

                    newX = Math.max(0, Math.min(newX, boardRect.width - 250));
                    newY = Math.max(0, Math.min(newY, boardRect.height - 250));

                    setPosition({ x: newX, y: newY });

                    finalPos.current = { x: newX, y: newY };
                    setPosition({ x: newX, y: newY });
                };

                const handleUp = async () => {
                    setDragging(false);
                    document.removeEventListener('mousemove', handleMove);
                    document.removeEventListener('mouseup', handleUp);

                    try {
                        await api.put(`/notes/${note.id}`, {
                            content,
                            color,
                            depth,
                            positionX: finalPos.current.x,
                            positionY: finalPos.current.y,
                        });
                        setStatusType('success');
                        setStatusMsg('Position updated');
                        setInitial({ color, depth, content });
                    } catch {
                        setStatusType('error');
                        setStatusMsg('Failed to update position');
                    } finally {
                        setTimeout(() => setStatusMsg(null), 2000);
                    }
                };

                document.addEventListener('mousemove', handleMove);
                document.addEventListener('mouseup', handleUp);
            }}
        >
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
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>

                        <div className={styles.colorRow}>
                            {['#fff176', '#aed581', '#4fc3f7', '#ff8a65', '#ce93d8'].map((c) => (
                                <div
                                    key={c}
                                    className={styles.colorCircle}
                                    style={{
                                        backgroundColor: c,
                                        border: c === color ? '1px solid #000' : '1px solid ' + c
                                    }}
                                    onClick={() => setColor(c)}
                                >
                                    {color === c && <div className={styles.innerDot}/>}
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
        </div>
    );
};

export default NoteCard;
