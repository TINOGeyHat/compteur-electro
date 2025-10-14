// Mettre à jour le compteur depuis le backend
async function updateCompteur() {
  const res = await fetch('http://localhost:3000/compteur');
  const data = await res.json();
  document.getElementById("compteur-value").innerText = data.total;
  document.getElementById("last-update").innerText = new Date().toLocaleString();
}

// Acheter du kWh (envoie au serveur)
async function acheterKwh(kwh, prix) {
  const res = await fetch('http://localhost:3000/recharger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kwh, prix })
  });
  const data = await res.json();
  alert(data.message);
  updateCompteur();
}

// Charger l’historique depuis le serveur
async function chargerHistorique() {
  const res = await fetch('http://localhost:3000/historique');
  const historique = await res.json();
  let tbody = document.getElementById("historique-list");
  if (!tbody) return;
  tbody.innerHTML = "";
  historique.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>${item.kwh}</td>
        <td>${item.prix}</td>
      </tr>
    `;
  });
}

// Initialisation selon la page
window.onload = () => {
  if (document.getElementById("compteur-value")) {
    updateCompteur();
  }
  if (document.getElementById("historique-list")) {
    chargerHistorique();
  }
};
