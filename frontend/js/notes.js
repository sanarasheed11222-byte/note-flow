const API_URL = 'http://localhost:5000/api/v1';

// Get token from localStorage
const getToken = () => localStorage.getItem('accessToken');

// DOM Elements
const notesList = document.getElementById('notes-list');
const searchInput = document.getElementById('search-input');
const categoryBtns = document.querySelectorAll('.category-btn');
const newNoteBtn = document.getElementById('new-note-btn');
const noteEditor = document.getElementById('note-editor');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const noteCategory = document.getElementById('note-category');
const saveNoteBtn = document.getElementById('save-note-btn');
const deleteNoteBtn = document.getElementById('delete-note-btn');
const cancelNoteBtn = document.getElementById('cancel-note-btn');

let currentNoteId = null;
let currentCategory = 'All';

// Fetch all notes
const fetchNotes = async (search = '', category = '') => {
  try {
    let url = `${API_URL}/notes?`;
    if (search) url += `search=${search}&`;
    if (category && category !== 'All') url += `category=${category}`;
    
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    if (data.status === 'success') renderNotes(data.data);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

// Render notes in sidebar
const renderNotes = (notes) => {
  if (!notesList) return;
  notesList.innerHTML = '';
  if (notes.length === 0) {
    notesList.innerHTML = '<p style="color:#888;padding:20px;text-align:center;">No notes found</p>';
    return;
  }
  notes.forEach(note => {
    const div = document.createElement('div');
    div.className = 'note-item';
    div.style.cssText = 'padding:12px;border-bottom:1px solid #333;cursor:pointer;';
    div.innerHTML = `
      <h4 style="margin:0 0 4px;font-size:14px;">${note.title}</h4>
      <p style="margin:0;font-size:12px;color:#888;">${note.category} • ${new Date(note.updated_at).toLocaleDateString()}</p>
    `;
    div.addEventListener('click', () => openNote(note));
    notesList.appendChild(div);
  });
};

// Open note in editor
const openNote = (note) => {
  currentNoteId = note.id;
  if (noteTitle) noteTitle.value = note.title;
  if (noteContent) noteContent.value = note.content;
  if (noteCategory) noteCategory.value = note.category;
  if (noteEditor) noteEditor.style.display = 'block';
  if (deleteNoteBtn) deleteNoteBtn.style.display = 'block';
};

// Create new note
const createNewNote = () => {
  currentNoteId = null;
  if (noteTitle) noteTitle.value = '';
  if (noteContent) noteContent.value = '';
  if (noteCategory) noteCategory.value = 'General';
  if (noteEditor) noteEditor.style.display = 'block';
  if (deleteNoteBtn) deleteNoteBtn.style.display = 'none';
  if (noteTitle) noteTitle.focus();
};

// Save note
const saveNote = async () => {
  const title = noteTitle?.value?.trim();
  const content = noteContent?.value?.trim();
  const category = noteCategory?.value || 'General';

  if (!title) { alert('Please enter a title!'); return; }
  if (!content) { alert('Please enter some content!'); return; }

  try {
    const method = currentNoteId ? 'PUT' : 'POST';
    const url = currentNoteId ? `${API_URL}/notes/${currentNoteId}` : `${API_URL}/notes`;
    
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ title, content, category })
    });
    const data = await res.json();
    if (data.status === 'success') {
      fetchNotes('', currentCategory);
      alert(currentNoteId ? 'Note updated!' : 'Note created!');
    }
  } catch (error) {
    console.error('Error saving note:', error);
  }
};

// Delete note
const deleteNote = async () => {
  if (!currentNoteId) return;
  if (!confirm('Delete this note?')) return;
  
  try {
    const res = await fetch(`${API_URL}/notes/${currentNoteId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    if (data.status === 'success') {
      currentNoteId = null;
      if (noteEditor) noteEditor.style.display = 'none';
      fetchNotes('', currentCategory);
      alert('Note deleted!');
    }
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

// Event listeners
if (newNoteBtn) newNoteBtn.addEventListener('click', createNewNote);
if (saveNoteBtn) saveNoteBtn.addEventListener('click', saveNote);
if (deleteNoteBtn) deleteNoteBtn.addEventListener('click', deleteNote);
if (cancelNoteBtn) cancelNoteBtn.addEventListener('click', () => {
  if (noteEditor) noteEditor.style.display = 'none';
});

// Search
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    fetchNotes(e.target.value, currentCategory);
  });
}

// Category filter
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category || 'All';
    fetchNotes('', currentCategory);
  });
});

// Check auth and load notes
if (!getToken()) {
  window.location.href = 'login.html';
} else {
  fetchNotes();
}
