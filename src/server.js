require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/todos', require('./routes/todos'));

// Connect to database
mongoose.connect(process.env.DB_URI,)
  .then(() => console.log('Databasen är ansluten'))
  .catch(err => console.error('Kunde inte ansluta till databasen:', err));

// Felhantering
app.use((req, res, next) => {
  res.status(404).json({ error: 'Resursen hittades inte' });
});

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
