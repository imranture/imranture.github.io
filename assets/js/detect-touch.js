const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const isSmallScreen = window.innerWidth <= 960;

if (!isTouchDevice || (isTouchDevice && !isSmallScreen)) {
  document.body.classList.add('no-touch');
}

document.addEventListener('DOMContentLoaded', function() {
  const emailLink = document.getElementById('emailLink');
  
  if (document.body.classList.contains('no-touch')) {
    emailLink.addEventListener('mouseover', function() {
      emailLink.style.setProperty('--before-content', '"Click once to copy the email address"');
    });
    
    emailLink.addEventListener('mouseout', function() {
      emailLink.style.removeProperty('--before-content');
    });
  }
});
