function displaySales(sales) {
    $("#sales_container").empty();
    $.each(sales, function (i, sale) {
        let saleEntry = $(`
            <div class="container">
                <div class="row margin-v sale-entry" data-id="${sale.id}">
                    <div class="col-3 error-msg">${sale.salesperson}</div>
                    <div class="col-4 error-msg">${sale.client}</div>
                    <div class="col-2 error-msg">${sale.reams}</div>
                    <button class="col-3 delete-btn">X</button>
                </div>
            </div>
        `);
        $("#sales_container").append(saleEntry);
    });

    // Ensure event listeners are only attached once
    $(".delete-btn").on('click', function () {
        let saleId = $(this).closest(".sale-entry").data("id");
        deleteSale(saleId);
    });

    $(".sale-entry").draggable({
        revert: "invalid",
        cursor: "move"
    });
}

function getSales() {
    $.ajax({
        type: "GET",
        url: "/get_sales",
        success: function(result) {
            displaySales(result.data);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

function getClients() {
    $.ajax({
        type: "GET",
        url: "/get_clients",
        success: function(result) {
            $("#clientInput").autocomplete({
                source: result.data
            });
        },
        error: function(request, status, error){
            console.log("Error fetching clients:");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    })
}

function addSales() {
    if (!validateForm()) return;

    let salesPerson = $("#salesPersonInput").val().trim();
    let client = $("#clientInput").val().trim();
    let reamsSold = $("#reamsInput").val().trim();

    let saleData = {
        salesPerson: salesPerson,
        client: client,
        reamsSold: reamsSold
    }

    $.ajax({
        type: "POST",
        url: "/add_sale",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(saleData),
        success: function(result) {
            displaySales(result.data);
            getClients();
            // reset input boxes
            $("#salesPersonInput").val("");
            $("#clientInput").val("");
            $("#reamsInput").val("");
            $("#salesPersonInput").focus();
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

function deleteSale(saleID) {
    $.ajax({
        type: "DELETE",
        url: "/delete_sale",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({id: saleID}),
        success: function(result) {
            displaySales(result.data);
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

function validateForm() {
    let isValid = true;

    const salesPerson = $("#salesPersonInput").val().trim();
    if (salesPerson === "") {
        $("#salesPersonError").show();
        isValid = false;
    } else {
        $("#salesPersonError").hide();
    }

    const client = $("#clientInput").val().trim();
    if (client === "") {
        $("#clientError").show();
        isValid = false;
    } else {
        $("#clientError").hide();
    }

    const reamsSold = $("#reamsInput").val().trim();
    if (reamsSold === "" || isNaN(reamsSold) || parseInt(reamsSold) <= 0) {
        $("#reamsError").show();
        isValid = false;
    } else {
        $("#reamsError").hide();
    }

    if (isValid) {
        $("#submit_sale").prop("disabled", false);
    } else {
        $("#submit_sale").prop("disabled", true);
    }

    return isValid;
}

$(document).ready(function(){
    //when the page loads, display all the names
    getClients();
    getSales();
    
    // ensure the click event is only bound once!
    $("#submit_sale").off('click').on('click', function(){                
        addSales();
    });

    // ensure the keypress event is only bound once!
    $("#submit_sale").off('keypress').on('keypress', function(e){     
        if(e.which == 13) {
            addSales();
        }   
    });

     // trash / delete area
     $("#trash").droppable({
        accept: ".sale-entry",
        activeClass: "bg-warning",
        drop: function (event, ui) {
            let saleId = ui.draggable.data("id");
            deleteSale(saleId);
        }
    });
});