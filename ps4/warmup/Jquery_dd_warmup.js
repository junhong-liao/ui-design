
$( function() {
    let initial_position = $("#draggable").position();
    $( "#draggable" ).draggable({
        stop: function(event, ui) {
            if(!ui.helper.data("dropped")) {
                $(this).animate(initial_position, 400);
            }
        }
    });

    $( "#droppable" ).droppable({
        over: function( event, ui ) {
            $( this ).addClass( "ui-state-highlight" );
        },
        drop: function( event, ui ) {
            ui.helper.data("dropped", true);
            $( this )
            .addClass( "ui-state-highlight" )
            .find( "p" )
            .html( "Dropped!" );
        },
        out: function ( event,  ui ) {
            ui.helper.data("dropped", false);
            $(this).removeClass("ui-state-highlight").find("p").html("Drop here");
        }
    });
});