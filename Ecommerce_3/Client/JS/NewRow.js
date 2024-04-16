function createProductRow(product) {
    const row = document.createElement("tr");
    row.id = "row_" + product.id;
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.attributes.nome}</td>
        <td>${product.attributes.marca}</td>
        <td>${product.attributes.prezzo}</td>
        <td>
            <button type='button' class='btn btn-info' onclick='_get(${product.id})'>Visualizza</button>
            <button type='button' class='btn btn-warning ml-1' onclick='_patch(${product.id})'>Modifica</button>
            <button type='button' class='btn btn-danger ml-1' onclick='_delete(${product.id})'>Elimina</button>
        </td>
    </tr>`;
    row.dataset.id = product.id;
    return row;
}
