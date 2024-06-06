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
    function setupAddInputFunctionality(buttonId, containerId, inputName, maxInputs) {
        const addButton = document.getElementById(buttonId);
        const inputContainer = document.getElementById(containerId);
        let inputCount = inputContainer.querySelectorAll('input').length

        addButton.addEventListener("click", () => {
            if (inputCount < maxInputs) {
                const newInputField = document.createElement("div");
                newInputField.className = "input-field";
                newInputField.innerHTML = `
                    <input type="text" name="${inputName}" required>
                    <label>Enter ${inputName === 'goals' ? 'what you want to achieve' : 'your task'}</label>
                `;
                addButton.insertAdjacentElement('afterend', newInputField);;
                inputCount++;
            } else {
                alert(`Maximum of ${maxInputs} input fields reached.`);
            }
        });
    }

    function validateForm() {
        const form = document.getElementById('course-form');
        const inputs = form.querySelectorAll('input[required]');
        for (let input of inputs) {
            if (input.value.trim() === "") {
                alert('Please fill out all fields before submitting.');
                return false;
            }
        }
        return true;
    }

    function setupFormSubmission(formId) {
        const form = document.getElementById(formId);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!validateForm()) return;

            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                if (!formObject[key]) {
                    formObject[key] = value;
                } else {
                    if (!Array.isArray(formObject[key])) {
                        formObject[key] = [formObject[key]];
                    }
                    formObject[key].push(value);
                }
            });

            fetch('/submit_course_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Form submitted successfully.');
                } else {
                    alert('Error submitting form.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    setupAddInputFunctionality("addGoals", "goals-container", "goals", 10);
    setupAddInputFunctionality("addTasks", "tasks-container", "tasks", 10);
    setupFormSubmission("course-form");
});
