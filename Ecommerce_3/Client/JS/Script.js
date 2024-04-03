// Esempio di dati dei prodotti
var products = [
    {id: 1, nome: "Prodotto 1", marca: "Marca 1", prezzo: 10.99},
    {id: 2, nome: "Prodotto 2", marca: "Marca 2", prezzo: 20.99},
    {id: 3, nome: "Prodotto 3", marca: "Marca 3", prezzo: 30.99}
];

// Funzione per popolare la tabella con i dati dei prodotti
function populateTable() {
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

// Funzione per aprire il modale delle azioni
function openActionModal(action, productId) {
    var modal = document.getElementById("actionModal");
    var modalTitle = document.getElementById("actionModalLabel");
    var modalBody = document.querySelector("#actionModal .modal-body");
    var saveBtn = document.getElementById("saveActionBtn");

    saveBtn.style.display = "block";
    if (action === "Crea") {
        modalTitle.textContent = "Crea Prodotto";
        modalBody.innerHTML = "<input type='text' id='productName' class='form-control' placeholder='Nome'><br>" +
            "<input type='text' id='productBrand' class='form-control' placeholder='Marca'><br>" +
            "<input type='number' id='productPrice' class='form-control' placeholder='Prezzo'>";
        saveBtn.onclick = function () {
            //METODI JSON API
        };
    } else {
        var product = products.find(function (prod) {
            return prod.id === productId;
        });

        if (action === "Visualizza") {
            //METODI JSON API
            modalTitle.textContent = "Visualizza Prodotto";
            modalBody.innerHTML = "<p>ID: " + product.id + "</p>" +
                "<p>Nome: " + product.nome + "</p>" +
                "<p>Marca: " + product.marca + "</p>" +
                "<p>Prezzo: " + product.prezzo + "</p>";
            saveBtn.style.display = "none";
        } else if (action === "Modifica") {
            modalTitle.textContent = "Modifica Prodotto";
            modalBody.innerHTML = "<input type='text' id='productId' class='form-control' value='" + product.id + "' placeholder='ID' disabled><br>" +
                "<input type='text' id='productName' class='form-control' value='" + product.nome + "' placeholder='Nome'><br>" +
                "<input type='text' id='productBrand' class='form-control' value='" + product.marca + "' placeholder='Marca'><br>" +
                "<input type='number' id='productPrice' class='form-control' value='" + product.prezzo + "' placeholder='Prezzo'>";
            saveBtn.onclick = function () {
                //METODI JSON API
            };
        }
    }
    $(modal).modal('show');
}

// Funzione per eliminare un prodotto
function deleteProduct(productId) {
    // Rimuovi il prodotto dall'array products
    products = products.filter(function (product) {
        return product.id !== productId;
    });

    // Aggiorna la tabella
    populateTable();
}

// Aggiungi un evento click per ogni riga della tabella per selezionarla
document.addEventListener("DOMContentLoaded", function () {
    var tableRows = document.querySelectorAll("#productTableBody tr");
    tableRows.forEach(function (row) {
        row.addEventListener("click", function () {
            var productId = parseInt(row.dataset.productId);
            selectRow(productId);
        });
    });
});

// Chiamata alla funzione per popolare la tabella all'avvio della pagina
populateTable();