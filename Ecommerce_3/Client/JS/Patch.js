function _patch(productId) {
    // Recupera i dati del prodotto dal server
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
            modalTitle.textContent = "Modifica Prodotto";
            modalBody.innerHTML = `
                <div class="form-group">
                    <label for="productName">Nome:</label>
                    <input type="text" class="form-control" id="productName" value="${product.attributes.nome}">
                </div>
                <div class="form-group">
                    <label for="productBrand">Marca:</label>
                    <input type="text" class="form-control" id="productBrand" value="${product.attributes.marca}">
                </div>
                <div class="form-group">
                    <label for="productPrice">Prezzo:</label>
                    <input type="number" class="form-control" id="productPrice" value="${product.attributes.prezzo}">
                </div>
            `;
            // Cambia il testo e l'evento del pulsante di salvataggio
            saveBtn.style.display = "block";
            saveBtn.onclick = function () {
                const updatedName = document.getElementById("productName").value;
                const updatedBrand = document.getElementById("productBrand").value;
                const updatedPrice = document.getElementById("productPrice").value;
                if (updatedName && updatedPrice) {
                    const updatedProduct = {
                        data: {
                            type: 'products',
                            id: product.id,
                            attributes: {
                                nome: updatedName,
                                marca: updatedBrand,
                                prezzo: parseFloat(updatedPrice)
                            }
                        }
                    };

                    // Effettua la richiesta PATCH al server per aggiornare il prodotto
                    fetch(URL, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Errore durante la modifica del prodotto.");
                            }
                            return response.json();
                        })
                        .then(data => {
                            // Aggiorna la tabella o le informazioni del prodotto
                            // Potresti anche chiudere il modal o fare altre azioni necessarie
                            alert("Prodotto modificato con successo.");
                            // Chiudi il modal dopo aver modificato il prodotto
                            $('#modal').modal('hide');

                            // Aggiungi la nuova riga nella tabella
                            const tableBody = document.getElementById("productTableBody");
                            const newRow = createProductRow(data.data);
                            const oldRow = document.getElementById("row_" + data.data.id);
                            tableBody.replaceChild(newRow, oldRow);
                        })
                        .catch(error => {
                            console.error('Errore:', error);
                            alert("Si è verificato un errore durante la modifica del prodotto.");
                        });
                }else
                {
                    alert("Campi non inseriti correttamente. Riprovare");
                }

            }
            $(modal).modal('show');
        })
        .catch(error => {
            console.error('Errore:', error);
            alert("Si è verificato un errore durante il recupero del prodotto.");
        });
}