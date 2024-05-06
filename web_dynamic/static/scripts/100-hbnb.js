$(document).ready(function () {
  // Initialize an empty object to store selected amenities
  const amenities = {};
  const states = {};
  const cities = {};

  // Listen for changes on amenity checkboxes
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      // If checkbox is checked, add the amenity to the amenities object
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      // If checkbox is unchecked, remove the amenity from the amenities object
      delete amenities[this.dataset.name];
    }

    // Update the <h4> tag with the list of selected amenities sorted alphabetically
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });

  // Listen for changes on state checkboxes
  $('li.state input[type=checkbox]').change(function () {
    if (this.checked) {
      states[this.dataset.name] = this.dataset.id;
    } else {
      delete states[this.dataset.name];
    }
    $('.locations h4').text(Object.keys(states).sort().join(', '));
  });

  // Listen for changes on city checkboxes
  $('li.city input[type=checkbox]').change(function () {
    if (this.checked) {
      cities[this.dataset.name] = this.dataset.id;
    } else {
      delete cities[this.dataset.name];
    }
    $('.locations h4').text(Object.keys(cities).sort().join(', '));
  });

  // Get API status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Fetch data about places
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (data) {
      data.forEach(function (place) {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>`
        );
      });
    },
    dataType: 'json'
  });

  // Filter places by Amenity, State, and City
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.values(amenities),
        states: Object.values(states),
        cities: Object.values(cities)
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        $('section.places').empty();
        data.forEach(function (place) {
          $('section.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">${place.description}</div>
            </article>`
          );
        });
      },
      dataType: 'json'
    });
  });
});
