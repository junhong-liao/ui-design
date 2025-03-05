$(document).ready(function() {
    // Dynamically populate the popular songs on the homepage
    if (typeof popularItems !== 'undefined') {
        var container = $('#popular-items');
        popularItems.forEach(function(item) {
            var itemHtml = '<div class="col-md-4 mb-4">' +
                '<div class="card">' +
                '<img src="' + item.image + '" class="card-img-top" alt="' + item.title + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + item.title + '</h5>' +
                '<p class="card-text">' + item.summary.substring(0, 100) + '...</p>' +
                '<a href="/view/' + item.id + '" class="btn btn-primary">View Details</a>' +
                '</div></div></div>';
            container.append(itemHtml);
        });
    }

    // Attach submit handler to the search form
    $('#searchForm').submit(function(e) {
        var query = $('#searchInput').val().trim();
        if (query === "") {
            // Prevent search if query is empty or whitespace
            e.preventDefault();
            $('#searchInput').val('');
            $('#searchInput').focus();
        }
    });
});
