// Buy-Button for home page
document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".buy");

  buyButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = button.closest(".dragon-card");
      const dragonName = card.querySelector("h3").textContent;
      const dragonPrice = card.querySelector(".price").textContent;

      Swal.fire({
        title: `🐉 ${dragonName} Purchased!`,
        text: `You have bought it for ${dragonPrice}. Handle with care!`,
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#fff8ee',
        color: '#2c1b0f',
        confirmButtonColor: '#6d2c15'

    
      })
    });
  });
});
//
// Burger-Menu
function toggleMenu() {
  const menu = document.getElementById("burger-menu");
  menu.classList.toggle("active");

  // Reset animation to play again
  const items = menu.querySelectorAll("li");
  items.forEach((item, i) => {
    void item.offsetWidth; //reset animation
    item.style.animation = `slideIn 0.4s ease forwards ${i * 0.1}s`;
  });
}

// Auto-collapse when clicking on a link
document.querySelectorAll('#burger-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('burger-menu').classList.remove('active');
  });
});
//
// Description-Button
document.querySelectorAll('.toggle-description').forEach(button => {
  button.addEventListener('click', () => {
    const description = button.nextElementSibling;
    description.classList.toggle('active');
  });
});
//
// Show footer with delay while lore "unfolds"
setTimeout(() => {
  const footer = document.querySelector('footer');
  footer.classList.add('show');
}, 500);