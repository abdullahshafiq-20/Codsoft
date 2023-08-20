(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);

var parallax = function() {
  $(window).stellar();
};

var contentWayPoint = function() {
  var i = 0;
  $('.animate-box').waypoint( function( direction ) {

    if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
      
      i++;

      $(this.element).addClass('item-animate');
      setTimeout(function(){

        $('body .animate-box.item-animate').each(function(k){
          var el = $(this);
          setTimeout( function () {
            var effect = el.data('animate-effect');
            if ( effect === 'fadeIn') {
              el.addClass('fadeIn animated-fast');
            } else if ( effect === 'fadeInLeft') {
              el.addClass('fadeInLeft animated-fast');
            } else if ( effect === 'fadeInRight') {
              el.addClass('fadeInRight animated-fast');
            } else {
              el.addClass('fadeInUp animated-fast');
            }

            el.removeClass('item-animate');
          },  k * 100, 'easeInOutExpo' );
        });
        
      }, 50);
      
    }

  } , { offset: '85%' } );
};



var goToTop = function() {

  $('.js-gotop').on('click', function(event){
    
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $('html').offset().top
    }, 500, 'easeInOutExpo');
    
    return false;
  });

  $(window).scroll(function(){

    var $win = $(window);
    if ($win.scrollTop() > 200) {
      $('.js-top').addClass('active');
    } else {
      $('.js-top').removeClass('active');
    }

  });

};

var pieChart = function() {
  $('.chart').easyPieChart({
    scaleColor: false,
    lineWidth: 4,
    lineCap: 'butt',
    barColor: '#FF9000',
    trackColor:	"#f5f5f5",
    size: 160,
    animate: 1000
  });
};

var skillsWayPoint = function() {
  if ($('#fh5co-skills').length > 0 ) {
    $('#fh5co-skills').waypoint( function( direction ) {
                  
      if( direction === 'down' && !$(this.element).hasClass('animated') ) {
        setTimeout( pieChart , 400);					
        $(this.element).addClass('animated');
      }
    } , { offset: '90%' } );
  }

};
