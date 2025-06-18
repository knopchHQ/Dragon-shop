document.addEventListener('DOMContentLoaded', () => {
  const scroll = document.querySelector('.lore-scroll');

  // Enable unfolding with the desired height
  scroll.style.maxHeight = scroll.scrollHeight + 'px';

  // Show footer with delay while lore "unfolds"
  setTimeout(() => {
    const footer = document.querySelector('footer');
    footer.classList.add('show');
  }, 2000);
});