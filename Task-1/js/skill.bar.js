(function ($) {
    "use strict";
  
    $(function () {
      // Find all progress bars within the row div
      var progressBars = $(".progress-bar");
  
      // Function to animate progress bars
      function animateProgressBars() {
        // Get the current scroll position
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();
  
        // Iterate over each progress bar
        $.each(progressBars, function (index, progressBar) {
          var $progressBar = $(progressBar);
  
          // Check if the progress bar is in the viewport
          if ($progressBar.offset().top <= (scrollPosition + windowHeight) && !$progressBar.hasClass("animated")) {
            // Get the progress bar's maximum value
            var maxVal = $progressBar.attr("aria-valuemax");
  
            // Animate the progress bar from 0 to its maximum value
            $progressBar.animate(
              { width: maxVal + "%" },
              {
                duration: 1000,
                step: function (now) {
                  // Update the value now in the progress bar
                  $progressBar.attr("aria-valuenow", Math.round(now));
                }
              }
            );
  
            // Add a class to indicate that the progress bar has been animated
            $progressBar.addClass("animated");
          }
        });
      }
  
      // Animate progress bars on initial page load
      animateProgressBars();
  
      // Animate progress bars on window scroll
      $(window).scroll(animateProgressBars);
    });
  })(jQuery);
  