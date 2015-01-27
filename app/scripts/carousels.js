/**
 * Initializations and options for app carousels.
 * https://github.com/OwlFonk/OwlCarousel
 */

(function () {
  var init = function () {
    var $syncPrimary = $('.sync-primary'),
        $syncSecondary = $('.sync-secondary');

    $(".hero-carousel, .quote-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-3x'></i>",
        "<i class='fa fa-angle-right fa-3x'></i>"
      ],
      slideSpeed: 300,
      pagination: true,
      singleItem: true,
      mouseDrag:  false
    });

    $syncPrimary.owlCarousel({
      singleItem: true,
      slideSpeed: 600,
      pagination: false,
      afterAction: syncPosition,
      responsiveRefreshRate: 200,
      transitionStyle : "fade"
    });

    $syncSecondary.owlCarousel({
      items: 10,
      itemsDesktop: [1199, 14],
      itemsTablet: [768, 10],
      itemsMobile: [479, 10],
      pagination: false,
      responsiveRefreshRate: 100,
      afterInit: function (el) {
        el.find(".owl-item").eq(0).addClass("synced");
      }
    });

    function syncPosition(el) {
      var current = this.currentItem;

      $syncSecondary
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced");

      if ($syncSecondary.data("owlCarousel") !== undefined) {
        center(current);
      }
    }

    $syncSecondary.on("click", ".owl-item", function(e) {
      e.preventDefault();
      var number = $(this).data("owlItem");
      $syncPrimary.trigger("owl.goTo", number);
    });

    $('.gallery-prev').click(function() {
      $syncPrimary.trigger('owl.prev');
    });

    $('.gallery-next').click(function() {
      $syncPrimary.trigger('owl.next');
    });

    function center (number) {
      var syncSecondaryvisible = $syncSecondary.data("owlCarousel").owl.visibleItems,
          num = number,
          found = false;

      for (var i in syncSecondaryvisible) {
        if (num === syncSecondaryvisible[i]) {
          var found = true;
        }
      }

      if (found === false) {
        if (num > syncSecondaryvisible[syncSecondaryvisible.length-1]) {
          $syncSecondary.trigger("owl.goTo", num - syncSecondaryvisible.length+2)
        } else {
          if (num - 1 === -1) {
            num = 0;
          }
          $syncSecondary.trigger("owl.goTo", num);
        }
      } else if (num === syncSecondaryvisible[syncSecondaryvisible.length-1]) {
        $syncSecondary.trigger("owl.goTo", syncSecondaryvisible[1]);
      } else if (num === syncSecondaryvisible[0]) {
        $syncSecondary.trigger("owl.goTo", num-1);
      }
    }
    // End Gallery Carousel

    $(".media-pagination-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-3x'></i>",
        "<i class='fa fa-angle-right fa-3x'></i>"
      ],
      slideSpeed: 300,
      pagination: true,
      singleItem: true,
      mouseDrag:  false
    });

    $(".small-media-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-2x'></i>",
        "<i class='fa fa-angle-right fa-2x'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      itemsCustom: [
        [0, 4],
        [920, 5],
        [1200, 6]
      ]
    });

    $(".news-media-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-2x'></i>",
        "<i class='fa fa-angle-right fa-2x'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      singleItem: true
    });

    $(".product-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-2x'></i>",
        "<i class='fa fa-angle-right fa-2x'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      itemsCustom: [
        [0, 1],
        [520, 2],
        [768, 3],
        [920, 4],
        [1400, 5]
      ]
    });

    $(".secondary-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-3x'></i>",
        "<i class='fa fa-angle-right fa-3x'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      itemsCustom: [
        [0, 1],
        [520, 2],
        [920, 3],
        [1400, 4]
      ]
    });

    $(".endorsements-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left'></i>",
        "<span>Next Quote</span> <i class='fa fa-angle-right'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      autoHeight : true,
      singleItem: true
    });

    // NEWSLETTER CAROUSEL
    $(".newsletter-carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      navigationText: [
        "<i class='fa fa-angle-left fa-2x'></i>",
        "<i class='fa fa-angle-right fa-2x'></i>"
      ],
      slideSpeed: 300,
      pagination: false,
      mouseDrag:  false,
      itemsCustom: [
        [0, 1],
        [520, 2],
        [768, 3]
      ]
    });

    // Upsell Carousel
    var upsellCarousel = $(".upsell-carousel");
    $(upsellCarousel).owlCarousel({
      slideSpeed: 300,
      pagination: true,
      singleItem: true,
      mouseDrag:  false
    });

    // Upsell Triggers
    $('.upsell .owl-carousel .action-link').not('.no-js').click(function(e) {
      e.preventDefault();
      $(upsellCarousel).trigger('owl.next');
    });
  };

  TonyRobbins.Carousels = function () {
    init();
  }
}(this));
