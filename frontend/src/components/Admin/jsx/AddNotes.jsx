import axios from 'axios';
import { useState, useEffect } from 'react';
import NotesUploadForm from './NotesUploadForm';
import styles from '../css/AddNotes.module.css';


const AddNotes = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  }

  const handleClick = (url) => {
    const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(previewUrl, '_blank');
  };


  useEffect(() => {
    axios.get(`${backendURL}/notes/view`,{ withCredentials: true })
      .then((response) => {
        setNotes(response.data?.notes || []);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  return (
    <>
      <h2 className={styles.sectionTitle}>Notes</h2>
      <div className={styles.notesWrapper}>
        <div className={`${styles.noteCard} ${styles.addNew}`} onClick={handleOpenForm} >
          <span>+</span>
          <p>Add new Note</p>
        </div>
        {notes.map((note) => (
          <div key={note.id} className={styles.noteCard} onClick={() => handleClick(note.pdf)}>
            <img src={note.image} alt={note.title} className={styles.noteImage} />
            <p className={styles.noteTitle}>{note.title}</p>
          </div>
        ))}
      </div>
      {showForm && <NotesUploadForm onClose={handleCloseForm} />}
    </>
  );
};

export default AddNotes;
