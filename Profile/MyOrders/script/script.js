//auth for footer email
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

//cancel order btn
document.querySelectorAll(".btn-cancel").forEach(function (btn) {
  btn.addEventListener("click", function () {
    let orderItem = btn.closest(".order-item");

    if (!orderItem) return;

    let confirmCancel = confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    // update badge
    let badge = orderItem.querySelector(".badge-status");
    if (badge) {
      badge.classList.remove("delivered", "inprocess", "cancelled");
      badge.classList.add("cancelled");
      badge.textContent = "Cancelled";
    }

    // update message
    let statusText = orderItem.querySelector(
      ".d-flex.align-items-center.gap-2.mt-3 .small.text-muted",
    );
    if (statusText) {
      statusText.textContent = "Your order has been cancelled";
    }

    // remove cancel button
    let actions = orderItem.querySelector(".order-actions");
    if (actions) {
      actions.querySelectorAll("button").forEach(function (actionBtn) {
        let label = actionBtn.textContent.trim();
        if (!label.startsWith("View Order")) {
          actionBtn.remove();
        }
      });
    }

    // update Modal
    let viewOrderBtn = orderItem.querySelector('[data-bs-toggle="modal"]');
    if (viewOrderBtn) {
      let modalTarget = viewOrderBtn.getAttribute("data-bs-target");
      let modal = document.querySelector(modalTarget);

      if (modal) {
        // remove review
        let reviewSection = modal.querySelector(".order-review-section");
        if (reviewSection) {
          reviewSection.remove();
        }

        let hr = modal.querySelector(".modal-body hr");
        if (hr) {
          hr.remove();
        }
      }
    }
  });
});

// Star click
document.querySelectorAll(".star-rating").forEach(function (container) {
  let stars = container.querySelectorAll("i");

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      let selectedValue = parseInt(star.getAttribute("data-value"));

      stars.forEach(function (s) {
        const sValue = parseInt(s.getAttribute("data-value"));
        if (sValue <= selectedValue) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      container.setAttribute("data-selected-rating", selectedValue);
    });
  });
});

// Review form auth
document.querySelectorAll(".review-form").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nameInput = form.querySelector(".review-name-input");
    let emailInput = form.querySelector(".review-email-input");
    let textInput = form.querySelector(".review-text-input");

    let nameError = form.querySelector(".review-name-error");
    let emailError = form.querySelector(".review-email-error");
    let textError = form.querySelector(".review-text-error");

    let successMsg = form.querySelector(".review-success-msg");

    // Reset previous state
    [nameInput, emailInput, textInput].forEach(function (input) {
      input.classList.remove("is-invalid");
    });
    [nameError, emailError, textError].forEach(function (span) {
      span.textContent = "";
    });
    successMsg.classList.remove("show");

    let isValid = true;

    // Name — not empty, 5+ characters
    if (nameInput.value.trim().length < 5) {
      nameInput.classList.add("is-invalid");
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    // Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      emailError.textContent = "Enter a valid email address.";
      isValid = false;
    }

    // Review — not empty, 10+ characters
    if (textInput.value.trim().length < 10) {
      textInput.classList.add("is-invalid");
      textError.textContent = "Please write a review (10+ characters).";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    successMsg.classList.add("show");

    setTimeout(function () {
      successMsg.classList.remove("show");
    }, 3000);
  });
});


// Filter
document.querySelectorAll(".filter-option").forEach(function (option) {
  option.addEventListener("click", function (e) {
    e.preventDefault();

    let selectedFilter = option.getAttribute("data-filter");

    // reset active class
    document.querySelectorAll(".filter-option").forEach(function (opt) {
      opt.classList.remove("active");
    });
    option.classList.add("active");

    // check matches
    document.querySelectorAll(".order-item").forEach(function (orderItem) {
      let badge = orderItem.querySelector(".badge-status");
      let divider = orderItem.nextElementSibling;
      let matches = false;

      if (selectedFilter === "all") {
        matches = true;
      } else if (badge.classList.contains(selectedFilter)) {
        matches = true;
      }

      if (matches) {
        orderItem.style.display = "";
      } else {
        orderItem.style.display = "none";
      }

      // divider hide
      if (divider) {
        if (matches) {
          divider.style.display = "";
        } else {
          divider.style.display = "none";
        }
      }
    });
  });
});

// Search
document.querySelector(".filter-btn").addEventListener("click", function () {
  let searchTerm = document
    .querySelector(".search-input")
    .value.trim()
    .toLowerCase();

  document.querySelectorAll(".order-item").forEach(function (orderItem) {
    let titleEl = orderItem.querySelector(".fw-semibold");
    let divider = orderItem.nextElementSibling;
    let matches = titleEl.textContent.trim().toLowerCase().includes(searchTerm);

    if (matches) {
      orderItem.style.display = "";
    } else {
      orderItem.style.display = "none";
    }

    if (divider) {
      if (matches) {
        divider.style.display = "";
      } else {
        divider.style.display = "none";
      }
    }
  });
});
