/**
 * For miscellaneous small utlities and initializations, including:
 *
 *  - Anchor Smooth Scrolling
 *  - Progress Bar
 *  - Dropdowns
 *  - Progress Bars
 *  - Main Nav
 *  - Countdown
 *  - Smart Responsive Table
 *  - Help Overlay
 *  - Modal Instantiation
 */

(function () {
  var smartResponsiveTable = function () {
    var $recommended = $('.ticket-comparison .recommended'),
        pageWidth = $(window).width(),
        showTiersSecondToLast = function () {
          $recommended.prev().css('display', 'table-cell');
        };
        hideTiersSecondToLast = function () {
          $recommended.prev().hide();
        };
        showTiersLast = function () {
          $recommended.prev().css('display', 'table-cell');
          $recommended.prev().prev().css('display', 'table-cell');
        };
        hideTiersLast = function () {
          $recommended.prev().css('display', 'table-cell');
          $recommended.prev().prev().hide();
        };

    if ($recommended.is(':nth-child(5)')) {
      pageWidth >= 630 ? showTiersSecondToLast() : hideTiersSecondToLast();
    }

    if ($recommended.is(':last-child')) {
      pageWidth >= 630 ? showTiersLast() : hideTiersLast();
    }
  };

  var smoothScroll = function () {
    var $smoothScroll = $('.smooth-scroll');
    $smoothScroll.on('click', function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({scrollTop: target.offset().top}, 800);
          return false;
        }
      }
    });
  };

  jQuery.fn.setProgress = function (progress) {
    var animationLength = 900,
        percent = (progress / 100),
        width = this.width(),
        position = width * percent;

    this.data('progress', progress);

    this.find('.progress-indicator').stop().animate({
      left: position
    }, animationLength);

    return this;
  };

  var progressBar = function () {
    $('.progress-bar').each(function () {
      var $this = $(this);
      $this.setProgress( $this.data('progress') );
    });
  };

  var dropdowns = function () {
    $('select').chosen();
  };

  var mainNav = function () {
    var navToggle = $('#nav-toggle'),
        navToggleIcon = $('#nav-toggle .fa')
        login     = $('#login'),
        navPrimary= $('#nav-primary'),
        body = $('body')
        overlay = $('.overlay')

    navToggle.on('click', function () {
      $(this).find('.fa').toggleClass('fa-navicon').toggleClass('fa-times');

      if (login.hasClass('active')) {
          login.removeClass('active');
          navPrimary.toggleClass('active');

      } else if (navPrimary.hasClass('active')) {
          navPrimary.removeClass('active');
          body.toggleClass('nav-active');
          overlay.removeClass('active');
      } else {
          navPrimary.toggleClass('active');
          body.toggleClass('nav-active');
          overlay.removeClass('opt-in').toggleClass('active');
      }
    });

    $('.nav-secondary-toggle').on('click', function () {
      $('#secondary-options').toggleClass('active');
    });

    $('.member-toggle').on('click', function () {
      if (navPrimary.hasClass('active')) {
          navPrimary.removeClass('active');
          navToggleIcon.toggleClass('fa-navicon').toggleClass('fa-times');
          login.toggleClass('active');
      } else if (login.hasClass('active')) {
          login.removeClass('active');
          body.toggleClass('nav-active');
          overlay.toggleClass('active');
      } else {
          login.toggleClass('active');
          body.toggleClass('nav-active');
          overlay.removeClass('opt-in').toggleClass('active');
      }
    });

    $('.newsletter-toggle').on('click', function () {
      event.preventDefault();
      $('#overlay').removeClass('opt-in');
    });
  };


  var countdown = function () {
    var endDate = 'January 31, 2015 00:00:00';
    $('#countdown').countdown({
      date: endDate,
      render: function(data) {
        var el = $(this.el);
        el.empty()
          .append('<div class="increment"><span class="digit">' + this.leadingZeros(data.days, 2) + ' </span><span class="units">days</span></div>')
          .append('<div class="increment"><span class="digit">' + this.leadingZeros(data.hours, 2) + ' </span><span class="units">hours</span></div>')
          .append('<div class="increment"><span class="digit">' + this.leadingZeros(data.min, 2) + ' </span><span class="units">minutes</span></div>')
          .append('<div class="increment"><span class="digit">' + this.leadingZeros(data.sec, 2) + ' </span><span class="units">seconds</span></div>');
      }
    });
  };


  var stickyScroll = function () {
    // in case window.resize triggers this function again, unbind event
    $(window).off("scroll.sticky-scroll");

    $(".sticky-scroll").each(function () {
      var scroller = $(this),
          container = scroller.closest(".sticky-scroll-container"),
          containerTop = container.offset().top,
          containerBottom = containerTop + container.height(),
          scrollerStart = containerTop,
          scrollerStop = containerBottom;

      $(window).on("scroll.sticky-scroll", function (){
        var scrollPos = $(this).scrollTop();

        if (scrollPos < scrollerStart || scrollPos > scrollerStop ) {
          if (scroller.css('position') !== 'fixed') {
            return false;
          } else {
            // we need to snap the scroller to the top or bottom depending on position
            if (scrollPos < scrollerStart) {
              scroller.css({
                position: 'relative',
                top: '0px'
              }).removeClass('sticking');
            } else {
              scroller.css({
                position: 'relative',
                top:container.height() - scroller.height()
              });
            }
          }
        } else {
          scroller.css({
            position: 'fixed',
            top: '0px'
          }).addClass('sticking');
        }
      });
    });
  };

  var helpOverlay = function() {
    var helpText = $('#helpText').appendTo('body');

    $('<button class="help">?</button>').appendTo('.white-bg .bold-tabs ul li:first-child').on('click', function() {
      $(helpText).addClass('show');
    });

    $('<button class="close"><i class="fa fa-times"></i></button>').appendTo($(helpText).find('.blockquote-wrap')).on('click', function() {
      $(helpText).removeClass('show');
    });
  };

  var modals = function () {
    $('.modal').appendTo('body');
  };

  var heroHome = function () {
    $('#hero-home').css('height', $(window).height() - 75);
  };

  TonyRobbins.Utilities = function () {
    smoothScroll();
    progressBar();
    dropdowns();
    stickyScroll();
    mainNav();
    countdown();
    smartResponsiveTable();
    helpOverlay();
    modals();
    heroHome();

    $(window).resize(function() {
      progressBar();
      stickyScroll();
      smartResponsiveTable();
      heroHome();
    });
  };
}(this));
