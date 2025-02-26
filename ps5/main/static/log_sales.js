// let clients = [
//     "Shake Shack",
//     "Toast",
//     "Computer Science Department",
//     "Teacher's College",
//     "Starbucks",
//     "Subsconsious",
//     "Flat Top",
//     "Joe's Coffee",
//     "Max Caffe",
//     "Nussbaum & Wu",
//     "Taco Bell",
// ];

// $(document).ready( function() {
//     // autocomplete loading
//     $("#clientInput").autocomplete({
//             source: clients
//     });

//     $("#submit").click( function () {
//         let rep = "Bears beats BattlestarGalactica"
//         let client = $("#clientInput").val().trim();
//         let reamsSold = $("#reamsInput").val();
//         let entry = $(`
//             <div class="container">
//                 <div class="row margin-v">
//                     <div class="col-3">${rep}</div>
//                     <div class="col-4 mx-2">${client}</div>
//                     <div class="col-2 mx-2">${reamsSold}</div>
//                     <button class="">X</button>
//                 </div>
//             </div>
//         `);
//         $("body").append(entry);
//     });

// });

function displayNames(data){
    //empty old data
    $("#people_container").empty()

    //insert all new data
    $.each(data, function(i, datum){
        let new_name= $("<div>"+datum["name"]+"</div>")
        $("#people_container").append(new_name)
    })
}

function get_and_save_name(){
    let name = $("#new_name").val()
    let data_to_save = {"name": name}         
    $.ajax({
        type: "POST",
        url: "add_name",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data_to_save),
        success: function(result){
            let all_data = result["data"]
            console.log("success get_and_save_name")
            console.log(all_data)
            data = all_data
            displayNames(data)
            $("#new_name").val("")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    //when the page loads, display all the names
    displayNames(data)                        

    $("#submit_name").click(function(){                
        get_and_save_name()
    })

    
    $("#new_name").keypress(function(e){     
        if(e.which == 13) {
            get_and_save_name()
        }   
    })

})