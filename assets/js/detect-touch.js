const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
const isSmallScreen = window.innerWidth <= 960;

if (!isTouchDevice || (isTouchDevice && !isSmallScreen)) {
  // Add 'no-touch' to any element to indicate it's not a touch device
  document.body.classList.add('no-touch');
}
