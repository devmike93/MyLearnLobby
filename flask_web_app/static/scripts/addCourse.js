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

    //Add input fields to goals and tasks up to (n) number

    let goalsCount = 0;
    let tasksCount = 0;
    let resourcesCount = 0;

    function setupAddInputFunctionality(buttonId, containerId, inputName, maxInputs, prefix) {
    const addButton = document.getElementById(buttonId);
    const inputContainer = document.getElementById(containerId).parentNode;

    addButton.addEventListener("click", () => {
        let count;
        switch (prefix) {
            case "Goals":
                count = ++goalsCount;
                break;
            case "Tasks":
                count = ++tasksCount;
                break;
            case "Resources":
                count = ++resourcesCount;
                break;
            default:
                count = 0;
        }

        if (count <= maxInputs) {
            const newDiv = document.createElement("div");
            newDiv.className = "appended";
            newDiv.id = `appended${prefix}${count}`;
            newDiv.innerHTML = `
                <input type="text" name="${inputName}" required>
                <label>Enter ${inputName === 'goals' ? 'what you want to achieve' : inputName === 'tasks' ? 'your task' : 'your resource'}</label>
            `;
            const olderSibling = document.getElementById(`appended${prefix}${count - 1}`);
            if (olderSibling) {
                olderSibling.parentNode.insertBefore(newDiv, olderSibling.nextSibling);
            } else {
                inputContainer.parentNode.insertBefore(newDiv, inputContainer.nextSibling);
            }

        } else {
            alert(`Maximum of ${maxInputs} input fields reached.`);
        }
        });
    }

    // Call the setup function for each button
    setupAddInputFunctionality("addGoals", "goals-container", "goals", 5, "Goals");
    setupAddInputFunctionality("addTasks", "tasks-container", "tasks", 5, "Tasks");
    setupAddInputFunctionality("addResources", "res-container", "resources", 5, "Resources");


    // function setupAddInputFunctionality(buttonId, containerId, inputName, maxInputs) {
    //     const addButton = document.getElementById(buttonId);
    //     const inputContainer = document.getElementById(containerId).parentNode;
        
    //     addButton.addEventListener("click", () => {
    //         const inputCount = inputContainer.querySelectorAll('.input-field').length;
    //         console.log('Current input count:', inputCount);
            
    //         if (inputCount < maxInputs) {
    //             const newDiv = document.createElement("div");
    //             newDiv.className = "appended";
    //             newDiv.innerHTML = `
    //                 <input type="text" name="${inputName}" required>
    //                 <label>Enter ${inputName === 'goals' ? 'what you want to achieve' : inputName === 'tasks' ? 'your task' : 'your result'}</label>
    //             `;
    //             inputContainer.insertAdjacentElement('afterend', newDiv);
                
    //         } else {
    //             alert(`Maximum of ${maxInputs} input fields reached.`);
    //         }
    //     });
    // }
    
    // // Setup functionality for initGoal
    // setupAddInputFunctionality('addGoals', 'goals-container', 'goals', 5);
    
    // // Setup functionality for initTask
    // setupAddInputFunctionality('addTasks', 'tasks-container', 'tasks', 5);
    
    // // Setup functionality for initRes
    // setupAddInputFunctionality('addResults', 'res-container', 'results', 5);

    // Form validation
    function validateForm() {
        var title = document.forms["course-form"]["title"].value;
        var description = document.forms["course-form"]["description"].value;
        var startDate = document.forms["course-form"]["start-date"].value;
        var endDate = document.forms["course-form"]["end-date"].value;

        if (title === "" || description === "" || startDate === "" || endDate === "") {
            console.error("Please fill out all fields before submitting.");
            alert("Please fill out all fields before submitting.");
            return false;
        }
        return true;
    }

    function submitForm() {
        if (validateForm()) {
            var formData = new FormData(document.getElementById("course-form"));
    
            // Collect data from appended fields
            var appendedDivs = document.querySelectorAll(".appended");
            appendedDivs.forEach(function(div) {
                var inputs = div.querySelectorAll("input[type='text']");
                inputs.forEach(function(input) {
                    var prefix = div.id.replace(/\d+/g, ''); // Extract prefix from the div ID
                    formData.append(prefix + "[" + input.name + "]", input.value);
                });
            });
    
            fetch("/add_input", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Handle response from server if needed
                console.log(data);
                // Redirect to another page upon successful submission
                window.location.href = "courseview.html";
            })
            .catch(error => {
                // Handle errors if any
                console.error('Error:', error);
            });
        } else {
            console.error("Please fill out all fields before submitting.");
            alert("Please fill out all fields before submitting.");
        }
    }
        
    // Event listener for button click
    document.querySelector(".submitBtn").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission
        submitForm(); // Call the submitForm function
    });

    // function validateForm() {
    //     const form = document.getElementById('course-form');
    //     const inputs = form.querySelectorAll('input[required]');
    //     for (let input of inputs) {
    //         if (input.value.trim() === "") {
    //             alert('Please fill out all fields before submitting.');
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // function setupFormSubmission(formId) {
    //     const form = document.getElementById(formId);
    //     form.addEventListener("submit", (event) => {
    //         event.preventDefault();
    //         if (!validateForm()) return;

    //         const formData = new FormData(form);
    //         const formObject = {};
    //         formData.forEach((value, key) => {
    //             if (!formObject[key]) {
    //                 formObject[key] = value;
    //             } else {
    //                 if (!Array.isArray(formObject[key])) {
    //                     formObject[key] = [formObject[key]];
    //                 }
    //                 formObject[key].push(value);
    //             }
    //         });

    //         fetch('/submit_course_details', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formObject)
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.status === 'success') {
    //                 alert('Form submitted successfully.');
    //             } else {
    //                 alert('Error submitting form.');
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    //     });
    // }
    // setupFormSubmission("course-form");
});
