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

  // Only initialize swiper if there are more than 4 slides
  if (slides.length > 4) {
    var sportsSwiper = new Swiper('.sports-swiper-container', {
      slidesPerView: 4,
      spaceBetween: 20,
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
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
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
});

