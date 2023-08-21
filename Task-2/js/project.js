



(function() {
  "use strict";
  // window.addEventListener('load', function() {
  //     var iframe = document.querySelector('.preloader-1');
  //     iframe.style.display = 'none';
      
  //     var mainContent = document.querySelector('.main-content');
  //     mainContent.style.display = 'block';
  // });
//   $(window).on('load', function() {

//     $('#js-preloader').addClass('loaded');

// });
$(window).on('load', function() {
  // Add a delay before adding the 'loaded' class
  setTimeout(function() {
      $('#js-preloader').addClass('loaded');
  }, 700); // 3000 milliseconds = 3 seconds
});
// window.addEventListener('load', function () {
//   const content = document.getElementById('content');

//   // Add class to trigger the fade-in animation
//   content.classList.add('visible');
// });
window.addEventListener('load', function () {
  setTimeout(function() {
      const content = document.getElementById('content');
      // Add class to trigger the fade-in animation
      content.classList.add('visible');
  }, 700); // 3000 milliseconds = 3 seconds delay
});

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '97vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
  new PureCounter();

})()


