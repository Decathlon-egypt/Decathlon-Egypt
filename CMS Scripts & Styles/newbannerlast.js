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
    style.textContent = '#main-banner-slider .swiper-button-next, #main-banner-slider .swiper-button-prev { background-color: transparent !important; background: transparent !important; border: 2px solid #ffffff !important; border-color: #ffffff !important; width: 44px !important; height: 44px !important; margin-top: 0 !important; position: absolute !important; z-index: 10 !important; top: 50% !important; transform: translateY(-50%) !important; cursor: pointer !important; border-radius: 50% !important; } #main-banner-slider .swiper-button-next { right: 10px !important; left: auto !important; } #main-banner-slider .swiper-button-prev { left: 10px !important; right: auto !important; } #main-banner-slider .swiper-button-next::after, #main-banner-slider .swiper-button-prev::after { display: none !important; visibility: hidden !important; opacity: 0 !important; content: "" !important; font-size: 0 !important; width: 0 !important; height: 0 !important; line-height: 0 !important; margin: 0 !important; padding: 0 !important; } #main-banner-slider .swiper-button-next svg, #main-banner-slider .swiper-button-prev svg { display: block !important; position: relative !important; z-index: 999 !important; pointer-events: none; color: #ffffff !important; } #main-banner-slider .swiper-button-next svg path, #main-banner-slider .swiper-button-prev svg path { stroke: #ffffff !important; fill: none !important; }';
    document.head.appendChild(style);
  }

  // Inject styles immediately
  injectStyles();

  // Try to create buttons immediately
  function tryCreateButtons() {
    var swiperContainer = document.querySelector('#main-banner-swiper');
    if (swiperContainer) {
      createNavigationButtons();
    }
  }

  // Create navigation buttons if they don't exist
  function createNavigationButtons() {
    var swiperContainer = document.querySelector('#main-banner-swiper');
    if (!swiperContainer) {
      return;
    }

    // Check if buttons already exist
    var nextButton = swiperContainer.querySelector('.swiper-button-next');
    var prevButton = swiperContainer.querySelector('.swiper-button-prev');
    
    if (!nextButton) {
      // Create next button
      nextButton = document.createElement('div');
      nextButton.className = 'swiper-button-next';
      nextButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #ffffff;"><path d="M9 18L15 12L9 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
      swiperContainer.appendChild(nextButton);
    }

    if (!prevButton) {
      // Create prev button
      prevButton = document.createElement('div');
      prevButton.className = 'swiper-button-prev';
      prevButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #ffffff;"><path d="M15 18L9 12L15 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
      swiperContainer.appendChild(prevButton);
    }

    // Create notification span if it doesn't exist
    var notification = swiperContainer.querySelector('.swiper-notification');
    if (!notification) {
      notification = document.createElement('span');
      notification.className = 'swiper-notification';
      notification.setAttribute('aria-live', 'assertive');
      notification.setAttribute('aria-atomic', 'true');
      swiperContainer.appendChild(notification);
    }
  }

  // Wait for DOM to be ready
  function initSwiper() {
    // Check if the swiper container exists
    var swiperContainer = document.querySelector('#main-banner-swiper');
    if (!swiperContainer) {
      // If not found, try again after a short delay (for dynamically loaded content)
      setTimeout(initSwiper, 100);
      return;
    }

    // Create navigation buttons if they don't exist (must be before Swiper init)
    createNavigationButtons();

    // Check if Swiper is already initialized
    if (swiperContainer.swiper) {
      // Swiper already initialized, just update navigation
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
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
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

  // Try to create buttons immediately and on DOM ready
  tryCreateButtons();
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      tryCreateButtons();
      initSwiper();
    });
  } else {
    tryCreateButtons();
    initSwiper();
  }

  // Also try after a delay for dynamically loaded content
  setTimeout(function() {
    tryCreateButtons();
    initSwiper();
  }, 100);
  setTimeout(function() {
    tryCreateButtons();
    initSwiper();
  }, 500);
  setTimeout(function() {
    tryCreateButtons();
    initSwiper();
  }, 1000);
})();

