function envoyerMessage(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const json = JSON.stringify({
    nom: formData.get('nom'),
    sujet: formData.get('sujet'),
    message: formData.get('message'),
    fichier: formData.get('fichier') ? 'fichier_present' : 'aucun'
  });

  fetch('/api/contact', {
    method: 'POST',
    body: json,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      window.location.href = 'confirmation.html';
    }
  });
}
