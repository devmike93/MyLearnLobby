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

    //Add input fields to goals and tasks up to 10
    function setupAddInputFunctionality(buttonId, containerId) {
        const addButton = document.getElementById(buttonId);
        const inputContainer = document.getElementById(containerId);
        let inputCount = 1; // Start with 1 because there's already one input field

        addButton.addEventListener("click", () => {
            if (inputCount < 10) {
                const newInputField = document.createElement("div");
                newInputField.className = "input-field";
                newInputField.innerHTML = `
                    <input type="text" name="${buttonId === 'addGoals' ? 'goals' : 'tasks'}" required>
                    <label>${buttonId === 'addGoals' ? 'Enter what you want to achieve' : 'Enter your task'}</label>
                `;
                inputContainer.appendChild(newInputField);
                inputCount++;
            } else {
                alert("Maximum of 10 input fields reached.");
            }
        });
    }

    setupAddInputFunctionality("addGoals", "goals-container");
    setupAddInputFunctionality("addTasks", "tasks-container");

});
