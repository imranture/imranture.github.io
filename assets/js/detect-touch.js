// Function to detect touch devices and add 'no-touch' class
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const isSmallScreen = window.innerWidth <= 960;

if (!isTouchDevice || (isTouchDevice && !isSmallScreen)) {
  // Add 'no-touch' to any element to indicate it's not a touch device
  document.body.classList.add('no-touch');
}

// Flag to indicate if email has been copied
let emailCopied = false;

// Function to set the emailCopied flag to true
function setEmailCopiedTrue() {
  emailCopied = true;
}

// Function to remove hover effect on touch devices after email is copied
if (isTouchDevice) {
  const emailLink = document.getElementById('emailLink');

  emailLink.addEventListener('touchstart', function () {
    if (emailCopied) {
      // Remove hover effect after 6 seconds (1500ms + 4500ms)
      setTimeout(() => {
        emailLink.blur();
        // Reset the flag
        emailCopied = false;
      }, 6000);
    }
  });
}

// Expose setEmailCopiedTrue to the global scope so it can be called from the HTML file
window.setEmailCopiedTrue = setEmailCopiedTrue;