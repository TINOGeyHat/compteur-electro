  //  Adresse correcte de ton backend Render
const API_URL = "https://compteur-electro.onrender.com";

//  Mettre à jour le compteur depuis le backend
async function updateCompteur() {
  try {
    const res = await fetch(`${API_URL}/compteur`);
    if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
    const data = await res.json();

    document.getElementById("compteur-value").innerText = data.total;
    document.getElementById("last-update").innerText = new Date().toLocaleString();
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour du compteur :", err);
    alert("Impossible de charger le compteur. Vérifie la connexion au serveur Render.");
  }
}

// ⚡ Acheter du kWh (envoie au serveur)
async function acheterKwh(kwh, prix) {
  try {
    const res = await fetch(`${API_URL}/recharger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kwh, prix }),
    });

    if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
    const data = await res.json();

    alert(data.message || "Recharge effectuée !");
    updateCompteur();
  } catch (err) {
    console.error("❌ Erreur lors de la recharge :", err);
    alert("La recharge a échoué. Vérifie la connexion au serveur Render.");
  }
}

//  Charger l’historique depuis le serveur
async function chargerHistorique() {
  try {
    const res = await fetch(`${API_URL}/historique`);
    if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
    const historique = await res.json();

    let tbody = document.getElementById("historique-list");
    if (!tbody) return;
    tbody.innerHTML = "";

    historique.forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item.date}</td>
          <td>${item.kwh}</td>
          <td>${item.prix}</td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("❌ Erreur lors du chargement de l’historique :", err);
  }
}

//  Initialisation selon la page
window.onload = () => {
  if (document.getElementById("compteur-value")) {
    updateCompteur();
  }
  if (document.getElementById("historique-list")) {
    chargerHistorique();
  }
};
