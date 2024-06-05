document.addEventListener("DOMContentLoaded", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu ? navbarMenu.querySelector(".close-btn") : null;
    const logoutBtn = document.getElementById("logoutBtn");

    if (hamburgerBtn && navbarMenu) {
        // Show mobile menu
        hamburgerBtn.addEventListener("click", () => {
            navbarMenu.classList.toggle("show-menu");
        });
    } else {
        console.error("Hamburger button or navbar menu not found.");
    }

    if (hideMenuBtn && hamburgerBtn) {
        // Hide mobile menu
        hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());
    } else {
        console.error("Hide menu button not found.");
    }

    if (logoutBtn) {
        // Log out functionality
        logoutBtn.addEventListener("click", () => {
            // Clear session data
            localStorage.removeItem("userToken"); // Example if token is stored in localStorage
            sessionStorage.removeItem("userSession"); // Example if session data is stored in sessionStorage

            // Redirect to login page or landing page
            window.location.href = "landingPage.html";
        });
    } else {
        console.error("Logout button not found.");
    }
});
