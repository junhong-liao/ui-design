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


$(document).ready( function() {
    // autocomplete loading
    $("#clientInput").autocomplete({
            source: clients
    });

    $("#submit").click( function () {
        let rep = "Bears beats BattlestarGalactica"
        let client = $("#clientInput").val().trim();
        let reamsSold = $("#reamsInput").val();
        let entry = $(`
            <div class="container">
                <div class="row margin-v">
                    <div class="col-3">${rep}</div>
                    <div class="col-4 mx-2">${client}</div>
                    <div class="col-2 mx-2">${reamsSold}</div>
                    <button class="">X</button>
                </div>
            </div>
        `);
        $("body").append(entry);
    });




});
