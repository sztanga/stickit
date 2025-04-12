import React from 'react';
import styles from './NoteCard.module.scss';

const NoteCard = ({ note, isOwner, onEdit, onDelete }) => {
    const { content, color, user } = note;

    return (
        <div className={styles.note} style={{ backgroundColor: color }}>
            <div className={styles.header}>
                <span className={styles.user}>{user}</span>
                {isOwner && (
                    <div className={styles.actions}>
                        <button onClick={onEdit}>✏️</button>
                        <button onClick={onDelete}>🗑️</button>
                    </div>
                )}
            </div>
            <p className={styles.content}>{content}</p>
        </div>
    );
};

export default NoteCard;
