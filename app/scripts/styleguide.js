/**
 * For styleguide-specific Javascript, including:
 * - Generation of secondary navigation items
 *
 */

(function () {
  var generateNav = function () {
    var anchorsArray = [],
        $dataSectionName = $('[data-section-name]');

    $.each($dataSectionName, function (index, item) {
      var $itemData = $(item).data('section-name'),
          $itemDataFormatted = $itemData.replace(/\s+/g, '-').toLowerCase();


      anchorsArray.push('<li><a class="smooth-scroll" href="#' + $itemDataFormatted + '">' + $itemData + '</a></li>');
      $(this).prepend('<a name="' + $itemDataFormatted + '"></a></li>');

    });

    $('#nav-styleguide-secondary').append(anchorsArray);
  };

  TonyRobbins.Styleguide = function () {
    generateNav();
  };
}(this));


window.TonyRobbins.Styleguide = new TonyRobbins.Styleguide();
