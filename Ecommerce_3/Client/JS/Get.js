// Funzione per visualizzare i dettagli di un prodotto in un form modale

function _get(productId) {
    const URL = `http://127.0.0.1:8081/products/${productId}`;

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore durante il recupero del prodotto.");
            }
            return response.json();
        })
        .then(data => {
            const product = data.data;
            // Popolare il form modale con i dati del prodotto
            modalTitle.textContent = "Visualizza Prodotto";
            modalBody.innerHTML = "<p>ID: " + product.id + "</p>" +
                "<p>Nome: " + product.attributes.nome + "</p>" +
                "<p>Marca: " + product.attributes.marca + "</p>" +
                "<p>Prezzo: " + product.attributes.prezzo + "</p>";
            saveBtn.style.display = "none";
            $(modal).modal('show');
        })
        .catch(error => {
            console.error('Errore:', error);
            alert("Si è verificato un errore durante il recupero del prodotto.");
        });
}

