const URL = 'http://127.0.0.1:8081/products'

// Funzione per popolare la tabella con i dati dei prodotti

document.addEventListener('DOMContentLoaded', function () {
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore");
            }
            return response.json();
        })
        .then(data => {
            const products = data.data;
            const tableBody = document.getElementById("productTableBody");
            tableBody.innerHTML = "";
            products.forEach(function (product) {
                const row = createProductRow(product);
                tableBody.appendChild(row);
            });
        })
});

