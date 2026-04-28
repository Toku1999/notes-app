const express = require('express');
const app = express();
const notesRoutes = require('./routes/notes');

app.use(express.json());

// UI Route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Notes App</title>
        <style>
          body {
            font-family: Arial;
            background: #f4f4f4;
            text-align: center;
            padding: 50px;
          }
          h1 {
            color: #333;
          }
          .box {
            background: white;
            padding: 20px;
            margin: auto;
            width: 300px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          button {
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>📝 Notes App</h1>
          <p>Welcome to your DevOps Notes App 🚀</p>
          <button onclick="loadNotes()">Load Notes</button>
          <ul id="notes"></ul>
        </div>

        <script>
          async function loadNotes() {
            const res = await fetch('/notes');
            const data = await res.json();

            const list = document.getElementById('notes');
            list.innerHTML = '';

            data.forEach(note => {
              const li = document.createElement('li');
              li.innerText = note.text; // ✅ FIXED (was note.note)
              list.appendChild(li);
            });
          }
        </script>
      </body>
    </html>
  `);
});

// API routes
app.use('/notes', notesRoutes);

const PORT = 3000;

// ✅ FIXED (no backslash issue)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
