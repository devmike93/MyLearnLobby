$(document).ready(function() { 
    // Get the user ID from the body attribute
    user_id = $("body").attr('user_id');
    url_addcourses_api = `http://mylearnlobby.me/api/v1/${user_id}/courses`
    // url_addcourses_api = `http://localhost/api/v1/${user_id}/courses`
    dashboard_url = `http://mylearnlobby.me/Dashboard/${user_id}`


    // Event listener for the form submission
    $("#course-form").on('submit', function(event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the course data
        let course_title = $('#title').val().trim();
        let course_description = $('#description').val().trim();
        let course_start_date = $('#start_date').val().trim();
        let course_end_date = $('#end_date').val().trim();
        let course_goals_list = getInputValues('goals');
        let course_tasks_list = getInputValues('tasks');
        let course_resources_list = getInputValues('resources');

        // Check if any of the required fields are empty
        if (course_title === "" || course_description === "" || course_start_date === "" || course_end_date === "" || course_goals_list.length === 0 || course_tasks_list.length === 0 || course_resources_list.length === 0) {
            console.error("Please fill out all fields before submitting.");
            alert("Please fill out all fields before submitting.");
            return;
        }

        // Create a new FormData object
        let formData = {
            title: course_title,
            description: course_description,
            start_date: course_start_date,
            end_date: course_end_date,
            goals: course_goals_list,
            resources: course_resources_list
        };

        fetch(url_addcourses_api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error("Error adding course.");
            }
        })
        .then(data => {
            // alert(data.message);
            course_id = data.course_id;
            create_tasks_objs(course_id, course_tasks_list);
            Swal.fire({
                title: "",
                text: data.message,
                icon: "success"
            }).then(() => {
            window.location.href = dashboard_url;
            })
        })
        .catch(error => {    
            console.error('Error:', error);
        });

    });


    function getInputValues(inputName) {
    // Select all input fields with the specific name attribute
    const inputs = document.querySelectorAll(`input[name="${inputName}"]`);

    // Initialize an array to store the input values
    const values = [];

    // Iterate over the input fields and store their values in the array
    inputs.forEach(input => {
        values.push(input.value);
    });

    // Return the array of input values
    return values;
    }

    // Create tasks objects
    async function create_tasks_objs(course_id, course_tasks_list) {
        let url_addtasks_api = `http://mylearnlobby.me/api/v1/${course_id}/tasks`;

        for (let task_title of course_tasks_list) {
            try {
                let response = await fetch(url_addtasks_api, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title: task_title })
                });

                if (response.status === 201) {
                    let data = await response.json();
                    // alert(data.message);
                } else {
                    throw new Error(`Error creating a task: ${response.status}`);
                }
            } catch (error) {
                console.error("Error", error);
            }
        }
    }

    // log out a user
    $(".logout-btn").click(function() {
        // window.location.href = `http://localhost/Logout/${user_id}`;
        window.location.href = `http://mylearnlobby.me/Logout/${user_id}`;
    });

    // Go to Dashboard
    $(".dashboard").click(function() {
        event.preventDefault(); // Prevent the default action
        window.location.href = dashboard_url;
    });

});