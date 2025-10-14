// backend/server.js
const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST /recharger : ajouter une recharge
app.post('/recharger', (req, res) => {
  const { kwh, prix } = req.body;

  if (!kwh || !prix) {
    return res.status(400).json({ error: "Données manquantes." });
  }

  const date = new Date().toLocaleString();
  db.prepare('INSERT INTO recharges (date, kwh, prix) VALUES (?, ?, ?)').run(date, kwh, prix);
  console.log(`🔋 Recharge enregistrée : ${kwh} kWh pour ${prix} F`);
  res.json({ message: `Recharge de ${kwh} kWh enregistrée.` });
});

// GET /historique : obtenir toutes les recharges
app.get('/historique', (req, res) => {
  const rows = db.prepare('SELECT * FROM recharges ORDER BY id DESC').all();
  res.json(rows);
});

// GET /compteur : obtenir le total kWh
app.get('/compteur', (req, res) => {
  const result = db.prepare('SELECT SUM(kwh) as total FROM recharges').get();
  res.json({ total: result.total || 0 });
});

// DELETE /reset : réinitialiser la base
app.delete('/reset', (req, res) => {
  db.prepare('DELETE FROM recharges').run();
  res.json({ message: "Base de données réinitialisée." });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});
