$(document).ready(function () {
  // Initialize an empty object to store selected amenities
  const amenities = {};

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
});
