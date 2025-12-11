// Main Banner Slider Swiper Initialization
// This script initializes the Swiper for the main banner slider

(function() {
  'use strict';

  // Wait for DOM to be ready
  function initSwiper() {
    // Check if the swiper container exists
    var swiperContainer = document.querySelector('#main-banner-swiper');
    if (!swiperContainer) {
      // If not found, try again after a short delay (for dynamically loaded content)
      setTimeout(initSwiper, 100);
      return;
    }

    // Initialize Swiper
    var mainBannerSwiper = new Swiper('#main-banner-swiper', {
      centeredSlides: true,
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '#main-banner-slider .swiper-button-next',
        prevEl: '#main-banner-slider .swiper-button-prev',
      },
      breakpoints: {
        1280: { slidesPerView: 3 },
        1024: { slidesPerView: 2.6 },
        992: { slidesPerView: 2.2 },
        720: { slidesPerView: 2 },
        599: { slidesPerView: 1.6 },
        500: { slidesPerView: 1.2 },
        0: { slidesPerView: 1 }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwiper);
  } else {
    initSwiper();
  }

  // Also try after a delay for dynamically loaded content
  setTimeout(initSwiper, 500);
  setTimeout(initSwiper, 1000);
})();

