function _post() {
    // Creazione di un nuovo prodotto tramite un form modale
    modalTitle.textContent = "Prodotto";
    modalBody.innerHTML = `
        <div class="form-group">
            <label for="productName">Nome:</label>
            <input type="text" class="form-control" id="productName">
        </div>
        <div class="form-group">
            <label for="productBrand">Marca:</label>
            <input type="text" class="form-control" id="productBrand">
        </div>
        <div class="form-group">
            <label for="productPrice">Prezzo:</label>
            <input type="number" class="form-control" id="productPrice">
        </div>
    `;

    saveBtn.onclick = function () {
        const Nome = document.getElementById("productName").value;
        const Marca = document.getElementById("productBrand").value;
        const Prezzo = document.getElementById("productPrice").value;
        const URL = 'http://127.0.0.1:8081/products';

        if (Nome && Marca) {
            // Creazione dell'oggetto prodotto da inviare al server
            const newProduct = {
                data: {
                    type: 'products',
                    attributes: {
                        nome: Nome,
                        marca: Marca,
                        prezzo: parseFloat(Prezzo)
                    }
                }
            };

            // Effettua la richiesta POST al server per aggiungere il nuovo prodotto
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Errore durante la creazione del prodotto.");
                    }
                    return response.json();
                })
                .then(data => {
                    const newProduct = data.data;
                    const tableBody = document.getElementById("productTableBody");
                    const row = createProductRow(newProduct);
                    tableBody.appendChild(row);
                    saveBtn.style.display = "block";
                    alert("Prodotto creato con successo.");
                })
                .catch(error => {
                    console.error('Errore:', error);
                    alert("Si è verificato un errore durante la creazione del prodotto.");
                });
        // Chiudi il modal dopo aver creato il prodotto
        $('#modal').modal('hide');
        }
        else
        {
            alert("Campi non inseriti correttamente. Riprovare");
        }
    };

    // Visualizza il form modale
    $(modal).modal('show');
}