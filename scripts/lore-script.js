// Animation-unfolding
document.addEventListener('DOMContentLoaded', () => {
  const scroll = document.querySelector('.lore-scroll');

  // Enable unfolding with the desired height
  scroll.style.maxHeight = scroll.scrollHeight + 'px';
});
//