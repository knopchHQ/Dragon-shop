// Buy-Button for catalog page
document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".catalog-card .buy");

  buyButtons.forEach(button => {
    button.addEventListener("click", function() {
      const card = button.closest(".catalog-card");
      const dragonName = card.querySelector("h3").textContent;
      const dragonPrice = card.querySelector(".price").textContent;

      Swal.fire({
        title: `${dragonName} Purchased!`,
        text: `You have bought it for ${dragonPrice}. Handle w1ith care!`,
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
// Sort container
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.catalog-grid');
  const sortPrice = document.getElementById('sort-selector');
  const sortRarity = document.getElementById('rarity-selector');
  const sortElement = document.getElementById('element-selector');

  const originalCards = Array.from(grid.querySelectorAll('.catalog-card'));

  function updateCatalog() {
    let cards = [...originalCards];

    // Sort by element
    const element = sortElement.value;
    if (element !== 'all') {
      cards = cards.filter(card => {
        const elSpan = card.querySelector('p span');
        return elSpan && elSpan.classList.contains(element);
      });
    }

    // Sort by price
    if (sortPrice.value === 'price-asc') {
      cards.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortPrice.value === 'price-desc') {
      cards.sort((a, b) => getPrice(b) - getPrice(a));
    }

    // Sort by rarity
    if (sortRarity.value === 'rarity-asc') {
      cards.sort((a, b) => getRarityValue(a) - getRarityValue(b));
    } else if (sortPrice.value === 'rarity-desc') {
      cards.sort((a, b) => getRarityValue(b) - getRarityValue(a));
    }

    // Re-render
    grid.innerHTML = '';
    cards.forEach(card => grid.appendChild(card));
  }

  function getPrice(card) {
    const priceValue = card.querySelector('.price').textContent.trim();
    return parseInt(priceValue.replace(/\D/g, ''));
  }

  function getRarityValue(card) {
    const RarityValue = card.querySelector('.uncommon, .rare, .mythic, .legendary');
    if (!RarityValue) return 0;

    const rarity = RarityValue.textContent.trim().toLowerCase();
    switch (rarity) {
      case 'common': return 1;
      case 'uncommon': return 2;
      case 'rare': return 3;
      case 'mythic': return 4;
      case 'legendary': return 5;
      default: return 0;
    }
  }

  // Add listeners
  sortPrice.addEventListener('change', updateCatalog);
  sortRarity.addEventListener('change', updateCatalog);
  sortElement.addEventListener('change', updateCatalog);

  updateCatalog(); // Initial render
});