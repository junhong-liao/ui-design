function displaySales(sales) {
    $("#salesContainer").empty();
    // is including the i parameter necessary? where does it come from?
    $.each(sales, function (i, sale) {
        let saleEntry = $(`
            <div class="container">
                <div class="row margin-v">
                    <div class="col-3">${sale.salesperson}</div>
                    <div class="col-4 mx-2">${sale.client}</div>
                    <div class="col-2 mx-2">${sale.reams}</div>
                    <button class="delete-btn" data-id="${sale.id}">X</button>
                </div>
            </div>
        `);
        $("#salesContainer").append(saleEntry);
    });

    // event listener to trigger sale deletion
    $(".delete-btn").click(function () {
        let saleId = $(this).data("id");
        deleteSale(saleId);
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

function addSales() {
    let salesPerson = $("#salesPersonInput").val().trim();
    let client = $("#clientInput").val().trim();
    let reamsSold = $("#reamsInput").val().trim();

    if (!client || !reamsSold || !salesPerson) {

    }

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
        success: function (result) {
            displaySales(result.data);
            $("#salesPersonInput").val("")
            $("#clientInput").val("")
            $("#reamsInput").val("")
            $("#salesPersonInput").focus()
        }





    })

}


$(document).ready(function(){
    //when the page loads, display all the names
    displaySales(sales)                        

    $("#submit_sale").click(function(){                
        get_and_save_sale()
    })

    $("#submit_sale").keypress(function(e){     
        if(e.which == 13) {
            get_and_save_sale()
        }   
    })
})