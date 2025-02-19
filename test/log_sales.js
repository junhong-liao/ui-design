// model
let clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

// hardcode sales
let sales = [
    { salesperson: "James D. Halpert", client: "Shake Shack", reams: 100 },
    { salesperson: "Stanley Hudson", client: "Toast", reams: 400 },
    { salesperson: "Michael O. Scott", client: "Computer Science Department", reams: 1000 },
];

// view: render sales
function renderSales() {
    $("#salesList").empty();
    sales.forEach((sale, index) => {
        const entry = $(`
            <div class="row margin-v sale-row" data-index="${index}">
                <div class="col-3">${sale.salesperson}</div>
                <div class="col-4 mx-2">${sale.client}</div>
                <div class="col-2 mx-2">${sale.reams}</div>
                <button class="delete-btn">X</button>
            </div>
        `);
        $("#salesList").append(entry);
    });

    // initialize draggable rows, or revert if invalid.
    $(".sale-row").draggable({
        revert: "invalid",
        cursor: "move"
    });
}

// validate the form
function validateForm() {
    let isValid = true;
    const salesperson = $("#salespersonInput").val().trim();
    const client = $("#clientInput").val().trim();
    const reams = $("#reamsInput").val();

    // clear any old error messages
    $(".error-msg").text("").hide();

    if (!salesperson) {
        $("#salespersonInput").next(".error-msg").text("Salesperson required").show();
        isValid = false;
    }

    if (!client) {
        $("#clientInput").next(".error-msg").text("Client required").show();
        isValid = false;
    }

    if (!reams) {
        $("#reamsInput").next(".error-msg").text("Reams required").show();
        isValid = false;
    } else if (isNaN(reams)) {
        $("#reamsInput").next(".error-msg").text("Must be a number").show();
        isValid = false;
    }

    return isValid;
}

// submit new entry
function submitForm() {
    if (!validateForm()) return;

    // now update model
    sales.unshift({
        salesperson: $("#salespersonInput").val().trim(),
        client: $("#clientInput").val().trim(),
        reams: $("#reamsInput").val()
    });

    // render the sales
    renderSales();

    // reset form and set cursor
    $("#salespersonInput").val("").focus();
    $("#clientInput").val("");
    $("#reamsInput").val("");
}

$(document).ready(function () {
    // autocomplete
    $("#clientInput").autocomplete({
        source: function (request, response) {
            let matches = $.grep(clients, function (item) {
                return item.toLowerCase().indexOf(request.term.toLowerCase()) === 0;
            });
            response(matches);
        }
    }).on("autocompleteclose", function (event, ui) {
        if (ui.item) return;
        const newClient = $(this).val().trim();
        if (newClient && !clients.includes(newClient)) {
            clients.push(newClient);
            // refresh if a new client was added
            $("#clientInput").autocomplete("option", "source", clients);
        }
    });

    // render initial sales data
    renderSales();

    // submit
    $("#submit").click(submitForm);
    $("#reamsInput").keypress(function (e) {
        if (e.which === 13) submitForm();
    });

    $(document).on("click", ".delete-btn", function () {
        const index = $(this).closest(".sale-row").data("index");
        sales.splice(index, 1);
        renderSales();
    });

    // trash / delete area
    $("#trash").droppable({
        accept: ".sale-row",
        activeClass: "bg-warning",
        drop: function (event, ui) {
            const index = ui.draggable.data("index");
            sales.splice(index, 1);
            renderSales();
        }
    });
});