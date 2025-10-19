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
// ===== NAVIGATION CONTROLLER =====

// Initialize navigation based on viewport
function initNavigation() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    initMobileNavigation();
  } else {
    initDesktopNavigation();
  }
}

// ===== DESKTOP NAVIGATION =====

function initDesktopNavigation() {
  const sidebar = document.querySelector('.desktop-sidebar');
  
  // Start collapsed on page load
  sidebar.classList.remove('expanded');
  
  // Auto-collapse when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && sidebar.classList.contains('expanded')) {
      toggleDesktopMenu();
    }
  });
}

function toggleDesktopMenu() {
  const sidebar = document.querySelector('.desktop-sidebar');
  const isExpanding = !sidebar.classList.contains('expanded');
  
  sidebar.classList.toggle('expanded');
  
  // Update logo button text based on state
  const logoButton = document.querySelector('.logo-button');
  logoButton.textContent = isExpanding ? '✕' : '🐉';
}

// ===== MOBILE NAVIGATION =====

function initMobileNavigation() {
  // Close mobile menu when clicking links
  document.querySelectorAll('.mobile-burger-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  
  if (mobileMenu.classList.contains('active')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  document.getElementById('mobile-menu').classList.add('active');
  document.getElementById('mobile-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('active');
  document.getElementById('mobile-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== UNIVERSAL MENU TOGGLE (for backward compatibility) =====

function toggleMenu() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    toggleMobileMenu();
  } else {
    toggleDesktopMenu();
  }
}

// ===== EVENT LISTENERS & INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
  // Initialize navigation system
  initNavigation();
  
  // Re-initialize on window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initNavigation, 250);
  });
  
  // Auto-close desktop menu when clicking navigation links
  document.querySelectorAll('.burger-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        // Keep desktop menu open on link click
        // toggleDesktopMenu(); // Uncomment if you want it to close
      }
    });
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