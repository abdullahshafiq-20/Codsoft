
(function() {
  "use strict";

  // ================================== PRELOADER ==================================
  $(window).on('load', function() {
    
    setTimeout(function() {
        $('#js-preloader').addClass('loaded');
    }, 7500);
  });

  window.addEventListener('load', function () {
    setTimeout(function() {
        const content = document.getElementById('content');
        content.classList.add('visible');
    }, 7500); 
  });
  // ================================== PRELOADER END ==================================

  // ================================== COLOR MODE SWITCH ==================================

const colorModeSwitch_mobile = document.getElementById("colorModeSwitch-mobile");
colorModeSwitch_mobile.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

const colorModeSwitch_desk = document.getElementById("colorModeSwitch-desk");
colorModeSwitch_desk.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

// ================================== COLOR MODE SWITCH END ==================================

  
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
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
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
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
    height: '90vh'
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


  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  new PureCounter();

})()

// ================================== TYPING ANIMATION ==================================

var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false;

var textArray = [
  "Web Developer.","Video Editor.","Freelancer.", "UI/UX specialist."
];

var speedForward = 120,
    speedWait = 2500,
    speedBetweenLines = 1000,
    speedBackspace = 120;

typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = document.getElementById(id),
      aString = ar[a],
      eHeader = element.children[0],
      eParagraph = element.children[1];
  
  if (!isBackspacing) {
    if (i < aString.length) {
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.classList.remove("cursor");
        eParagraph.classList.add("cursor");
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
      } else {
        if (!isParagraph) {
          eHeader.textContent += aString.charAt(i);
        } else {
          eParagraph.textContent += aString.charAt(i);
        }
        i++;
        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
      }
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function(){ typeWriter(id, ar); }, speedWait);
    }
  } else {
    if (eHeader.textContent.length > 0 || eParagraph.textContent.length > 0) {
      if (eParagraph.textContent.length > 0) {
        eParagraph.textContent = eParagraph.textContent.substring(0, eParagraph.textContent.length - 1);
      } else if (eHeader.textContent.length > 0) {
        eParagraph.classList.remove("cursor");
        eHeader.classList.add("cursor");
        eHeader.textContent = eHeader.textContent.substring(0, eHeader.textContent.length - 1);
      }
      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
    } else { 
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function(){ typeWriter(id, ar); }, 50);
    }
  }
}

// ================================== TYPING ANIMATION END ==================================


// ================================== FORM SUBMISSION ANIMATION ==================================
{
  const btn = document.querySelector("#btn-send");
  const btnText = document.querySelector("#btnText");
  const myForm = document.querySelector("#myform");

  const animateButton = () => {
    btnText.innerHTML = "Thank you!❤️";
    btn.classList.add("active");

    // Submit the form after the animation is triggered
    setTimeout(() => {
      myForm.submit();
    }, 1500); // Adjust the delay (in milliseconds) to match your animation duration
  };

  const checkFormFilled = () => {
    const inputs = myForm.querySelectorAll("input, textarea");
    const isFormFilled = Array.from(inputs).every((input) => input.value.trim() !== "");
    if (isFormFilled) {
      animateButton();
    } else {
      btnText.innerHTML = "Submit";
      btn.classList.remove("active");
    }
  };

  myForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    checkFormFilled();
  });
}

// ================================== FORM SUBMISSION ANIMATION ==================================
