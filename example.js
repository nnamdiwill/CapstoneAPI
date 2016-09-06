$(document).ready(function () {

    // STEP 1 - get the input from the user
    "use strict";
    $('#search-terms').on('click', function (event) {
        event.preventDefault();
        var item = $('#all-items').val();
        searchValidate(item);

    });
});

//add Validation(item);

var searchValidate = function (item) {
    "use strict";
    if (item == '') {
        //alert('please enter an item in the text box!');
        $('.item-details').html('');
        return false;
    } else {
        getItem(item);
    }
}

// takes error string and turns it into displayable DOM element
var showError = function (error) {
    var errorElem = $('.error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
}

// takes a string of semi-colon separated tags to be searched
// for on Etsy
var getItem = function (item) {
    var concatenatedUrl = 'https://openapi.etsy.com/v2/listings/active.js?keywords=' + item + '&limit=12&includes=Images:1&api_key=' + 'dk88st01cks0as9cv2iwr4hg';
    var result = $.ajax({
        url: concatenatedUrl,
        dataType: 'jsonp',
        //type: 'GET'
    })

    .done(function (result) {
        console.log(result);
        $('.item-details').html('');
        var itemResults = "";

        $.each(result.results, function (i, item) {

            itemResults += '<li>';
            itemResults += '<h2>' + item.title + '</h2>';
            itemResults += '<a href = ' + item.url + ' target="_blank">';
            itemResults += '<div class = "product-image" style="background-image: url(' + item.Images[0].url_fullxfull + ')"></div>';
            itemResults += '</a>';
            itemResults += '<div class = "product-details">';
            itemResults += '<h3> ' + item.description + '</h3>';
            itemResults += '</div>';
            itemResults += '</li>';

        });

        $('.item-details').append(itemResults);
    })

    .fail(function (error, errorThrown) {
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
    });

}
Contact GitHub API Training Shop Blog About© 2016 GitHub, Inc.Terms P
