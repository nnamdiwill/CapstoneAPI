/*Step 1 : Get Input from the User */

$(document).ready(function () {
    "use strict"; //used to make code correct
    $('.user-input').on('click', function (event) {
        event.preventDefault();
        var item = $('.input-search').val();
        searchValidate(item);

    });
});


/*Step 2 : Connect to API based on User Input */
//add Validation(item);

var searchValidate = function (item) {
    "use strict";
    if (item == '') {
        //alert('please enter an item in the text box!');
        $('.results ul').html('');
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


    /* Step 3: Show results based on API Output */

    .done(function (result) {
        console.log(result);
        $('.results ul').html('');
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

        $('.results ul').append(itemResults);
    })

    .fail(function (error, errorThrown) {
        var errorElem = showError(error);
        $('.results').append(errorElem);
    });

}
