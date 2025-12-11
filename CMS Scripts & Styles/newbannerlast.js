// Main Banner Slider Swiper Initialization
// This script initializes the Swiper for the main banner slider

(function() {
  'use strict';

  // Inject styles dynamically to ensure they're applied even if CSS loads late
  function injectStyles() {
    // Check if styles are already injected
    if (document.getElementById('main-banner-slider-styles')) {
      return;
    }

    var style = document.createElement('style');
    style.id = 'main-banner-slider-styles';
    style.textContent = '#main-banner-slider .swiper-button-next, #main-banner-slider .swiper-button-prev { background-color: transparent !important; background: transparent !important; border: 2px solid #ffffff !important; border-color: #ffffff !important; width: 44px !important; height: 44px !important; margin-top: 0 !important; position: absolute !important; z-index: 10 !important; } #main-banner-slider .swiper-button-next::after, #main-banner-slider .swiper-button-prev::after { display: none !important; visibility: hidden !important; opacity: 0 !important; content: "" !important; font-size: 0 !important; width: 0 !important; height: 0 !important; line-height: 0 !important; margin: 0 !important; padding: 0 !important; } #main-banner-slider .swiper-button-next svg, #main-banner-slider .swiper-button-prev svg { display: block !important; position: relative !important; z-index: 999 !important; pointer-events: none; color: #ffffff !important; } #main-banner-slider .swiper-button-next svg path, #main-banner-slider .swiper-button-prev svg path { stroke: #ffffff !important; fill: none !important; }';
    document.head.appendChild(style);
  }

  // Inject styles immediately
  injectStyles();

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

