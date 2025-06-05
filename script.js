// Auto-detect language and set RTL if needed, including dynamic changes (e.g., Google Translate)
(function() {
  // List of RTL language codes
  var rtlLangs = ['ar', 'he', 'fa'];

  // Store the original order of timeline cards
  var timelineSection = document.querySelector('.timeline-cards-section');
  var originalCards = [];
  if (timelineSection) {
    // Save the original card elements in an array
    originalCards = Array.from(timelineSection.children);
  }

  // Helper function to reverse the DOM order of cards
  function reverseTimelineCards() {
    if (!timelineSection) return;
    // Get current cards as an array
    var cards = Array.from(timelineSection.children);
    // Remove all cards from the section
    cards.forEach(function(card) {
      timelineSection.removeChild(card);
    });
    // Add cards back in reverse order
    for (var i = cards.length - 1; i >= 0; i--) {
      timelineSection.appendChild(cards[i]);
    }
  }

  // Helper function to restore the original DOM order of cards
  function restoreTimelineCards() {
    if (!timelineSection) return;
    // Remove all current cards
    while (timelineSection.firstChild) {
      timelineSection.removeChild(timelineSection.firstChild);
    }
    // Add cards back in original order
    originalCards.forEach(function(card) {
      timelineSection.appendChild(card);
    });
  }

  // Track current direction to avoid unnecessary DOM changes
  var currentDir = 'ltr';

  // Main function to update direction and card order
  function updateDirection() {
    var lang = document.documentElement.lang;
    if (rtlLangs.includes(lang)) {
      document.body.setAttribute('dir', 'rtl');
      document.body.classList.add('text-end');
      if (timelineSection) {
        timelineSection.style.flexDirection = 'row-reverse';
        timelineSection.style.direction = 'rtl'; // Flip scrollbar
        if (currentDir !== 'rtl') {
          reverseTimelineCards(); // Reverse DOM order for RTL
          currentDir = 'rtl';
        }
      }
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.body.classList.remove('text-end');
      if (timelineSection) {
        timelineSection.style.flexDirection = 'row';
        timelineSection.style.direction = 'ltr'; // Restore scrollbar
        if (currentDir !== 'ltr') {
          restoreTimelineCards(); // Restore original DOM order for LTR
          currentDir = 'ltr';
        }
      }
    }
  }

  // Initial check
  updateDirection();

  // Observe changes to the <html> lang attribute (e.g., Google Translate)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'lang') {
        updateDirection();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Comments are included to help beginners understand each part of the code.
})();
