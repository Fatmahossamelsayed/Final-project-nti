document.getElementById('personalInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let phoneNumber = document.getElementById('phoneNumber');
    let emailAddress = document.getElementById('emailAddress');
    let address = document.getElementById('address');

    let firstNameError = document.getElementById('firstNameError');
    let lastNameError = document.getElementById('lastNameError');
    let phoneNumberError = document.getElementById('phoneNumberError');
    let emailAddressError = document.getElementById('emailAddressError');
    let addressError = document.getElementById('addressError');


    [firstName, lastName, phoneNumber, emailAddress, address].forEach(function (input) {
        input.classList.remove('is-invalid');
    });
    [firstNameError, lastNameError, phoneNumberError, emailAddressError, addressError].forEach(function (span) {
        span.textContent = '';
    });

    let isValid = true;

    if (firstName.value.trim().length < 5) {
        firstName.classList.add('is-invalid');
        firstNameError.textContent = 'First name must be at least 5 letters.';
        isValid = false;
    }

    if (lastName.value.trim().length < 5) {
        lastName.classList.add('is-invalid');
        lastNameError.textContent = 'Last name must be at least 5 letters.';
        isValid = false;
    }

    let phonePattern = /^(010|011|012|015)\d{8}$/;
    if (!phonePattern.test(phoneNumber.value.trim())) {
        phoneNumber.classList.add('is-invalid');
        phoneNumberError.textContent = 'Enter a valid Egyptian number (e.g. 01012345678).';
        isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValue = emailAddress.value.trim();
    if (emailValue.length < 5 || !emailPattern.test(emailValue)) {
        emailAddress.classList.add('is-invalid');
        emailAddressError.textContent = 'Enter a valid email address.';
        isValid = false;
    }

    if (address.value.trim().length <= 10) {
        address.classList.add('is-invalid');
        addressError.textContent = 'Address must be more than 10 characters.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let message = document.getElementById('editSuccessMessage');
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 3000);
});

document.getElementById('footerSubscribeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let emailInput = document.getElementById('footerEmailInput');
    let emailError = document.getElementById('footerEmailError');
    let successMsg = document.getElementById('footerSuccessMessage');

    emailInput.classList.remove('is-invalid');
    emailError.textContent = '';
    successMsg.classList.remove('show');

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValue = emailInput.value.trim();

    if (!emailPattern.test(emailValue)) {
        emailInput.classList.add('is-invalid');
        emailError.textContent = 'Enter a valid email address.';
        return;
    }

    successMsg.classList.add('show');

    setTimeout(function () {
        successMsg.classList.remove('show');
    }, 3000);
});