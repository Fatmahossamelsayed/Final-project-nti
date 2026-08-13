// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;

        // Save user data
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Account created successfully!");

        // Register → Login
        window.location.href = "login.html";

    });

}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (email === savedEmail && password === savedPassword) {

            localStorage.setItem("isLoggedIn", "true");

            // Login → Home
            window.location.href = "home.html";

        } else {

            alert("Email or Password is incorrect.");

        }

    });

}

// FORGOT PASSWORD → OTP

const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("forgotEmail").value.trim();

        // نحفظ الإيميل
        localStorage.setItem("resetEmail", email);

        // Forgot Password → OTP
        window.location.href = "otp.html";

    });

}


// OTP

const otpForm = document.getElementById("otpForm");

if (otpForm) {

    const otpInputs = document.querySelectorAll(".otp");


    // الانتقال تلقائياً للمربع التالي

    otpInputs.forEach(function (input, index) {

        input.addEventListener("input", function () {

            // أرقام فقط
            
            this.value = this.value.replace(/[^0-9]/g, "");

            // المربع التالي
            
            if (this.value !== "" && index < otpInputs.length - 1) {

                otpInputs[index + 1].focus();

            }

        });

        // Backspace يرجع للمربع السابق
        
        input.addEventListener("keydown", function (e) {

            if (
                e.key === "Backspace" &&
                this.value === "" &&
                index > 0
            ) {

                otpInputs[index - 1].focus();

            }

        });

    });

    // Verify OTP
    otpForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let enteredOTP = "";

        otpInputs.forEach(function (input) {

            enteredOTP += input.value;

        });

        // OTP تجريبي
        const correctOTP = "12345";


        if (enteredOTP === correctOTP) {

            // OTP → Change Password
            window.location.href = "changepass.html";

        } else {

            alert("Wrong OTP! Enter 12345");

        }

    });

}

// CHANGE PASSWORD

const changePasswordForm =
    document.getElementById("changePasswordForm");

if (changePasswordForm) {

    changePasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        // Check password
        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        // Save new password
        localStorage.setItem("password", newPassword);

        // Show success message
        const successMessage =
            document.getElementById("successMessage");

        successMessage.style.display = "flex";

    });

}

// BACK TO LOGIN

const backToLogin =
    document.getElementById("backToLogin");

if (backToLogin) {

    backToLogin.addEventListener("click", function () {

        window.location.href = "login.html";

    });

}

// FORGOT BACK BUTTON

const forgotBack =
    document.getElementById("forgotBack");

if (forgotBack) {

    forgotBack.addEventListener("click", function () {

        window.location.href = "login.html";

    });

}

// OTP BACK BUTTON

const otpBack =
    document.getElementById("otpBack");

if (otpBack) {

    otpBack.addEventListener("click", function () {

        window.location.href = "forgotpass.html";

    });

}

// CHANGE PASSWORD BACK BUTTON

const changePasswordBack =
    document.getElementById("changePasswordBack");

if (changePasswordBack) {

    changePasswordBack.addEventListener("click", function () {

        window.location.href = "otp.html";

    });

}

// SHOW EMAIL IN OTP PAGE

const userEmail =
    document.getElementById("userEmail");

if (userEmail) {

    const email =
        localStorage.getItem("resetEmail");

    if (email) {

        userEmail.textContent = email;

    }

}
const shopLink = document.querySelector(".shop-link");
const megaMenu = document.querySelector(".mega-menu");

if (shopLink && megaMenu) {

    shopLink.addEventListener("click", function (e) {

        e.preventDefault();

        megaMenu.classList.toggle("show");

    });

}document.addEventListener("click", function (e) {
    if (
        !e.target.closest(".shop-menu")
    ) {
        megaMenu.classList.remove("show");
    }
});