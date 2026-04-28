const express = require('express');
const app = express();
const notesRoutes = require('./routes/notes');

app.use(express.json());

// 🌐 UI Route (Modern UI)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notes App</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }

          .container {
            background: white;
            padding: 30px;
            border-radius: 15px;
            width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          button {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: none;
            border-radius: 5px;
            background: #667eea;
            color: white;
            font-size: 16px;
            cursor: pointer;
          }

          button:hover {
            background: #5a67d8;
          }

          ul {
            list-style: none;
            padding: 0;
            margin-top: 20px;
          }

          li {
            background: #f4f4f4;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .delete {
            background: red;
            padding: 5px 10px;
            border-radius: 5px;
            color: white;
            cursor: pointer;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>📝 Notes App</h1>

          <input type="text" id="noteInput" placeholder="Enter note..." />
          <button onclick="addNote()">Add Note</button>

          <ul id="notesList"></ul>
        </div>

        <script>
          async function loadNotes() {
            const res = await fetch('/notes');
            const data = await res.json();

            const list = document.getElementById('notesList');
            list.innerHTML = '';

            data.forEach(note => {
              const li = document.createElement('li');
              li.innerHTML = \`
                \${note.text}
                <span class="delete" onclick="deleteNote(\${note.id})">X</span>
              \`;
              list.appendChild(li);
            });
          }

          async function addNote() {
            const input = document.getElementById('noteInput');
            const text = input.value;

            if (!text) return;

            await fetch('/notes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text })
            });

            input.value = '';
            loadNotes();
          }

          async function deleteNote(id) {
            await fetch('/notes/' + id, {
              method: 'DELETE'
            });

            loadNotes();
          }

          loadNotes();
        </script>
      </body>
    </html>
  `);
});

// 📡 API Routes
app.use('/notes', notesRoutes);

// 🚀 Server Start
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}
