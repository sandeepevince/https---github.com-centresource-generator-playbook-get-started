/**
 * Initializations and options for Members Portal components
 * Including:
 *  - Removing invitees
 *  - Step forms
 *  - Testimonial submission
 */

(function () {
  var initCarousel = function () {
    $stepFormCarousel = $("#step-form-carousel");

    $stepFormCarousel.owlCarousel({
      navigation: false,
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      singleItem: true
    });

    $stepFormCarousel.find('.next-step').on('click', function (e) {
      e.preventDefault();
      $(this).trigger('owl.next');
    });
  };

  var watchInvitees = function () {
    var $inviteeList = $('#invitee-list'),
        $removeInvitee = $inviteeList.find('.remove-invitee');

    $removeInvitee.on('click', function (e) {
      e.preventDefault();
      $(this).closest('.invitee').remove();
    });
  };

  TonyRobbins.MembersPortal = function () {
    initCarousel();
    watchInvitees();
  };
}(this));
