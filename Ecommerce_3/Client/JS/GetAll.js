var products = [
    {id: 1, nome: "Prodotto 1", marca: "Marca 1", prezzo: 10.99},
    {id: 2, nome: "Prodotto 2", marca: "Marca 2", prezzo: 20.99},
    {id: 3, nome: "Prodotto 3", marca: "Marca 3", prezzo: 30.99}
];
function GetAll() {
    var tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";
    products.forEach(function (product) {
        var row = "<tr>";
        row += "<td>" + product.id + "</td>";
        row += "<td>" + product.nome + "</td>";
        row += "<td>" + product.marca + "</td>";
        row += "<td>" + product.prezzo + "</td>";
        row += "<td>";
        row += "<button type='button' class='btn btn-info' onclick='openActionModal(\"Visualizza\", " + product.id + ")'>Visualizza</button>";
        row += "<button type='button' class='btn btn-warning ml-1' onclick='openActionModal(\"Modifica\", " + product.id + ")'>Modifica</button>";
        row += "<button type='button' class='btn btn-danger ml-1' onclick='deleteProduct(" + product.id + ")'>Elimina</button>";
        row += "</td>";
        row += "</tr>";
        tableBody.innerHTML += row;
    });
}