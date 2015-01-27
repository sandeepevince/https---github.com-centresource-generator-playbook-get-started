
/**
 * Initializations and options for identity tests
 * Dependencies:
 *  - noUiSlider: http://refreshless.com/nouislider/
 *  - videojs: https://github.com/videojs/video.js
 */

(function () {
  var questionSlider = function () {
    var $questionSlider = $('.question-slider'),
        $slide = $questionSlider.find('.slider'),
        $sliderLabels = $questionSlider.find('.slider-labels'),
        highlightLabel = function ($this) {
          var index = +$this;
          $sliderLabels.find('li').removeClass('active');
          $sliderLabels.find('li:nth-child(' + index + ')').addClass('active');
        };

    if ($slide.length) {
      $slide.noUiSlider({
        start: 1,
        step: 1,
        connect: 'lower',
        range: {
          'min': 1,
          'max': 10
        },
        serialization: {
          format: {
            decimals: 0
          }
        }
      });
    };

    $slide.on('change', function () {
      highlightLabel($(this).val());
    });

    $sliderLabels.on('click', 'li', function () {
      var $thisIndex = $(this).index() + 1;
      $slide.val($thisIndex);
      highlightLabel($thisIndex);
    });
  };

  var showQuestion = function () {
    $('#identity-test-container').removeClass('video-active').addClass('video-inactive');
    questionSlider();
  };

  var initListeners = function () {
    $('#replay-video').on('click', function () {
      initPlayer();
    });

    $('.next-question').on('click', function (e) {
      e.preventDefault();
      $(this).trigger('owl.next');
    });
  };

  var initPlayer = function () {
    if ($('#identity-test-video').length) {
      videojs('identity-test-video', { }, function () {
        this.play();

        this.on('ended', function() {
          showQuestion();
        });
      });
    } else {
      showQuestion();
    }
  };

  TonyRobbins.IdentityTest = function () {
    initListeners();
    initPlayer();
  };
}(this));
