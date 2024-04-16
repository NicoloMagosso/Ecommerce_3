// Funzione per eliminare un prodotto

function _delete(productId) {
    const URL = `http://127.0.0.1:8081/products/${productId}`;

    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {

        fetch(URL, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore durante l'eliminazione del prodotto.");
                }
                // Rimuovi la riga della tabella dal DOM
                document.getElementById("row_"+productId).remove();
                alert("Prodotto eliminato con successo.");
            })
            .catch(error => {
                console.error('Errore:', error);
                alert("Si è verificato un errore durante l'eliminazione del prodotto.");
            });
    }
}