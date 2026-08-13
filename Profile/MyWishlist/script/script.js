document
  .getElementById("footerSubscribeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let emailInput = document.getElementById("footerEmailInput");
    let emailError = document.getElementById("footerEmailError");
    let successMsg = document.getElementById("footerSuccessMessage");

    emailInput.classList.remove("is-invalid");
    emailError.textContent = "";
    successMsg.classList.remove("show");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValue = emailInput.value.trim();

    if (!emailPattern.test(emailValue)) {
      emailInput.classList.add("is-invalid");
      emailError.textContent = "Enter a valid email address.";
      return;
    }

    successMsg.classList.add("show");

    setTimeout(function () {
      successMsg.classList.remove("show");
    }, 3000);
  });

  // Trash icon
document.querySelectorAll('.wishlist-delete-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        let card = btn.closest('.col-lg-4');
        card.remove();
    });
});

// Heart icon
document.querySelectorAll('.wishlist-heart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        let navHeartIcon = document.querySelector('.krist-icons .fa-heart');
        let navLink = navHeartIcon.parentElement;
        let countBadge = navLink.querySelector('.wishlist-count');

        if (!countBadge) {
            countBadge = document.createElement('span');
            countBadge.classList.add('wishlist-count');
            countBadge.textContent = '1';
            navLink.appendChild(countBadge);
        } else {
            let currentCount = parseInt(countBadge.textContent);
            countBadge.textContent = currentCount + 1;
        }
    });
});

// Cart icon
document.querySelectorAll('.move-to-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        let navCartIcon = document.querySelector('.krist-icons .fa-bag-shopping');
        let navLink = navCartIcon.parentElement;
        let countBadge = navLink.querySelector('.cart-count');

        if (!countBadge) {
            countBadge = document.createElement('span');
            countBadge.classList.add('cart-count');
            countBadge.textContent = '1';
            navLink.appendChild(countBadge);
        } else {
            let currentCount = parseInt(countBadge.textContent);
            countBadge.textContent = currentCount + 1;
        }
    });
});
