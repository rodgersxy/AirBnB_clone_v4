/*
JavaScript scripit and jQuery
*/

let amenitiesChecked = []
document.addEventListener('DOMContentLoaded', (event) => {
    window.$('input:checkbox').change(function() {
        cbName = $(this).attr("data-name")
        if(window.$(this).is(':checked')) {
            amenitiesChecked.push(cbName)
        } else {
            delete amenitiesChecked.pop(cbName)
        }
        $('.amenities h4').html(amenitiesChecked.join(", "));
    });

    $.get("http://0.0.0.0:5001/api/v1/status/", function(data, testStatus) {
        if (data['status'] === "OK") {
            $('div#api_status').addClass('available')
        } else {
            $('div#api_status').remove('available')
        }
    });

   $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        contentType: "application/json",
        data: JSON.stringify({}), // Send an empty dictionary
        success: function (data) {
            // Loop through the results and create article tags
            data.forEach(function (place) {
                // Create the article tag
                let article = document.createElement('article');
                article.innerHTML = `
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">
                          $${place.price_by_night}
                         </div>
                    </div>
                    <div class="information">
                        <div class="max_guest">
                          ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
                        </div>
                        <div class="number_rooms">$
                          {place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
                        </div>
                        <div class="number_bathrooms">
                          ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div class="description">${place.description}</div>
                `;
                // Append the article to the section.places
                $('.places').append(article);
            });
        }
    });

});
