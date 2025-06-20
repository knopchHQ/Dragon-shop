// Sort container
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.catalog-grid');
  const sortPrice = document.getElementById('sort-selector');
  const sortRarity = document.getElementById('rarity-selector');
  const sortElement = document.getElementById('element-selector');
  const searchInput = document.getElementById('search-input');
  const noResults = document.getElementById('no-results');
  const resetButton = document.getElementById('reset-filters');

  const originalCards = Array.from(grid.querySelectorAll('.catalog-card'));
  const totalDragons = originalCards.length;

  let boughtDragons = new Set(JSON.parse(localStorage.getItem('boughtDragons')) || []);

  function updateCatalog() {
    let cards = [...originalCards];

    // 🔎Search by Name
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      cards = cards.filter(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        return title.includes(query);
      });
    }

    // 🎯 Sort by element 
    const element = sortElement.value;
    if (element !== 'all') {
      cards = cards.filter(card => {
        const elSpan = card.querySelector('p span');
        return elSpan && elSpan.classList.contains(element);
      });
    }

    // 💰 Sort by price
    if (sortPrice.value === 'price-asc') {
      cards.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortPrice.value === 'price-desc') {
      cards.sort((a, b) => getPrice(b) - getPrice(a));
    }

    // 🌟 Sort by rarity
    if (sortRarity.value === 'rarity-asc') {
      cards.sort((a, b) => getRarityValue(a) - getRarityValue(b));
    } else if (sortRarity.value === 'rarity-desc') {
      cards.sort((a, b) => getRarityValue(b) - getRarityValue(a));
    }

    // 🔁 Re-render cards
    grid.innerHTML = '';
    cards.forEach(card => grid.appendChild(card));
  
    // 😢 "Nothing found"
    noResults.style.display = cards.length === 0 ? 'block' : 'none';

    // Update filter highlights
    updateFilterStyles();

    // 🛒 Buy handling
    cards.forEach(card => {
      const buyButton = card.querySelector('.buy');
      const dragonName = card.querySelector('h3').textContent.trim();
      const dragonPrice = card.querySelector('.price').textContent.trim();

      buyButton.addEventListener('click', () => {
        Swal.fire({
          title: `${dragonName} Purchased!`,
          text: `You have bought it for ${dragonPrice}. Handle with care!`,
          icon: 'success',
          confirmButtonText: 'OK',
          background: '#fff8ee',
          color: '#2c1b0f',
          confirmButtonColor: '#6d2c15'
        });

        boughtDragons.add(dragonName);

        if (boughtDragons.size === totalDragons) {
          Swal.fire({
            title: "🏆 Achievement unlocked!",
            text: "You bought them all!",
            icon: "success",
            confirmButtonText: "OK",
            background: "#1c1c1c",
            color: "#fff"
          });
        }
      });
    });
  }

  // 🔘 Filter reset handler
  resetButton.addEventListener('click', () => {
    sortPrice.value = 'default';
    sortRarity.value = 'default';
    sortElement.value = 'all';
    searchInput.value = '';
    updateCatalog();
    updateFilterStyles();
  });

  // 🎨 Backlight of active filters
  function updateFilterStyles() {
    sortPrice.classList.toggle('active-filter', sortPrice.value !== 'default');
    sortRarity.classList.toggle('active-filter', sortRarity.value !== 'default');
    sortElement.classList.toggle('active-filter', sortElement.value !== 'all');
    searchInput.classList.toggle('active-filter', searchInput.value.trim() !== '');
  }

  // 🧠 Listeners
  searchInput.addEventListener('input', updateCatalog);
  sortPrice.addEventListener('change', updateCatalog);
  sortRarity.addEventListener('change', updateCatalog);
  sortElement.addEventListener('change', updateCatalog);

  updateCatalog();
});

// 💰 Price
function getPrice(card) {
  const priceValue = card.querySelector('.price').textContent.trim();
  return parseInt(priceValue.replace(/\D/g, ''));
}

// 🌟 Rarity
function getRarityValue(card) {
  const RarityValue = card.querySelector('.uncommon, .rare, .epic, .mythic, .legendary');
  if (!RarityValue) return 0;

  const rarity = RarityValue.textContent.trim().toLowerCase();
  switch (rarity) {
    case 'common': return 1;
    case 'uncommon': return 2;
    case 'rare': return 3;
    case 'epic': return 4;
    case 'mythic': return 5;
    case 'legendary': return 6;
    default: return 0;
  }
}