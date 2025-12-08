// Sports Swiper Initialization - Only when more than 4 blocks

document.addEventListener('DOMContentLoaded', function() {
  var sportsContainer = document.querySelector('.sports-swiper-container');
  var slides = sportsContainer ? sportsContainer.querySelectorAll('.swiper-slide') : [];
  var prevButton = document.querySelector('.sports-swiper-prev');
  var nextButton = document.querySelector('.sports-swiper-next');

  // Function to set responsive grid columns
  function setGridColumns(wrapper) {
    var width = window.innerWidth;
    if (width >= 1024) {
      wrapper.style.gridTemplateColumns = 'repeat(4, 1fr)';
    } else if (width >= 768) {
      wrapper.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else if (width >= 480) {
      wrapper.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
      wrapper.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
  }

  // Check if page is Arabic (RTL)
  var isRTL = document.documentElement.lang === 'ar' || 
              document.documentElement.lang.indexOf('ar') === 0 ||
              document.documentElement.getAttribute('dir') === 'rtl' ||
              document.body.getAttribute('dir') === 'rtl';

  // Only initialize swiper if there are more than 4 slides
  if (slides.length > 4) {
    var sportsSwiper = new Swiper('.sports-swiper-container', {
      slidesPerView: 4,
      spaceBetween: 20,
      direction: 'horizontal',
      rtl: isRTL,
      navigation: {
        nextEl: '.sports-swiper-next',
        prevEl: '.sports-swiper-prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        480: {
          slidesPerView: 2.5,
        },
        0: {
          slidesPerView: 2.5,
        }
      }
    });
    // Show navigation buttons
    if (prevButton) prevButton.style.display = 'block';
    if (nextButton) nextButton.style.display = 'block';
  } else {
    // Hide navigation buttons when 4 or fewer slides
    if (prevButton) prevButton.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
    // Remove swiper classes to display as normal grid
    if (sportsContainer) {
      sportsContainer.classList.remove('swiper');
      var wrapper = sportsContainer.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.classList.remove('swiper-wrapper');
        wrapper.style.display = 'grid';
        wrapper.style.gap = '20px';
        setGridColumns(wrapper);
        // Update grid on resize
        window.addEventListener('resize', function() {
          setGridColumns(wrapper);
        });
      }
      var slideElements = sportsContainer.querySelectorAll('.swiper-slide');
      slideElements.forEach(function(slide) {
        slide.classList.remove('swiper-slide');
        slide.style.width = 'auto';
        slide.style.marginRight = '0';
      });
    }
  }

  // Inject styles with highest priority to override external CSS
  (function() {
    var style = document.createElement('style');
    style.textContent = '.four_categories_wrapper .sports-swiper-prev, .four_categories_wrapper .sports-swiper-next { background: #fff !important; background-color: #fff !important; border: 1px solid #949494 !important; border-color: #949494 !important; border-radius: 50% !important; width: 32px !important; height: 32px !important; position: absolute !important; top: -25px !important; z-index: 1000 !important; cursor: pointer !important; pointer-events: auto !important; margin: 0 !important; padding: 0 !important; transform: translateY(0) !important; display: flex !important; align-items: center !important; justify-content: center !important; } .four_categories_wrapper .sports-swiper-prev::after, .four_categories_wrapper .sports-swiper-next::after { font-size: 0 !important; width: 12px !important; height: 12px !important; display: block !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; } .four_categories_wrapper .sports-swiper-prev::after { content: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\'%3E%3Cpath d=\'M15 18L9 12L15 6\' stroke=\'%23949494\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") !important; } .four_categories_wrapper .sports-swiper-next::after { content: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\'%3E%3Cpath d=\'M9 18L15 12L9 6\' stroke=\'%23949494\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") !important; } .four_categories_wrapper .sports-swiper-prev { left: calc(100% - 130px) !important; right: auto !important; } .four_categories_wrapper .sports-swiper-next { right: 60px !important; left: auto !important; } @media screen and (max-width: 768px) { .four_categories_wrapper .sports-swiper-prev, .four_categories_wrapper .sports-swiper-next { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; } }';
    document.head.appendChild(style);
  })();
});

