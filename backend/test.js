const pool = require('./config/db');
async function test() {
  try {
    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, content, category, tags) VALUES (?, ?, ?, ?, ?)',
      [1, 'Test Note', 'Test Content', 'General', '[]']
    );
    console.log('INSERT OK:', result.insertId);
    const [newNote] = await pool.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
    console.log('Tags type:', typeof newNote[0].tags);
    console.log('Tags value:', newNote[0].tags);
  } catch(err) {
    console.log('ERROR:', err.message);
  }
  process.exit(0);
}
test();
