const express = require('express');
const app = express();
const notesRoutes = require('./routes/notes');

app.use(express.json());

app.get('/', (req, res) => {
res.send('Notes API is running 🚀');
});

app.use('/notes', notesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
