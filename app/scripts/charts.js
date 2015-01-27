/**
 * Initializations and options for app charts.
 * https://github.com/nnnick/Chart.js
 */

(function () {
  var init = function () {
    var $graph = $('.graph'),
        $graphLabels = $($graph).data('labels'),
        data = {
          labels: $graphLabels,
          datasets: []
        };

    $graph.find('.headline-secondary').each(function() {
      // Set Label Colors
      var color = $(this).data('rgba');
      $(this).find('span').css('background-color', "rgba(" + color + ")");

      // Create Dataset
      var dataset = {
        label: $(this).text(),
        fillColor: "rgba(" + color + ")",
        strokeColor: "rgba(" + color + ")",
        pointColor: "rgba(" + color + ")",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: $(this).data('graph')
      };

      data.datasets.push(dataset);
    });

    // instantiation
    if ($('#result-chart').length) {
      var ctx = $("#result-chart").get(0).getContext("2d"),
          width = $graph.width();

        $graph.children('canvas').attr({
          'width': width,
          'height': width
        });

        var resultChart = new Chart(ctx).Radar(data, {
          scaleShowLine: true,
          angleShowLineOut: true,
          scaleShowLabels: true,
          scaleBeginAtZero: true,
          angleLineColor: "#DEE5EB",
          angleLineWidth: 1,
          pointLabelFontFamily: "'function_pro_bookbold'",
          pointLabelFontStyle: "normal",
          pointLabelFontSize: 14,
          pointLabelFontColor: "#666",
          pointDot: false,
          pointDotRadius: 3,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: false,
          datasetFill: true,
        });
      }
    }

  TonyRobbins.Charts = function () {
    init();

    $(window).resize(function() {
      init();
    });
  }
}(this));