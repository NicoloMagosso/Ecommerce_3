// Funzione per la gestione dei form modali
function _manageModal(action, data = null) {
    // Titolo del modal
    let title;
    // Contenuto del modal
    let bodyContent = '';

    title = 'Prodotto';

    // Determina il titolo e il contenuto del modal in base all'azione
    switch (action) {
        case 'post':
            bodyContent = `
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
            saveBtn.style.display = "block";
            break;
        case 'patch':
            bodyContent = `
                <div class="form-group">
                    <label for="productName">Nome:</label>
                    <input type="text" class="form-control" id="productName" value="${data.attributes.nome}">
                </div>
                <div class="form-group">
                    <label for="productBrand">Marca:</label>
                    <input type="text" class="form-control" id="productBrand" value="${data.attributes.marca}">
                </div>
                <div class="form-group">
                    <label for="productPrice">Prezzo:</label>
                    <input type="number" class="form-control" id="productPrice" value="${data.attributes.prezzo}">
                </div>
            `;
            saveBtn.style.display = "block";
            break;
        case 'get':
            bodyContent = `
                <p>ID: ${data.id}</p>
                <p>Nome: ${data.attributes.nome}</p>
                <p>Marca: ${data.attributes.marca}</p>
                <p>Prezzo: ${data.attributes.prezzo}</p>
            `;
            saveBtn.style.display = "none";
            break;
        default:
            throw new Error('Azione non supportata');
    }

    // Imposta il titolo del modal
    modalTitle.textContent = title;
    // Imposta il corpo del modal
    modalBody.innerHTML = bodyContent;

    // Visualizza il modal
    $(modal).modal('show');
}