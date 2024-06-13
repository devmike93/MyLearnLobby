document.addEventListener("DOMContentLoaded", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu ? navbarMenu.querySelector(".close-btn") : null;

    const addCourseBtn = document.getElementById("addCourseBtn");
    const tasksBtn = document.getElementById("tasksBtn");
    const notesBtn = document.getElementById("notesBtn");

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

    // Event listeners for navigation buttons
    if (addCourseBtn) {
        addCourseBtn.addEventListener("click", () => {
            window.location.href = "addCourse.html"; // Change this to the actual URL of the add course page
        });
    } else {
        console.error("Add Course button not found.");
    }

    if (tasksBtn) {
        tasksBtn.addEventListener("click", () => {
            window.location.href = "tasks.html"; // Change this to the actual URL of the tasks page
        });
    } else {
        console.error("Tasks button not found.");
    }

    if (notesBtn) {
        notesBtn.addEventListener("click", () => {
            window.location.href = "notes.html"; // Change this to the actual URL of the notes page
        });
    } else {
        console.error("Notes button not found.");
    }

    user_id = $("body").attr('user_id');

    // Fetch the user's name
    url_to_get_user = `http://mylearnlobby.me/api/v1/users/${user_id}`;
    fetch(url_to_get_user)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            return response.json();
        }
    })
    .then(user => {
        username = user.first_name + " " + user.last_name;
        $(".username").text(username);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    // Go to add course page
    // url_to_add_course = `http://localhost/AddCourseForm/${user_id}`;
    url_to_add_course = `http://mylearnlobby.me/AddCourseForm/${user_id}`;
    $("#addCourseBtn").click(function() {
        window.location.href = url_to_add_course;
    });

    // log out a user
    $(".btn-logout").click(function() {
        // window.location.href = `http://localhost/Logout/${user_id}`;
        window.location.href = `http://mylearnlobby.me/Logout/${user_id}`;
    });

    // Go to profile page
    $(".btn-profile").click(function() {
        event.preventDefault(); // Prevent the default action
        window.location.href = `http://mylearnlobby.me/Profile/${user_id}`;
    });

    // //progressslider value
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");
    // output.innerHTML = slider.value; // Display the default slider value

    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    // output.innerHTML = this.value;
    // }

    // // logout feature
    // const logoutBtn = document.getElementById("logoutBtn");
    // f (logoutBtn) {
    //     // Log out functionality
    //     logoutBtn.addEventListener("click", () => {
    //         // Clear session data
    //         localStorage.removeItem("userToken"); // Example if token is stored in localStorage
    //         sessionStorage.removeItem("userSession"); // Example if session data is stored in sessionStorage

    //         // Redirect to login page or landing page
    //         window.location.href = "landingPage.html";
    //     });
    // } else {
    //     console.error("Logout button not found.");
    // }
});