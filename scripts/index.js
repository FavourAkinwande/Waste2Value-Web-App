document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", async e => {
        e.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        try {
            const response = await fetch('http://127.0.0.1:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // Redirect to drop.html on successful login
                window.location.href = '/Transformation/drop.html'; // Adjust path as necessary
            } else {
                setFormMessage(loginForm, "error", result.message || "Login failed");
            }
        } catch (err) {
            setFormMessage(loginForm, "error", "An unexpected error occurred");
        }
    });

    createAccountForm.addEventListener("submit", async e => {
        e.preventDefault();

        const username = createAccountForm.querySelector('input[name="username"]').value;
        const email = createAccountForm.querySelector('input[name="email"]').value;
        const password = createAccountForm.querySelector('input[name="password"]').value;
        const confirmPassword = createAccountForm.querySelector('input[name="confirmPassword"]').value;

        if (password !== confirmPassword) {
            setFormMessage(createAccountForm, "error", "Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration successful! You can now log in.');
                loginForm.classList.remove("form--hidden");
                createAccountForm.classList.add("form--hidden");
            } else {
                setFormMessage(createAccountForm, "error", result.message || "Registration failed");
            }
        } catch (err) {
            setFormMessage(createAccountForm, "error", "An unexpected error occurred");
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

// Define these functions
function setFormMessage(form, type, message) {
    const formMessage = form.querySelector(".form__message");
    formMessage.textContent = message;
    formMessage.className = `form__message form__message--${type}`;
}

function setInputError(inputElement, message) {
    const inputErrorMessage = inputElement.parentElement.querySelector(".form__input-error-message");
    inputErrorMessage.textContent = message;
    inputElement.classList.add("form__input--error");
}

function clearInputError(inputElement) {
    const inputErrorMessage = inputElement.parentElement.querySelector(".form__input-error-message");
    inputErrorMessage.textContent = "";
    inputElement.classList.remove("form__input--error");
}
