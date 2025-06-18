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