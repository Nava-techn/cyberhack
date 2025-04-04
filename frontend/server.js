const cors = require('cors');
const express = require('express');

const app = express();

// Configurez CORS avec une seule origine autorisée
app.use(cors({
    origin: 'http://localhost:3001', // Remplacez '*' par l'origine de votre frontend
}));

app.use(express.json());

// Exemple de route
app.post('/api/start-game', (req, res) => {
    res.json({ message: 'Nouvelle partie démarrée avec succès !' });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://127.0.0.1:${PORT}`);
});
