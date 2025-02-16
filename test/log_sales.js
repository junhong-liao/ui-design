// Model: Data
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

let sales = [
    { salesperson: "James D. Halpert", client: "Shake Shack", reams: 100 },
    { salesperson: "Stanley Hudson", client: "Toast", reams: 400 },
    { salesperson: "Michael O. Scott", client: "Computer Science Department", reams: 1000 },
];

// View: Render Sales List
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

    // Initialize draggable rows. Revert if invalid.
    $(".sale-row").draggable({
        revert: "invalid",
        cursor: "move"
    });
}

$(document).ready(function () {
    $("#clientInput").autocomplete({
        source: function (request, response) {
            let matches = $.grep(clients, function (item) {
                return item.toLowerCase().indexOf(request.term.toLowerCase()) === 0;
            });
            response(matches);
        }
        // add new entry to autocomplete
    }).on("autocompleteclose", function (event, ui) {
        if (ui.item) return;
        const newClient = $(this).val().trim();
        if (newClient && !clients.includes(newClient)) {
            clients.push(newClient);
        }
    });

    // render initial sales data
    renderSales();

    // submit
    $("#submit").click(submitForm);
    $("#reamsInput").keypress(function (e) {
        if (e.which === 13) submitForm();
    });

    // delete functionality
    $(document).on("click", ".delete-btn", function () {
        const index = $(this).closest(".sale-row").data("index");
        sales.splice(index, 1);
        renderSales();
    });

    // delete drop area
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

// Form Validation & Submission
function validateForm() {
    let isValid = true;
    const client = $("#clientInput").val().trim();
    const reams = $("#reamsInput").val();

    // Clear previous errors
    $(".error-msg").remove();

    if (!client) {
        $("#clientInput").after('<div class="error-msg">Client required</div>');
        isValid = false;
    }

    if (!reams) {
        $("#reamsInput").after('<div class="error-msg">Reams required</div>');
        isValid = false;
    } else if (isNaN(reams)) {
        $("#reamsInput").after('<div class="error-msg">Must be a number</div>');
        isValid = false;
    }

    return isValid;
}

function submitForm() {
    if (!validateForm()) return;

    // Update Model
    sales.unshift({
        salesperson: "Bears beats BattlestarGalactica",
        client: $("#clientInput").val().trim(),
        reams: $("#reamsInput").val()
    });

    // Update View
    renderSales();

    // Clear Form
    $("#clientInput").val("").focus();
    $("#reamsInput").val("");
}