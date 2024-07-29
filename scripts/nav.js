document.addEventListener('DOMContentLoaded', function () {
    const toggleNavBtn = document.getElementById('toggleNavBtn');
    const navList = document.querySelector('nav ul');
    const loginButton = document.getElementById('loginButton'); // Add id="loginButton" to your login button
    const registerButton = document.getElementById('registerButton'); // Add id="registerButton" to your register button

    // Function to close the navigation menu
    function closeNavMenu() {
        navList.classList.remove('show');
    }

    // Event listener for clicking the menu button
    toggleNavBtn.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    // Event listener for clicking anywhere outside the menu or the button
    document.addEventListener('click', function (event) {
        const isMenuButton = event.target === toggleNavBtn;
        const isNavList = event.target === navList || navList.contains(event.target);

        if (!isMenuButton && !isNavList) {
            closeNavMenu();
        }
    });

    // Event listener for scrolling
    window.addEventListener('scroll', function () {
        closeNavMenu();
    });

    // Event listener for clicking the login button
    loginButton.addEventListener('click', function () {
        closeNavMenu();
        openLogin(); // Call your openLogin function
    });

    // Event listener for clicking the register button
    registerButton.addEventListener('click', function () {
        closeNavMenu();
        openRegister(); // Call your openRegister function
    });
});


// Function to toggle the visibility of the nav list and nav icon
function toggleNavList() {
    const navList = document.querySelector('.nav-list');
    const navbar = document.querySelector('.navbar');

    if (navList && navbar) {
        if (navList.style.display === 'block') {
            navList.style.display = 'none';
            navbar.classList.add('nav-hidden');
        } else {
            navList.style.display = 'block';
            navbar.classList.remove('nav-hidden');
        }
    }
}

// Add a scroll event listener to hide the navbar when scrolling down
let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        if (prevScrollPos < currentScrollPos) {
            // Scrolling down, hide the navbar
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up, show the navbar
            navbar.classList.remove('nav-hidden');
        }

        prevScrollPos = currentScrollPos;
    }
};