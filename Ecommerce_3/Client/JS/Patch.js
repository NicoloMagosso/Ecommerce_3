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
            _manageModal('patch', product);
            saveBtn.onclick = function () {
                const updatedName = document.getElementById("productName").value;
                const updatedBrand = document.getElementById("productBrand").value;
                const updatedPrice = document.getElementById("productPrice").value;
                if (updatedName && updatedBrand) {
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