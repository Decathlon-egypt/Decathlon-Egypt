// Price Formatter - Adds comma separators to prices
// This script formats prices like 1599.00 to 1,599.00

(function() {
  'use strict';

  // Function to format number with commas
  function formatNumberWithCommas(num) {
    // Split into integer and decimal parts
    var parts = num.toString().split('.');
    // Add commas to integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Return formatted number
    return parts.join('.');
  }

  // Function to format price text
  function formatPriceText(text) {
    // Match pattern: number (with optional decimals) followed by optional " EGP"
    // Examples: "1599.00 EGP", "319.00 EGP", "12999.00 EGP"
    var priceRegex = /(\d+(?:\.\d{2})?)\s*(EGP)?/g;
    
    return text.replace(priceRegex, function(match, number, currency) {
      var formattedNumber = formatNumberWithCommas(parseFloat(number).toFixed(2));
      return formattedNumber + (currency ? ' ' + currency : '');
    });
  }

  // Function to format prices in the DOM
  function formatPrices() {
    // Find all price elements
    var priceElements = document.querySelectorAll('.product-price, .product-original-price');
    
    priceElements.forEach(function(element) {
      // Skip if already formatted (check if it contains a comma)
      if (element.textContent.includes(',')) {
        return;
      }
      
      // Get current text
      var currentText = element.textContent;
      
      // Format the price
      var formattedText = formatPriceText(currentText);
      
      // Update the text if it changed
      if (formattedText !== currentText) {
        element.textContent = formattedText;
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', formatPrices);
  } else {
    formatPrices();
  }

  // Also run after a short delay to catch dynamically loaded content (Alpine.js)
  setTimeout(formatPrices, 500);
  setTimeout(formatPrices, 1000);
  setTimeout(formatPrices, 2000);

  // Use MutationObserver to watch for dynamically added content (Alpine.js updates)
  var observer = new MutationObserver(function(mutations) {
    var shouldFormat = false;
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
        // Check if any added node contains price elements
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          var node = mutation.addedNodes[i];
          if (node.nodeType === 1) { // Element node
            if (node.classList && (node.classList.contains('product-price') || node.classList.contains('product-original-price'))) {
              shouldFormat = true;
              break;
            }
            // Check if it contains price elements
            if (node.querySelectorAll && (node.querySelectorAll('.product-price, .product-original-price').length > 0)) {
              shouldFormat = true;
              break;
            }
          }
        }
        // Also check for text changes in price elements
        if (mutation.target && mutation.target.classList) {
          if (mutation.target.classList.contains('product-price') || mutation.target.classList.contains('product-original-price')) {
            shouldFormat = true;
          }
        }
      }
    });
    if (shouldFormat) {
      setTimeout(formatPrices, 50);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

